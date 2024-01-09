module.exports = {
	files: 'src/lib/**',
	dest: 'dist',
	targets: ['vue3', 'solid', 'react'],
	getTargetPath: ({ target }) => {
		return target
	}
}
