import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import replace from 'rollup-plugin-replace'

const NODE_ENV = process.env.NODE_ENV || 'development'

export default {
  input: 'src/index.jsx',
  output: {
    file: 'dist/bite-consent.js',
    format: 'esm',
    globals: {
      react: 'React'
    }
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    resolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime']
    }),
    terser()
  ],
  external: ['react', 'react-dom']
}
