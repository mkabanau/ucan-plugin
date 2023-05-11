import * as Factory from "factory.ts";

import {Ucan, issue, verify, prove, derive, validate} from './functions'

export * from './functions'
export * from './types'
export {encode} from '@mkabanau/core'

import {CapabilityService} from './types'

export {Ucan} from './functions/ucan'
interface UCANPlugin { 
  ucan: (keypair:any, payload:any) => Promise<string>;
  verify: (token:string, opts?:any) => Promise<any>
  ucanFunc: (keypair:any, payload:any) => Promise<string>
}

const ucan = new Ucan()
const factoryDefaults = {
  ucan: ucan.capabilityWithExternalKeyPair,
  verify: ucan.verify,
  ucanFunc: ucan.capabilityWithExternalSignFunc
};

export const ucanDefault = {
  issue,
  verify,
  prove,
  derive,
  validate
}

export const capabilityPlugin = Factory.Sync.makeFactory<CapabilityService>(ucanDefault);

const pluginFactory = Factory.Sync.makeFactory<UCANPlugin>(factoryDefaults);

const plugin = pluginFactory.build();

export { UCANPlugin, pluginFactory, factoryDefaults, plugin };