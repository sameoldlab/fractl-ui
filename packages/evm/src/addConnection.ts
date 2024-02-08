import type {AccountData, Config } from '@fractl-ui/types'
import {
	connect,
	reconnect,
	disconnect,
	type Config as wagmiConfig,
	Connector,
	getAccount,
	getBalance,
	getEnsName,
	getEnsAvatar,
	GetEnsNameReturnType
} from '@wagmi/core'
import { formatUnits } from 'viem/utils'
import { GetEnsAvatarReturnType } from 'viem/actions'

export const store = <T>(initialValue: T) => {
	let value = initialValue
	const subscriptions = new Set<(value: T) => void>()

	const subscribe = (subscription: (value: T) => void) => {
		subscription(value)
		subscriptions.add(subscription)
		return () => subscriptions.delete(subscription)
	}

	const alertSubscriptions = () => {
		subscriptions.forEach((subscription) => {
			subscription(value)
		})
	}

	const set = (newValue: T) => {
		value = newValue
		alertSubscriptions()
	}

	return {
		subscribe,
		set
	}
}
/**
 * Provides connection details to fractl-modal passed into it's config parameter
 */
export const addEvmConnection = (
	config: wagmiConfig,
	{ resolver } = { resolver: 'ENS' }
): Config => {
	const state = map({
		current: config.state.connections.get(config.state.current),
		status: config.state.status
	})

	const accountData = map<AccountData>({
		account: undefined,
		balance: undefined,
		nameService: {
			name: undefined,
			avatar: undefined
		}
	})

	config.subscribe(
		(state) => state.current,
		(current) => state.setKey('current', config.state.connections.get(current))
	)
	config.subscribe(
		(state) => state.status,
		(status) => {
			updateAccount(status)
			state.setKey('status', status)
		}
	)

	async function updateAccount(status: "connected" | "connecting" | "disconnected" | "reconnecting") {
		console.info('config is ', status);
		if (status !== 'connected') {
			
			/* Todo: invalidate account when state changed FROM connected */
			return
		}

		const account = getAccount(config)
		accountData.setKey('account', account)
		/* Not sure if this is possible */
		if (!account.isConnected) throw Error('account is not connected')
		const address = account.address!

		try {
			let balance = await getBalance(config, { address })
			balance = {
				...balance,
				formatted: formatUnits(balance.value, balance.decimals)
			}
			accountData.setKey('balance', balance)

			let name: GetEnsNameReturnType,
				avatar: GetEnsAvatarReturnType

			switch (resolver) {
				default:
					name = await getEnsName(config, {
						address,
						blockTag: 'finalized'
					})

					avatar =
						name &&
						(await getEnsAvatar(config, {
							name,
							blockTag: 'finalized'
						}))
			}

			// accountData.setKey('account', account)
			accountData.setKey('nameService', { name, avatar })
			console.log(accountData.get())
		} catch (error) {
			console.log(accountData.get())
			console.error('fetch error', error)
		}
	}

	return {
		state,
		accountData,
		get connectors() {
			return config.connectors
		},
		connect: async (connector: Connector) => {
			const { accounts, chainId } = await connect(config, { connector })
			accountData.setKey('account', accounts?.[0])
			return { accounts, chainId }
		},
		reconnect: async (params) => await reconnect(config, { ...params }),
		disconnect: async (connector = undefined) =>
			await disconnect(config, { connector })
	}
}
