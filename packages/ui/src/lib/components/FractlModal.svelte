<svelte:options customElement="fractl-modal" accessors={true} />

<script lang="ts">
	import { ConnectModal, AccountModal } from './index.js'
	import type { Config } from '@wagmi/core'

	export let config: Config
</script>

<AccountModal {config} />
<ConnectModal {config} />
