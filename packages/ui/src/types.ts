import type { Readable } from 'svelte/store'

export type AccountDataDisconnected = {
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
		addresses: [`0x${string}`, ...`0x${string}`[]]
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

export type AccountData = AccountDataDisconnected | AccountDataResponse

export type Connector = {
	readonly name: string
	readonly id: string
	readonly icon?: string
	readonly type: string
	/* Some other things useConnect uses to to connect */
}

export type ConfigDisconnected = {
	state: Readable<{
		activeRequest: () => Connector
		current: Connector
		status: 'connecting' | 'disconnected' | 'reconnecting'
	}>
	connectors: Connector[]
	accountData: Readable<AccountDataDisconnected>
	connect: (connector: Connector) => void
	reconnect: (
		config: Config,
		{ connectors }: { connectors: Connector[] }
	) => void
	disconnect: () => void
}

export type ConfigConnected = {
	state: Readable<{
		activeRequest: () => Connector
		current: Connector
		status: 'connected'
	}>
	connectors: Connector[]
	accountData: Readable<AccountDataResponse>
	connect: (connector: Connector) => void
	reconnect: (
		config: Config,
		{ connectors }: { connectors: Connector[] }
	) => void
	disconnect: () => void
}

export type Config = ConfigDisconnected | ConfigConnected
