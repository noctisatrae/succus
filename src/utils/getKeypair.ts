import { gun } from "../db";

interface pubPair {
    epub: string,
    pub: string
}

let keypair: pubPair;

const getKeypair = async (address: string): Promise<pubPair> => {

    await gun.get(`skeypair${address}`).once(async data => { 
        await (keypair = data); 
    })

    return await keypair;
}

export default getKeypair;