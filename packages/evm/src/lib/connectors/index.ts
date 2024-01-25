import { mock } from './mock'
import { walletConnect } from './walletConnect'

/* @wagmi/connectors seems to execute immediately on import and pulls in around 700 extra packages. Would like to automate cloning and copying without depending on the actual package */
export { mock, walletConnect }
