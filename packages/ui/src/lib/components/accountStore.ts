import type { Account, Address, Client, GetBalanceReturnType } from 'viem'
import config from '$lib/wagmiConfig'
import { derived, get } from 'svelte/store'
import {
	getEnsName,
	getEnsAvatar,
	getBalance,
	type GetAccountReturnType
} from '@wagmi/core'
import { getAccount, type Config } from '@wagmi/core'
import type { Readable } from 'svelte/motion'
import type { GetBalanceData, GetEnsNameData } from '@wagmi/core/query'

export const createAccountStore = (config: Readable<Config>) =>
	derived(config, async (v) => {
		if (v.state.status !== 'connected') {
			console.error('not connected')
			return {
				account: undefined as undefined | GetAccountReturnType,
				ensName: undefined as undefined | GetEnsNameData,
				ensAvatar: undefined as undefined | string,
				balance: undefined as undefined | GetBalanceData
			}
		}
		const account = getAccount(v)
		if (!account.isConnected) throw Error('account is not connected')

		const balance = await getBalance(v, {
			address: account.address
		})

		const name = await getEnsName(v, {
			blockTag: 'finalized',
			address: account.address
		})

		const avatar =
			name &&
			(await getEnsAvatar(v, {
				name,
				blockTag: 'finalized'
			}))

		return {
			account,
			ensName: name,
			ensAvatar: avatar,
			balance
		}
	})

export default createAccountStore(config)
