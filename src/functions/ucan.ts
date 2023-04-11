import * as ucans from "@ucans/ucans"
import {getPluginInjectedApi} from "@ucans/core"

import { Plugins } from "@ucans/core"
import { ed25519Plugin } from "@ucans/default-plugins/ed25519/plugin"
import { p256Plugin } from "@ucans/default-plugins/p256/plugin"
import { rsaPlugin, rsaOldPlugin } from "@ucans/default-plugins/rsa/plugin"


export class Ucan {
    lib:any
    constructor(plugin?:ucans.DidKeyPlugin) {
        const defaults = new Plugins(
            [ed25519Plugin, p256Plugin, rsaPlugin, rsaOldPlugin, plugin],
            {},
          )
        this.lib = getPluginInjectedApi(defaults)

    }
    capabilityWithExternalKeyPair = async (keypair:ucans.EdKeypair, payload: any): Promise<string> => {
        payload.issuer = keypair.did()
        const payloadForSign = await ucans.buildPayload(payload)
        const ucan = await this.lib.signWithKeypair(payloadForSign, keypair)
        const token = ucans.encode(ucan) // base64 jwt-formatted auth token
        return token
    
    }
    
    
    verify = async (token: string, opts?: any): Promise<any> =>{
        return await this.lib.verify(token, opts)
    }
    
    capabilityWithExternalSignFunc  = async (keypair:ucans.EdKeypair, payload: any): Promise<string> => {
        payload.issuer = keypair.did()
        const payloadForSign = await ucans.buildPayload(payload)
        const ucan = await this.lib.sign(payloadForSign, keypair.jwtAlg, data => keypair.sign(data))
        const token = ucans.encode(ucan) // base64 jwt-formatted auth token
        return token
    }

}
