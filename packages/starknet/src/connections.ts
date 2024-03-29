import SN, {
	type StarknetWindowObject,
	type ConnectedStarknetWindowObject,
} from 'get-starknet-core'
import { map } from 'nanostores'
import type { AccountData, Config } from '@fractl-ui/types'
import { RpcProvider, defaultProvider, Contract, constants } from 'starknet'
import { formatUnits } from './utils/formatUnits.js'
import ethABI from './abi/ethABI.js'

const ETH_ADDR =
	'0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
const DECIMALS = 18

/* 
	TODO: Test with metamask snap
	Integrate Walletconnect
*/
type StarknetConnectProps = {
	starknetVersion?: 'v4' | 'v5' | undefined
	/**
	 * Defaults to a list of preauthorized or available wallets
	 */
	connectors: StarknetWindowObject[]
	/* opt to include install link when no wallet is available */
	/**
	 * If `true` reconnects to the first available connected wallet in `connectors`
	 */
	autoconnect: boolean

	provider: RpcProvider
	resolver: 'STARKNET_ID'
	clearLastWallet?: boolean | undefined 
}


export const addStarknetConnection = async (
	{
		starknetVersion,
		connectors,
		autoconnect,
		provider,
		resolver,
		clearLastWallet
	}: StarknetConnectProps = {
		starknetVersion: 'v5',
		connectors: [],
		autoconnect: false,
		provider: new RpcProvider({
			nodeUrl: constants.RPC_MAINNET_NODES[0],
			retries: 2
		}),
		resolver: 'STARKNET_ID'
	}
): Promise<Config> => {
	/* Check if user passed in any connectors. If empty get connectors from preauthorized wallets. */
	if (connectors.length === 0) {
		// SN.getDiscoveryWallets().then((res) => connectors.installable.push(...res))
		// SN.getPreAuthorizedWallets().then((res) => connectors.push(...res))
		connectors.push(...await SN.getPreAuthorizedWallets())
		const available = await SN.getAvailableWallets()
		connectors.push(...available.filter((a)=> !connectors.includes(a)))

		connectors.map((a) => {
			if (a.id === 'braavos' || a.id === 'argentX') a.type = 'injected'
			return a
		})
	}

	// SN.getLastConnectedWallet().then((res) => (lastConnected = res))

	const state = map<{
		activeRequest?: StarknetWindowObject | undefined
		current: ConnectedStarknetWindowObject | undefined
		status: 'connecting' | 'disconnected' | 'reconnecting' | 'connected'
	}>({
		activeRequest: undefined,
		current: undefined,
		status: 'disconnected'
	})

	/* Update status */
	state.subscribe(($s) => {
		if ($s.activeRequest) return state.setKey('status', 'connecting')
		if ($s.current) return state.setKey('status', 'connected')
		state.setKey('status', 'disconnected')
	})
	// state.setKey('activeRequest', connectors.available[0])

	const setCurrent = (connector: StarknetWindowObject) =>
		connector.isConnected
			? state.setKey('current', connector)
			: Error(`${connector.name} is not connected`)

	if (autoconnect) {
		for (let i = 0; i <= connectors.length; i++) {
			if (connectors[i]?.isConnected) {
				state.setKey('current', connectors[i])
				setCurrent(connectors[i])
			}
		}
	}

	/* Manage Account Data */
	const accountData = map<AccountData>({
		account: undefined,
		balance: undefined,
		nameService: {
			name: undefined,
			avatar: undefined
		}
	})

	state.subscribe(($s, changedKey) => changedKey === 'status' && updateAccount($s.status, $s.current))

	async function updateAccount(
		status: 'connected' | 'connecting' | 'disconnected' | 'reconnecting',
		current: ConnectedStarknetWindowObject
	) {
		if (status !== 'connected') {
			accountData.setKey('account', undefined)
			accountData.setKey('balance', undefined)
			accountData.setKey('nameService', { name: undefined, avatar: undefined })
			return
		}
		
		const account = {address: current.selectedAddress}
		accountData.setKey('account', account)

		try {
			const eth = new Contract(ethABI, ETH_ADDR, defaultProvider)
			const balance = await eth.balanceOf(account.address)

			accountData.setKey('balance', {
				value: formatUnits(balance, DECIMALS),
				symbol: 'ETH'
			})

			let name, avatar

			switch (resolver) {
				default:
					name = await provider.getStarkName(account.address)
					avatar = null
				/* name &&
						(await getEnsAvatar(config, {
							name,
							blockTag: 'finalized'
						})) */
			}

			// accountData.setKey('account', account)
			accountData.setKey('nameService', { name, avatar })

			// console.log(accountData.get())
		} catch (error) {
			// console.log(accountData.get())
			console.error('fetch error', error)
		}
	}

	const connect =  async (connector: StarknetWindowObject = connectors[0]) => {
		/* Connect and reconnect are effectively the same thing as this does not keep a history of existing connections */
		// if (connector?.isConnected) throw Error('already connected')
		state.setKey('activeRequest', connector)

		return SN.enable(connector, { starknetVersion })
			.catch((e) => Error(e))
			.then((res) =>  res)
			.finally(() => {
				state.setKey('activeRequest', undefined)
				setCurrent(connector)
			})
	}

	return {
		state: {
			subscribe: state.subscribe,
		},
		accountData: {
			subscribe: accountData.subscribe,
		},
		get connectors() {
			return connectors
		},
		connect,
		reconnect: async (connectors: StarknetWindowObject[]) =>
			await connectors.forEach(async (c) => await connect(c)),
		disconnect: async (
			opts?: { clearLastWallet: boolean | undefined } | undefined
		) => {
			await SN.disconnect({clearLastWallet: true})
			state.setKey('current', undefined)
			console.log(state.get());
			
		}
	}
}
