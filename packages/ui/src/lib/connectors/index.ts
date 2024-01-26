import { mock } from './mock.js'
import { walletConnect } from './walletConnect.js'

/* @wagmi/connectors seems to execute immediately on import and pulls in around 700 extra packages. Would like to automate cloning and copying without depending on the actual package */
/* Could just delete this folder with new project structure... */
export { mock, walletConnect }
