<script lang="ts">
	export let label: string
	export let options: string[]
	export let selected: string = ''
</script>

<div>
	<select name="select-{label}" id="theme" bind:value={selected}>
		<label for="select-{label}"> {label} </label>
		{#each options as option}
			<option value={option}> {option} </option>
		{/each}
	</select>
</div>
