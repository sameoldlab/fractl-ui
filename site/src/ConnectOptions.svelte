<script lang="ts">
	// import { spring } from 'svelte/motion'
	// import './app.css'
	import Evm from './lib/connect/evm.svelte'
	import Starknet from './lib/connect/starknet.svelte'

	export let ecosystem: string
	// export let theme = ""
</script>

<div
	style="
			display: flex; 
			gap: .25em;
			font-family: Arial, Helvetica, sans-serif;
			font-weight: 500;
			padding-block-start: 1.75em;
			padding-block-end: .25em;
			padding-inline: .25em;
			"
>
	<button
		class="menu-option btn-reset"
		class:selected={ecosystem === 'evm'}
		on:click={() => {
			ecosystem = 'evm'
		}}>EVM</button
	>
	<button
		class="menu-option btn-reset"
		class:selected={ecosystem === 'starknet'}
		on:click={() => {
			ecosystem = 'starknet'
		}}>Starknet</button
	>
</div>
<div class="preview">
	{#if ecosystem === 'evm'}
		<Evm class="connect" />
	{:else if ecosystem === 'starknet'}
		<Starknet class="connect" />
	{/if}
</div>

<style>
	* {
		box-sizing: border-box;
		min-width: 0;
	}
	.preview {
		display: flex;
		align-items: center;
		justify-content: center;
		/* margin: auto; */
		margin-block: 0.25em;
		width: min(1000px, 100%);
		border: 2px solid rgba(76 76 76 / 0.4);
		border-radius: 0.5em;
		background: radial-gradient(
			circle,
			rgba(76 76 76 / 0.4) 12%,
			transparent 14%
		);
		background-size: 1.5em 1.5em;
		/* opacity: 0.2; */
		aspect-ratio: 3 / 1;
	}
	.btn-reset {
		background: none;
		color: inherit;
		font-size: inherit;
		border: none;
		padding: 0;
	}
	.menu-option {
		cursor: pointer;
		font-size: 96%;
		opacity: 0.7;
		padding: 0.5em 1em;
		transition: background 200ms ease;
		position: relative;
		border-radius: 8px;
	}
	.menu-option.selected {
		font-weight: 600;
		opacity: 1;
	}
	.menu-option.selected::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		transform: translateY(0.6em);
		border-bottom: 2px solid white;
	}
	.menu-option:hover {
		background: rgba(76 76 76 / 0.4);
		opacity: 1;
	}
</style>
