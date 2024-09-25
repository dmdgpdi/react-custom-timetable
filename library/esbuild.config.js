/* eslint-disable no-undef */
import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import inlineImage from 'esbuild-plugin-inline-image';

const baseConfig = {
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  bundle: true,
  sourcemap: true,
  plugins: [
    sassPlugin({
      type: 'local-css',
    }),
    inlineImage(),
  ],
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
    loader: {
      '.png': 'file',
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
