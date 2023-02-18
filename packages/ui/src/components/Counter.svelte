<script lang="ts">
  let count: number = 0
  const increment = () => {
    count += 1
  }
</script>
<!-- <svelte:options tag="counter-default"/> -->


<button on:click={increment}>
  count is {count}
</button>
