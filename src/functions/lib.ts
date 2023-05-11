import { DidKeyPlugin, Plugins, getPluginInjectedApi } from "@mkabanau/core"
import { ed25519Plugin, p256Plugin, rsaPlugin, rsaOldPlugin } from "@mkabanau/default-plugins"
export class LibSingleton {
    private static instance: LibSingleton;
    lib:any

    private constructor(plugins: DidKeyPlugin[] = []) {
        // Private constructor to prevent external instantiation
        let defaultAlg = [ed25519Plugin, p256Plugin, rsaPlugin, rsaOldPlugin]
        let extendedAlg = defaultAlg
        // as empty array [] adds undefuned to an end and breaks initilization
        if (plugins.length > 0) {
            extendedAlg = [...extendedAlg, ...plugins]
        }
        const defaults = new Plugins(
            extendedAlg,
            {},
        )
        this.lib = getPluginInjectedApi(defaults)
    }

    public static getInstance(plugins?: DidKeyPlugin[]): any {
        if (!LibSingleton.instance) {
            LibSingleton.instance = new LibSingleton(plugins);
        }
        return LibSingleton.instance;
    }
}