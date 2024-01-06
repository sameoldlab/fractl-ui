<script lang="ts">
	import type { Config } from '@wagmi/core'
	import accountStore from './accountStore'
	import { truncate } from '$lib/utils'

	export let config: Config

	// $accountStore.then(v=>console.log(v))

	const { address, ensAvatar, ensName } = {
		address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
		ensName: 'vitalik.eth',
		ensAvatar:
			'https://ipfs.io/ipfs/QmSP4nq9fnN9dAiCj42ug9Wa79rqmQerZXZch82VqpiH7U/image.gif',
	}
</script>

<h1>This thing is connected</h1>

<!-- {#await $accountStore then {address, ensAvatar, ensName}} 
	{address}
	{ensName}
	<img src={ensAvatar} alt="" width='300px'>
{/await} -->
<button>
	{#if !ensAvatar}
		<p class="address">{truncate(address)}</p>
	{:else}
		<img class="avatar" src={ensAvatar} alt="" width="300px" />
	{/if}
	{#if !ensName}
		<p class="address">{truncate(address)}</p>
	{:else}
		<p class="address">{ensName}</p>
	{/if}
</button>
<!-- header>div*2+div.balance+hr+div>div.header -->
<div class="main">
	<header>
		<div class="flex">
			<img class="avatar" src={ensAvatar} alt="" />
			{truncate(address)}
		</div>
		<div class="flex">
			<button on:click>icon</button>
			<button on:click>icon</button>
		</div>
	</header>
	<div class="balance">13 eth</div>
	<hr />
	<div>
		<div class="header">
			Transactions
			<button>Clear</button>
		</div>
		<div></div>
		<div class="footer">View on Block Explorer</div>
	</div>
</div>

<style>
	.avatar {
		width: 2em;
		height: auto;
		border-radius: 50%;
	}

	.flex {
		display: flex;
		align-items: center;
		gap: .25em;
	}

	button {
		display: flex;
		gap: 1em;
		height: 3em;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.main {
		max-width: 300px;
		background: red;
		padding: 0.75em;
	}

	.main > * {
		width: 100%;
	}
</style>
