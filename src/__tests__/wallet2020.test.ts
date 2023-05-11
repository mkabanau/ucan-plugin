import * as ucans from "@mkabanau/ucans"
describe("wallet2020 capability", () => {


    test("generate features", async ()=>{
        let issuer = await ucans.EdKeypair.create({exportable:true})
        let audience = await ucans.EdKeypair.create({exportable:true})
        let activator = await ucans.EdKeypair.create({exportable:true})
        let issuerPrivateKey = await issuer.export()
        let audiencePrivateKey = await audience.export()
        let activatorPrivateKey = await activator.export()
        console.log("issuerPrivateKey: ", issuerPrivateKey)

        console.log("audiencePrivateKey: ", audiencePrivateKey)

        console.log("activatorPrivateKey: ", activatorPrivateKey)
    })

    test("Issue", async () => {
        let issuer = await ucans.EdKeypair.create({exportable:true})
        let audience = await ucans.EdKeypair.create({exportable:true})
        let activator = await ucans.EdKeypair.create({exportable:true})
        const rootUcan = {
            issuer: issuer.did(),
            audience: audience.did(), // recipient DID
            capabilities: [ // permissions for ucan
                {
                    with: { scheme: "did", hierPart: "maksim.link" },
                    can: { namespace: "dns", segments: ["read"] }
                }
            ]
        }
    
        const verifyRootUcan = {
            audience: audience.did(), 
            requiredCapabilities: [
                {
                    capability: {
                        with: { scheme: "did", hierPart: "maksim.link" },
                        can: { namespace: "dns", segments: ["read"] }
                    },
                    rootIssuer: issuer.did(),
                }
            ]
        }
        let payloadToSign = ucans.buildPayload(rootUcan)
        let token = await ucans.sign(payloadToSign, issuer.jwtAlg, async payload => issuer.sign(payload))
        let encodedToken = ucans.encode(token)
        console.log(encodedToken)
        let result = await ucans.validate(encodedToken)
        console.log(result)
        expect(result).not.toBeUndefined()
    })

    test("Verify", async () => {
        // expect(undefined).toBe(true)
    })

    test("Prove", async () => {
        // expect(undefined).toBe(true)
    })

    test("Derive", async () => {
        // expect(undefined).toBe(true)
    })
})