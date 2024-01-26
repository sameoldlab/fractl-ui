<script lang="ts">
	import config from './wagmiConfig'
	import '../dist/index'

	const count = {
		a: 9,
		b: 33,
		c: 90
	}
	const increment = () => count.c++
</script>

<ul>
	{#each Object.values(count) as c}
		<li>{c}</li>
	{/each}
</ul>

<button on:click={increment}>add</button>
<br />
<hr />

<fractl-modal obj={count} config={$config} />

<br />
<hr />
<p>
	We is {$config.state.status}
</p>
