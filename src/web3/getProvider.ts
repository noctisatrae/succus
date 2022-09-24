import { ethers } from "ethers";
 
interface succusUtils {
    executed?: boolean
    provider?:ethers.providers.Web3Provider
}
  
const utils:succusUtils = {
    executed: false
}
  
/**
* This function is used by succus to connect to the user wallet.
* @async
* @function
* @returns {Promise<WalletInfo>} An object which contains: the address of the account, the reference to the wallet and the reference to the provider.
* @example
* const {address, wallet, provider, gunKeypair} = connectWallet();
* console.log(address) // 0x...
*/
let connectWallet = async (): Promise<WalletInfo|any> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer = provider.getSigner()
    const accountAddress = await signer.getAddress();
  
    return {address: accountAddress, wallet:signer, provider: provider}
  }
  
const getProvider = async () => {
  
  if (!utils.executed) {
    const { provider } = await connectWallet();
    await (connectWallet = async () => {});
    await (utils.executed = true);
    await (utils.provider = provider);

    return await utils.provider;
  }
  else return await utils.provider;
} 

export default getProvider;