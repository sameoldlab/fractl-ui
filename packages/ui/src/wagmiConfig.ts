import { http, createConfig, createStorage } from '@wagmi/core'
import { mock, walletConnect } from '$lib/connectors'
import { readable } from 'svelte/store'
import { mainnet, arbitrum } from '@wagmi/core/chains'

const storage = createStorage({ storage: localStorage })
const _config = createConfig({
	chains: [mainnet, arbitrum],
	storage,
	transports: {
		[mainnet.id]: http(),
		[arbitrum.id]: http()
	},
	connectors: [
		mock({
			accounts: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045']
		}),
		walletConnect({
			metadata: {
				name: 'Fractl',
				url: 'https://fractl.click',
				verifyUrl: 'https://fractl.click',
				icons: ['./_app/immutable/assets/fractl.I45eptSj.svg'],
				description: 'dapp UI Library'
			},
			projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
			showQrModal: false
		})
	]
})
const config = readable(_config, (set) => {
	_config.subscribe(
		(state) => state.status,
		() => set(_config)
	)
})

export default config
