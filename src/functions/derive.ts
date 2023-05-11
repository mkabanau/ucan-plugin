import { DidableKey } from "@mkabanau/core";
import { LibSingleton } from "./lib";
import { buildPayload} from "@mkabanau/core"

export async function derive(proof:any, cap:any, opts:any):Promise<any>{
      if (!cap.issuer){
        cap.issuer = opts.iss.did()
      }
      if (cap.issuer != opts.iss.did()) {
        return undefined;
      }
      const instance = LibSingleton.getInstance()
      if (!cap.proofs) {
        cap.proofs = [proof]
      }
      const payloadForSign = await buildPayload(cap)
      if (!instance.lib.sign) {
          throw Error("function sign is not defined")
      }
      return instance.lib.sign(payloadForSign, opts.iss.jwtAlg, data => opts.iss.sign(data))
    return 
}