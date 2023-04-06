import { capability, capabilityWithExternalSign } from "../index"

import * as ucans from "@ucans/ucans"


const toSign = {
    audience: "did:key:zabcde...", // recipient DID
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
}

describe("explore ucans", () => {

    test("create ucan capability", async () => {
        const token = await capability()
        console.log(token)
        expect(token).not.toBeFalsy()
    })

    test("create ucan capability", async () => {
        const keypair = await ucans.EdKeypair.create({ exportable: true })
        const token = await capabilityWithExternalSign(keypair, toSign)
        console.log(token)
        expect(token).not.toBeFalsy()
    })
})


class Wallet {
    private keystorage: Map<string, string>
    private webkms: any
    private ucan: any
    private store: ucans.StoreI
    constructor() {
        this.keystorage = new Map<string, string>()
    }
    static async Init(): Promise<Wallet> {
        const wallet = new Wallet()
        await wallet.initUcanStorate()
        return wallet
    }
    async initUcanStorate() {
        this.store = await ucans.Store.empty(ucans.equalCanDelegate)
    }
    async key(): Promise<string> {
        const keypair = await ucans.EdKeypair.create({ exportable: true })

        this.keystorage.set(keypair.did(), await keypair.export())
        return keypair.did()

    }
    async createucan(iss: string, payload: any): Promise<string> {
        const secret = this.keystorage.get(iss)
        if (!secret) {
            throw Error(`secret key is not found for ${iss}`)
        }
        const keypair = ucans.EdKeypair.fromSecretKey(secret)
        const token = await capabilityWithExternalSign(keypair, payload)
        //this.store.add(ucans.parse(token))
        return token
    }

    async verify(token: string, opts?: any): Promise<any> {
        return await ucans.verify(token, opts)
    }

    async validate(token:string): Promise<any> {
        return await ucans.validate(token)
    }

}

describe("pixi flow", () => {


    test("creat key", async () => {
        const wallet = await Wallet.Init()
        const issuerDID = await wallet.key()
        const token = await wallet.createucan(issuerDID, toSign)
        expect(token).not.toBeFalsy()
        const result = await wallet.verify(token, {
            audience: toSign.audience, requiredCapabilities: [
                {
                    capability: {
                        with: { scheme: "mailto", hierPart: "boris@fission.codes" },
                        can: { namespace: "msg", segments: ["SEND"] }
                    },
                    rootIssuer: issuerDID,
                }
            ]
        }
        )
        expect(result.ok).toEqual(true)
        const result2  = await wallet.validate(token)
        console.log(result2)
        expect(result2).not.toBeUndefined()
    })

})