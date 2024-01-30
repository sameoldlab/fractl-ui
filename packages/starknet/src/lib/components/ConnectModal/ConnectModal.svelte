<script lang="ts">
	import copyEN from '../../copy/copy.EN.js'
	import Modal from '../Common/Modal.svelte'
	import Scannable from './Scannable.svelte'

	import { fly } from 'svelte/transition'
	import { writable } from 'svelte/store'
	import { quadInOut } from 'svelte/easing'

	type Connector = {
		name: string
		id: string
		icon?: string
		/* Some other things useConnect uses to to connect */
	}

	export let state
	export let useConnect: {
		connect: (connector: Connector) => Connector
		disconnect: () => void
	}
	export let connectors: Connector[]

	const { status } = state
	// export let demo = true
	export const triggerText = 'Connect Wallet'
	// export let showModal: boolean
	const open = writable(false)

	$: console.log($status)
	$: if ($status === 'connected') $open = false
	// export let customTrigger = false

	let activeRequest: null | Connector = null //config.connectors[0]
	$: title = !activeRequest ? 'Connect Wallet' : `${activeRequest.name}`

	const handleConnect = async (connector: Connector) => {
		// await reconnect(config, { connectors: [connector] })

		try {
			useConnect.connect(connector)
			activeRequest = connector
		} catch (error) {
			console.info('caught: ', error)
		}

		console.log('config.state: ', state)
	}

	let triggerEl: HTMLButtonElement
	export const handleTrigger = () => {
		$open = true
	}
	const clearRequest = () => (activeRequest = null)
	export let btnClass = ''
</script>

<button
	aria-haspopup="dialog"
	data-fractl-button
	aria-expanded={$open ? 'true' : 'false'}
	on:click={handleTrigger}
	bind:this={triggerEl}
	class={btnClass}
>
	{triggerText}
</button>

<Modal
	titleText={title}
	role="alertdialog"
	focusTarget={triggerEl}
	{open}
	on:close={clearRequest}
	transition={(e) =>
		fly(e, { duration: 100, y: 40, opacity: 0, easing: quadInOut })}
>
	<button slot="icon-left" class:hide={!activeRequest} on:click={clearRequest}>
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			focusable="false"
		>
			<path
				d="M12 3L5.5 9.5L12 16"
				stroke="currentcolor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>

	<div class="fcl__layout-1col">
		{#if activeRequest}
			{#if activeRequest.type === 'walletConnect'}
				<Scannable connector={activeRequest} />
				<!-- Default to injected for libraries that may not have a type -->
			{:else}
				<!-- <Injected connector={activeRequest}></Injected> -->
				<div class="fcl__graphic-primary">
					<!-- prettier-ignore -->
					<svg class:hide={$status !== 'connecting'} class="spin" width="108" height="108" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" > 
						<path d="M98 50C98 23.4903 76.5097 2 50 2" stroke="url(#a)" stroke-width="4" stroke-linecap="round" /> 
						<defs> 
							<radialGradient id="radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 50) rotate(-90) scale(47 47)" > <stop stop-color="currentColor" /> <stop offset="1" stop-color="currentColor" stop-opacity="0" /> </radialGradient> 
							<linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a" > <stop stop-color="currentColor" stop-opacity="0" offset="0%" /> <stop stop-color="currentColor" stop-opacity=".631" offset="63.146%" /> <stop stop-color="currentColor" offset="100%" /> </linearGradient>
						 </defs> 
					</svg>
					<img
						class="fcl_graphic-icon rounded"
						src={activeRequest.icon}
						alt={activeRequest.name}
					/>
				</div>

				{#if $status === 'connecting'}
					<h3 class="fcl__text-primary">Requesting Connection</h3>
					<p class="fcl__subhead">
						{copyEN(activeRequest.name).connecting.injected}
					</p>
				{:else}
					<h3 class="fcl__text-primary error">Connection Declined</h3>
					<p class="fcl__subhead">
						{copyEN(activeRequest.name).rejected.injected}
					</p>
					<button
						on:click={() => handleConnect(activeRequest)}
						class="fcl__btn-primary justify-center">Retry</button
					>
				{/if}
			{/if}
		{:else}
			<div class="connectors">
				{#each connectors as connector}
					<button
						on:click={() => handleConnect(connector)}
						data-uid={connector.uid}
						class="fcl__btn-primary connector justify-between {connector.type}"
					>
						{connector.name}
						<!-- {connector.type} -->
						{#if connector.icon}
							<img
								class="logo rounded"
								src={connector.icon}
								alt={connector.name}
							/>
						{/if}
					</button>
				{/each}
			</div>

			<slot name="footer" />
		{/if}
	</div>
</Modal>

<style>
	@import url('../../styles/index.css');

	.hide {
		display: none;
		opacity: 0;
		/* transition: opacity 150ms 1s ease-in; */
	}

	.spin {
		animation: 1500ms linear infinite spin;
		color: oklch(70% 0.52 230);
		/* height: 7em; */
	}

	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}

	.connectors {
		display: grid;
		width: 100%;
		gap: 0.5em;
	}
	.connector.mock {
		background: hsla(76, 20%, 15%, 1);
		color: hsla(73, 86%, 68%, 1);
	}
</style>
