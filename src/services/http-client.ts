import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpConfig } from '../models/http-config';
import { Observable } from 'rxjs';
import { AxiosRequestDispatcher } from '../util/axios-request-dispatcher';
import store from '../store';
import router from '@/router';

type ResponseFunction = (response: AxiosResponse) => AxiosResponse;
type RequestFunction = (config: AxiosRequestConfig) => AxiosRequestConfig;
type ErrorFunction = (e: any) => any;

class HttpClient {
    private http: AxiosInstance;

    constructor() {
        this.http = Axios.create({
            timeout: 60000,
        });
        this.setDefaultRequestInterceptors();
        this.setDefaultResponseInterceptors();
    }

    private setDefaultRequestInterceptors() {
        this.http.interceptors.request.use((config: any) => {
            if (config.url.includes(process.env.VUE_APP_API_URL)) {
                config.headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${store.getters['auth/getAccessKey']}`,
                    ...config.headers
                }
            }
            return config;
        });
    }

    private setDefaultResponseInterceptors() {
        this.http.interceptors.response.use(
            response => response,
            (e: AxiosError) => {
                let throwable: any = e;
                if (e.isAxiosError && e.response && e.response.data) {
                    throwable = e.response.data;
                }
                if(e.response.status === 401){
                    if(localStorage.getItem('accessKey')){
                        store.commit('auth/setIsLogged', false);
                        localStorage.removeItem('accessKey');
                        window.location.href = "login";
                    }
                }
                throw throwable;
            });
    }

    interceptRequest(onFulfilled: RequestFunction, onRejected?: ErrorFunction) {
        this.http.interceptors.request.use(onFulfilled, onRejected);
        return this;
    }
    
    get<T>(url: string, config?: HttpConfig): Observable<T> {
        return new AxiosRequestDispatcher(
            this.http,
            {
                url: process.env.VUE_APP_API_URL + url,
                method: 'get',
                config,
            }
        );
    }

    post<T>(url: string, data: T, config?: HttpConfig, auth?): Observable<any> {
        const httpFinal = auth ?  Axios.create({
            timeout: 60000,
            auth: auth
        }) : this.http;
        return new AxiosRequestDispatcher(
            httpFinal,
            {
                url: process.env.VUE_APP_API_URL + url,
                method: 'post',
                data,
                config
            }
        );
    }

    put<T>(url: string, data: Partial<T>, config?: HttpConfig): Observable<any> {
        return new AxiosRequestDispatcher(
            this.http,
            {
                url: process.env.VUE_APP_API_URL + url,
                method: 'put',
                data,
                config
            }
        );
    }

    patch<T>(url: string, data: Partial<T>, config?: HttpConfig): Observable<any> {
        return new AxiosRequestDispatcher(
            this.http,
            {
                url: process.env.VUE_APP_API_URL + url,
                method: 'patch',
                data,
                config
            }
        )
    }

    delete(url: string, config?: HttpConfig): Observable<any> {
        return new AxiosRequestDispatcher(
            this.http,
            {
                url: process.env.VUE_APP_API_URL + url,
                method: 'delete',
                config
            }
        );
    }
}

const instance = new HttpClient();
export { instance as HttpClient };

