import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { readFileSync } from 'fs'

const env = process.env.NODE_ENV || 'development'

const pkg = JSON.parse(readFileSync('./package.json'))

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify(env), preventAssignment: true }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', { modules: false }]],
      plugins: ['@babel/plugin-transform-runtime']
    }),
    commonjs(),
    typescript(),
    terser()
  ],
  external: ['react', 'react-dom', 'framer-motion']
}
