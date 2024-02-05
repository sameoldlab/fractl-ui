<svelte:options
	customElement={{
		tag: 'fractl-modal',
		shadow: 'none',
		props: {
			config: { reflect: true, type: 'Object', attribute: 'config' }
		}
	}}
	accessors={true}
/>

<script lang="ts">
	import { ConnectModal, AccountModal } from './index.js'
	import type { Config, ConfigConnected, ConfigDisconnected } from '../types.js'
	import {get} from 'svelte/store'


	type Props = {
		export let btnClass: string
		export let config: Config
	}
	let { btnClass, config } = $props<Props>()
	
		
	// let config = $state<Config>(_config)

		
	/* 	
		config.state.listen((state, changedProp) => {
			config.state[changedProp] = state[changedProp]
			console.log(config)
		}) 
		
		config.accountData.listen((accountData, changedProp) => config.accountData[changedProp] = accountData[changedProp])
				*/
		config.state.subscribe((state) => {
			config.state = config.state
			console.log(state)
		})
		config.accountData.subscribe((accountData) => {
			config.accountData = config.accountData
			console.log(accountData)
		})

	// Need to be more careful during testing, but no longer need to wrap objects in a store and then subscribe for reactivity to work across packages 
	/* 	const store = readable(config, (set) => {
		// console.log(config)

		config.subscribe(
			(state) => state.status,
			() => set(config)
		)
	}) */
	// const _config = $state(config)
	// console.log('Fractl: ', config.state)

	/* 	$effect(() => {
		console.log('Fractl: ', config.state)
	}) */

	const isConnected = (
		config: ConfigConnected | ConfigDisconnected
	): config is ConfigConnected =>
		get((config as ConfigConnected)).state.status === 'connected'
</script>

<button on:click={() => console.log('config: ', config.state.get())}
	>Log config</button
>

<!-- config.state: {config.state.status.get()} -->
connectionState: {get(config.state).status}
{get(config.accountData).account}

{#if isConnected(config)}
	<AccountModal
		accountData={config.accountData}
		{config}
		{btnClass}
	/>
{:else}
	<ConnectModal state={config.state} {config} {btnClass}>
		<svelte:fragment slot="footer"></svelte:fragment>
	</ConnectModal>
{/if}
