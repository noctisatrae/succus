import { gun } from "../db";

const getKeypair = async (of:string) => {
    let ofKeypair;
    await gun.get("keypairs").get(of).once(async keypair => {
        await (ofKeypair = keypair);
    });

    return await ofKeypair;
}

export default getKeypair;