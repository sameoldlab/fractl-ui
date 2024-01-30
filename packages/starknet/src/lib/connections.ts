import SN, {
	type StarknetWindowObject,
	type WalletProvider
} from 'get-starknet-core'
import { atom, computed, onSet } from 'nanostores'
/* 
	TODO: Test with metamask snap
	Integrate Walletconnect
*/
export const createStarknetConnection = () => {
	const wallets = {
		preAuthorized: [] as StarknetWindowObject[],
		lastConnected: undefined,
		available: [] as StarknetWindowObject[],
		installable: [] as WalletProvider[]
	}
	// const preauthedWallets: StarknetWindowObject[] = []
	// const discoveryWallets: StarknetWindowObject[] = []
	// const availableWallets: StarknetWindowObject[] = []

	SN.getPreAuthorizedWallets().then((res) => wallets.preAuthorized.push(...res))
	SN.getLastConnectedWallet().then((res) => (wallets.lastConnected = res))
	SN.getDiscoveryWallets().then((res) => wallets.installable.push(...res))
	SN.getAvailableWallets().then((res) => {
		res.map((v) => {
			if (v.id === 'braavos' || v.id === 'argentX') v.type = 'injected'

			return v
		})
		wallets.installable.push(...res)
		wallets.available.push(...res)
	})

	const current = atom<StarknetWindowObject>(null)
	const setCurrent = (connectors: StarknetWindowObject[]) => {
		for (let i = 0; i <= connectors.length; i++) {
			if (connectors[i]?.isConnected) return current.set(connectors[i])
		}
		return current.set(null)
	}
	setCurrent(wallets.available)

	const stateStore = () => {
		const activeRequest = atom<StarknetWindowObject>(null)

		const status = computed(
			[current, activeRequest],
			($current, $activeRequest) => {
				return $activeRequest
					? 'connecting'
					: $current
						? 'connected'
						: 'disconnected'
			}
		)

		onSet(activeRequest, () => {
			console.log('setting current...')
			console.log(wallets.available)

			setCurrent(wallets.available)
			console.log(current.get())
		})

		return {
			activeRequest,
			get current() {
				return {
					subscribe: current.subscribe,
					get: current.get
				}
			},
			get status() {
				return status
			}
		}
	}

	const state = stateStore()

	const connect = (
		wallet: StarknetWindowObject = wallets.available[0],
		options?:
			| {
					starknetVersion?: 'v4' | 'v5' | undefined
			  }
			| undefined
	) => {
		console.log(wallet)

		state.activeRequest.set(wallet)
		console.log('activeRequest: ', state.activeRequest.get())
		console.log('current: ', state.current.get())
		console.log('status: ', state.status.get())

		if (state.status.get() === 'connected')
			return console.log('already connected')

		return SN.enable(wallet, options)
			.catch((e) => Error(e))
			.then((res) => res)
			.finally(() => {
				state.activeRequest.set(null)
				console.log('activeRequest: ', state.activeRequest.get())
				console.log('current: ', state.current.get())
				console.log('status: ', state.status.get())
			})
	}

	const data = {
		state: {
			...state,
			get activeRequest() {
				return state.activeRequest.get
			}
		},
		connectors: wallets.available,
		connect,
		disconnect: async (
			opts?: { clearLastWallet: boolean | undefined } | undefined
		) => {
			await SN.disconnect(opts)
			setCurrent(wallets.available)
		}
	}
	return data
}
