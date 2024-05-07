<script lang="ts">
	import { addStarknetConnection } from '@fractl-ui/starknet'
	import 'fractl-ui'
	const config = addStarknetConnection()
	import './connect.css'
</script>

<fractl-modal {config} />
