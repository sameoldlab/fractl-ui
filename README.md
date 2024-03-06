# Introduction

Fractl is a framework-agnostic UI library for interacting with blockchains, smart contracts, and wallets. Built for an ecosystem of fragmented ecosystems.

## Docs

The first set of components in

### Examples?

[yes](./examples/)

### Install

```sh
pnpm add -D install @fractl-ui/ui
```

and a core package for the appropriate network(s).
EVM: `fractl-ui/evm wagmi viem`
starknet: `fractl-ui/starknet`
fuel: `fractl-ui/fuel fuels`

### Setup

The general pattern stays the same across core packages. refer to the specific documentation for more details.

Using the evm as an example:

```html
<body>
	<fractl-modal />

	<script>
		/* import fractl-modal from @fractl-ui/ui. (Web Components do not need named imports) */
		import '@fractl-ui/ui'
		import { addEvm } from '@fractl-ui/evm'
		/* setup wagmi regularly */
		import { wagmiConfig } from './lib/wagmiConfig'

		/* addEvm returns an object. So we need to pass it to fractl-modal using javascript */
		const connections = addEvm({config: wagmiConfig})
		document.querySelector('fractl-modal')!.config = connections
	</script>
</body>
```

Fractl will manage it's state internally and pass updates to wagmi, which you can listen to in your app.

### Can I use this now?

Fractl is still very early and some important features will require the API is going to change (for example, to use multiple networks together). That said, Fractl UI and Fractl EVM work relatively well as they are. You should stick to a fixed version if you do decide to use it.

## Contributing

PRs and issues welcome.
fractl-ui/ui is built with svelte and compiled to web components.
Network specific packages are written in typescript. If you'd like to try making a new core package, please open an issue first to avoid duplicating work.

## Credits

- Rainbowkit, ConnectKit, and Web3modal for prior work and inspiration
- Zora Labs for the Zorbs <!-- though they don't look very collision resistant so far -->
