import { existsSync, readdirSync, mkdirSync, renameSync, statSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const distPath = resolve(__dirname, '../dist/components');
const publicPath = resolve(__dirname, '../public/js');

console.log('🔍 Revisando ', distPath);

if (!existsSync(distPath)) {
  console.log('⚠️ No existe la carpeta dist.');
  process.exit(1);
}

const items = readdirSync(distPath);

// Filtrar solo carpetas
const folders = items.filter((item) =>
  statSync(join(distPath, item)).isDirectory()
);

if (folders.length === 0) {
  console.log('⚠️ No hay carpetas en dist.');
  process.exit(1);
}

folders.forEach((folder) => {
  const srcDir = join(distPath, folder);
  const destDir = join(publicPath, folder);

  console.log(`📂 Moviendo archivos de: ${srcDir} → ${destDir}`);

  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  const files = readdirSync(srcDir);

  files.forEach((file) => {
    const srcFile = join(srcDir, file);
    const destFile = join(destDir, file);

    renameSync(srcFile, destFile);
  });

  console.log(`✅ Archivos movidos a: ${destDir}`);
});
