import {encodeKey, decodeKey} from './codec'
import { EdKeypair } from '@mkabanau/default-plugins'
test("encode and decode wallet2020 content", async ()=>{
    let key = await EdKeypair.create({exportable:true})
    let content = await encodeKey("test", key)
    let key2 = decodeKey(content)
    expect(key2.did()).toBe(key.did())
})