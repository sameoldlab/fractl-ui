import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		dts({
			entryRoot: 'src',
			outDir: 'dist'
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, './src/index.ts'),
			name: 'fractl-ui',
			formats: ['es'],
			fileName: 'index'
		},
		target: 'esnext',
		sourcemap: true
		// minify: false
	}
})
