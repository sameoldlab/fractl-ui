<script lang="ts">
	import copyEN from '$lib/copy/copy.EN'
	import { connect, type Config, type Connector, reconnect } from '@wagmi/core'

	import Modal from './Common/Modal.svelte'
	import { fly } from 'svelte/transition'
	import { quadInOut } from 'svelte/easing'
	import { createEventDispatcher } from 'svelte'
	import { writable } from 'svelte/store'

	export let config: Config
	export let demo = true
	export const triggerText = 'Connect Wallet'
	// export let showModal: boolean

	// export let inputWatch = true
	// export let accountStatus: string
	// export let chainStatus
	// export let showBalance: string
	$: if (config.state.status === 'connected') $open = false

	export let customTrigger = false
	export let open = writable(false)

	let activeRequest: null | Connector = null //config.connectors[0]
	$: title = !activeRequest ? 'Connect Wallet' : `${activeRequest.name}`

	const handleConnect = async (connector: Connector) => {
		try {
			await reconnect(config, { connectors: [connector] })
			connect(config, { connector })
			activeRequest = connector
		} catch (error) {
			console.info('caught: ', error)
		}
		config = config
		console.log('config.state: ', config.state)
	}

	let triggerEl: HTMLButtonElement
	const handleTrigger = (e: Event) => {
		open.set(true)
	}
	const clearRequest = () => (activeRequest = null)
</script>

<button
	aria-haspopup="dialog"
	data-melt-dialog-trigger=""
	aria-expanded={$open ? 'true' : 'false'}
	on:click={handleTrigger}
	bind:this={triggerEl}
>
	{triggerText}
</button>

<Modal
	titleText={title}
	role="alertdialog"
	focusTarget={triggerEl}
	bind:open
	on:close={clearRequest}
	transition={(e) =>
		fly(e, { duration: 100, y: 40, opacity: 0, easing: quadInOut })}
>
	<button slot="icon-left" class:hide={!activeRequest} on:click={clearRequest}>
		@
	</button>

	<div class="main">
		{#if activeRequest}
			<div class="active-request">
				<svg
					class:hide={config.state.status !== 'connecting'}
					class="spin"
					width="108"
					height="108"
					viewBox="0 0 100 100"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M98 50C98 23.4903 76.5097 2 50 2"
						stroke="url(#a)"
						stroke-width="4"
						stroke-linecap="round"
					/>
					<defs>
						<radialGradient
							id="radial"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(100 50) rotate(-90) scale(47 47)"
						>
							<stop stop-color="currentColor" />
							<stop offset="1" stop-color="currentColor" stop-opacity="0" />
						</radialGradient>
						<linearGradient
							x1="8.042%"
							y1="0%"
							x2="65.682%"
							y2="23.865%"
							id="a"
						>
							<stop stop-color="currentColor" stop-opacity="0" offset="0%" />
							<stop
								stop-color="currentColor"
								stop-opacity=".631"
								offset="63.146%"
							/>
							<stop stop-color="currentColor" offset="100%" />
						</linearGradient>
					</defs>
				</svg>

				<img class="logo" src={activeRequest.icon} alt={activeRequest.name} />
			</div>

			{#if config.state.status === 'connecting'}
				<h3 class="heading">Requesting Connection</h3>
				<p class="subhead">
					{copyEN(activeRequest.name).connecting[activeRequest.type]}
				</p>
			{:else}
				<h3 class="heading error">Connection Declined</h3>
				<p class="subhead">
					{copyEN(activeRequest.name).rejected[activeRequest.type]}
				</p>
				<button on:click={() => handleConnect(activeRequest)}>Retry</button>
			{/if}
			<button on:click={clearRequest}>Back</button>
		{:else}
			{#each config.connectors as connector}
				<button
					on:click={() => handleConnect(connector)}
					data-uid={connector.uid}
					class="connector connector-dark"
				>
					{connector.name}
					<img class="logo" src={connector.icon} alt={connector.name} />
				</button>
			{/each}
			{#if demo}
				<button class="connector connector-mock"> Demo Mode </button>
			{/if}

			<slot name="footer" />
		{/if}
	</div>
</Modal>

<style>
	.main:has(.active-request) {
		display: grid;
		justify-items: center;
	}

	.main {
		color: var(--text-color, #e9e9e9);

		& .heading {
			font-size: 1em;
			font-weight: 700;
			margin-block: 0.5em;
			/* margin: 0; */
		}
		& .subhead {
			opacity: 0.7;
			font-size: 0.9em;
			font-weight: 500;
			text-align: center;
			margin: 0;
			margin-bottom: 1.75em;
		}
	}
	.active-request {
		display: grid;
		height: 5.75em;
		width: 100%;
		grid-area: 1 / 1;
		margin-bottom: 1.5em;
		align-items: center;
		justify-content: center;

		& * {
			grid-area: 1 / 1;
		}

		& .logo {
			margin: auto;
			border-radius: 50%;
			transform: scale(0.95);
		}
	}
	.logo {
		border-radius: 50%;
	}

	.hide {
		display: none;
		opacity: 0;
	}

	.error {
		color: oklch(80% 0.16 8);
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

	.connector {
		box-sizing: border-box;
		cursor: pointer;
		width: 100%;
		display: flex;
		/* flex-direction: row; */
		gap: 10px;
		justify-content: space-between;
		align-items: center;

		margin-block: 0.5em;
		border: none;
		padding: 1.125em 1em;

		align-self: stretch;
		font-weight: 600;
		border-radius: 16px;

		transition: all 0.125s ease;
		font-size: 1em;

		& .logo {
			width: auto;
			height: 2.5em;
			/* height: 2em; */
		}
		/* padding: 1.5em 1em; */
	}

	.connector-dark {
		background-color: #222429;
		color: #f1f1f1;
	}
	.connector-dark:hover {
		background-color: #2f3139;
	}
	.connector:active {
		scale: 99%;
	}
	.connector-dark:active {
		background-color: #2f3139;
	}

	.connector-mock {
		background: hsla(76, 20%, 15%, 1);
		color: hsla(73, 86%, 68%, 1);
	}
</style>
