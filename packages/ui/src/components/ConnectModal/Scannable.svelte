<script lang="ts">
	import type { Connector } from '@wagmi/core'
	import { toString, create } from 'qrcode'

	export let connector: Connector
	let uri: string = ''
	let QR

	console.log('getting uri from wallet connect')
	connector.getProvider().then((provider) => {
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

	const d = create(
		'wc:acd628e34857f0739e8c9b3e2deced59028cd4ca1269ee700de6440c2c55139f@2?relay-protocol=irn&symKey=061d1ab73d4ea55fc5a336c2b9a8ed29f7d3433ff4829e4ff0d1eb2a4e98afdb'
	)

	console.table(d)

	let arr = []
	const { data, size } = d.modules
	let newRow = false

	for (let i = 0; i < data.length; i++) {
		const col = Math.floor(i % size)
		const row = Math.floor(i / size)

		if (!col && !newRow) {
			arr[row] = []
		}
		let color = data[i] ? 'white' : 'black'

		if (!((row >= 7 && row < size - 7) || col >= 7)) {
			if (row < 7 && col >= size - 7) {
				color = 'red'
			} else {
				color = 'aqua'
			}
		}

		arr[row][col] = { data: data[i], color }
	}

	/* 	for (let row = 0; row < d.modules.size; row++) {
		arr[row] = []
		for (let el = 0; el < d.modules.size; el++) {
			arr[row].push(d.modules.data[row * el])
			console.log(el*row);
				
		}
	} */
	console.log(d.modules.data.length)

	function getColorAttrib(color, attrib) {
		console.log(attrib, color)
		const alpha = color.a / 255
		const str = `${attrib}="${color.hex}"`

		return alpha < 1
			? str + ` ${attrib}-opacity="${alpha.toFixed(2).slice(1)}"`
			: str
	}

	const svgCmd = (cmd, x, y) => `${cmd} ${x} ${y}`

	function qrToPath(data: Uint8Array[], size: number, margin: number) {
		let path = ''
		let moveBy = 0
		let newRow = false
		let lineLength = 0

		for (let i = 0; i < data.length; i++) {
			const col = Math.floor(i % size)
			const row = Math.floor(i / size)

			if (!col && !newRow) newRow = true

			if (data[i]) {
				lineLength++

				if (!(i && col && data[i - 1])) {
					path += newRow
						? svgCmd('M', col + margin, 0.5 + row + margin)
						: svgCmd('m', moveBy, 0)

					moveBy = 0
					newRow = false
				}

				if (!(col + 1 < size && data[i + 1])) {
					path += 'h' + lineLength
					lineLength = 0
				}
			} else {
				moveBy++
			}
		}

		return path
	}

	function render(qrData) {
		const opts = {
			color: {
				light: {
					r: 255,
					g: 0,
					b: 0,
					a: 255,
					hex: '#f00'
				},
				dark: {
					r: 0,
					g: 0,
					b: 255,
					a: 255,
					hex: 'currentcolor'
				}
			},
			margin: 2,
			width: 300
		}
		const { size, data } = qrData.modules
		const qrSize = size + opts.margin * 2

		const bg =
			opts.color.light.a ??
			`<path ${getColorAttrib(
				opts.color.light,
				'fill'
			)} d="M0 0h${qrSize}v${qrSize}H0Z"/>`

		const path = `<path ${getColorAttrib(
			opts.color.dark,
			'stroke'
		)} d="${qrToPath(data, size, opts.margin)}"/>`

		const viewBox = 'viewBox="' + '0 0 ' + qrSize + ' ' + qrSize + '"'

		const width = !opts.width
			? ''
			: 'width="' + opts.width + '" height="' + opts.width + '" '

		return (
			`<svg xmlns="http://www.w3.org/2000/svg" ${width} ${viewBox}  shape-rendering="crispEdges">` +
			bg +
			path +
			'</svg>'
		)
	}
	let r = render(d)
	// let svg = toString(		'wc:acd628e34857f0739e8c9b3e2deced59028cd4ca1269ee700de6440c2c55139f@2?relay-protocol=irn&symKey=061d1ab73d4ea55fc5a336c2b9a8ed29f7d3433ff4829e4ff0d1eb2a4e98afdb')
	// console.log(svg);
	console.log(r)
</script>

<!-- 
{#each arr as row}
		<div class="row">
			{#each row as element}
				<div
					class="dot"
					class:fill={element.data}
					class:round={element.color === 'white'}
					style:background-color={element.color}
				/>
			{/each}
		</div>
	{/each}

	{@html r} -->
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

	/* .row {
		display: flex;
		/* gap: .2em; *
	}
	.dot {
		width: 4px;
		height: 4px;
		background: transparent;
		margin: 1.25px;
	}
	.round {
		border-radius: 50%;
	}
	.fill {
		background: white;
	}  */
</style>
