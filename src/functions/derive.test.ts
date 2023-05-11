import {derive} from './derive'
import { toSign, toVerify, toDerive } from './features'
import { verify } from "./verify";
import {EdKeypair} from '@mkabanau/default-plugins'
import {encode} from '@mkabanau/core'
import {issue} from "./issue"

test("test derive function", async ()=>{
    const issuer = await EdKeypair.create()
    const audience = await EdKeypair.create()
    const delegee = await EdKeypair.create()
    let cap = toSign(issuer.did(), audience.did())
    let token = await issue(cap, {iss:issuer})
    let ecodedToken = encode(token)

    let derivedToken = await derive(ecodedToken, toDerive(audience.did(), delegee.did()), {iss:audience})
    let opts = toVerify(issuer.did(), delegee.did())
    let encodedDerivedToken = encode(derivedToken);
    console.log(encodedDerivedToken)
    let result = await verify(encodedDerivedToken, opts)
    console.log(result)
    expect(result.ok).toBeTruthy()
})