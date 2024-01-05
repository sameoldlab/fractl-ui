<script lang="ts">
	import { fly } from 'svelte/transition'
	import copyEN from '../lib/copy.EN'
	import Modal from './Common/Modal.svelte'
	import { connect, type Config, type Connector, reconnect } from '@wagmi/core'
	import { quadInOut } from 'svelte/easing'

	export let config: Config
	export let demo = true

	export let triggerLabel = 'Connect Wallet'
	export let enableTrigger = false

	// export let inputWatch = true
	// export let accountStatus: string
	// export let chainStatus
	// export let showBalance: string

	let _state = config.state
	config.subscribe(
		state => state.status,
		status => {
			console.log('status is ', status)
			console.log('config.state: ', config.state)
			_state = config.state
			if (config.state.status === 'connected') showModal = false
			config = config
			_state = _state
		}
	)

	export let showModal: boolean

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
</script>

{#if enableTrigger}
	<button on:click={() => (showModal = true)} class="trigger"
		>{triggerLabel}</button
	>
{/if}

{#if showModal}
	<Modal
		on:close={() => (showModal = false)}
		{title}
		transition={e =>
			fly(e, { duration: 100, y: 40, opacity: 0, easing: quadInOut })}
	>
		<div slot="body" class="main">
			{#if activeRequest}
				<!-- <div class="main"></div> -->
				{#if config.state.status === 'connecting'}
					<div class="activeRequest">
						<img
							class="logo"
							src={activeRequest.icon}
							alt={activeRequest.name}
						/>
					</div>
					<h3 class="heading">Requesting Connection</h3>
					<p class="subhead">
						{copyEN(activeRequest.name).connecting[activeRequest.type]}
					</p>
				{:else}
					<div class="activeRequest">
						<img
							class="logo"
							src={activeRequest.icon}
							alt={activeRequest.name}
						/>
					</div>
					<h3 class="heading">Connection Declined</h3>
					<p class="subhead">
						{copyEN(activeRequest.name).rejected[activeRequest.type]}
					</p>
					<button on:click={() => handleConnect(activeRequest)}>Retry</button>
				{/if}
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

				<slot name="footer">l</slot>
			{/if}
		</div>
	</Modal>
{/if}

<style>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #e9e9e9;

		& .heading {
			font-size: 1.1em;
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
	.activeRequest {
		padding-bottom: 1.5em;

		& .logo {
			height: 5.75rem;
		}
	}
	.trigger {
		box-sizing: border-box;
		border: none;
		padding: 1em 2em;
		font-weight: 600;
		border-radius: 16px;
	}

	.connector {
		box-sizing: border-box;
		cursor: pointer;
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 10px;
		justify-content: space-between;
		align-items: center;

		margin: 10px;
		border: none;
		padding: 20px 16px;
		padding: 1.5em 1em;

		align-self: stretch;
		font-weight: 600;
		border-radius: 16px;

		transition: all 0.125s ease;
		font-size: 1em;

		& .logo {
			width: auto;
			height: 2em;
		}
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

	.logo {
		border-radius: 50%;
	}
</style>
