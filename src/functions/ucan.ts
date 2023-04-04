import * as ucans from "@ucans/ucans"

export const capability = async (): Promise<string> => {
    
        const keypair = await ucans.EdKeypair.create()
        const ucan = await ucans.build({
            audience: "did:key:zabcde...", // recipient DID
            issuer: keypair, // signing key
            capabilities: [ // permissions for ucan
                {
                    with: { scheme: "wnfs", hierPart: "//boris.fission.name/public/photos/" },
                    can: { namespace: "wnfs", segments: ["OVERWRITE"] }
                },
                {
                    with: { scheme: "wnfs", hierPart: "//boris.fission.name/private/6m-mLXYuXi5m6vxgRTfJ7k_xzbmpk7LeD3qYt0TM1M0" },
                    can: { namespace: "wnfs", segments: ["APPEND"] }
                },
                {
                    with: { scheme: "mailto", hierPart: "boris@fission.codes" },
                    can: { namespace: "msg", segments: ["SEND"] }
                }
            ]
        })
        const token = ucans.encode(ucan) // base64 jwt-formatted auth token
        return token
    
}

export const capabilityWithExternalSign = async (keypair:ucans.EdKeypair, payload: any): Promise<string> => {
    payload.issuer = keypair.did()
    const payloadForSign = await ucans.buildPayload(payload)
    const ucan = await ucans.signWithKeypair(payloadForSign, keypair)
    const token = ucans.encode(ucan) // base64 jwt-formatted auth token
    return token

}


export const verify = async (token: string, opts?: any): Promise<any> =>{
    return await ucans.verify(token, opts)
}