<script lang="ts">
	export let clipboard = ''
	let copied = false
</script>

<button
	on:click={() => {
		if (clipboard === '') return
		navigator.clipboard.writeText(clipboard).then(() => {
			copied = true
			setTimeout(() => {
				copied = false
			}, 500)
		})
	}}
	class:copied
>
	<pre><code
			><span class="path">lab/untitled-v3</span>
<span class="rsa">&rsaquo;</span> <slot /></code
		></pre>
</button>

<style>
	button {
		padding: 0;
		margin: 0;
		border: none;
		background: transparent;
		font-size: inherit;
		color: inherit;
		width: 100%;
		text-align: inherit;

		padding: 0.25em 1em;
		border: 2px solid rgba(76 76 76 / 0.4);

		--base-color: #171717;
		background: var(--base-color);
		border-radius: 0.5em;

		--shadow-color: 0deg 0% 0%;
		--shadow-elevation-low: inset 0 0.25px 0 rgba(255, 255, 255, 0.1),
			0px 0.5px 0.5px hsl(var(--shadow-color) / 0.68),
			-0.1px 0.75px 0.6px -0.6px hsl(var(--shadow-color) / 0.57),
			-0.2px 2px 2px -2.5px hsl(var(--shadow-color) / 0.46),
			-0.4px 4px 4px -3.7px hsl(var(--shadow-color) / 0.35);

		--shadow-elevation-medium: inset 0 0.25px 0 rgba(255, 255, 255, 0.1),
			0px 0.5px 0.5px hsl(var(--shadow-color) / 0.68),
			-0.1px 1.3px 1.2px -1.2px hsl(var(--shadow-color) / 0.27),
			-0.2px 3px 3.7px -2.5px hsl(var(--shadow-color) / 0.36),
			-0.6px 6px 10px -3.7px hsl(var(--shadow-color) / 0.25);

		box-shadow: var(--shadow-elevation-low);

		transition:
			box-shadow 100ms cubic-bezier(0.47, 0, 0.745, 0.715),
			background-color 100ms cubic-bezier(0.47, 0, 0.745, 0.715),
			border-color 300ms ease-in-out;

		&:hover {
			box-shadow: var(--shadow-elevation-medium);
			/* brighten background */
			background-color: color(from var(--base-color) 20%);
			cursor: copy;
		}

		&:focus-visible {
			outline: 2px solid rgba(153 205 50 / 0.4);
		}
	}
	.copied {
		border-color: rgb(153 205 50);
	}

	span {
		font-weight: 600;
		color: rgb(153 205 50);
	}
	code {
		font-size: 0.9rem;
	}
</style>
