import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/lib/index.ts'),
      name: 'react-custom-timetable',
      fileName: `index`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        interop: 'auto',
        banner: '"use client";\nimport "./style.css";\n',
      },
    },
    commonjsOptions: {
      esmExternals: ['react'],
    },
  },
  plugins: [react(), dts({ insertTypesEntry: true })],
});
