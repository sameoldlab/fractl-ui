<script lang="ts">
	import '../../styles/index.css'
	import copyEN from '../../copy/copy.EN.js'
	import type { Config, Connector, State } from '@fractl-ui/types'
	import { getPage } from './context.js'
	import type { Writable } from 'svelte/store'

	export let config: Config<Connector<unknown>>
	export let state: State<unknown>

	const page = getPage() as Writable<{ connecting: Connector }>
	const connector = $page.connecting
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
</script>

<div class="fcl__graphic-primary">
	<!-- prettier-ignore -->
	<svg class:hide={state.status !== 'connecting' && state.status !== 'reconnecting'} class="spin" width="108" height="108" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" >
		<path d="M98 50C98 23.4903 76.5097 2 50 2" stroke="url(#a)" stroke-width="4" stroke-linecap="round" />
			<defs>
				<radialGradient id="radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 50) rotate(-90) scale(47 47)" > <stop stop-color="currentColor" /> <stop offset="1" stop-color="currentColor" stop-opacity="0" /> </radialGradient>
				<linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a" > <stop stop-color="currentColor" stop-opacity="0" offset="0%" /> <stop stop-color="currentColor" stop-opacity=".631" offset="63.146%" /> <stop stop-color="currentColor" offset="100%" /> </linearGradient>
			</defs>
	</svg>
	<ig
		class="fcl_graphic-icon rounded"
		src={connector.icon}
		alt={connector.name}
	/>
</div>
{#if state.status === 'connecting' || state.status === 'reconnecting'}
	<h3 class="fcl__text-primary">Requesting Connection</h3>
	<p class="fcl__subhead">
		{copyEN(connector.name).connecting[connector.type]}
	</p>
{:else}
	<h3 class="fcl__text-primary error">Connection Declined</h3>
	<p class="fcl__subhead">
		{copyEN(connector.name).rejected[connector.type]}
	</p>
	<button
		on:click={() => handleConnect(connector)}
		class="fcl__btn-primary justify-center mt-1">Retry</button
	>
{/if}

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
</style>
