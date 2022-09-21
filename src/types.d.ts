// Type definitions for succus v1.0
// Project: succus

import {ethers} from "ethers";
import { IGunChain, ISEAPair, IGunInstance } from "gun"

declare global {
    interface Window {
      ethereum: any;
    }

  type WalletInfo = {
      address: string,
      wallet: ethers.providers.JsonRpcSigner
      provider: ethers.providers.Web3Provider
  }
  
  type SendMessageConfirmationReturn = {
    sent?: boolean
    encrypted?: string
    chat?: IGunChain<any, IGunInstance<any>, IGunInstance<any>, string>
    why?: any
  }
  
  type Message = {
    sentAt:number
    from: string
    name: string
    encrypted: string
    content: string
  }
}

export {}