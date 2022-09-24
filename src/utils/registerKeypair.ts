import { gun, ISEAPair } from "../db";

const registerKeypair = (address:string, keypair: ISEAPair) => {
    
    const { epub, pub } = keypair;
    
    gun.get("keypairs").get(address).put({ epub:epub, pub:pub });
}

export default registerKeypair;