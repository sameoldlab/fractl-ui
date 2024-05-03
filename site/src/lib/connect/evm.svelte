<script lang="ts">
	import 'fractl-ui'
	import { addEvmConnection } from '@fractl-ui/evm'
	import wagmiConfig from './wagmiConfig'
	import { reconnect } from '@wagmi/core'
	import { onMount } from 'svelte'

	onMount(async () => {
		reconnect($wagmiConfig, { connectors: $wagmiConfig.connectors })
	})
	// const config = addStarknetConnection()
	const config = addEvmConnection($wagmiConfig)
	// const { status } = config.state
</script>

<fractl-modal {config} />
