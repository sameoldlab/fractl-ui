<!-- <svelte:options tag="my-app" /> -->
<script lang="ts">
	import config from './lib/wagmiConfig'
	import { ConnectModal, AccountDialog } from './components'
	import { onMount } from 'svelte'
	import { reconnect } from '@wagmi/core'

	$: _state = $config.state
	$: connected = $config.state.status === 'connected'
	$config.subscribe(
		state => state.status,
		() => $config = $config
	)
	
	onMount(async () => {
		reconnect($config, { connectors: $config.connectors })
	})

	let dialogElem: HTMLDialogElement
	let showModal = false
</script>

<div>
	<p>chain: {_state.chainId}</p>
	<p>connections: {JSON.stringify(_state.connections)}</p>
	<p>current: {_state.current}</p>
	<p>status: {_state.status}</p>
</div>

<main>
	<ConnectModal config={$config} bind:showModal>
		<svelte:fragment slot="footer">df</svelte:fragment>
	</ConnectModal>

	<button on:click={() => (showModal = true)} class="trigger button-85"
		>Connect Wallet</button
	>

	{#if connected}
		<AccountDialog config={$config}></AccountDialog>
	{/if}

	<!-- <Subdir/> -->
	<button
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
	</dialog>

	<p>
		Or to read up on Web Components see
		<a
			href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
			target="_blank"
			rel="noreferrer">Mozilla Docs</a
		>
		<a
			href="https://svelte.dev/docs#Custom_element_API"
			target="_blank"
			rel="noreferrer">Svelte Custom Element</a
		>
	</p>
	<!-- Might be better to do this in a library package??? https://kit.svelte.dev/docs/packaging -->
<!-- HTML !-->
	<button class="button-85" >Button 85</button>
	
</main>

<style>
	:root {
		background: #000;
		color: var(--text-color);
	}
	.trigger {
		box-sizing: border-box;
		border: none;
		padding: 1em 2em;
		font-weight: 600;
		border-radius: 16px;
	}

/* CSS */
.button-85 {
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-85:before {
  content: "";
  background: linear-gradient( 45deg,    #ff0000,    #ff7300,    #fffb00,    #48ff00, 
  #00ffd5,    #002bff,    #7a00ff,    #ff00c8,    #ff0000  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {    background-position: 0 0;  }
  50% {    background-position: 400% 0;}
  100% { background-position: 0 0;}
}

.button-85:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}
</style>