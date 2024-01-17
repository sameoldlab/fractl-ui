<script lang="ts">
	import type { Connector } from '@wagmi/core'
	import type Provider from '@walletconnect/ethereum-provider'
	import { toString } from 'qrcode'

	export let connector: Connector
	let uri: string = ''
	let QR

	console.log('getting uri from wallet connect')
	connector.getProvider().then((provider: Provider) => {
		if (provider) {
			provider.on('display_uri', (_uri) => {
				uri = _uri
				console.log(uri)
				toString(
					uri,
					{
						type: 'svg',
						color: {
							light: '#00000000',
							dark: '#f7f7f7'
						}
						// zscale: 1
					},
					(err, string) => {
						if (err) return console.error(err)
						QR = string
					}
				)
			})
			provider.connect()
		}
	})

	/* 	toString(
		'wc:acd628e34857f0739e8c9b3e2deced59028cd4ca1269ee700de6440c2c55139f@2?relay-protocol=irn&symKey=061d1ab73d4ea55fc5a336c2b9a8ed29f7d3433ff4829e4ff0d1eb2a4e98afdb',
		{
			type: 'svg',
			color: {
				light: '#00000000',
				dark: '#f7f7f7'
			}
			// zscale: 1
		},
		(err, string) => {
			if (err) return console.error(err)
			QR = string
		}
	) */
	console.log(connector.icon)
	console.log(connector)
</script>

<div>
	{#if !QR}
		shimmer
	{:else}
		<!-- <img src={QR} alt="" /> -->

		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html QR}
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
