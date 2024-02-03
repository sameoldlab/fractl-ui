import postcssPresetEnv from 'postcss-preset-env'
// const postcss = require('postcss');

const config = {
	plugins: [
		/** @type {import('postcss-preset-env').pluginOptions} */
		postcssPresetEnv({
			features: {
				'nesting-rules': true
			},
			minimumVendorImplementations: 3
		})
	]
}

export default config
