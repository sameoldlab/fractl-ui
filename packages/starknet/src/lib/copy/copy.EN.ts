export default (name: string) => ({
	connecting: {
		injected: `Accept the connection request in ${name}`
	},
	rejected: {
		injected: 'Try again or check your wallet for a pending request'
	},
	install: {
		injected: `${name} not found, install the extenstion to continue`
	}
})
