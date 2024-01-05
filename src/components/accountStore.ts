import type { Account, Address, Client, GetBalanceReturnType } from 'viem'
import config from '../lib/wagmiConfig'
import { derived, get } from 'svelte/store'
import { getEnsName, getEnsAvatar, getBalance } from '@wagmi/core'
import { getAccount, type Config } from '@wagmi/core'
import type { Readable } from 'svelte/motion'
import type { GetBalanceData, GetEnsNameData } from '@wagmi/core/query'

export const createAccountStore = (config: Readable<Config>) =>
	derived(config, async v => {

		if (v.state.status !== 'connected') {
			console.error('not connected')
			return {
				address: undefined as undefined | Address,
				ensName: undefined as undefined | GetEnsNameData,
				ensAvatar: undefined as undefined | string,
				balance: undefined as undefined | GetBalanceData,
			}
		}
		
		const {address} = getAccount(v)
		if (!address) throw Error('no address found')

		const balance = await getBalance(v, {
			address
		})

		const name = await getEnsName(v, {
			blockTag: 'finalized',
			address
		})
		
		const avatar = name && await getEnsAvatar(v, {
			 name,
			 blockTag: 'finalized' 
			})

		return  {
			address, 
			ensName: name, 
			ensAvatar: avatar, 
			balance, 
		}
	})

export default createAccountStore(config)
