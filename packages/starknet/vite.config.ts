import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		dts({
			entryRoot: 'src/lib',
			outDir: 'dist/types'
		})
	],
	build: {
		sourcemap: true,
		lib: {
			entry: resolve(__dirname, './src/lib/index.ts'),
			name: '@fractl-ui/starknet', //should be able to convert to some general cairo version
			formats: ['es'],
			fileName: 'index'
		},
		target: 'esnext'
	}
})
