import { http, createConfig, createStorage } from '@wagmi/core'
// import { injected, walletConnect, mock } from 'wagmi/connectors'
import { readable } from 'svelte/store'
import { mainnet, arbitrum } from '@wagmi/core/chains'

const storage = createStorage({ storage: localStorage })
const _config = createConfig({
	chains: [mainnet, arbitrum],
	// storage,
	transports: {
		[mainnet.id]: http(),
		[arbitrum.id]: http()
	},
	// connectors: [injected()],
})
const config = readable(_config, (set) => {
	_config.subscribe(
		(state) => state.status,
		() => set(_config)
	)
})

export default config
