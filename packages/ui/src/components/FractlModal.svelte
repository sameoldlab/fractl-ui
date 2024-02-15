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
	import { ConnectModal, AccountModal } from './index.js'
	import type { Config } from '@fractl-ui/types'
	import { blur } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'

	export let btnClass: string
	export let config: Config

	const { state, accountData } = config
	$: isConnected = $state.status === 'connected'
</script>

{#key isConnected}
	<div in:blur={{ duration: 128, easing: quintOut }} out:blur={{ duration: 8 }}>
		{#if $state.status !== 'connected'}
			<ConnectModal
				state={$state}
				{config}
				{btnClass}
				triggerText="Connect Wallet"
			>
				<svelte:fragment slot="footer"></svelte:fragment>
			</ConnectModal>
		{:else}
			<AccountModal accountData={$accountData} {config} {btnClass} />
		{/if}
	</div>
{/key}
