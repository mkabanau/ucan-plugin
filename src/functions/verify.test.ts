import { verify } from "./verify";
import {EdKeypair} from '@mkabanau/default-plugins'
import {encode} from '@mkabanau/core'
import { toSign, toVerify, defaultAudience} from "./features";
import {issue} from "./issue"

test("verify signed signature", async ()=>{

    const keypair = await EdKeypair.create()
    let cap = toSign(keypair.did(),defaultAudience)
    let token = await issue(cap, {iss:keypair})
    let ecodedToken = encode(token)
    let opts = toVerify(keypair.did(),defaultAudience)
    let result = await verify(ecodedToken, opts)
    expect(result.ok).toBeTruthy()
    
})