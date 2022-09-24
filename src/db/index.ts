import Gun, { ISEAPair } from "gun";
import "gun/sea";

import dbConf from "./dbConf";
import encryptMessage from "./encryptMessage";

const gun = Gun({ localStorage: false, radisk:false });
const SEA = Gun.SEA;

export { gun, SEA, dbConf, encryptMessage };
export type { ISEAPair };
