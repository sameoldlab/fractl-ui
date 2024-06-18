<script lang="ts">
	import QRCode from '@castlenine/svelte-qrcode'
	import type { Connector } from '@wagmi/core'
	import skeleton from './skeletonQr.svg'
	export let connector: Connector
	let data: string = ''

	console.log('getting uri from wallet connect')
	connector.getProvider().then((provider) => {
		if (provider) {
			provider.on('display_uri', (uri) => data = uri)
			provider.connect()
		}
	})
</script>

<div>
	{#if data}
	  <QRCode {data} anchorsOuterColor="black" modulesColor="black" shape="circle" haveBackgroundRoundedEdges haveGappedModules padding={8} isResponsive logoInBase64={connector.icon} logoPadding={5}/>
	{:else}
	<img src={skeleton} alt="loading QRCode">
	{/if}
</div>

<style>
	div {
		width: 100%;
		aspect-ratio: 1;
		/* background: #333; */
		display: flex;
		box-sizing: border-box;
		/* padding: 0.5em; */
		border-radius: 1em;
		overflow: hidden;
		border: 1px solid #666;

		justify-content: stretch;
		align-items: stretch;
	}
</style>
