import {DidKeyPlugin, EdKeypair, buildPayload, encode} from "@mkabanau/ucans"
import {getPluginInjectedApi} from "@mkabanau/core"

import { Plugins } from "@mkabanau/core"
import { ed25519Plugin, rsaPlugin, rsaOldPlugin, p256Plugin } from "@mkabanau/default-plugins"


export class Ucan {
    lib:any
    constructor(plugin?:DidKeyPlugin) {
        const defaults = new Plugins(
            [ed25519Plugin, p256Plugin, rsaPlugin, rsaOldPlugin, plugin],
            {},
          )
        this.lib = getPluginInjectedApi(defaults)

    }
    async capabilityWithExternalKeyPair(keypair:EdKeypair, payload: any): Promise<string> {
        payload.issuer = keypair.did()
        const payloadForSign = await buildPayload(payload)
        const ucan = await this.lib.signWithKeypair(payloadForSign, keypair)
        const token = encode(ucan) // base64 jwt-formatted auth token
        return token
    
    }
    
    
    async verify(token: string, opts?: any): Promise<any> {
        return await this.lib.verify(token, opts)
    }
    
    async capabilityWithExternalSignFunc(keypair:any, payload: any): Promise<string> {
        payload.issuer = keypair.did()
        const payloadForSign = await buildPayload(payload)
        const ucan = await this.lib.sign(payloadForSign, keypair.jwtAlg, data => keypair.sign(data))
        const token = encode(ucan) // base64 jwt-formatted auth token
        return token
    }

}
