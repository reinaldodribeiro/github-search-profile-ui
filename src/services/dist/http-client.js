"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.HttpClient = void 0;
var axios_1 = require("axios");
var axios_request_dispatcher_1 = require("../util/axios-request-dispatcher");
var store_1 = require("../store");
var HttpClient = /** @class */ (function () {
    function HttpClient() {
        this.http = axios_1["default"].create({
            timeout: 60000
        });
        this.setDefaultRequestInterceptors();
        this.setDefaultResponseInterceptors();
    }
    HttpClient.prototype.setDefaultRequestInterceptors = function () {
        this.http.interceptors.request.use(function (config) {
            if (config.url.includes(process.env.VUE_APP_API_URL)) {
                config.headers = __assign({ 'Content-Type': 'application/json', Authorization: "Bearer " + store_1["default"].getters['auth/getAccessKey'] }, config.headers);
            }
            return config;
        });
    };
    HttpClient.prototype.setDefaultResponseInterceptors = function () {
        this.http.interceptors.response.use(function (response) { return response; }, function (e) {
            var throwable = e;
            if (e.isAxiosError && e.response && e.response.data) {
                throwable = e.response.data;
            }
            if (e.response.status === 401) {
                if (store_1["default"].getters['auth/isLogged']) {
                    store_1["default"].commit('auth/setIsLogged', false);
                    localStorage.removeItem('accessToken');
                    window.location.href = "login";
                }
            }
            throw throwable;
        });
    };
    HttpClient.prototype.interceptRequest = function (onFulfilled, onRejected) {
        this.http.interceptors.request.use(onFulfilled, onRejected);
        return this;
    };
    HttpClient.prototype.get = function (url, config) {
        return new axios_request_dispatcher_1.AxiosRequestDispatcher(this.http, {
            url: process.env.VUE_APP_API_URL + url,
            method: 'get',
            config: config
        });
    };
    HttpClient.prototype.post = function (url, data, config, auth) {
        var httpFinal = auth ? axios_1["default"].create({
            timeout: 60000,
            auth: auth
        }) : this.http;
        return new axios_request_dispatcher_1.AxiosRequestDispatcher(httpFinal, {
            url: process.env.VUE_APP_API_URL + url,
            method: 'post',
            data: data,
            config: config
        });
    };
    HttpClient.prototype.put = function (url, data, config) {
        return new axios_request_dispatcher_1.AxiosRequestDispatcher(this.http, {
            url: process.env.VUE_APP_API_URL + url,
            method: 'put',
            data: data,
            config: config
        });
    };
    HttpClient.prototype.patch = function (url, data, config) {
        return new axios_request_dispatcher_1.AxiosRequestDispatcher(this.http, {
            url: process.env.VUE_APP_API_URL + url,
            method: 'patch',
            data: data,
            config: config
        });
    };
    HttpClient.prototype["delete"] = function (url, config) {
        return new axios_request_dispatcher_1.AxiosRequestDispatcher(this.http, {
            url: process.env.VUE_APP_API_URL + url,
            method: 'delete',
            config: config
        });
    };
    return HttpClient;
}());
var instance = new HttpClient();
exports.HttpClient = instance;
