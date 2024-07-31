import ConnectModal from './ConnectModal/ConnectModal.svelte'
import AccountModal from './AccountModal.svelte'
import FractlModal from './FractlModal.svelte'
import type { Config } from '@fractl-ui/types'

export const create = async <C extends object>(config: Promise<Config<C>>) => {
	let _config = await Promise.resolve(config)

	return () => {
		const getTarget = () =>  document.body
		
		return new Promise((resolve, reject) => {
			new ConnectModal({
				target: getTarget(),
				props: {
					config: _config,
					state: _config.state
				}
			})
		})
	}
}
export { ConnectModal, AccountModal, FractlModal }
