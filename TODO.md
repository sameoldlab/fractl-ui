    - [ ] Convert style values to variables
    - [ ] Give triggers data attributes that can be targetted directly
    - [x] Write README
    - [ ] Poast
    - [x] Add icons for Account buttons
    - [ ] Integrations for WalletConnect and embedded
    - [ ] Replace WalletConnect Modal with custom QR Code
    - [ ] Setup mock wallet in props
    - [ ] Test new connectors
    - [ ] Convert modal to drawer on mobile
    - [ ] What is a wallet section
    	- [ ] If no injected wallet exists then link to download / resources

    - [ ] Try Mitosis again else try Svelte's web component compiler if not
    - [ ] abstract to something other than wagmi/evm. CosmWasmSDK

    ---

    - [ ] Publish to npm
    - [ ] Decent website
    - [ ] Starkware? Fuel? Solana?

    - [ ] Setup frame provider (after 0.7)
    - [ ] Safe? Coinbase? In-app (Metamask) browsers?
    - [ ] Check: Still need browser wallet specific connectors (coinbase, metamask ) if using 6963?
    - [ ] Catch errors on getBalance and resolver and re-request later if 'HTTP Request failed'
    - [ ] For Mobile: if in-wallet browser is detected (is mobile && eip-6963 provider exists), bypass modal and attempt to request connection directly. Need to detect if provider name matches the browser's user agent or something no avoid Dawn and firefox android(?)
    - [ ] Find out why onOpenChange runs twice when closing in Modal.svelte
    - [ ] Additional resolver options: lens? oldest PFP NFT?
    - [ ] Additional Components: Switch chains, Swap (multichain), dropdown for Account details
