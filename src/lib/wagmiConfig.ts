import { 
	http,
	createConfig,
	createStorage
} from "@wagmi/core"
// import { injected, walletConnect, mock } from 'wagmi/connectors'
import  { readable, writable } from 'svelte/store'
import { mainnet, arbitrum } from "@wagmi/core/chains"

const storage = createStorage({ storage: localStorage })

const config = writable(createConfig({
	chains: [mainnet, arbitrum],
	// storage,
	transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
  },
	// connectors: [injected()],
}))

export default config