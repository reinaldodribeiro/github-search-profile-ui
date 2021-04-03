import { Provider } from "../models/service-provider";
import { Container } from "./container";

export function blank(value: any): boolean {
    if (value === null || value === undefined) {
        return true;
    }
    if (typeof value === 'string') {
        return value.trim().length === 0;
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (value instanceof ArrayBuffer) {
        return value.byteLength === 0;
    }
    return false;
}

export function wrapIntoArray(value: any): any[] {
    if (blank(value)) return [];
    if (Array.isArray(value)) return value;
    return [value];
}

export function getUrl(baseUrl: string, ...path: string[]): string {
    path = wrapIntoArray(path);
    const extra = path.length ? path.reduce((previous, current, index) => previous + '/' + current) : '';
    const fullUrl = baseUrl.endsWith('/') ? baseUrl + extra : baseUrl + '/' + extra;
    return fullUrl;
}

/**
 * Resolves an instance from the container service
 * 
 * @param provider The dependency provider to be resolved
 * @return The resolved service
 */
export function make<T>(provider: Provider<T>): T {
    return Container.getInstance().get(provider);
}

export function consoleLog(...args: any[]): void {
    if (!process.env) {
        console.log(...args);
    }
}

export function valueFrom(obj: any, prop: any, defaultValue?: any) {
    return obj && obj[prop] ? obj[prop] : defaultValue;
}

const secondsToTime = (secs: number) => {
    const hours = Math.floor(secs / (60 * 60));

    const divisorForMinutes = secs % (60 * 60);
    const minutes = Math.floor(divisorForMinutes / 60);
    const divisorForSeconds = divisorForMinutes % 60;
    const seconds = Math.ceil(divisorForSeconds);

    const obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
}

export function prepareData<T>(data: T): Partial<T> {
    const finalData = new Object() as Partial<T>;
    for(const key in data){
        if(data[key] !== undefined){
            finalData[key] = data[key]
        }
    }
    return finalData;
}


export { secondsToTime };
