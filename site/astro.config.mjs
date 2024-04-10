import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
	site: 'https://fractl.click',
	integrations: [
		starlight({
			title: 'Fractl',

			customCss: ['./src/styles/main.css'],
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: true
			},
			social: {
				github: 'https://github.com/sameoldlab/fractl-ui'
			},
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'docs/guides' }
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'docs/reference' }
				}
			],
			components: {
				Header: './src/components/Header.astro',
				PageFrame: './src/components/PageFrame.astro',
				Sidebar: './src/components/Sidebar.astro'
			},
			editLink: {
				baseUrl: 'https://github.com/sameoldlab/fractl-ui/edit/main/site/'
			}
		})
	]
})
