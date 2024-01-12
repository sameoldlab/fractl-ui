<script lang="ts">
	import { type Config, disconnect } from '@wagmi/core'
	import accountStore from '$lib/stores/accountStore'
	import { truncate } from '$lib/utils'
	import Modal from './Common/Modal.svelte'
	import { fly } from 'svelte/transition'
	import { quadInOut } from 'svelte/easing'
	import type { Readable } from 'svelte/store'
	import { writable, type Readable } from 'svelte/store'
	import Zorb from './zorb/Zorb.svelte'

	export let config: Readable<Config>

	const { account, balance, nameService, unsubscribe } = accountStore(config)
	const { connector, address } = $account
	let name, avatar

	$nameService.then((v) => {
		if (v.name) name = v.name
		if (v.avatar) avatar = v.avatar
	})

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
	const open = writable(false)
	let triggerEl: HTMLButtonElement
	const handleDisconnect = (connector) => {
		unsubscribe()
		disconnect($config, {
			connector
		})
	}
</script>

<button
	aria-haspopup="dialog"
	data-melt-dialog-trigger=""
	aria-expanded={$open ? 'true' : 'false'}
	class="account-trigger"
	bind:this={triggerEl}
	on:click={() => ($open = true)}
>
	{#if avatar}
		<img class="avatar" src={avatar} alt="" />
	{:else}
		<Zorb {address} />
	{/if}

	<p class="address">{name || truncate(address)}</p>
</button>

<Modal
	titleText="Connected"
	role="dialog"
	focusTarget={triggerEl}
	{open}
	transition={(e) =>
		fly(e, { duration: 100, y: 40, opacity: 0, easing: quadInOut })}
>
	<!-- header>div*2+div.balance+hr+div>div.header -->
	<div class="main">
		{#if avatar}
			<img class="avatar" src={avatar} alt="" />
		{:else}
			<Zorb {address} />
		{/if}
		<p class="address">{name || truncate(address)}</p>

		{#await $balance then { formatted }}
			<p class="balance">{formatted.substring(0, 10)}</p>
		{/await}
		<div class="row">
			<!-- <button on:click>icon</button> -->
			<!-- <button on:click>icon</button> -->
			<!-- </header> -->
			<button on:click={handleDisconnect} disabled> Switch</button>
			<button on:click={() => handleDisconnect(connector)}> Disconnect</button>
		</div>
	</div>
</Modal>

<!-- </div> -->

<style>
	.avatar {
		border-radius: 50%;
	}
	.account-trigger {
		display: flex;
		align-items: center;
		gap: 1em;
		height: 100%;

		transition: all 1ms ease-in-out;

		& .avatar {
			width: 2em;
			height: 2em;
		}
	}
	.row {
		display: flex;
		gap: 1em;
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
