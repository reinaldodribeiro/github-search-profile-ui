import { Provider } from "../models/service-provider";
import { consoleLog } from "./helpers";

export class Container {
    private static instance: Container;
    private singletons: any = {};


    static getInstance() {
        if (!this.instance) {
            this.instance = new Container();
        }
        return this.instance;
    }

    get<T>(provider: Provider<T>): T {
        const key = this.resolveProviderKey(provider);
        consoleLog('Resolving...', key);
        let instance = this.singletons[key];
        if (instance) {
            consoleLog('Returning', key, 'from cache');
            return instance;
        }
        const args = this.resolveDeps(provider, key);
        if (!provider.create) {
            throw new Error(`Provider for ${key} does not have method create`)
        }
        instance = provider.create(...args);
        if (provider.singleton) {
            this.singletons[key] = instance;
        }
        return instance;
    }

    private resolveProviderKey(provider: Provider<any>): string {
        if (typeof provider == 'function') {
            return provider.name;
        }
        if (!provider.provide) {
            throw new Error('Provide not defined');
        }
        return typeof provider.provide == 'string' ? provider.provide : provider.provide.name;
    }

    private resolveDeps(provider: Provider<any>, typeName: string): any[] {
        const resolvedDeps: any[] = [];
        if (provider.providers) {
            consoleLog('Resolving deps of', typeName);
            for (const dep of provider.providers) {
                resolvedDeps.push(this.get(dep));
            }
        }
        return resolvedDeps;
    }

}
