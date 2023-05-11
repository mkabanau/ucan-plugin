import { DidableKey } from "@mkabanau/core"
import { EdKeypair } from "@mkabanau/default-plugins"

const KeyFormat = (id:string, controller: string, privateKey:any)=>{
    return {
        "@context": ["https://w3id.org/wallet/v1"],
        "id": id,
        "name": "test key",
        "image": "https://via.placeholder.com/150",
        "description" : "For testing only, totally compromised.",
        "tags": ["3link"],
        "correlation": ["4058a72a-9523-11ea-bb37-0242ac130002"],
        "controller": controller,
        "type": "Ed25519VerificationKey2018",
        "privateKeyBase64": privateKey,
        "publicKeyBase58": controller.split(":")[2]
      }
}
export async function encodeKey(id:string, key:any):Promise<any> {
    return KeyFormat(id, key.did(), await key.export())
}

export function decodeKey(content:any):EdKeypair {
    return EdKeypair.fromSecretKey(content.privateKeyBase64)
}