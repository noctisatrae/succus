import { ethers } from "ethers"
import { encrypt } from '@metamask/eth-sig-util';
import ascii85 from "ascii85";
import { Buffer } from "buffer";
import "crypto";
import Gun from "gun";

const gun = Gun({ localStorage: true, radisk:false });

/**
 * This function is used by succus to connect to the user wallet.
 * @returns An object which contains: the address of the account, the reference to the wallet and the reference to the provider.
 */
const connectWallet = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send("eth_requestAccounts", [])
  const signer = provider.getSigner()
  const accountAddress = await signer.getAddress()

  return {address: accountAddress, wallet:signer, provider: provider}
}

const { provider, address } = await connectWallet();

/**
 * Hash a string in base64.
 * @param string 
 * @returns The string in base64 format
 */
function HashNamespace (string:string) {
    return window.btoa(string);
}

/**
 * This function takes the public key and the data to be encrypted and send back everything encrypted.
 * @param publicKey - The bu
 * @param data 
 * @returns The data encrypted.
 */
function encryptData(publicKey: Buffer, data: string) {

  const enc = encrypt({
    publicKey: publicKey.toString('base64'),
    data: ascii85.encode(data).toString(),
    version: 'x25519-xsalsa20-poly1305',
  });

  
  return enc;
}

/**
 * This function is used to send a message to someone or a group of persons. 
 * @param payload The message to send.
 * @param to The array containing the addresses of the persons you want to send the message to.  
 * @param provider A reference to the wallet provider. 
 * @returns If the message was sent it returns an object containing: the date when the message was sent, the encrypted message, the reference to the chat for gun, 
 */
const sendmessage = async (payload:string, to: string[], provider:ethers.providers.Web3Provider) => {

  const sender_address = address;
  to.push(address)
  
  try {

    const encryption_key = await provider.send("eth_getEncryptionPublicKey", [sender_address]);
    const publicKey = Buffer.from(encryption_key, "base64");

    const encrypted_data = await encryptData(publicKey, payload);
    const chat = gun.get(HashNamespace(await to.sort().join()));

    console.log(HashNamespace(await to.sort().join()))

    await chat.set({ date: Date.now(), data:encrypted_data })

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
const receiveMessage = async (from: string[], provider:ethers.providers.Web3Provider) => {

  const sender_address = await provider.getSigner().getAddress();

  from.push(sender_address);

  const chat = gun.get(HashNamespace(from.sort().join()));

  console.log(HashNamespace(from.sort().join()))

  let messages:any[] = [];
  chat?.map().once(data => {
    gun.get(data.data["#"]).once((data:any) => {
      messages.push(data);
    });
  })

  return messages;
}

sendmessage("Hello world!", [address], provider);
receiveMessage([address], provider).then(message => {
  console.log(message);
}); 

// export { connectWallet, HashNamespace, sendmessage, receiveMessage }