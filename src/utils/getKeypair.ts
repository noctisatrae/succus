import { gun } from "../db";

/**
 *
 * @async
 * @param of For which address would you like to fetch the key.
 * @returns ofKeypair The keypair of the address
 */
const getKeypair = async (of:string) => {
    let ofKeypair;
    await gun.get("keypairs").get(of).once(async keypair => {
        await (ofKeypair = keypair);
    });

    return await ofKeypair;
}

export default getKeypair;