export interface Options {
    iss?: any
    aud?: string
    [name:string]:any
}
export interface CapabilityService {
    issue(cap:any, opts:any):Promise<any>
    verify(cap:any, opts:any):Promise<any>
    derive(proof:any, cap:any, opts:any):Promise<any>
    prove(cap:any, opts:any):Promise<any>
    validate(cap:any, opts?:any):Promise<any>
}

export interface Codec {
    encode(cap:any, opts?:any):any
    decode(cap:any, opts?:any):any
}

export interface Codec2020 {
    encode(cap:any, opts?:any):any
    decode(cap:any, opts?:any):any
}