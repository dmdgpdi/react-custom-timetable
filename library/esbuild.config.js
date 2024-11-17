/* eslint-disable no-undef */
import { context } from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import inlineImage from 'esbuild-plugin-inline-image';

const watch = process.argv.includes('--watch');

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
  external: ['react', 'react-dom'],
};

Promise.all([
  context({
    ...baseConfig,
    format: 'cjs',
    outExtension: {
      '.js': '.cjs',
    },
  }).then((ctx) =>
    watch ? ctx.watch() : ctx.rebuild().then(() => ctx.dispose()),
  ),
  context({
    ...baseConfig,
    format: 'esm',
  }).then((ctx) =>
    watch ? ctx.watch() : ctx.rebuild().then(() => ctx.dispose()),
  ),
]).catch((error) => {
  console.log('Build fail');
  console.log('error', error);
  process.exit(1);
});
