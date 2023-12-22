<!-- <svelte:options tag="my-app" /> -->
<script lang="ts">
    import svelteLogo from "./assets/svelte.svg"
    // import Card from "./components/Card.svelte"
    import ConnectModal from "./components/ConnectModal.svelte"
  </script>
  
  <main>
    <ConnectModal>
        <svelte:fragment slot="footer">df</svelte:fragment>
    </ConnectModal>
    <p>
      Check out <a
        href="https://github.com/sveltejs/kit#readme"
        target="_blank"
        rel="noreferrer">SvelteKit</a
      >, the official Svelte app framework powered by Vite!
    </p>
  
    <p>
      Or to read up on Web Components see
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
        target="_blank"
        rel="noreferrer">Mozilla Docs</a
      >
      <a
        href="https://svelte.dev/docs#Custom_element_API"
        target="_blank"
        rel="noreferrer">Svelte Custom Element</a
      >
    </p>
    <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
    <!-- Might be better to do this in a library package??? https://kit.svelte.dev/docs/packaging -->
  </main>
  
  <style>
    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.svelte:hover {
      filter: drop-shadow(0 0 2em #ff3e00aa);
    }
    .read-the-docs {
      color: #888;
    }
  </style>
  