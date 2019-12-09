import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import linaria from 'linaria/rollup';
import css from 'rollup-plugin-css-only';

const NODE_ENV = process.env.NODE_ENV || 'development';

const extensions = ['.js', '.jsx', '.es', '.mjs', '.ts', '.tsx', '.css'];

module.exports = {
  input: 'src/index.jsx',
  output: {
    dir: './dist/index.js',
    format: 'cjs',
  },
  plugins: [
    resolve({
      extensions,
    }),
    babel({
      extensions,
      exclude: 'node_modules/**',
    }),
    commonjs({
      include: ['node_modules/**'],
      extensions,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    linaria(),
    css({
      output: 'dist/styles.css',
    }),
    serve({
      contentBase: ['public', 'dist'],
    }),
  ],
};
