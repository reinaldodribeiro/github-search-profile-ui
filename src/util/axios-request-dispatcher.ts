import Axios, { AxiosInstance, AxiosPromise } from "axios";
import { AxiosRequestDispatcherArgs } from "../models/axios-request-dispatcher-args";
import { from, Observable, Subscriber } from "rxjs";
import { map, tap } from "rxjs/operators";
import { prepareData } from "./helpers";

export class AxiosRequestDispatcher<T = any> extends Observable<T>  {
    private cancelTokenSource = Axios.CancelToken.source();
    private completed = false;

    constructor(
        private http: AxiosInstance,
        private args: AxiosRequestDispatcherArgs
    ) {
        super(subscriber => this.dispatch(subscriber));
    }

    private dispatch(subscriber: Subscriber<T>) {
        const config: any = { ...this.args.config, cancelToken: this.cancelTokenSource.token };
        let promise: AxiosPromise<T>;
        if (this.args.method === 'post' || this.args.method === 'put' || this.args.method === 'patch') {
            promise = this.http[this.args.method](this.args.url, this.args.data, config);
        } else {
            const finalConfig = {
                ...config,
                params: prepareData(config.params)
            }
            promise = this.http[this.args.method](this.args.url, finalConfig);
        }
        from(promise)
            .pipe(
                tap({
                    complete: () => { this.completed = true },
                    error: () => { this.completed = true }
                }),
                map(response => response.data)
            )
            .subscribe(subscriber);
        return () => {
            if (!this.completed) {
                console.log('Cancel');
                this.cancel();
            }
        }
    }

    private cancel(): void {
        this.cancelTokenSource.cancel('Request has been canceled');
    }

    getMethod() {
        return this.args.method;
    }

}
