import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      include: ['src/components/**/*'],
      // Configurar para que genere primero en dist
      outDir: 'dist',
      afterBuild: () => {
        console.log('Post-compilation step running...');
        // Después de la generación, mover los archivos
        const moveFiles = (srcDir: string, destDir: string) => {
          console.log('Moving files from', srcDir, 'to', destDir);

          if (!fs.existsSync(srcDir)) {
            console.error('Source directory does not exist, skipping move.');
            return;
          }

          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }

          const files = fs.readdirSync(srcDir);

          files.forEach((file) => {
            const srcPath = resolve(srcDir, file);
            const destPath = resolve(destDir, file);

            if (fs.statSync(srcPath).isDirectory()) {
              moveFiles(srcPath, destPath);
              // Opcionalmente eliminar el directorio fuente después de mover
              fs.rmdirSync(srcPath);
            } else if (file.endsWith('.d.ts')) {
              fs.renameSync(srcPath, destPath);
            }
          });
        };

        // Mover archivos de dist/components a public/js
        moveFiles(
          resolve(__dirname, 'dist/components'),
          resolve(__dirname, 'public/js')
        );
      }
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/ClgButton'),
      name: 'ClgButton',
      fileName: (format) => `clg-button.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
