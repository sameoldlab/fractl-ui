<script lang="ts">
	import { gradientForAddress } from './lib.js'
	export let size = '100%'
	export let address = '0x0000000000000000000000000000000000000000'
	let classNames = ''
	export { classNames as class }

	$: gradientInfo = gradientForAddress(address)
</script>

<svg
	width={size}
	height={size}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 100 100"
	class="avatar {classNames}"
>
	<title><slot /></title>
	<defs>
		<radialGradient
			id="gzr"
			gradientTransform="translate(66.4578 24.3575) scale(75.2908)"
			gradientUnits="userSpaceOnUse"
			r="1"
			cx="0"
			cy="0%"
		>
			<stop offset="15.62%" stop-color={gradientInfo[0]} />
			<stop offset="39.58%" stop-color={gradientInfo[1]} />
			<stop offset="72.92%" stop-color={gradientInfo[2]} />
			<stop offset="90.63%" stop-color={gradientInfo[3]} />
			<stop offset="100%" stop-color={gradientInfo[4]} />
		</radialGradient>
	</defs>
	<g transform="translate(5,5)">
		<ellipse fill="url(#gzr)" cx="45" cy="45" rx="45" ry="45"></ellipse>
	</g>
</svg>

<!-- <style src='../../styles/index.css'></style> -->
