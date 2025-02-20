import { createHash } from 'crypto';
import { execSync } from 'child_process';
import { relative, basename, dirname } from 'path';
import { sync } from 'glob';
import fsExtra from 'fs-extra';
import path from 'path';
import {
  unlinkSync,
  existsSync,
  readdirSync,
  mkdirSync,
  renameSync,
  statSync
} from 'fs';

const {
  readFileSync,
  writeFileSync,
  readJsonSync,
  writeJsonSync,
  ensureDirSync,
  copyFileSync,
  removeSync
} = fsExtra;

// Configuration constants
const CONFIG = {
  CACHE_FILE: './cache-components.json',
  COMPONENTS_PATH: './src/components',
  TEMP_BUILD_PATH: './temp-build',
  FINAL_OUTPUT_PATH: './public/js',
  DIST_PATH: './dist/components',
  FILE_EXTENSIONS: {
    SOURCE: '.vue',
    OUTPUT: ['.js']
  }
};

const normalizePath = (filepath) => {
  return path.normalize(filepath).replace(/\\/g, '/');
};

const getFileHash = (filePath) => {
  if (!existsSync(filePath)) return null;
  const fileBuffer = readFileSync(filePath);
  return createHash('sha256').update(fileBuffer).digest('hex');
};

const getEntries = () => {
  return sync(
    `${CONFIG.COMPONENTS_PATH}/**/*${CONFIG.FILE_EXTENSIONS.SOURCE}`
  ).map((file) => {
    const relativePath = relative(CONFIG.COMPONENTS_PATH, file);
    const componentName = basename(file, CONFIG.FILE_EXTENSIONS.SOURCE);
    const folder = dirname(relativePath);
    return {
      name: componentName,
      file: normalizePath(path.resolve(file)),
      tempDir: normalizePath(path.resolve(CONFIG.TEMP_BUILD_PATH, folder)),
      outputDir: normalizePath(path.resolve(CONFIG.FINAL_OUTPUT_PATH, folder)),
      key: `${folder}/${componentName}`
    };
  });
};

const getDeletedEntries = (entries) => {
  let cache = existsSync(CONFIG.CACHE_FILE)
    ? readJsonSync(CONFIG.CACHE_FILE)
    : {};
  const currentKeys = new Set(entries.map((entry) => entry.key));
  const deletedEntries = Object.keys(cache).filter(
    (key) => !currentKeys.has(key)
  );

  deletedEntries.forEach((key) => delete cache[key]);
  writeJsonSync(CONFIG.CACHE_FILE, cache);

  return deletedEntries;
};

const cleanDeletedFiles = (deletedEntries) => {
  deletedEntries.forEach((key) => {
    const [folder, name] = key.split('/');
    const outputDir = normalizePath(
      path.resolve(CONFIG.FINAL_OUTPUT_PATH, folder)
    );

    CONFIG.FILE_EXTENSIONS.OUTPUT.forEach((ext) => {
      const filePath = path.join(outputDir, `${name}${ext}`);
      if (existsSync(filePath)) {
        unlinkSync(filePath);
        console.log(`🗑 Deleted: ${filePath}`);
      }
    });
  });
};

const getChangedEntries = (forceRebuild = false) => {
  const entries = getEntries();
  let cache = existsSync(CONFIG.CACHE_FILE)
    ? readJsonSync(CONFIG.CACHE_FILE)
    : {};

  if (forceRebuild) {
    // If forcing rebuild, consider every entry like changed
    console.log('🔄 Forcing every component rebuild...');

    // Updating cache files with new hashes
    entries.forEach(({ key, file }) => {
      cache[key] = getFileHash(file);
    });

    writeJsonSync(CONFIG.CACHE_FILE, cache);
    return entries;
  }

  const changedEntries = entries.filter(({ key, file }) => {
    const currentHash = getFileHash(file);
    if (cache[key] !== currentHash) {
      cache[key] = currentHash;
      return true;
    }
    return false;
  });

  writeJsonSync(CONFIG.CACHE_FILE, cache);
  return changedEntries;
};

const generateViteConfig = (entry) => `
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      include: ['src/components/**/*'],
      outDir: 'dist'
    })
  ],
  build: {
    emptyOutDir: true,
    lib: {
      entry: '${entry.file}',
      name: '${entry.name}',
      fileName: '${entry.name}',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        dir: '${entry.tempDir}',
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  }
});
`;

