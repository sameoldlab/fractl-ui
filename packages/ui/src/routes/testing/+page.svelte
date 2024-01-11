<!-- <svelte:options tag="my-app" /> -->
<script lang="ts">
	import config from '$lib/wagmiConfig'
	import { ConnectModal, AccountModal } from '$lib/components'
	import { onMount } from 'svelte'
	import { reconnect } from '@wagmi/core'

	$: _state = $config.state
	$: connected = $config.state.status === 'connected'

	onMount(async () => {
		reconnect($config, { connectors: $config.connectors })
	})
</script>

<main>
	<div>
		<p>chain: {_state.chainId}</p>
		<p>connections: {JSON.stringify(_state.connections)}</p>
		<p>current: {_state.current}</p>
		<p>status: {_state.status}</p>
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
		/* //var(--text-color); */
	}
	.wagmi {
		background: green;
	}
</style>
