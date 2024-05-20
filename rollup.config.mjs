import { defineConfig } from 'rollup'
import del from 'rollup-plugin-delete'
import pkg from './package.json' assert { type: 'json' }
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  input: 'src/index.ts',
  external: 'dependencies' in pkg ? Object.keys(pkg.devDependencies) : [],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    {
      file: pkg.unpkg,
      format: 'iife',
      name: 'h',
      plugins: [terser()],
      sourcemap: true,
    },
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    typescript(),
  ],
})
