import type { MapStore } from 'nanostores'

type Store<T extends object> = {
	subscribe: MapStore<T>['subscribe']
}

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
		address: string
		addresses: string[]
	}
	balance: {
		value: string
		symbol: string
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

/* export type Connector<C> = {
	name: string
	type: string 
	icon?: string
	// Some other things Config.connect() uses to connect 
} & ({[Key in keyof C]: C[Key]}) */
export type StateConnected<Connector> = {
	activeRequest?: undefined
	current: Connector
	status: 'connected'
}

export type StateDisconnected<Connector> = {
	activeRequest?: Connector | undefined
	current: undefined
	status: 'connecting' | 'disconnected' | 'reconnecting'
}
export type State<C> = StateConnected<C> | StateDisconnected<C>
export type ConfigDisconnected<Connector> = {
	state: Store<StateDisconnected<Connector>>
	accountData: Store<AccountDataError>
}

export type ConfigConnected<Connector> = {
	state: Store<StateConnected<Connector>>
	accountData: Store<AccountDataResponse>
}

export type Config<Connector> = {
	connectors: readonly Connector[]
	connect: (connector: Connector) => Promise<object> /* fix later */
	/**
	 * Checks if a connector in the list is already connected
	 * then sets the first one found as the current Connector
	 * @param {Connector[]} connectors list of Connectors for the given library
	 * @returns
	 */
	reconnect: (connectors: Connector[]) => Promise<void>
	disconnect: (connector?: Connector, opts?: object) => Promise<void>
} & (ConfigDisconnected<Connector> | ConfigConnected<Connector>)
