import { ethers } from "ethers"
import Gun, { ISEAPair } from "gun";
import "gun/sea";

const gun = Gun({ localStorage: false, radisk:false });
const SEA = Gun.SEA;

/**
 * This function is used by succus to connect to the user wallet.
 * @returns An object which contains: the address of the account, the reference to the wallet and the reference to the provider.
 */
const connectWallet = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send("eth_requestAccounts", [])
  const signer = provider.getSigner()
  const accountAddress = await signer.getAddress();

  const keypair = await SEA.pair();

  return {address: accountAddress, wallet:signer, provider: provider, gunKeypair:keypair}
}

async function encryptMessage(msg: string, encryptingKeyPair: ISEAPair) {
  const encrypted = await SEA.encrypt(msg, encryptingKeyPair);
  return encrypted;
}

/**
 * Hash a string in base64.
 * @param string 
 * @returns The string in base64 format
 */
function HashNamespace (string:string) {
    return window.btoa(string);
}

/**
 * This function is used to send a message to someone or a group of persons. 
 * @param payload The message to send.
 * @param to The array containing the addresses of the persons you want to send the message to.  
 * @param provider A reference to the wallet provider. 
 * @returns If the message was sent it returns an object containing: the date when the message was sent, the encrypted message, the reference to the chat for gun, 
 */
const sendmessage = async (payload:string, to: string[], provider:ethers.providers.Web3Provider, gunKeypair:ISEAPair) => {

  const sender_address = await provider.getSigner().getAddress();
  to.push(sender_address)
  
  try {
    const encrypted_data = await encryptMessage(payload, gunKeypair);
    const chat = gun.get(HashNamespace(await to.sort().join()));

    const ensDomain = await provider.lookupAddress(sender_address)

    await chat.set({ date: Date.now(), encryptedMSG:encrypted_data, from:sender_address, ensFrom: ensDomain })

    return {sent: true, encrypted: encrypted_data, chat:chat}

  } catch (e) {
    console.log(e)
    return {sent: false, why: e}
  }
}


/**
 * This function retrieves the message for a certain conversation.
 * @param from Where to get the message from...
 * @param provider A reference to the wallet provider.
 * @returns An array containing the messsages.
 */
const receiveMessage = async (from: string[], provider:ethers.providers.Web3Provider, gunKeypair:ISEAPair) => {

  const sender_address = await provider.getSigner().getAddress();

  await from.push(sender_address);

  const chat = gun.get(HashNamespace(from.sort().join()));

  let messages:any[] = [];
  await chat?.map().on(async data => {
    const {date, from, ensFrom} = data;

    const decrypted = await SEA.decrypt(data.encryptedMSG, gunKeypair);

    await messages.push(
      {
        sentAt:date,
        from:from,
        name:ensFrom,

        encrypted: data.encryptedMSG,
        content: decrypted
      }
    )
  })

  return await messages;
}

export {
  sendmessage,
  receiveMessage,
  connectWallet
}