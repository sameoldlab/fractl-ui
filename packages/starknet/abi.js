import fs from 'fs'
import { RpcProvider, constants } from 'starknet'
// import comp from './src/abi/ethABI.js'

const ETH_ADDR =
	'0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

const provider = new RpcProvider({
	nodeUrl: constants.RPC_MAINNET_NODES[0],
	//  nodeUrl: "http://127.0.0.1:5050",
	retries: 2
})

async function getEthAbi() {
	const compressedContract = await provider.getClassAt(ETH_ADDR)
	fs.writeFileSync(
		'./ethABi.json',
		JSON.stringify(compressedContract.abi, undefined, 2)
	)
}

getEthAbi()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
// const compiledContract = JSON.parse(fs.readFileSync("./src/abi/ethABI.json").toString("ascii"));
