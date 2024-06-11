<script lang="ts">
	import { createCheckbox, melt } from '@melt-ui/svelte'

	// Could have been a toggle (binary) but the indeterminate
	export let enabled: boolean | 'indeterminate'

	const {
		elements: { root },
		helpers: { isChecked, isIndeterminate }
	} = createCheckbox({
		defaultChecked: true,
		onCheckedChange: ({next}) => {
			console.log(next)
			enabled = next	
			return next
		}
	})
	export let label = ''
</script>

<button
	use:melt={$root}
	class:enabled={$isIndeterminate || $isChecked}
	class:disabled={!$isChecked && !$isIndeterminate}
	class="connect"
>
	{label}
</button>

<style>
	button {
		--base-color: #171717;
		background: var(--base-color);
		color: inherit;

		font-weight: 600;
		padding: 0.5em 0.75em;
		border-radius: 0.5em;
		border: 2px solid transparent;

		&.enabled {
			/* color: inherit; */
			border: 2px solid rgba(166, 159, 159, 0.4);
		}

		&.disabled {
			opacity: 0.7;
		}
	}
</style>
