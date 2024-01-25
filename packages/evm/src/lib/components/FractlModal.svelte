<svelte:options
	customElement={{
		tag: 'fractl-modal',
		shadow: 'none',
		props: {
			config: { reflect: false, type: 'Object', attribute: 'config' }
		}
	}}
	accessors={true}
/>

<script lang="ts">
	import { readable } from 'svelte/store'
	import { ConnectModal, AccountModal } from './index.js'
	import type { Config } from '@wagmi/core'

	export let config: Config
	export let btnClass: string
	console.log(btnClass);
	

	const store = readable(config, (set) => {
		// console.log(config)

		config.subscribe(
			(state) => state.status,
			() => set(config)
		)
	})
</script>

{#if $store !== null}
	{#if $store.state.status === 'connected'}
		<AccountModal config={store} {btnClass}/>
	{:else}
		<ConnectModal config={$store} {btnClass}>
			<svelte:fragment slot="footer"></svelte:fragment>
		</ConnectModal>
	{/if}
{/if}
