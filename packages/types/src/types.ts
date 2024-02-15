import type { MapStore } from 'nanostores'
// import type { Readable } from 'svelte/store'
/* Map store fits same interface as a
 * Svelte Writable with additional listen
 * function. Need separate type package to
 * enforce pattern across libs.
 */

type Store<T extends object> = MapStore<T>['subscribe']

export type AccountDataError = {
	account: undefined
	balance: undefined
	nameService: {
		name: undefined
		avatar: undefined
	}
}

export type AccountDataResponse = {
	account: {
		address: `0x${string}`
		addresses: readonly [`0x${string}`, ...`0x${string}`[]]
	}
	balance: {
		formatted: string
		decimals: number
		symbol: string
		value: bigint
	}

	nameService:
		| {
				name: null
				avatar: null
		  }
		| {
				name: string
				avatar: string | null
		  }
}

export type AccountData = AccountDataError | AccountDataResponse

export interface Connector {
	name: string
	id: string
	icon?: string
	type: string
	[propName: string]: unknown
	/* Some other things Config.connect() uses to connect */
}

export type ConfigDisconnected = {
	state: Store<{
		activeRequest?: Connector
		current: undefined
		status: 'connecting' | 'disconnected' | 'reconnecting'
	}>
	connectors: readonly Connector[]
	accountData: Store<AccountDataError>
	connect: (connector: Connector) => Promise<object> /* fix later */
	reconnect: (
		config: Config,
		{ connectors }: { connectors: Connector[] }
	) => Promise<void>
	disconnect: () => Promise<void>
}

export type ConfigConnected = {
	state: Store<{
		activeRequest?: Connector
		current: Connector
		status: 'connected'
	}>
	connectors: readonly Connector[]
	accountData: Store<AccountDataResponse>
	connect: (connector: Connector) => Promise<object> /* fix later */
	reconnect: (
		config: Config,
		{ connectors }: { connectors: Connector[] }
	) => Promise<void>
	disconnect: () => Promise<void>
}

export type Config = ConfigDisconnected | ConfigConnected
