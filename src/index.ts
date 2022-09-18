import { ethers } from "ethers"
import Gun, { ISEAPair } from "gun";
import "gun/sea";

const gun = Gun({ localStorage: false, radisk:false });
const SEA = Gun.SEA;

/**
 * This function is used by succus to connect to the user wallet.
 * @async
 * @function
 * @returns {Promise<WalletInfo>} An object which contains: the address of the account, the reference to the wallet and the reference to the provider.
 * @example
 * const {address, wallet, provider, gunKeypair} = connectWallet();
 * console.log(address) // 0x...
 */
const connectWallet = async (): Promise<WalletInfo> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send("eth_requestAccounts", [])
  const signer = provider.getSigner()
  const accountAddress = await signer.getAddress();

  const keypair = await SEA.pair();

  return {address: accountAddress, wallet:signer, provider: provider, gunKeypair:keypair}
}

async function encryptMessage(msg: string, encryptingKeyPair: ISEAPair):Promise<string> {
  const encrypted = await SEA.encrypt(msg, encryptingKeyPair);
  return encrypted;
}

/**
 * Hash a string in base64.
 * @async
 * @function
 * @param {string} string The string to be converted 
 * @returns {string} The string in base64 format
 * @example 
 * console.log(HashNamespace("Hello World")) // 'SGVsbG8gV29ybGQ='
 */
function HashNamespace (string:string) : string {
    return window.btoa(string);
}

/**
 * This function is used to send a message to someone or a group of persons.
 * @async
 * @function 
 * @param {string} payload The message to send.
 * @param {string[]} to The array containing the addresses of the persons you want to send the message to.  
 * @param {ethers.providers.Web3Provider} provider A reference to the wallet provider.
 * @param {ISEAPair} gunKeypair The keypair used to decrypt messages. 
 * @returns {Promise<SendMessageConfirmationReturn>}  If the message was sent it returns an object containing: the date when the message was sent, the encrypted message, the reference to the chat for gun.
 * @example
 * await sendmessage("Hello stranger!", [<ETH addresses here>], WalletProvider, <KeyPairForEncryption => generate it with SEA.pair()>)
 */
const sendmessage = async (payload:string, to: string[], provider:ethers.providers.Web3Provider, gunKeypair:ISEAPair):Promise<SendMessageConfirmationReturn> => {

  const sender_address = await provider.getSigner().getAddress();
  to.push(sender_address)
  
  try {
    const encrypted_data = await encryptMessage(payload, gunKeypair);
    const chat = gun.get(HashNamespace(await to.sort().join()));

    const ensDomain = await provider.lookupAddress(sender_address)

    await chat.set({ date: Date.now(), encryptedMSG:encrypted_data, from:sender_address, ensFrom: ensDomain })

    return {sent: true, encrypted: encrypted_data, chat:chat}

  } catch (e:any) {
    console.log(e)
    return {sent: false, why: e}
  }
}


/**
 * This function retrieves the message for a certain conversation.
 * @async
 * @function
 * @param from Where to get the message from...
 * @param provider A reference to the wallet provider.
 * @returns {Promise<Array<Message>>}  An array containing the messsages.
 * @example
 * const messages = await receiveMessage(from:[eth Addresses], <WalletProvider>, KeyPairToDecryptMSG)
 * console.table(messages);
 */
const receiveMessage = async (from: string[], provider:ethers.providers.Web3Provider, gunKeypair:ISEAPair): Promise<Array<Message>> => {

  const sender_address = await provider.getSigner().getAddress();

  await from.push(sender_address);

  const chat = gun.get(HashNamespace(from.sort().join()));

  let messages:Array<Message> = [];
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

const receiveMessageConstant = async (from: string[], provider:ethers.providers.Web3Provider, callback: any) => {

  const sender_address = await provider.getSigner().getAddress();

  await from.push(sender_address);

  const chat = gun.get(HashNamespace(from.sort().join()));

  return {dbStream: await chat?.map().on(callback)}
}

export {
  sendmessage,
  receiveMessage,
  connectWallet, 
  HashNamespace,
  receiveMessageConstant
}