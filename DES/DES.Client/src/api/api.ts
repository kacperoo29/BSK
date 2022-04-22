/* tslint:disable */
/* eslint-disable */
/**
 * DES.Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface Input64
 */
export interface Input64 {
    /**
     * 
     * @type {number}
     * @memberof Input64
     */
    'input'?: number;
    /**
     * 
     * @type {number}
     * @memberof Input64
     */
    'key'?: number;
}

/**
 * DESApi - axios parameter creator
 * @export
 */
export const DESApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {Array<any>} [files] 
         * @param {number} [key] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiEncodeFilePost: async (files?: Array<any>, key?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/encodeFile`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();

            if (files) {
                files.forEach((element) => {
                    localVarFormParams.append('Files', element as any);
                })
            }
    
            if (key !== undefined) { 
                localVarFormParams.append('Key', key as any);
            }            

            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {Input64} [input64] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiEncodePost: async (input64?: Input64, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/encode`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(input64, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DESApi - functional programming interface
 * @export
 */
export const DESApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DESApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {Array<any>} [files] 
         * @param {number} [key] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiEncodeFilePost(files?: Array<any>, key?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<any>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiEncodeFilePost(files, key, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {Input64} [input64] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiEncodePost(input64?: Input64, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<number>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiEncodePost(input64, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DESApi - factory interface
 * @export
 */
export const DESApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DESApiFp(configuration)
    return {
        /**
         * 
         * @param {Array<any>} [files] 
         * @param {number} [key] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiEncodeFilePost(files?: Array<any>, key?: number, options?: any): AxiosPromise<Array<any>> {
            return localVarFp.apiEncodeFilePost(files, key, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {Input64} [input64] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiEncodePost(input64?: Input64, options?: any): AxiosPromise<number> {
            return localVarFp.apiEncodePost(input64, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DESApi - object-oriented interface
 * @export
 * @class DESApi
 * @extends {BaseAPI}
 */
export class DESApi extends BaseAPI {
    /**
     * 
     * @param {Array<any>} [files] 
     * @param {number} [key] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DESApi
     */
    public apiEncodeFilePost(files?: Array<any>, key?: number, options?: AxiosRequestConfig) {
        return DESApiFp(this.configuration).apiEncodeFilePost(files, key, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {Input64} [input64] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DESApi
     */
    public apiEncodePost(input64?: Input64, options?: AxiosRequestConfig) {
        return DESApiFp(this.configuration).apiEncodePost(input64, options).then((request) => request(this.axios, this.basePath));
    }
}


