<!-- <svelte:options tag="my-app" /> -->
<script lang="ts">
	import config from './lib/wagmiConfig'
	import { ConnectModal, AccountDialog } from './components'
	import { onMount } from 'svelte'
	import { reconnect } from '@wagmi/core'

	$config.subscribe(
		state => state.status,
		() => ($config = $config)
	)

	onMount(async () => {
		reconnect($config, { connectors: $config.connectors })
	})

	let dialogElem: HTMLDialogElement
	let showModal = false
</script>

<main>
	<div>
		<h1>smooth__Fractl</h1>
		<p>
			dapp UI Library for Svelte... <span class="whisper">
				(and eventually Web Components and Mitosis). Smooth what? fractal. Smooth fractal... it's a math thing apparently. Yes, I'm still working on the name.  
			</span>
		</p>
	</div>
	<ConnectModal config={$config} bind:showModal>
		<svelte:fragment slot="footer">df</svelte:fragment>
	</ConnectModal>

	<button on:click={() => (showModal = true)} class="trigger button-85"
		>Connect Wallet</button
	>
	<!-- 
	{#if connected}
		<AccountDialog config={$config}></AccountDialog>
	{/if} -->
</main>

<style>
	div {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		max-width: 40ch;
		margin: 0 auto;
		text-align: center;
	}
	h1 {
		font-weight: 300;
		font-family: system-serif, cursive, 'Times New Roman', Times, serif;
		margin: 0;
	}
	p {
		opacity: 0.7;
		font-size: 0.9em;
		font-weight: 500;
	}
	:root {
		background: hsl(252, 80%, 2%);
		color: var(--text-color);
	}
	main {
		display: flex;
		padding: 10vh 10vw;
		flex-direction: column;
		gap: 3em;
		align-items: center;
	}
	.whisper {
		opacity: .5;
		font-style: italic;
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
		content: '';
		background: linear-gradient(
			45deg,
			#eb5d48,
			#e38843,
			#f1ef67,
			#00ffd5,
			#79b1e9,
			#e02e96,
			#eb5d48
		);
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
		border-radius: 100px;
	}

	@keyframes glowing-button-85 {
		0% {
			background-position: 0 0;
		}
		50% {
			background-position: 400% 0;
		}
		100% {
			background-position: 0 0;
		}
	}

	.button-85:after {
		z-index: -1;
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: #222429;
		left: 0;
		top: 0;
		border-radius: 100px;
	}
	.trigger {
		box-sizing: border-box;
		border: none;
		padding: 1em 2em;
		font-weight: 600;
	}
</style>
