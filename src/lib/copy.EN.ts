export default (name: string) => ({
	connecting: {
		injected: `Accept the connection request in ${name}`,
	},
	rejected: {
		injected: 'Try again or check for a previous request',
	},
	install: {
		injected: `${name} not found, install the extenstion to continue`,
	},
})
