import * as Factory from "factory.ts";

import {capabilityWithExternalKeyPair, verify, capabilityWithExternalSignFunc} from './functions'

export * from './functions'

interface UCANPlugin {
  ucan: (keypair:any, payload:any) => Promise<string>;
  verify: (token:string, opts?:any) => Promise<any>
  ucanFunc: (keypair:any, payload:any) => Promise<string>
}

const factoryDefaults = {
  ucan: capabilityWithExternalKeyPair,
  verify,
  ucanFunc: capabilityWithExternalSignFunc
};

const pluginFactory = Factory.Sync.makeFactory<UCANPlugin>(factoryDefaults);

const plugin = pluginFactory.build();

export { UCANPlugin, pluginFactory, factoryDefaults, plugin };