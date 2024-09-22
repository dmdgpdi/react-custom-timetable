/* eslint-disable no-undef */

import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

const baseConfig = {
  entryPoints: ['src/lib/index.ts'],
  outdir: 'dist',
  bundle: true,
  sourcemap: true,
  plugins: [
    sassPlugin({
      type: 'local-css',
    }),
  ],
  loader: {
    '.png': 'file',
  },
  banner: {
    js: '"use client";\nimport "./index.css";\n',
  },
  external: ['react', 'react-dom'],
};

Promise.all([
  esbuild.build({
    ...baseConfig,
    format: 'cjs',
    outExtension: {
      '.js': '.cjs',
    },
  }),

  esbuild.build({
    ...baseConfig,
    format: 'esm',
  }),
]).catch((error) => {
  console.log('Build fail');
  console.log('error', error);
  process.exit(1);
});
