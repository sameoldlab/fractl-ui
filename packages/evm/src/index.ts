import {
	connect,
	reconnect,
	disconnect,
	type Config as EvmConfig,
	Connector
} from '@wagmi/core'
import { Config } from './types.js'
export { mock, walletConnect } from './connectors/index.js'
import { map } from 'nanostores'

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
export const addEvmConnection = (config: EvmConfig): Config<EvmConfig> => {
	const fractl = {
		state: map({
			current: config.state.connections.get(config.state.current),
			// get current() {return config.state.connections.get(config.state.current)},
			// get status() {return status()}
			status: config.state.status
		}),
		get connectors() {
			return config.connectors
		},
		// accountData
		connect: async (connector: Connector) => {
			return await connect(config, { connector })
		},
		reconnect: async (params) => await reconnect(config, { ...params }),
		disconnect: async (connector = undefined) =>
			await disconnect(config, { connector })
	}

	// const [status, setStatus] = signal(config.state.status)
	// const status = store(config.state.status)

	config.subscribe(
		(state) => state.current,
		(current) => {
			// if()
			console.log('updating current')
			return fractl.state.setKey(
				'current',
				config.state.connections.get(current)
			)
			// setCurrent(config.state.connections.get(config.state.current))
			// console.log(status)
		}
	)
	config.subscribe(
		(state) => state.status,
		(status) => {
			console.log('updating status')
			return fractl.state.setKey('status', status)
		}
	)

	return fractl
}
