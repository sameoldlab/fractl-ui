import config from '$lib/wagmiConfig'
import { derived } from 'svelte/store'
import { getEnsName, getEnsAvatar, getBalance } from '@wagmi/core'
import { getAccount, type Config } from '@wagmi/core'
import type { Readable } from 'svelte/motion'

export const createAccountStore = (
	config: Readable<Config>,
	resolver = 'ENS'
) => {
	config.subscribe(($conf) => {
		if ($conf.state.status !== 'connected') {
			console.error('not connected')
			return {
				account: undefined,
				ensName: undefined,
				ensAvatar: undefined,
				balance: undefined
			}
		}
	})
	const account = derived(config, ($conf) => {
		const account = getAccount($conf)
		if (!account.isConnected) throw Error('account is not connected')
		return account
	})

	const balance = derived(
		[config, account],
		async ([$conf, $acc]) =>
			await getBalance($conf, {
				address: $acc.address
			})
	)

	const nameService = derived([config, account], async ([$conf, $acc]) => {
		let name: string | undefined, avatar: string | undefined

		if (resolver === 'ENS') {
			name = await getEnsName($conf, {
				blockTag: 'finalized',
				address: $acc.address
			})

			avatar =
				name &&
				(await getEnsAvatar($conf, {
					name,
					blockTag: 'finalized'
				}))
		}
		return {
			name,
			avatar
		}
	})

	return {
		account,
		balance,
		nameService
	}
}
export default createAccountStore(config)
