import * as ucans from "@ucans/ucans"
import {getPluginInjectedApi} from "@ucans/core"
import { defaults } from "@ucans/default-plugins"

const lib = getPluginInjectedApi(defaults)

export const capabilityWithExternalKeyPair = async (keypair:ucans.EdKeypair, payload: any): Promise<string> => {
    payload.issuer = keypair.did()
    const payloadForSign = await ucans.buildPayload(payload)
    const ucan = await lib.signWithKeypair(payloadForSign, keypair)
    const token = ucans.encode(ucan) // base64 jwt-formatted auth token
    return token

}


export const verify = async (token: string, opts?: any): Promise<any> =>{
    return await lib.verify(token, opts)
}

export const capabilityWithExternalSignFunc = async (keypair:ucans.EdKeypair, payload: any): Promise<string> => {
    payload.issuer = keypair.did()
    const payloadForSign = await ucans.buildPayload(payload)
    const ucan = await lib.sign(payloadForSign, keypair.jwtAlg, data => keypair.sign(data))
    const token = ucans.encode(ucan) // base64 jwt-formatted auth token
    return token
}