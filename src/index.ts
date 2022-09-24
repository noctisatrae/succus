import { getProvider } from "./web3";
import { HashNamespace, registerKeypair, getKeypair } from "./utils";
import { gun, dbConf, encryptMessage, SEA, ISEAPair } from "./db";

/**
 * This function is used to send a message to someone or a group of persons.
 * @async
 * @function 
 * @param {string} payload The message to send.
 * @param {string[]} to The array containing the addresses of the persons you want to send the message to.  
 * @param {ISEAPair} gunKeypair The keypair used to decrypt messages. 
 * @returns {Promise<SendMessageConfirmationReturn>}  If the message was sent it returns an object containing: the date when the message was sent, the encrypted message, the reference to the chat for gun.
 * @example
 * await sendmessage("Hello stranger!", [<ETH addresses here>], <KeyPairForEncryption => generate it with SEA.pair()>)
 */
const sendmessage = async (payload:string, to: string[], gunKeypair:ISEAPair):Promise<SendMessageConfirmationReturn> => {

  const provider = await getProvider();

  const sender_address = await provider!.getSigner().getAddress();
  to.push(sender_address)
  
  try {
    const encrypted_data = await encryptMessage(payload, gunKeypair);
    const chat = gun.get(HashNamespace(await to.sort().join()));

    const ensDomain = await provider!.lookupAddress(sender_address)

    await chat.set({ date: Date.now(), encryptedMSG:encrypted_data, from:sender_address, ensFrom: ensDomain })

    return {sent: true, encrypted: encrypted_data, chat:chat}

  } catch (e:any) {
    console.log(e)
    return {sent: false, why: e}
  }
}

/**
 * This function retrieves the message (constant stream!!) for a certain conversation.
 * @async
 * @function
 * @param from Where to get the message from...
 * @param callback The function allowing you to retrive the message!
 * @returns {Promise<Array<Message>>}  An array containing the messsages.
 * @example
 * await receiveMessageConstant([address], async (data) => {
 *  console.log(`${data.content} at ${data.sentAt} by ${data.name}!`)
 * })
 */
const receiveMessage = async (from: string[], callback: any) => {

  const provider = await getProvider();
  const sender_address = await provider!.getSigner().getAddress();

  await from.push(sender_address);

  await gun.get(HashNamespace(from.sort().join())).map().once(callback);
}

export {
  sendmessage,
  getProvider,
  HashNamespace,
  receiveMessage,
  dbConf,
  gun, 
  SEA,
  registerKeypair,
  getKeypair
}