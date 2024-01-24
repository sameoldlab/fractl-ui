<script lang="ts">
	import '../../styles/index.css'
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
		closeFocus:
			focusTarget || ((defaultEl?: HTMLElement) => defaultEl || focusTarget),
		open
	})
	// let customTrigger
</script>

<!-- {#if !customTrigger}
	<button {...$trigger} use:trigger > {triggerText} </button>
{/if} -->

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
