import { issue } from './issue'
import {EdKeypair} from '@mkabanau/default-plugins'
import { toSign, defaultAudience } from "./features";

test("issue capability", async () => {
    const keypair = await EdKeypair.create()
    let cap = toSign(keypair.did(),defaultAudience)
    let token = await issue(cap, {iss:keypair})
    expect(token).not.toBeUndefined()
})