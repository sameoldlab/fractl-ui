<!-- <svelte:options tag="my-app" /> -->
<script lang="ts">
	import config from '$lib/wagmiConfig'
	import { ConnectModal, AccountModal } from '$lib/components'
	import { onMount } from 'svelte'
	import { reconnect } from '@wagmi/core'
	import FractlSvg from './fractl.svg'

	onMount(async () => {
		reconnect($config, { connectors: $config.connectors })
	})
</script>

<main>
	<div>
		<h1>
			<!-- Fractl-ui -->
			<img src={FractlSvg} alt="Fractl UI" />
		</h1>
		<p>
			dapp UI Library for Svelte... <span class="whisper">
				(and eventually Web Components and Mitosis).
			</span>
		</p>
	</div>

	<button class="button-85">
		{#if $config.state.status === 'connected'}
			<AccountModal {config} />
		{:else}
			<ConnectModal config={$config}>
				<!-- <svelte:fragment slot="footer"></svelte:fragment> -->
			</ConnectModal>
		{/if}

		<!-- 
	{#if connected}
		<AccountDialog config={$config}></AccountDialog>
	{/if} -->
	</button>
</main>
<footer class="links">
	<a href="https://github.com/sameoldlab/fractl-ui">
		<svg
			height="20"
			aria-hidden="true"
			viewBox="0 0 16 16"
			fill="currentcolor"
			version="1.1"
			width="20"
			data-view-component="true"
		>
			<path
				d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
			></path>
		</svg>
	</a>
</footer>

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
		color: var(--text-color);
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
	.links {
		margin: 1rem;
		position: fixed;
		bottom: 0;
		/* right: 0; */
		/* background: red; */
	}
	svg {
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
		opacity: 0.5;
		font-style: italic;
	}
	/* CSS */
	.button-85 {
		/* padding: 0.6em 2em; */
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
		transition: all 200ms ease-in-out;
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
	/* 	.trigger {
		box-sizing: border-box;
		border: none;
		padding: 1em 2em;
		font-weight: 600;
	} */
</style>
