import image from '@rollup/plugin-image'
import resolve from '@rollup/plugin-node-resolve'
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
      sourcemap: false
    }
  ],
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify(env), preventAssignment: true }),
    resolve(),
    image(),
    typescript({
      tsconfig: 'tsconfig.json'
    }),
    terser()
  ],
  external: ['react', 'react-dom', 'react-dom/client']
}
