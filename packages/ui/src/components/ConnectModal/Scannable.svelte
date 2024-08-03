<script lang="ts">
	import QRCode from '@castlenine/svelte-qrcode'
	import type { Connector } from '@wagmi/core'
	import skeleton from './skeletonQr.svg'
	export let connector: Connector
	let data: string = ''

	console.log('getting uri from wallet connect')
	const getQr = async () => {
		try {
			const data = await connector.getQr()
		} catch (err) {
			console.error(err)
			throw Error(err)
		}
	}

	connector.getProvider().then((provider) => {
		if (provider) {
			provider.on('display_uri', (uri) => (data = uri))
			provider.connect()
		}
	})
</script>

<div id="fractl-scan" class="fcl__layout-1col fcl__el">
	<div class="main">
		{#if data}
			<a href={data}>
				<QRCode
					{data}
					anchorsOuterColor="black"
					modulesColor="black"
					shape="circle"
					haveBackgroundRoundedEdges
					haveGappedModules
					padding={4}
					isResponsive
					logoInBase64={connector.icon}
					logoPadding={4}
				/>
			</a>
		{:else}
			<img width="100%" src={skeleton} alt="loading QRCode" />
		{/if}
	</div>
	<button on:click={()=>navigator.clipboard.writeText(data)} class="justify-center fcl__btn-primary">Copy to clipboard</button>
</div>

<style>
	div.main {
		width: 100%;
		justify-content: center;
		/* background: #333; */
		box-sizing: border-box;
		/* padding: 0.5em; */
		border-radius: 1em;

		justify-content: center;
		align-items: center;
		padding-block-end: 1rem;
	}
</style>
