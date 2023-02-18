<script lang="ts">
  import Modal from "./Common/Modal.svelte"
  import "./cta-modal"
  import MenuItem from "./Common/MenuItem.svelte"
  let wallets = [
    {
      name: "MetaMask",
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><path fill="#E2761B" stroke="#E2761B" stroke-linecap="round" stroke-linejoin="round" stroke-width=".09" d="m24.09 3.12-8.75 6.5 1.62-3.84 7.13-2.66Z"/><path fill="#E4761B" stroke="#E4761B" stroke-linecap="round" stroke-linejoin="round" stroke-width=".09" d="m3.9 3.12 8.68 6.56-1.54-3.9L3.9 3.12ZM20.94 18.17l-2.33 3.57 4.99 1.37 1.43-4.86-4.09-.08ZM2.98 18.25l1.42 4.86 4.99-1.37-2.33-3.57-4.08.08Z"/><path fill="#E4761B" stroke="#E4761B" stroke-linecap="round" stroke-linejoin="round" stroke-width=".09" d="m9.1 12.15-1.38 2.1 4.94.22-.17-5.32-3.39 3ZM18.89 12.15l-3.43-3.06-.12 5.38 4.94-.22-1.4-2.1ZM9.39 21.74l2.97-1.45-2.57-2-.4 3.45ZM15.63 20.3l2.98 1.44-.4-3.45-2.58 2Z"/><path fill="#D7C1B3" stroke="#D7C1B3" stroke-linecap="round" stroke-linejoin="round" stroke-width=".09" d="m18.61 21.74-2.98-1.45.24 1.94-.02.82 2.76-1.3ZM9.39 21.74l2.76 1.31-.01-.82.22-1.94-2.97 1.45Z"/><path fill="#233447" stroke="#233447" stroke-linecap="round" stroke-linejoin="round" stroke-width=".09" d="m12.2 17-2.48-.72 1.75-.8.73 1.53ZM15.8 17l.72-1.52 1.76.8-2.49.73Z"/><path fill="#CD6116" stroke="#CD6116" stroke-linecap="round" stroke-linejoin="round" stroke-width=".09" d="m9.39 21.74.42-3.57-2.75.08 2.33 3.5ZM18.2 18.17l.41 3.57 2.33-3.49-2.75-.08ZM20.28 14.25l-4.94.22.46 2.54.73-1.53 1.76.8 2-2.03ZM9.72 16.28l1.76-.8.72 1.53.46-2.54-4.94-.22 2 2.03Z"/><path fill="#E4751F" stroke="#E4751F" stroke-linecap="round" stroke-linejoin="round" stroke-width=".09" d="m7.72 14.25 2.07 4.04-.07-2.01-2-2.03ZM18.29 16.28l-.09 2 2.08-4.03-2 2.03ZM12.66 14.47 12.2 17l.58 3 .13-3.95-.25-1.6ZM15.34 14.47l-.23 1.58.1 3.95.6-3-.47-2.53Z"/><path fill="#F6851B" stroke="#F6851B" stroke-linecap="round" stroke-linejoin="round" stroke-width=".09" d="m15.8 17-.59 3 .42.3 2.57-2.01.09-2.01-2.49.73ZM9.72 16.28l.07 2 2.57 2.01.42-.29-.58-3-2.48-.72Z"/><path fill="#C0AD9E" stroke="#C0AD9E" stroke-linecap="round" stroke-linejoin="round" stroke-width=".09" d="m15.85 23.05.02-.82-.22-.19h-3.31l-.2.2.01.81-2.76-1.3.96.78 1.96 1.37h3.37l1.97-1.37.96-.79-2.76 1.31Z"/><path fill="#161616" stroke="#161616" stroke-linecap="round" stroke-linejoin="round" stroke-width=".09" d="m15.63 20.3-.42-.3h-2.43l-.42.3-.22 1.93.2-.19h3.31l.22.2-.24-1.95Z"/><path fill="#763D16" stroke="#763D16" stroke-linecap="round" stroke-linejoin="round" stroke-width=".09" d="m24.46 10.04.75-3.59-1.12-3.33-8.46 6.27 3.26 2.76 4.6 1.34 1.01-1.19-.44-.31.7-.64-.54-.43.7-.53-.46-.35ZM2.8 6.45l.74 3.59-.47.35.7.53-.54.43.7.64-.43.31 1 1.19 4.6-1.34 3.26-2.76L3.9 3.12 2.8 6.45Z"/><path fill="#F6851B" stroke="#F6851B" stroke-linecap="round" stroke-linejoin="round" stroke-width=".09" d="m23.48 13.49-4.6-1.34 1.4 2.1-2.08 4.04 2.74-.04h4.09l-1.55-4.76ZM9.1 12.15l-4.6 1.34-1.52 4.76h4.08l2.73.04-2.07-4.04 1.38-2.1ZM15.34 14.47l.3-5.08 1.33-3.6h-5.93l1.32 3.6.3 5.08.11 1.6V20h2.44l.02-3.93.11-1.6Z"/></svg>`,
    },
    {
      name: "Coinbase",
      logo: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#2C5FF6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 23.8C19.4123 23.8 23.8 19.4123 23.8 14C23.8 8.58756 19.4123 4.19995 14 4.19995C8.58756 4.19995 4.19995 8.58756 4.19995 14C4.19995 19.4123 8.58756 23.8 14 23.8ZM11.55 10.8C11.1357 10.8 10.8 11.1357 10.8 11.55V16.45C10.8 16.8642 11.1357 17.2 11.55 17.2H16.45C16.8642 17.2 17.2 16.8642 17.2 16.45V11.55C17.2 11.1357 16.8642 10.8 16.45 10.8H11.55Z" fill="white"/></svg>`,
    },
    {
      name: "Other Wallets",
      logo: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="8" fill="#3B99FC"/><path d="M8.38969 10.3739C11.4882 7.27543 16.5118 7.27543 19.6103 10.3739L19.9832 10.7468C20.1382 10.9018 20.1382 11.1529 19.9832 11.3079L18.7076 12.5835C18.6301 12.661 18.5045 12.661 18.4271 12.5835L17.9139 12.0703C15.7523 9.90875 12.2477 9.90875 10.0861 12.0703L9.53655 12.6199C9.45909 12.6974 9.3335 12.6974 9.25604 12.6199L7.98039 11.3442C7.82547 11.1893 7.82547 10.9381 7.98039 10.7832L8.38969 10.3739ZM22.2485 13.0121L23.3838 14.1474C23.5387 14.3023 23.5387 14.5535 23.3838 14.7084L18.2645 19.8278C18.1096 19.9827 17.8584 19.9827 17.7035 19.8278C17.7035 19.8278 17.7035 19.8278 17.7035 19.8278L14.0702 16.1944C14.0314 16.1557 13.9686 16.1557 13.9299 16.1944C13.9299 16.1944 13.9299 16.1944 13.9299 16.1944L10.2966 19.8278C10.1417 19.9827 9.89053 19.9827 9.73561 19.8278C9.7356 19.8278 9.7356 19.8278 9.7356 19.8278L4.61619 14.7084C4.46127 14.5535 4.46127 14.3023 4.61619 14.1474L5.75152 13.012C5.90645 12.8571 6.15763 12.8571 6.31255 13.012L9.94595 16.6454C9.98468 16.6842 10.0475 16.6842 10.0862 16.6454C10.0862 16.6454 10.0862 16.6454 10.0862 16.6454L13.7194 13.012C13.8743 12.8571 14.1255 12.8571 14.2805 13.012C14.2805 13.012 14.2805 13.012 14.2805 13.012L17.9139 16.6454C17.9526 16.6842 18.0154 16.6842 18.0541 16.6454L21.6874 13.0121C21.8424 12.8572 22.0936 12.8572 22.2485 13.0121Z" fill="white"/></svg>`,
    },
    { name: "Browser Wallet", logo: "Win" },
  ]
  let isOpen = false
</script>

<!-- <cta-modal>
  <div slot="button">
      <button class="cta-modal-toggle" type="button">Connect Wallet</button>
  </div>

  <div slot="modal">
    <h2>Connect Wallet</h2>
    {#each wallets as wallet}
      <Button>
        {wallet.name}
        <div class="logo">
            {wallet.logo}
        </div>
      </Button>
    {/each}

  </div>
</cta-modal> -->
<button on:click={() => (isOpen = true)}>Connect Wallet</button>
{#if isOpen}
  <Modal on:close={() => (isOpen = false)} title="Connect Wallet">
    <div slot="body">
      {#each wallets as wallet}
        <MenuItem>
          {wallet.name}
          <div class="logo">
            {@html wallet.logo}
          </div>
        </MenuItem>
      {/each}
    </div>
    <slot slot="footer" />
  </Modal>
{/if}

