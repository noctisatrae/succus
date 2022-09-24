import { gun, ISEAPair } from "../db";

const registerKeypair = (address:string, keypair: ISEAPair) => {
    gun.get("keypairs").get(address).put(keypair);
}

export default registerKeypair;