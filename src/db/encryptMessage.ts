import { SEA, ISEAPair } from ".";

async function encryptMessage(msg: string, encryptingKeyPair: ISEAPair):Promise<string> {
    const encrypted = await SEA.encrypt(msg, encryptingKeyPair);
    return encrypted;
}

export default encryptMessage;