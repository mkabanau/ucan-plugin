import {getTimestampInSeconds} from "./util"
export const defaultAudience:string  = "did:key:zDnaegJhvyDSdYubg2ZobTDiEwHsuLMvwSwp92o6e98Uov4fH"
export function toSign(issuerDID:string, aud:string): any {
    return {
        issuer: issuerDID,
        audience: aud, // recipient DID
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
                can: { namespace: "msg", segments: ["SEND"] },
                nb: { token: "header.payload.signature" }
            }
        ],
        // proofs: ["test.test.test"],
        facts: [{ "hehe": { "hello": "friend" } }],
        // notBefore: getTimestampInSeconds(),
        expiration: getTimestampInSeconds() + 3600

    }
}
export function toDerive(issuerDID: string, audienceDID:string):any{
    return {
        issuer: issuerDID,
        audience: audienceDID, // recipient DID
        capabilities: [ // permissions for ucan
            {
                with: { scheme: "mailto", hierPart: "boris@fission.codes" },
                can: { namespace: "msg", segments: ["SEND"] },
                nb: { token: "header.payload.signature" }
            }
        ],
        notBefore: getTimestampInSeconds(),
        expiration: getTimestampInSeconds() + 360
    }
}

export function toVerify(issuerDID: string, aud:string): any {
    return {
        audience: aud, requiredCapabilities: [
            {
                capability: {
                    with: { scheme: "mailto", hierPart: "boris@fission.codes" },
                    can: { namespace: "msg", segments: ["SEND"] }
                },
                rootIssuer: issuerDID,
            }
        ]
    }
}