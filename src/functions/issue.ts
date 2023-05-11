// import { DidableKey } from "@mkabanau/core";
import { LibSingleton } from "./lib";
import { buildPayload} from "@mkabanau/core"

export async function issue(cap:any, opts:any):Promise<any>{
    const instance = LibSingleton.getInstance()
    const payloadForSign = await buildPayload(cap)
    if (!instance.lib.sign) {
        throw Error("function sign is not defined")
    }
    return instance.lib.sign(payloadForSign, opts.iss.jwtAlg, data => opts.iss.sign(data))
}