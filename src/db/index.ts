import Gun, { ISEAPair } from "gun";
import "gun/sea";

import dbConf from "./dbConf";
import encryptMessage from "./encryptMessage";

const gunConf = Gun({ localStorage: false, radisk:false });
const gun = gunConf.get("succus").get("testing")
const SEA = Gun.SEA;

export { gun, SEA, dbConf, gunConf, encryptMessage };
export type { ISEAPair };
