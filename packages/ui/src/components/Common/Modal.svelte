<script lang="ts">
	import '../../styles/index.css'
	import { createEventDispatcher } from 'svelte'
	import { quadInOut } from 'svelte/easing'
	import { fade } from 'svelte/transition'
	const dispatch = createEventDispatcher()

	export let titleText = 'Title Text'
	export let customTrigger = false
	export let triggerText = 'open dialog'
	let dialog: HTMLDialogElement

	const docOverflow = {
		x: document.documentElement.style.overflowX,
		y: document.documentElement.style.overflowY
	}
	let isOpen = false

	const restoreStyles = (el: HTMLDialogElement) => {
		el.addEventListener('close', () => {
			isOpen = false
			document.documentElement.style.overflowY = docOverflow.x
			document.documentElement.style.overflowX = docOverflow.y
		})
	}

	export function open() {
		dialog.showModal()
		isOpen = true

		/* Get the overflow at the point when dialog is being opened */
		docOverflow.x = document.documentElement.style.overflowY
		docOverflow.y = document.documentElement.style.overflowX
		document.documentElement.style.overflowY = 'hidden'
		document.documentElement.style.overflowX = 'hidden'
	}

	export function close() {
		dialog.close()
		dispatch('close')
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	id="fractl-dialog"
	bind:this={dialog}
	aria-modal
	aria-labelledby="fcl__dialog-title"
	out:fade={{ duration: 140, easing: quadInOut }}
	on:click|self={close}
	use:restoreStyles
	inert={isOpen ? undefined : true}
>
	<header>
		<div class="fcl__header-icon">
			<slot name="icon-left" />
		</div>
		<h2 id="fcl__dialog-title">{titleText}</h2>
		<div class="fcl__header-icon">
			<button on:click={close} aria-label="Close Modal" class="fcl__header-btn">
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

	<div data-fctl-dialog-content id="fcl__dialog-content">
		<slot />
	</div>
</dialog>

{#if !customTrigger}
	<button on:click={open}>{triggerText}</button>
{/if}

<!-- 

<div {...$portalled} use:portalled>
	{#if $open}
		<div {...$overlay} use:overlay />

		<div {...$content} use:content transition:transition>
			<header>
				<div class="fcl__header-icon">
					<slot name="icon-left" />
				</div>
				<h2 {...$title} use:title>{titleText}</h2>
				<div class="fcl__header-icon">
					<button {...$close} use:close
						><!--  aria-label="Close Modal"> --
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
			<!-- <p {...$description} use:description>{description}</p> --

			<slot />
		</div>
	{/if}
</div>

-->

<style>
	@import url('../../styles/index.css');

	dialog:not([open]) {
		pointer-events: none;
		opacity: 0;
	}

	dialog[open] {
		opacity: 1;
	}

	dialog {
		transition-property: all;

		transition-duration: 140ms;
		opacity: 1;
		display: block;
		/* transition-property: opacity; */
		&::backdrop {
			background: var(--fcl-overlay-background, rgb(0 0 0 / 0.4));
			backdrop-filter: var(--fcl-overlay-backdrop-filter, blur(2px));
		}
		overflow: hidden;
		inline-size: min(240px, 100%);
		max-inline-size: 336px;

		background: var(--fcl-body-background, #141519);
		color: var(--fcl-text-color, #f1f1f1);
		--shadow-color: hsla(228, 11%, 9%, 0.16);
		box-shadow: var(
			--fcl-modal-box-shadow,
			0px 0px 0px 1px var(--shadow-color),
			0px 1px 1px -0.5px var(--shadow-color),
			0px 3px 3px -1.5px var(--shadow-color),
			0px 6px 6px -3px var(--shadow-color),
			0px 12px 12px -6px var(--shadow-color),
			0px 24px 24px -12px var(--shadow-color)
		);
		border: var(--fcl-modal-border, 1px solid #34393900);
		padding: 0;
		border-radius: var(--fcl-border-radius, 1.2em);

		font-family: var(
			--fcl-font-family,
			'Helvetica Neue',
			Inter,
			'Arial Nova',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			sans-serif
		);
		& button {
			font-family: inherit;
		}

		/* Targetting Dialog Head Slot */
		& header {
			display: grid;
			grid-template-columns: 30px [title-start] 1fr [title-end] 30px;
			align-items: center;
			padding: var(--fcl-modal-padding, 1.25em);
			padding-block-end: 1em;

			& h2 {
				margin: 0;
				grid-column: title;
				text-align: center;
				font-size: var(--fcl-modal-heading-font-size, 1em);
				font-weight: var(--fcl-modal-heading-font-weight, 700);
			}
		}
	}
	@media (max-width: 500px) {
		dialog {
			margin-block-end: 0;
			border-end-end-radius: 0;
			border-end-start-radius: 0;
			/* inline-size: 100%; */
		}
	}
	#fcl__dialog-content {
		display: grid;
		grid-template-rows: 1fr;
		padding: var(--fcl-modal-padding, 1.25em);
		transition: 250ms grid-template-rows ease;
		padding-block-start: 0;
		overflow: auto;
	}

	.fcl__header-icon {
		height: 30px;
		width: 30px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
