import { DidableKey,buildPayload } from "@mkabanau/core";

import {getTimestampInSeconds} from "./util"

import { LibSingleton } from "./lib";

export async function prove(proof:any, opts:any):Promise<any>{
    let toSign = {
        issuer: opts.iss.did(),
        audience: opts.aud, 
        expiration: getTimestampInSeconds() + 300,
        proofs:[proof]
    }

    const instance = LibSingleton.getInstance()
    const payloadForSign = await buildPayload(toSign)
    if (!instance.lib.sign) {
        throw Error("function sign is not defined")
    }
    return instance.lib.sign(payloadForSign, opts.iss.jwtAlg, data => opts.iss.sign(data))
}