const moveTypeDefinitions = async () => {
  const distPath = CONFIG.DIST_PATH;
  console.log('🔍 Checking ', distPath);

  if (!existsSync(distPath)) {
    console.log('⚠️ dist folder not found.');
    return;
  }

  const items = readdirSync(distPath);
  const folders = items.filter((item) =>
    statSync(path.join(distPath, item)).isDirectory()
  );

  if (folders.length === 0) {
    console.log('⚠️ There are not folders into dist.');
    return;
  }

  folders.forEach((folder) => {
    const srcDir = path.join(distPath, folder);
    const destDir = path.join(CONFIG.FINAL_OUTPUT_PATH, folder);

    console.log(`📂 Moving files: ${srcDir} → ${destDir}`);

    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }

    const files = readdirSync(srcDir);

    files.forEach((file) => {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);

      renameSync(srcFile, destFile);
    });

    console.log(`✅ Files moved to ${destDir}`);
  });
};

const copyBuildOutput = (entry) => {
  ensureDirSync(entry.outputDir);

  // Copy main component file
  const sourceFile = path.join(entry.tempDir, `${entry.name}.js`);
  const targetFile = path.join(entry.outputDir, `${entry.name}.js`);

  if (existsSync(sourceFile)) {
    copyFileSync(sourceFile, targetFile);
    console.log(`📋 Copied: ${targetFile}`);
  }

  // Copy type definitions if they exist
  const sourceTypes = path.join(entry.tempDir, `${entry.name}.d.ts`);
  const targetTypes = path.join(entry.outputDir, `${entry.name}.d.ts`);

  if (existsSync(sourceTypes)) {
    copyFileSync(sourceTypes, targetTypes);
    console.log(`📋 Copied: ${targetTypes}`);
  }
};

const generateIndexes = () => {
  const categories = new Map();

  getEntries().forEach(({ name, outputDir }) => {
    const category = basename(outputDir);
    if (!categories.has(category)) categories.set(category, []);
    categories.get(category).push(name);
  });

  ensureDirSync(CONFIG.FINAL_OUTPUT_PATH);

  categories.forEach((components, category) => {
    const categoryPath = path.join(CONFIG.FINAL_OUTPUT_PATH, category);
    ensureDirSync(categoryPath);

    const exports = components
      .map(
        (name) => `import ${name} from './${name}.js';\nexport default ${name};`
      )
      .join('\n\n');

    CONFIG.FILE_EXTENSIONS.OUTPUT.forEach((ext) => {
      const indexPath = path.join(categoryPath, `index${ext}`);
      writeFileSync(indexPath, exports);
      console.log(`📝 Generated: ${indexPath}`);
    });
  });

  const globalExports = Array.from(categories.entries())
    .map(([category, components]) =>
      components
        .map(
          (name) =>
            `export { default as ${name} } from './${category}/${name}.js';`
        )
        .join('\n')
    )
    .join('\n');

  CONFIG.FILE_EXTENSIONS.OUTPUT.forEach((ext) => {
    const indexPath = path.join(CONFIG.FINAL_OUTPUT_PATH, `index${ext}`);
    writeFileSync(indexPath, globalExports);
    console.log(`📝 Generated: ${indexPath}`);
  });
};

const cleanTempDirectory = () => {
  if (existsSync(CONFIG.TEMP_BUILD_PATH)) {
    removeSync(CONFIG.TEMP_BUILD_PATH);
    console.log('🧹 Cleaned temporary build directory');
  }
};

const buildFiles = async (options = { force: false }) => {
  try {
    cleanTempDirectory();

    const entries = getEntries();
    const deletedEntries = getDeletedEntries(entries);
    const changedEntries = getChangedEntries(options.force);

    if (deletedEntries.length > 0) {
      cleanDeletedFiles(deletedEntries);
    }

    if (changedEntries.length === 0) {
      console.log('✅ No changes detected. Skipping compilation.');
      return;
    }

    for (const entry of changedEntries) {
      try {
        ensureDirSync(entry.tempDir);
        const tempConfigFile = path.join(entry.tempDir, 'vite.config.js');

        writeFileSync(tempConfigFile, generateViteConfig(entry));
        console.log(`📦 Building ${entry.key}...`);

        execSync(`npx vite build --config "${tempConfigFile}"`, {
          stdio: 'inherit',
          env: { ...process.env, FORCE_COLOR: true }
        });

        if (existsSync(tempConfigFile)) {
          unlinkSync(tempConfigFile);
        }

        copyBuildOutput(entry);
        console.log(`✅ Built and copied: ${entry.key}`);
      } catch (error) {
        console.error(`❌ Error building ${entry.key}:`, error);
      }
    }

    await moveTypeDefinitions();
    generateIndexes();
  } finally {
    cleanTempDirectory();
  }
};

// Detect --force argument
const shouldForceRebuild = process.argv.includes('--force');

// Execute build process with force option
buildFiles({ force: shouldForceRebuild }).catch((error) => {
  console.error('Build process failed:', error);
  cleanTempDirectory();
  process.exit(1);
});
