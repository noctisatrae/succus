import { gun, ISEAPair } from "../db";

/**
 * Thus function registers a keypair for a defined user.
 * @param {string} address The address to register keypair for.
 * @param {ISEAPair} keypair The kepair which will be saved.
 */
const registerKeypair = (address:string, keypair:ISEAPair) => {
    
    const { epub, pub } = keypair;
    gun.get(`skeypair${address}`).put({epub, pub})

}

export default registerKeypair;