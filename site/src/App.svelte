<script lang="ts">
	// import { spring } from 'svelte/motion'
	// import './app.css'
	import FractlSvg from './assets/fractl.svg'
	import Code from './lib/code.svelte'
	import Select from './lib/select.svelte'
	import Evm from './lib/connect/evm.svelte'
	import Starknet from './lib/connect/starknet.svelte'

	const opts = {
		theme: ['dark'],
		ecosystem: ['evm', 'starknet']
	}

	let theme = opts.theme[0],
		ecosystem = opts.ecosystem[0],
		h1Height: number

	function handleBinds(event: KeyboardEvent) {
		console.log(event.key)
		if (event.key === 't') {
			theme = theme === 'dark' ? 'kandinsky' : 'dark'
		} else if (event.key === 'e') {
			ecosystem = ecosystem === 'evm' ? 'starknet' : 'evm'
		}
	}
</script>

<svelte:window on:keypress={handleBinds} />
<div class="grid">
	<header>
		<div>
			<!-- Fractl -->
		</div>
		<div class="desktop">
			<span><span class="bind">T</span>heme:{theme}</span>
			<span><span class="bind">E</span>cosystem:{ecosystem}</span>
			<Select label="theme" options={['dark', 'kandinsky', 'vesper']} />
			<span><span class="bind">C</span>omponent: connect</span>
		</div>
	</header>
	<main>
		<h1
			class:header={!top}
			bind:clientHeight={h1Height}
			style="--height: {h1Height}px;"
		>
			<img src={FractlSvg} alt="Fractl" />
		</h1>
		<p>
			Finally, a "dapp" UI library for the sharding roadmap. Use anywhere. With
			anything.
		</p>
		<div class="hero"></div>
		<!-- prettier-ignore-->
		<Code clipboard="pnpm add fractl-ui @fractl-ui/evm @fractl-ui/fuel @fractl-ui/starkware"
			>pnpm add fractl-ui @fractl-ui/evm \
@fractl-ui/fuel @fractl-ui/starknet
		</Code>
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
	</main>
	<!-- 	<footer class="links">
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
	</footer> -->
</div>

<style>
	* {
		box-sizing: border-box;
		min-width: 0;
	}
	:root {
		--text: #bbb;
		--bg: hsl(0, 0%, 15%);
		background: var(--bg);
		background: oklch(20%, 0.004, 144);
		color: var(--text);
	}
	:global(body) {
		margin: 0;
	}
	.grid {
		display: grid;
		padding-inline: 1rem;
	}
	header {
		font-family: 'Courier New', Courier, monospace;
		font-size: 85%;
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		background: hsl(0, 0%, 15%);
		background: oklch(20%, 0.004, 144);
		flex-direction: row;
		justify-content: space-between;
		container-type: inline-size;
		container-name: header;
		padding-block: 1em;

		& div {
			display: none;
			opacity: 0;
			transition: opacity 1600ms allow-discrete ease-in-out;
		}
	}
	.bind {
		/* padding-inline: .25em; */
		font-weight: 600;
		background-color: var(--text);
		color: var(--bg);
		opacity: 0.8;
	}
	@container header (min-width: 620px) {
		header > div {
			display: flex;
			gap: 0.5rem;
			flex-direction: row;
			flex-wrap: wrap;
			opacity: 1;
		}
	}

	h1 {
		box-sizing: border-box;
		margin: 0;
		transform-origin: top left;
	}
	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
			h1 {
				animation: to-header linear forwards;
				animation-timeline: view();
				animation-range-start: 93vh;
				animation-range-end: calc(93vh + var(--height));
				position: sticky;
				top: 1em;
				opacity: 1;
				scale: 1;
				z-index: 11;
			}
		}
	}
	@keyframes to-header {
		to {
			scale: 0.1;
			opacity: 0;
		}
	}

	main {
		padding-block-start: 3em;
		/* margin-block-end: 300em; */
	}
	.hero {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		/* width: 100%; */
		margin-inline: auto;
		& p {
			margin: 0;
			opacity: 0.8;
			font-size: 1em;
			font-weight: 500;
		}
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
