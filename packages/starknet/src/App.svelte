<script lang="ts">
	// import '../dist/index'
	import { createStarknetConnection } from './lib/connections.js'
	import ConnectModal from './lib/components/ConnectModal/ConnectModal.svelte'

	const _config = createStarknetConnection()
	const { state, connectors, ...config } = _config
	const { status } = state
</script>

<ConnectModal {state} useConnect={config} {connectors} />
<br />
<button
	on:click={async () => {
		let stark = await config.connect()
		// config = config
		console.log('conn: ', stark)
	}}>Connect wallet</button
>
<button
	on:click={async () => {
		config.disconnect()
	}}>Disconnect</button
>

<hr />
ls
{$status}
<!-- {$config.state.status} -->
<!-- <fractl-modal obj={count} config={config} /> -->

<br />
<hr />
<p>
	<!-- We is {config.state.status} -->
</p>
<button on:click={() => console.log(_config)}>Log config</button>

<style>
	:root {
		background: black;
		color: white;
	}
</style>
