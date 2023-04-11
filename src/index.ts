import * as Factory from "factory.ts";

import {Ucan} from './functions'

export * from './functions'

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

const pluginFactory = Factory.Sync.makeFactory<UCANPlugin>(factoryDefaults);

const plugin = pluginFactory.build();

export { UCANPlugin, pluginFactory, factoryDefaults, plugin };