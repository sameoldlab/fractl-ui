<script lang="ts">
	import '../../styles/index.css'
	import Modal from '../Common/Modal.svelte'
	import Scannable from './Scannable.svelte'
	import Injected from './Injected.svelte'
	import type { Config, Connector, State } from '@fractl-ui/types'
	import { setPage, getPage } from './context.js'
	import { derived } from 'svelte/store'

	export let config: Config<Connector<unknown>>
	export let state: State<unknown>
	export let btnClass = ''
	export let triggerText = 'Connect Wallet'

	let open: () => void
	let close: () => void

	setPage()
	const page = getPage()

	$: if (state.status === 'connected') close()

	const activeRequest = derived(page, ($page) => {
		if (typeof $page === 'object' && $page.connecting) return $page.connecting
		return null
	})

	const title = derived(page, ($page) => {
		if ($page === 'main') return 'Connect Wallet'
		if ($page === 'explainer') return 'Connect Wallet'

		return $page.connecting.name || 'Connect Wallet'
	})

	const handleConnect = async (connector: Connector) => {
		await config.reconnect([connector])

		try {
			console.log('config.state: ', state.status)
			$page = { connecting: connector }
			await config.connect(connector)
		} catch (error) {
			console.error('caught: ', error)
		}

		console.log('config.state: ', state.status)
	}
	const returnHome = () => ($page = 'main')
</script>

<!-- aria-expanded={open ? 'true' : 'false'} -->
<button
	aria-haspopup="dialog"
	data-fractl-trigger
	on:click={open}
	class={btnClass}
>
	{triggerText}
</button>

<Modal
	titleText={$title}
	bind:open
	bind:close
	inlineSize={$activeRequest ? 260 : 240}
	customTrigger
>
	<svelte:fragment slot="icon-left">
		<button
			class:hide={$page === 'main'}
			on:click={returnHome}
			class="fcl__header-btn"
		>
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
	</svelte:fragment>

	<div class="fcl__layout-1col scrollable">
		{#if $page === 'main'}
			<div class="connectors">
				{#each config.connectors as connector}
					<button
						on:click={() => handleConnect(connector)}
						data-uid={connector.name}
						class="fcl__btn-primary connector justify-between {connector.type}"
					>
						{connector.name}
						<!-- {connector.type} -->
						{#if connector.icon}
							<!-- Button is already labbeled by it's inner text making the image alt text repetitive -->
							<!-- svelte-ignore a11y-missing-attribute -->
							<img aria-hidden class="logo rounded" src={connector.icon} />
						{/if}
					</button>
				{/each}
			</div>
		{:else if $page === 'explainer'}
			<plc />
		{:else if $page.connecting.type === 'injected'}
			<Injected {state} {config} />
		{:else if $page.connecting.type === 'walletConnect'}
			<Scannable />
		{/if}
	</div>
	<footer>
		<button class="fcl__btn-text fcl__text-tertiary" on:click={() => {}}
			>What is a wallet?
		</button>
		<slot name="footer" />
	</footer>
</Modal>

<!-- </Modal> -->

<style>
	@import url('../../styles/index.css');
	.scrollable {
		overflow-y: auto;
		max-height: calc(60px * 4);
		min-height: 0;
		scrollbar-gutter: stable both-edges;
	}
	footer {
		display: grid;
		align-items: center;
		justify-content: center;
		padding: 0.725em 0 0.5em;
	}
	.fcl__text-tertiary {
		font-size: 0.9em;
		color: var(--fcl-text-tertiatry-color, oklch(61.42% 0.18 264.03));
		font-weight: 600;
	}
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
		box-sizing: border-box;
		display: grid;
		width: 100%;
		gap: 0.5em;
		padding: 0 var(--inner-padding);
	}
	.connector.mock {
		background: hsla(76, 20%, 15%, 1);
		color: hsla(73, 86%, 68%, 1);
	}
</style>
