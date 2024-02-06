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
	import type { Config } from '../types.js'

	export let btnClass: string
	export let config: Config

	const { state, accountData } = config
</script>

{#if $state.status === 'connected'}
	<AccountModal accountData={$accountData} {config} {btnClass} />
{:else}
	<ConnectModal state={$state} {config} {btnClass} triggerText="Connect Wallet">
		<svelte:fragment slot="footer"></svelte:fragment>
	</ConnectModal>
{/if}
