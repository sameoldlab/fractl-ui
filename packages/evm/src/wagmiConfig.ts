import { http, createConfig, createStorage } from '@wagmi/core'
import { readable } from 'svelte/store'
import { mainnet, arbitrum } from '@wagmi/core/chains'

const storage = createStorage({ storage: localStorage })
const _config = createConfig({
	chains: [mainnet, arbitrum],
	storage,
	transports: {
		[mainnet.id]: http(),
		[arbitrum.id]: http()
	}
})
const config = readable(_config, (set) => {
	_config.subscribe(
		(state) => state.status,
		() => set(_config)
	)
})

export default config
