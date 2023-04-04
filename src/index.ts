import * as Factory from "factory.ts";

import {capabilityWithExternalSign, verify} from './functions'

export * from './functions'

interface UCANPlugin {
  ucan: (keypair:any, payload:any) => Promise<string>;
  verify: (token:string, opts?:any) => Promise<any>
}

const factoryDefaults = {
  ucan: capabilityWithExternalSign,
  verify
};

const pluginFactory = Factory.Sync.makeFactory<UCANPlugin>(factoryDefaults);

const plugin = pluginFactory.build();

export { UCANPlugin, pluginFactory, factoryDefaults, plugin };