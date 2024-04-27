import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { readFileSync } from 'fs'
import flatDts from 'rollup-plugin-flat-dts'

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
    resolve(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', { modules: false }]],
      plugins: ['@babel/plugin-transform-runtime']
    }),
    typescript({
      tsconfig: 'tsconfig.json',
      declaration: false
    }),
    flatDts(),
    terser()
  ],
  external: ['react', 'react-dom', 'framer-motion']
}
