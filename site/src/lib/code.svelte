<pre>
<code
		><span class="path">lab/untitled-v3</span>
<span class="rsa">&rsaquo;</span> <slot /></code
	>
</pre>

<style>
	pre {
		--base-color: #17171755;
		background: var(--base-color);
		border-radius: 0.5em;
		border: 1px solid rgba(76, 76, 76, 0.4);
		--tw-shadow-color: rgba(29, 29, 29, 0.687);
		/* 		box-shadow:
			inset 0 0.25px 0 rgba(255, 255, 255, 0.1),
			0px 1px 0px -1px var(--tw-shadow-color),
			0px 1px 1px -1px var(--tw-shadow-color),
			0px 1px 2px -1px var(--tw-shadow-color),
			0px 2px 4px -2px var(--tw-shadow-color),
			0px 3px 6px -3px var(--tw-shadow-color); */
		padding: 1em;

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
			background-color 100ms cubic-bezier(0.47, 0, 0.745, 0.715);

		&:hover {
			box-shadow: var(--shadow-elevation-medium);
			/* brighten background */
			background-color: color(from var(--base-color) 20%);
			cursor: copy;
		}
	}
	span {
		font-weight: 600;
		color: yellowgreen;
	}
	code {
		font-size: 1rem;
	}
</style>
