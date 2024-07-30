<script lang="ts">
	import Checkbox from './lib/Checkbox.svelte'
	export const options = [
		{ tag: 'Detected Wallets', enabled: true },
		{ tag: 'WalletConnect', enabled: true },
		{ tag: 'Capsule', enabled: true }
	]
</script>

<div class="panel">
	<h3>Connectors</h3>
	<div class="connectors">
		{#each options as {tag: label, enabled}}
			<Checkbox {label} bind:enabled/>
		{/each}
		<!-- <li>Selected Wallets -->
		<!-- <li>Coinbase Wallet-->
	</div>
</div>

<style>
	h3 {
		font-size: inherit;
		padding: inherit;
		margin: inherit;
	}
	.panel {
		margin: 0.5em;
		padding: 0.5em;
		border-radius: 0.5em;
		flex-grow: 1;
		background: hsl(0, 0%, 16%);
	}

	.connectors {
		display: flex;
		flex-wrap: wrap;
		/* Make buttons wrap in a line */
		gap: 0.5em;
	}
</style>
