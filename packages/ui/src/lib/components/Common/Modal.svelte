<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { createDialog } from '@melt-ui/svelte'
	import type { TransitionConfig } from 'svelte/transition'
	import type { Writable } from 'svelte/store'

	export let transition: (node: HTMLElement) => TransitionConfig
	const dispatch = createEventDispatcher()
	export let titleText = 'Title Text'
	// export let triggerText = 'Trigger Text'
	export let role: 'dialog' | 'alertdialog' = 'dialog'
	export let focusTarget: string | HTMLElement | SVGElement | null
	export let open: Writable<boolean>

	const {
		elements: {
			// trigger,
			portalled,
			overlay,
			content,
			title,
			close
		}
	} = createDialog({
		role,
		onOpenChange: ({ next }) => {
			console.log('open change event')
			dispatch('close')
			return next
		},
		closeFocus: focusTarget,
		open
	})
	// let customTrigger
</script>

<!-- {#if !customTrigger}
	<button {...$trigger} use:trigger > {triggerText} </button>
{/if} -->

<div {...$portalled} use:portalled>
	{#if $open}
		<div {...$overlay} use:overlay class="dialog-overlay" />

		<div {...$content} use:content class="dialog-window" transition:transition>
			<header class="dialog-head">
				<div class="header-icon">
					<slot name="icon-left" />
				</div>
				<h2 {...$title} use:title class="dialog-title">{titleText}</h2>
				<div class="header-icon">
					<button {...$close} id="close" use:close
						><!--  aria-label="Close Modal"> -->
						<svg
							aria-hidden="true"
							focusable="false"
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
						>
							<path
								stroke="#E0E8FF"
								stroke-linecap="round"
								stroke-width="2"
								d="M10 10 2 2M10 10 2 2M10 2l-8 8"
							/>
						</svg>
					</button>
				</div>
			</header>
			<!-- <p {...$description} use:description>{description}</p> -->

			<slot />
		</div>
	{/if}
</div>

<style>
	.header-icon {
		height: 30px;
		width: 30px;

		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;

		& button {
			height: 100%;
			width: 100%;

			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;

			padding: 0;
			background-color: transparent;
			border: 1px solid hsla(0, 0%, 100%, 0%);
			color: var(--text-color);
			transition:
				background-color 140ms ease-in,
				border 140ms ease-in;
		}
		& button:hover {
			border: 1px solid hsla(0, 0%, 100%, 4%);
			background-color: hsla(0, 0%, 100%, 6%);
		}
	}
	/* Targetting Dialog Head Slot */
	.dialog-title {
		margin: 0;
		color: var(--text-color);
		font-weight: 600;
		font-size: 1em;
		grid-column: title;
		text-align: center;
		/* background-color: aqua; */
	}

	header {
		display: grid;
		grid-template-columns: 30px [title-start] 1fr [title-end] 30px;
		align-items: center;

		margin-bottom: 30px;
	}

	.dialog-window {
		display: block;
		border: 1px solid #343939;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #141519;
		padding: 30px;
		z-index: 901;
		width: 280px;
		border-radius: var(--dialog-radius, 0);
	}

	.dialog-overlay {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: black;
		opacity: 0.5;
		overflow: hidden;
		z-index: 900;
	}
</style>
