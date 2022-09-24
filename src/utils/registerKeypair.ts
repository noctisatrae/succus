import { gun, ISEAPair } from "../db";

const registerKeypair = (address:string, keypair:ISEAPair) => {
    
    const { epub, pub } = keypair;
    gun.get(`skeypair${address}`).put({epub, pub})

}

export default registerKeypair;