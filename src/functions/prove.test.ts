import {prove} from './prove'
import { toSign } from './features'
import { validate} from "./verify";
import {EdKeypair} from '@mkabanau/default-plugins'
import {encode} from '@mkabanau/core'
import {issue} from "./issue"

test("test prove function", async ()=>{
    const issuer = await EdKeypair.create()
    const clientAudience = await EdKeypair.create()
    const server = await EdKeypair.create()
    let cap = toSign(issuer.did(), clientAudience.did())
    let token = await issue(cap, {iss:issuer})
    let ecodedToken = encode(token)

    let proveToken = await prove(ecodedToken, {iss:clientAudience, aud:server.did()})
    let encodedProveToken = encode(proveToken);
    console.log(encodedProveToken)
    let result = await validate(encodedProveToken)
    console.log(result)
    expect(result.payload.aud).toBe(server.did())
})