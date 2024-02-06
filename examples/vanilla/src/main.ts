import './style.css'
import '@fractl-ui/ui'
import { addEvmConnection } from '@fractl-ui/evm'
import { config as wagmiConfig } from './lib/wagmiConfig'
import { reconnect } from '@wagmi/core'

// const { status } = config.state
// $: console.log('APP: ', config.state.status())
const config = addEvmConnection(wagmiConfig)
document.querySelector('fractl-modal')!.config = config //addEvmConnection(wagmiConfig)

reconnect(wagmiConfig, { connectors: wagmiConfig.connectors })
const log = document.querySelector('#logStatus')
log?.addEventListener('click', () => {
	console.log(config.state.status)
})
// config.state.listen((profile, changed) => {
//   console.log(`New ${changed}: `, profile[changed])
// })
console.log(wagmiConfig.state.current)

// document.querySelector('h1')!.innerHTML = config.state.status
document.querySelector('h1')!.innerHTML = wagmiConfig.state.status
