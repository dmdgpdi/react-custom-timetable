import process from 'process';
import { context } from 'esbuild';

const watch = process.argv.includes('--watch');

const baseConfig = {
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  bundle: true,
  sourcemap: true,
  external: ['react', 'react-dom'],
  alias: {
    '@': './src',
  },
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
