import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  { // build for node & module bundlers
    input: 'src/trianglify.js',
    external: ['chroma-js', 'delaunator'],
    output: {file: pkg.main, format: 'cjs'}
  },
  {
    // build minified bundle to be used standalone for browser use
    // note: // chroma.js weighs 40k minified, a smaller solution would be nice
    input: 'src/trianglify.js',
    plugins: [terser({output: {comments: false}}), resolve(), commonjs()],
    output: {file: 'dist/trianglify.bundle.js', format: 'umd', name: 'trianglify'}
  },
  {
    // build non-minified bundle to be used for debugging
    input: 'src/trianglify.js',
    plugins: [resolve(), commonjs()],
    output: {file: 'dist/trianglify.bundle.debug.js', format: 'umd', name: 'trianglify'}
  }
]
