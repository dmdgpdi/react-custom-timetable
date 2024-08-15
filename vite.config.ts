import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
// import sassDts from 'vite-plugin-sass-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/lib/index.ts'),
      name: 'react-custom-timetable',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        banner: '"use client";',
        interop: 'auto',
      },
    },
    commonjsOptions: {
      esmExternals: ['react'],
    },
  },

  plugins: [react(), dts({ insertTypesEntry: true })],
});
