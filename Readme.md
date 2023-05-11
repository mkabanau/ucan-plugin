# pixi wallet ucan plugin 

Implementation of capability interface for universal wallet 2020 with UCAN specification.

## Interface 
```ts
interface Options {
    iss?: string
    aud?: string
}
interface CapabilityService {
    issue(cap:any, opts:Options):Promise<any>
    verify(cap:any, opts:Options):Promise<any>
    derive(proof:any, cap:any, opts:Options):Promise<any>
    prove(cap:any, opts:Options):Promise<any>
}

interface Codec {
    encode(cap:any, opts?:any):any
    decode(cap:any, opts?:any):any
}

interface Codec2020 {
    encode(cap:any, opts?:any):any
    decode(cap:any, opts?:any):any
}
```

## Reference 

1. https://w3c-ccg.github.io/universal-wallet-interop-spec/
2. https://github.com/ucan-wg/spec
3. https://github.com/ucan-wg/invocation