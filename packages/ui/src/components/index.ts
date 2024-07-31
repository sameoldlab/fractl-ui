import ConnectModal from './ConnectModal/ConnectModal.svelte'
import AccountModal from './AccountModal.svelte'
import FractlModal from './FractlModal.svelte'
import type { Config, Connector, StateConnected } from '@fractl-ui/types'

export const create = async <C extends Connector>(config: Promise<Config<C>>) => {
	let _config = await Promise.resolve(config)

	//TODO: return singleton when modal is dismissed without completing connection
	return () => {
		const getTarget = () =>  document.body
		
		return new Promise((resolve, reject) => {
			const modal = new ConnectModal({
				target: getTarget(),
				props: {
					config: _config,
					state: _config.state,
					onConnect: (state: StateConnected<C>) => {
						resolve(state)
						modal.$destroy()
					},
					onConnectFail: (error) => {
						reject(error)
						modal.$destroy()
					}
				}
			})
		})
	}
}
export { ConnectModal, AccountModal, FractlModal }
