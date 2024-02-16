import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [
		dts({
			entryRoot: 'src',
			outDir: 'dist'
		})
	],
	build: {
		sourcemap: true,
		lib: {
			entry: resolve(__dirname, './src/index.ts'),
			name: '@fractl-ui/evm',
			fileName: 'index'
		}
	}
})
