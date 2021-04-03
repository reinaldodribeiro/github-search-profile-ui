import { HttpConfig } from "./http-config";

export interface AxiosRequestDispatcherArgs {
    url: string;
    method: 'get' | 'post' | 'delete' | 'put' | 'patch';
    data?: any;
    config?: HttpConfig;
}