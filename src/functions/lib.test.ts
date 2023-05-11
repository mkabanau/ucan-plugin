import {LibSingleton} from "./lib"
test("lib singleton for ucan", () =>{

     const lib1 = LibSingleton.getInstance()
     const lib2 = LibSingleton.getInstance()
     expect(lib1 === lib2).toBe(true)
} )