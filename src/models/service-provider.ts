export interface BaseProvider<T> {
    providers?: Providers;
    singleton?: boolean;
    create?: (...args: any[]) => T;
}

export interface InlineProvider<T> extends BaseProvider<T> {
    provide?: Function | string;
}

export interface ServiceProvider<T> extends BaseProvider<T> {
    new(...args: any[]): T;
}

export type Provider<T> = ServiceProvider<T> | InlineProvider<T>;

export type Providers = Provider<any>[];
