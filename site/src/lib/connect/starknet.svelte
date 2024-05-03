<script lang="ts">
	import { addStarknetConnection } from '@fractl-ui/starknet'
	import 'fractl-ui'
	const config = addStarknetConnection()
</script>

<fractl-modal {config} btnClass="button-85" />
