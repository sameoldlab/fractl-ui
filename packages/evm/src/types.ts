import { MapStore } from 'nanostores'
/* Map store fits same interface as a
 * Svelte Writable with additional listen
 * function. Need separate type package to
 * enforce pattern across libs.
 */

export type AccountDataError = MapStore<{
	account: undefined
	balance: undefined
	nameService: {
		name: undefined
		avatar: undefined
	}
}>

export type AccountDataResponse = MapStore<{
	account: {
		address: `0x${string}`
		addresses: [`0x${string}`, ...`0x${string}`[]]
	}
	balance: Promise<{
		formatted: string
		decimals: number
		symbol: string
		value: bigint
	}>

	nameService: Promise<
		| {
				name: null
				avatar: null
		  }
		| {
				name: string
				avatar: string | null
		  }
	>
}>

export type AccountData = AccountDataError | AccountDataResponse

export type Connector = {
	name: string
	id: string
	icon?: string
	type: string
	/* Some other things connect uses to to connect */
}

export type Config =
	| {
			state: MapStore<{
				activeRequest?: Connector
				current: {
					accounts: readonly string[]
					chainId: number
					connector
				}
				status: 'connecting' | 'disconnected' | 'reconnecting'
			}>
			connectors: readonly Connector[]
			accountData: AccountDataError
			connect: (connector: Connector) => Promise<object> /* fix later */
			reconnect: (
				config: Config,
				{ connectors }: { connectors: Connector[] }
			) => Promise<void>
			disconnect: () => Promise<void>
	  }
	| {
			state: MapStore<{
				activeRequest?: Connector
				current: {
					accounts: readonly string[]
					chainId: number
					connector
				}
				status: 'connected'
			}>
			connectors: readonly Connector[]
			accountData: AccountDataResponse
			connect: (connector: Connector) => Promise<object> /* fix later */
			reconnect: (
				config: Config,
				{ connectors }: { connectors: Connector[] }
			) => Promise<void>
			disconnect: () => Promise<void>
	  }
