import { LibSingleton } from "./lib";

export async function verify(token:any, opts:any):Promise<any>{
    let instance = LibSingleton.getInstance()
    return instance.lib.verify(token, opts)
}

export async function validate(token:any):Promise<any>{
    let instance = LibSingleton.getInstance()
    return instance.lib.validate(token)
}