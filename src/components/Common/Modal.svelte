<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte"

  const dispatch = createEventDispatcher()
  const close = () => dispatch("close")

  let modal
  export let title = "Modal Title"

  const handle_keydown = (e) => {
    // Escape to close
    if (e.key === "Escape") {
      close()
      return
    }

    // Focus Trap
    if (e.key === "Tab") {
      const nodes = modal.querySelectorAll("*")
      const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0)

      let index = tabbable.indexOf(document.activeElement)
      if (index === -1 && e.shiftKey) index = 0

      index += tabbable.length + (e.shiftKey ? -1 : 1)
      index %= tabbable.length
      tabbable[index].focus()
      e.preventDefault()
    }
  }
  // Restore focus to trigger
  const lastFocus =
    typeof document !== "undefined" && document.activeElement

  if (lastFocus) {
    onDestroy(() => {
      lastFocus.focus()
    })
  }
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="dialog-overlay" on:click={close} />

<div class="dialog-window" role="dialog" aria-modal="true" bind:this={modal}>
  <!-- Header -->
  <header class="dialog-head">
    <div class="icon-left" />
    <div id="dialog-title">{title}</div>
    <div class="icon-right">
      <button autofocus id="close" on:click={close}>
        <svg
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
  <!-- Modal Body -->
  <section>
    <slot name="body" />
  </section>

  <footer>
    <slot name="footer" />
  </footer>
</div>

<style>
  .icon-right, .icon-left {
    display: block;
    height: 30px;
    width: 30px;
    /* background-color: aqua; */
  }
  #close {
    height: 100%;
    width: 100%;
    /* top: 20px;
    right: 30px; */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 50%;
  }
  /* Targetting Dialog Head Slot */
  #dialog-title {
    margin: 0;
    width: 100%;
    height: 100%; 
    text-align: center;
    color: var(--text-color);
    font-weight: 600;
    font-size: 1em;
    /* background-color: aqua; */
  }

  header {
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-bottom: 30px;
  }

  .dialog-window {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #141519;
    padding: 30px;
    z-index: 901;
    width: 310px;
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
