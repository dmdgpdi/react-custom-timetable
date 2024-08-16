import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/lib/index.ts'),
      name: 'react-custom-timetable',
      fileName: `index`,
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
      plugins: [],
    },
    commonjsOptions: {
      esmExternals: ['react'],
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase', // camelCase로 클래스 이름을 변환
    },
    preprocessorOptions: {
      scss: {},
    },
  },

  plugins: [
    react(),
    dts({ insertTypesEntry: true }),
    cssInjectedByJsPlugin({ topExecutionPriority: false }),
  ],
});
