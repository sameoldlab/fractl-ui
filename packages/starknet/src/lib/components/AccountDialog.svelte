<script lang="ts">
	// import { type Config } from '@wagmi/core'
	// import accountStore from '../stores/accountStore'
	import { truncate } from '../utils'

	// export let config: Config

	// $accountStore.then(v=>console.log(v))

	const { address, ensAvatar, ensName, balance } = {
		address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
		ensName: 'vitalik.eth',
		ensAvatar:
			'https://ipfs.io/ipfs/QmSP4nq9fnN9dAiCj42ug9Wa79rqmQerZXZch82VqpiH7U/image.gif',
		balance: {
			decimals: 18,
			formatted: '114.594710084228426863',
			symbol: 'ETH'
		}
	}
</script>

<!-- {#await $accountStore then {address, ensAvatar, ensName}} 
	{address}
	{ensName}
	<img src={ensAvatar} alt="" width='300px'>
{/await} -->
<button class="account-data">
	{#if !ensAvatar}
		<p class="address">{truncate(address)}</p>
	{:else}
		<img class="avatar" src={ensAvatar} alt="" />
	{/if}
	{ensName || truncate(address)}
</button>
<!-- header>div*2+div.balance+hr+div>div.header -->
<div class="main">
	<img class="avatar" src={ensAvatar} alt="" />
	{truncate(address)}
</div>
<div class="flex">
	<!-- <button on:click>icon</button> -->
	<!-- <button on:click>icon</button> -->
</div>
<!-- </header> -->
<div class="balance">{balance.formatted.substring(0, 10)}</div>
<hr />
<div>
	<div class="header">
		Transactions
		<button>Clear</button>
	</div>
	<div></div>
	<div class="footer">View on Block Explorer</div>
</div>

<!-- </div> -->

<style>
	.account-data {
		display: flex;
		align-items: center;

		& .avatar {
			width: 2em;
			height: auto;
			border-radius: 50%;
		}
	}
	.flex {
		display: flex;
		align-items: center;
		gap: 0.25em;
	}

	button {
		display: flex;
		gap: 1em;
		height: 3em;
	}

	/* 	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	} */

	.main {
		max-width: 300px;
		background: #141519;
		padding: 0.75em;
	}

	.main > * {
		width: 100%;
	}
</style>
