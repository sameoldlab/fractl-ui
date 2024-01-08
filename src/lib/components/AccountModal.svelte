<script lang="ts">
	import { fetchBalance, type Config, disconnect } from '@wagmi/core'
	import accountStore from './accountStore'
	import { truncate } from '$lib/utils'
	import Modal from './Common/Modal.svelte'
	import type { Writable } from 'svelte/store'
	import { fly } from 'svelte/transition'
	import { quadInOut } from 'svelte/easing'

	export let config: Config

	$accountStore.then((v) => console.log(v))

	/* 	const { address, ensAvatar, ensName, balance } = {
		address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
		ensName: 'vitalik.eth',
		ensAvatar:
			'https://ipfs.io/ipfs/QmSP4nq9fnN9dAiCj42ug9Wa79rqmQerZXZch82VqpiH7U/image.gif',
		balance: {
			decimals: 18,
			formatted: '114.594710084228426863',
			symbol: 'ETH'
		}
	} */

	let open
	let triggerEl: HTMLButtonElement
	const handleDisconnect = (connector) => {
		disconnect(config, {
			connector
		})
	}
</script>

{#await $accountStore then { account, ensAvatar, ensName, balance }}
	{@const { connector, address } = account}

	<button
		aria-haspopup="dialog"
		data-melt-dialog-trigger=""
		aria-expanded={$open ? 'true' : 'false'}
		class="account-data"
		bind:this={triggerEl}
		on:click={() => open.set(true)}
	>
		{#if !ensAvatar}
			<p class="address">{truncate(address)}</p>
		{:else}
			<img class="avatar" src={ensAvatar} alt="" />
		{/if}
		{ensName || truncate(address)}
	</button>

	<Modal
		titleText="Connected"
		role="dialog"
		focusTarget={triggerEl}
		bind:open
		transition={(e) =>
			fly(e, { duration: 100, y: 40, opacity: 0, easing: quadInOut })}
	>
		<!-- header>div*2+div.balance+hr+div>div.header -->
		<div class="main">
			<img class="avatar" src={ensAvatar} alt="" />
			<p class="address">{ensName || truncate(address)}</p>
			<p class="balance">{balance.formatted.substring(0, 10)}</p>
			<div class="row">
				<!-- <button on:click>icon</button> -->
				<!-- <button on:click>icon</button> -->
				<!-- </header> -->
				<button on:click={handleDisconnect}> Switch</button>
				<button on:click={() => handleDisconnect(connector)}>
					Disconnect</button
				>
			</div>
		</div>
	</Modal>
{/await}

<!-- </div> -->

<style>
	.avatar {
		height: auto;
		border-radius: 50%;
	}
	.account-data {
		display: flex;
		align-items: center;
		gap: 1em;
		height: 3em;

		& .avatar {
			width: 2em;
		}
	}
	.row {
		display: flex;

		flex-direction: row;
	}
	p {
		text-align: center;
		margin: 0;
	}
	.address {
		font-weight: 500;
		margin-block: 0.5em;
	}

	.balance {
		opacity: 0.6;
		margin-bottom: 1em;
	}

	.main {
		width: 100%;
		display: grid;
		justify-content: space-around;
		justify-items: center;

		font-size: 1em;
		color: var(--text-color);

		& .avatar {
			width: 4lh;
			margin-bottom: 2em;
		}

		& button {
			padding: 1.125em 1em;
			width: 100%;
			justify-self: stretch;
		}
	}
</style>
