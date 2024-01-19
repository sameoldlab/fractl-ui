<!-- <svelte:options tag="my-app" /> -->
<script lang="ts">
	import config from '../../wagmiConfig'
	import { ConnectModal, AccountModal } from '$lib/components'
	import { onMount } from 'svelte'
	import { reconnect } from '@wagmi/core'
	import { isMobile } from '$lib/utils'

	$: connected = $config.state.status === 'connected'

	onMount(async () => {
		reconnect($config, { connectors: $config.connectors })
	})
</script>

<main>
	<div>
		<p>is mobprocessile: {isMobile()}</p>
		<p>chain: {$config.state.chainId}</p>
		<p>connections: {JSON.stringify($config.state.connections)}</p>
		<p>current: {$config.state.current}</p>
		<p>status: {$config.state.status}</p>
	</div>

	<div class="wagmi">
		{#if connected}
			<AccountModal {config} />
		{:else}
			<ConnectModal config={$config}>
				<svelte:fragment slot="footer"></svelte:fragment>
			</ConnectModal>
		{/if}
	</div>
	<ConnectModal config={$config} />

	<!-- 	<button
		on:click={() => {
			dialogElem.showModal()
		}}>Show Modal</button
	>
	<dialog id="dialog" bind:this={dialogElem}>
		here goes some bontent
		<button
			on:click={() => {
				dialogElem.close()
			}}>close</button
		>
	</dialog> -->
</main>

<style>
	:root {
		background: #000;
	}

	main {
		width: 100%;
		height: 100%;
		color: red;
		/* //var(--fcl-text-color); */
	}
	.wagmi {
		background: green;
	}
</style>
