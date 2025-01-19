"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @packageDocumentation
 * @module OdysseyCore
 */
const axios_1 = __importDefault(require("axios"));
const apibase_1 = require("./common/apibase");
const errors_1 = require("./utils/errors");
const fetchadapter_1 = require("./utils/fetchadapter");
const helperfunctions_1 = require("./utils/helperfunctions");
/**
 * OdysseyCore is middleware for interacting with Odyssey node RPC APIs.
 *
 * Example usage:
 * ```js
 * let odyssey = new OdysseyCore("127.0.0.1", 9650, "https")
 * ```
 *
 *
 */
class OdysseyCore {
    /**
     * Creates a new Odyssey instance. Sets the address and port of the main Odyssey Client.
     *
     * @param host The hostname to resolve to reach the Odyssey Client APIs
     * @param port The port to resolve to reach the Odyssey Client APIs
     * @param protocol The protocol string to use before a "://" in a request, ex: "http", "https", "git", "ws", etc ...
     */
    constructor(host, port, protocol = "http") {
        this.networkID = 0;
        this.hrp = "";
        this.auth = undefined;
        this.headers = {};
        this.requestConfig = {};
        this.apis = {};
        /**
         * Sets the address and port of the main Odyssey Client.
         *
         * @param host The hostname to resolve to reach the Odyssey Client RPC APIs.
         * @param port The port to resolve to reach the Odyssey Client RPC APIs.
         * @param protocol The protocol string to use before a "://" in a request,
         * ex: "http", "https", etc. Defaults to http
         * @param baseEndpoint the base endpoint to reach the Odyssey Client RPC APIs,
         * ex: "/rpc". Defaults to "/"
         * The following special characters are removed from host and protocol
         * &#,@+()$~%'":*?{} also less than and greater than signs
         */
        this.setAddress = (host, port, protocol = "http", baseEndpoint = "") => {
            host = host.replace(/[&#,@+()$~%'":*?<>{}]/g, "");
            protocol = protocol.replace(/[&#,@+()$~%'":*?<>{}]/g, "");
            const protocols = ["http", "https"];
            if (!protocols.includes(protocol)) {
                /* istanbul ignore next */
                throw new errors_1.ProtocolError("Error - OdysseyCore.setAddress: Invalid protocol");
            }
            this.host = host;
            this.port = port;
            this.protocol = protocol;
            this.baseEndpoint = baseEndpoint;
            let url = `${protocol}://${host}`;
            if (port != undefined && typeof port === "number" && port >= 0) {
                url = `${url}:${port}`;
            }
            if (baseEndpoint != undefined &&
                typeof baseEndpoint == "string" &&
                baseEndpoint.length > 0) {
                if (baseEndpoint[0] != "/") {
                    baseEndpoint = `/${baseEndpoint}`;
                }
                url = `${url}${baseEndpoint}`;
            }
            this.url = url;
        };
        /**
         * Returns the protocol such as "http", "https", "git", "ws", etc.
         */
        this.getProtocol = () => this.protocol;
        /**
         * Returns the host for the Odyssey node.
         */
        this.getHost = () => this.host;
        /**
         * Returns the IP for the Odyssey node.
         */
        this.getIP = () => this.host;
        /**
         * Returns the port for the Odyssey node.
         */
        this.getPort = () => this.port;
        /**
         * Returns the base endpoint for the Odyssey node.
         */
        this.getBaseEndpoint = () => this.baseEndpoint;
        /**
         * Returns the URL of the Odyssey node (ip + port)
         */
        this.getURL = () => this.url;
        /**
         * Returns the custom headers
         */
        this.getHeaders = () => this.headers;
        /**
         * Returns the custom request config
         */
        this.getRequestConfig = () => this.requestConfig;
        /**
         * Returns the networkID
         */
        this.getNetworkID = () => this.networkID;
        /**
         * Sets the networkID
         */
        this.setNetworkID = (netID) => {
            this.networkID = netID;
            this.hrp = (0, helperfunctions_1.getPreferredHRP)(this.networkID);
        };
        /**
         * Returns the Human-Readable-Part of the network associated with this key.
         *
         * @returns The [[KeyPair]]'s Human-Readable-Part of the network's Bech32 addressing scheme
         */
        this.getHRP = () => this.hrp;
        /**
         * Sets the the Human-Readable-Part of the network associated with this key.
         *
         * @param hrp String for the Human-Readable-Part of Bech32 addresses
         */
        this.setHRP = (hrp) => {
            this.hrp = hrp;
        };
        /**
         * Adds a new custom header to be included with all requests.
         *
         * @param key Header name
         * @param value Header value
         */
        this.setHeader = (key, value) => {
            this.headers[`${key}`] = value;
        };
        /**
         * Removes a previously added custom header.
         *
         * @param key Header name
         */
        this.removeHeader = (key) => {
            delete this.headers[`${key}`];
        };
        /**
         * Removes all headers.
         */
        this.removeAllHeaders = () => {
            for (const prop in this.headers) {
                if (Object.prototype.hasOwnProperty.call(this.headers, prop)) {
                    delete this.headers[`${prop}`];
                }
            }
        };
        /**
         * Adds a new custom config value to be included with all requests.
         *
         * @param key Config name
         * @param value Config value
         */
        this.setRequestConfig = (key, value) => {
            this.requestConfig[`${key}`] = value;
        };
        /**
         * Removes a previously added request config.
         *
         * @param key Header name
         */
        this.removeRequestConfig = (key) => {
            delete this.requestConfig[`${key}`];
        };
        /**
         * Removes all request configs.
         */
        this.removeAllRequestConfigs = () => {
            for (const prop in this.requestConfig) {
                if (Object.prototype.hasOwnProperty.call(this.requestConfig, prop)) {
                    delete this.requestConfig[`${prop}`];
                }
            }
        };
        /**
         * Sets the temporary auth token used for communicating with the node.
         *
         * @param auth A temporary token provided by the node enabling access to the endpoints on the node.
         */
        this.setAuthToken = (auth) => {
            this.auth = auth;
        };
        this._setHeaders = (headers) => {
            if (typeof this.headers === "object") {
                for (const [key, value] of Object.entries(this.headers)) {
                    headers[`${key}`] = value;
                }
            }
            if (typeof this.auth === "string") {
                headers.Authorization = `Bearer ${this.auth}`;
            }
            return headers;
        };
        /**
         * Adds an API to the middleware. The API resolves to a registered blockchain's RPC.
         *
         * In TypeScript:
         * ```js
         * odyssey.addAPI<MyVMClass>("mychain", MyVMClass, "/ext/bc/mychain")
         * ```
         *
         * In Javascript:
         * ```js
         * odyssey.addAPI("mychain", MyVMClass, "/ext/bc/mychain")
         * ```
         *
         * @typeparam GA Class of the API being added
         * @param apiName A label for referencing the API in the future
         * @param ConstructorFN A reference to the class which instantiates the API
         * @param baseurl Path to resolve to reach the API
         *
         */
        this.addAPI = (apiName, ConstructorFN, baseurl = undefined, ...args) => {
            if (typeof baseurl === "undefined") {
                this.apis[`${apiName}`] = new ConstructorFN(this, undefined, ...args);
            }
            else {
                this.apis[`${apiName}`] = new ConstructorFN(this, baseurl, ...args);
            }
        };
        /**
         * Retrieves a reference to an API by its apiName label.
         *
         * @param apiName Name of the API to return
         */
        this.api = (apiName) => this.apis[`${apiName}`];
        /**
         * @ignore
         */
        this._request = (xhrmethod, baseurl, getdata, postdata, headers = {}, axiosConfig = undefined) => __awaiter(this, void 0, void 0, function* () {
            let config;
            if (axiosConfig) {
                config = Object.assign(Object.assign({}, axiosConfig), this.requestConfig);
            }
            else {
                config = Object.assign({ baseURL: this.url, responseType: "text" }, this.requestConfig);
            }
            config.url = baseurl;
            config.method = xhrmethod;
            config.headers = headers;
            config.data = postdata;
            config.params = getdata;
            // use the fetch adapter if fetch is available e.g. non Node<17 env
            if (typeof fetch !== "undefined") {
                config.adapter = fetchadapter_1.fetchAdapter;
            }
            const resp = yield axios_1.default.request(config);
            // purging all that is axios
            const xhrdata = new apibase_1.RequestResponseData(resp.data, resp.headers, resp.status, resp.statusText, resp.request);
            return xhrdata;
        });
        /**
         * Makes a GET call to an API.
         *
         * @param baseurl Path to the api
         * @param getdata Object containing the key value pairs sent in GET
         * @param headers An array HTTP Request Headers
         * @param axiosConfig Configuration for the axios javascript library that will be the
         * foundation for the rest of the parameters
         *
         * @returns A promise for [[RequestResponseData]]
         */
        this.get = (baseurl, getdata, headers = {}, axiosConfig = undefined) => this._request("GET", baseurl, getdata, {}, this._setHeaders(headers), axiosConfig);
        /**
         * Makes a DELETE call to an API.
         *
         * @param baseurl Path to the API
         * @param getdata Object containing the key value pairs sent in DELETE
         * @param headers An array HTTP Request Headers
         * @param axiosConfig Configuration for the axios javascript library that will be the
         * foundation for the rest of the parameters
         *
         * @returns A promise for [[RequestResponseData]]
         */
        this.delete = (baseurl, getdata, headers = {}, axiosConfig = undefined) => this._request("DELETE", baseurl, getdata, {}, this._setHeaders(headers), axiosConfig);
        /**
         * Makes a POST call to an API.
         *
         * @param baseurl Path to the API
         * @param getdata Object containing the key value pairs sent in POST
         * @param postdata Object containing the key value pairs sent in POST
         * @param headers An array HTTP Request Headers
         * @param axiosConfig Configuration for the axios javascript library that will be the
         * foundation for the rest of the parameters
         *
         * @returns A promise for [[RequestResponseData]]
         */
        this.post = (baseurl, getdata, postdata, headers = {}, axiosConfig = undefined) => this._request("POST", baseurl, getdata, postdata, this._setHeaders(headers), axiosConfig);
        /**
         * Makes a PUT call to an API.
         *
         * @param baseurl Path to the baseurl
         * @param getdata Object containing the key value pairs sent in PUT
         * @param postdata Object containing the key value pairs sent in PUT
         * @param headers An array HTTP Request Headers
         * @param axiosConfig Configuration for the axios javascript library that will be the
         * foundation for the rest of the parameters
         *
         * @returns A promise for [[RequestResponseData]]
         */
        this.put = (baseurl, getdata, postdata, headers = {}, axiosConfig = undefined) => this._request("PUT", baseurl, getdata, postdata, this._setHeaders(headers), axiosConfig);
        /**
         * Makes a PATCH call to an API.
         *
         * @param baseurl Path to the baseurl
         * @param getdata Object containing the key value pairs sent in PATCH
         * @param postdata Object containing the key value pairs sent in PATCH
         * @param parameters Object containing the parameters of the API call
         * @param headers An array HTTP Request Headers
         * @param axiosConfig Configuration for the axios javascript library that will be the
         * foundation for the rest of the parameters
         *
         * @returns A promise for [[RequestResponseData]]
         */
        this.patch = (baseurl, getdata, postdata, headers = {}, axiosConfig = undefined) => this._request("PATCH", baseurl, getdata, postdata, this._setHeaders(headers), axiosConfig);
        if (host != undefined) {
            this.setAddress(host, port, protocol);
        }
    }
}
exports.default = OdysseyCore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2R5c3NleS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9vZHlzc2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztHQUdHO0FBQ0gsa0RBS2M7QUFDZCw4Q0FBK0Q7QUFDL0QsMkNBQThDO0FBQzlDLHVEQUFtRDtBQUNuRCw2REFBeUQ7QUFFekQ7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBcUIsV0FBVztJQXdiOUI7Ozs7OztPQU1HO0lBQ0gsWUFBWSxJQUFhLEVBQUUsSUFBYSxFQUFFLFdBQW1CLE1BQU07UUE5YnpELGNBQVMsR0FBVyxDQUFDLENBQUE7UUFDckIsUUFBRyxHQUFXLEVBQUUsQ0FBQTtRQU9oQixTQUFJLEdBQVcsU0FBUyxDQUFBO1FBQ3hCLFlBQU8sR0FBNEIsRUFBRSxDQUFBO1FBQ3JDLGtCQUFhLEdBQXVCLEVBQUUsQ0FBQTtRQUN0QyxTQUFJLEdBQTZCLEVBQUUsQ0FBQTtRQUU3Qzs7Ozs7Ozs7Ozs7V0FXRztRQUNILGVBQVUsR0FBRyxDQUNYLElBQXdCLEVBQ3hCLElBQVksRUFDWixXQUFtQixNQUFNLEVBQ3pCLGVBQXVCLEVBQUUsRUFDbkIsRUFBRTtZQUNSLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ2pELFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ3pELE1BQU0sU0FBUyxHQUFhLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNqQywwQkFBMEI7Z0JBQzFCLE1BQU0sSUFBSSxzQkFBYSxDQUNyQixrREFBa0QsQ0FDbkQsQ0FBQTthQUNGO1lBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7WUFDaEIsSUFBSSxDQUFDLElBQUksR0FB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QUE7UUFVRCxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1NBQ3RDO0lBQ0gsQ0FBQztDQUNGO0FBcGNELDhCQW9jQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIE9keXNzZXlDb3JlXG4gKi9cbmltcG9ydCBheGlvcywge1xuICBBeGlvc1JlcXVlc3RDb25maWcsXG4gIEF4aW9zUmVxdWVzdEhlYWRlcnMsXG4gIEF4aW9zUmVzcG9uc2UsXG4gIE1ldGhvZFxufSBmcm9tIFwiYXhpb3NcIlxuaW1wb3J0IHsgQVBJQmFzZSwgUmVxdWVzdFJlc3BvbnNlRGF0YSB9IGZyb20gXCIuL2NvbW1vbi9hcGliYXNlXCJcbmltcG9ydCB7IFByb3RvY29sRXJyb3IgfSBmcm9tIFwiLi91dGlscy9lcnJvcnNcIlxuaW1wb3J0IHsgZmV0Y2hBZGFwdGVyIH0gZnJvbSBcIi4vdXRpbHMvZmV0Y2hhZGFwdGVyXCJcbmltcG9ydCB7IGdldFByZWZlcnJlZEhSUCB9IGZyb20gXCIuL3V0aWxzL2hlbHBlcmZ1bmN0aW9uc1wiXG5cbi8qKlxuICogT2R5c3NleUNvcmUgaXMgbWlkZGxld2FyZSBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBPZHlzc2V5IG5vZGUgUlBDIEFQSXMuXG4gKlxuICogRXhhbXBsZSB1c2FnZTpcbiAqIGBgYGpzXG4gKiBsZXQgb2R5c3NleSA9IG5ldyBPZHlzc2V5Q29yZShcIjEyNy4wLjAuMVwiLCA5NjUwLCBcImh0dHBzXCIpXG4gKiBgYGBcbiAqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPZHlzc2V5Q29yZSB7XG4gIHByb3RlY3RlZCBuZXR3b3JrSUQ6IG51bWJlciA9IDBcbiAgcHJvdGVjdGVkIGhycDogc3RyaW5nID0gXCJcIlxuICBwcm90ZWN0ZWQgcHJvdG9jb2w6IHN0cmluZ1xuICBwcm90ZWN0ZWQgaXA6IHN0cmluZ1xuICBwcm90ZWN0ZWQgaG9zdDogc3RyaW5nXG4gIHByb3RlY3RlZCBwb3J0OiBudW1iZXJcbiAgcHJvdGVjdGVkIGJhc2VFbmRwb2ludDogc3RyaW5nXG4gIHByb3RlY3RlZCB1cmw6IHN0cmluZ1xuICBwcm90ZWN0ZWQgYXV0aDogc3RyaW5nID0gdW5kZWZpbmVkXG4gIHByb3RlY3RlZCBoZWFkZXJzOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9XG4gIHByb3RlY3RlZCByZXF1ZXN0Q29uZmlnOiBBeGlvc1JlcXVlc3RDb25maWcgPSB7fVxuICBwcm90ZWN0ZWQgYXBpczogeyBbazogc3RyaW5nXTogQVBJQmFzZSB9ID0ge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgYWRkcmVzcyBhbmQgcG9ydCBvZiB0aGUgbWFpbiBPZHlzc2V5IENsaWVudC5cbiAgICpcbiAgICogQHBhcmFtIGhvc3QgVGhlIGhvc3RuYW1lIHRvIHJlc29sdmUgdG8gcmVhY2ggdGhlIE9keXNzZXkgQ2xpZW50IFJQQyBBUElzLlxuICAgKiBAcGFyYW0gcG9ydCBUaGUgcG9ydCB0byByZXNvbHZlIHRvIHJlYWNoIHRoZSBPZHlzc2V5IENsaWVudCBSUEMgQVBJcy5cbiAgICogQHBhcmFtIHByb3RvY29sIFRoZSBwcm90b2NvbCBzdHJpbmcgdG8gdXNlIGJlZm9yZSBhIFwiOi8vXCIgaW4gYSByZXF1ZXN0LFxuICAgKiBleDogXCJodHRwXCIsIFwiaHR0cHNcIiwgZXRjLiBEZWZhdWx0cyB0byBodHRwXG4gICAqIEBwYXJhbSBiYXNlRW5kcG9pbnQgdGhlIGJhc2UgZW5kcG9pbnQgdG8gcmVhY2ggdGhlIE9keXNzZXkgQ2xpZW50IFJQQyBBUElzLFxuICAgKiBleDogXCIvcnBjXCIuIERlZmF1bHRzIHRvIFwiL1wiXG4gICAqIFRoZSBmb2xsb3dpbmcgc3BlY2lhbCBjaGFyYWN0ZXJzIGFyZSByZW1vdmVkIGZyb20gaG9zdCBhbmQgcHJvdG9jb2xcbiAgICogJiMsQCsoKSR+JSdcIjoqP3t9IGFsc28gbGVzcyB0aGFuIGFuZCBncmVhdGVyIHRoYW4gc2lnbnNcbiAgICovXG4gIHNldEFkZHJlc3MgPSAoXG4gICAgaG9zdDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHBvcnQ6IG51bWJlcixcbiAgICBwcm90b2NvbDogc3RyaW5nID0gXCJodHRwXCIsXG4gICAgYmFzZUVuZHBvaW50OiBzdHJpbmcgPSBcIlwiXG4gICk6IHZvaWQgPT4ge1xuICAgIGhvc3QgPSBob3N0LnJlcGxhY2UoL1smIyxAKygpJH4lJ1wiOio/PD57fV0vZywgXCJcIilcbiAgICBwcm90b2NvbCA9IHByb3RvY29sLnJlcGxhY2UoL1smIyxAKygpJH4lJ1wiOio/PD57fV0vZywgXCJcIilcbiAgICBjb25zdCBwcm90b2NvbHM6IHN0cmluZ1tdID0gW1wiaHR0cFwiLCBcImh0dHBzXCJdXG4gICAgaWYgKCFwcm90b2NvbHMuaW5jbHVkZXMocHJvdG9jb2wpKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgdGhyb3cgbmV3IFByb3RvY29sRXJyb3IoXG4gICAgICAgIFwiRXJyb3IgLSBPZHlzc2V5Q29yZS5zZXRBZGRyZXNzOiBJbnZhbGlkIHByb3RvY29sXCJcbiAgICAgIClcbiAgICB9XG5cbiAgICB0aGlzLmhvc3QgPSBob3N0XG4gICAgdGhpcy5wb3J0ID0gcG9ydFxuICAgIHRoaXMucHJvdG9jb2wgPSBwcm90b2NvbFxuICAgIHRoaXMuYmFzZUVuZHBvaW50ID0gYmFzZUVuZHBvaW50XG4gICAgbGV0IHVybDogc3RyaW5nID0gYCR7cHJvdG9jb2x9Oi8vJHtob3N0fWBcbiAgICBpZiAocG9ydCAhPSB1bmRlZmluZWQgJiYgdHlwZW9mIHBvcnQgPT09IFwibnVtYmVyXCIgJiYgcG9ydCA+PSAwKSB7XG4gICAgICB1cmwgPSBgJHt1cmx9OiR7cG9ydH1gXG4gICAgfVxuICAgIGlmIChcbiAgICAgIGJhc2VFbmRwb2ludCAhPSB1bmRlZmluZWQgJiZcbiAgICAgIHR5cGVvZiBiYXNlRW5kcG9pbnQgPT0gXCJzdHJpbmdcIiAmJlxuICAgICAgYmFzZUVuZHBvaW50Lmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgIGlmIChiYXNlRW5kcG9pbnRbMF0gIT0gXCIvXCIpIHtcbiAgICAgICAgYmFzZUVuZHBvaW50ID0gYC8ke2Jhc2VFbmRwb2ludH1gXG4gICAgICB9XG4gICAgICB1cmwgPSBgJHt1cmx9JHtiYXNlRW5kcG9pbnR9YFxuICAgIH1cbiAgICB0aGlzLnVybCA9IHVybFxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHByb3RvY29sIHN1Y2ggYXMgXCJodHRwXCIsIFwiaHR0cHNcIiwgXCJnaXRcIiwgXCJ3c1wiLCBldGMuXG4gICAqL1xuICBnZXRQcm90b2NvbCA9ICgpOiBzdHJpbmcgPT4gdGhpcy5wcm90b2NvbFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBob3N0IGZvciB0aGUgT2R5c3NleSBub2RlLlxuICAgKi9cbiAgZ2V0SG9zdCA9ICgpOiBzdHJpbmcgPT4gdGhpcy5ob3N0XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIElQIGZvciB0aGUgT2R5c3NleSBub2RlLlxuICAgKi9cbiAgZ2V0SVAgPSAoKTogc3RyaW5nID0+IHRoaXMuaG9zdFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwb3J0IGZvciB0aGUgT2R5c3NleSBub2RlLlxuICAgKi9cbiAgZ2V0UG9ydCA9ICgpOiBudW1iZXIgPT4gdGhpcy5wb3J0XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGJhc2UgZW5kcG9pbnQgZm9yIHRoZSBPZHlzc2V5IG5vZGUuXG4gICAqL1xuICBnZXRCYXNlRW5kcG9pbnQgPSAoKTogc3RyaW5nID0+IHRoaXMuYmFzZUVuZHBvaW50XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIFVSTCBvZiB0aGUgT2R5c3NleSBub2RlIChpcCArIHBvcnQpXG4gICAqL1xuICBnZXRVUkwgPSAoKTogc3RyaW5nID0+IHRoaXMudXJsXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1c3RvbSBoZWFkZXJzXG4gICAqL1xuICBnZXRIZWFkZXJzID0gKCk6IG9iamVjdCA9PiB0aGlzLmhlYWRlcnNcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VzdG9tIHJlcXVlc3QgY29uZmlnXG4gICAqL1xuICBnZXRSZXF1ZXN0Q29uZmlnID0gKCk6IEF4aW9zUmVxdWVzdENvbmZpZyA9PiB0aGlzLnJlcXVlc3RDb25maWdcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmV0d29ya0lEXG4gICAqL1xuICBnZXROZXR3b3JrSUQgPSAoKTogbnVtYmVyID0+IHRoaXMubmV0d29ya0lEXG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG5ldHdvcmtJRFxuICAgKi9cbiAgc2V0TmV0d29ya0lEID0gKG5ldElEOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICB0aGlzLm5ldHdvcmtJRCA9IG5ldElEXG4gICAgdGhpcy5ocnAgPSBnZXRQcmVmZXJyZWRIUlAodGhpcy5uZXR3b3JrSUQpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgSHVtYW4tUmVhZGFibGUtUGFydCBvZiB0aGUgbmV0d29yayBhc3NvY2lhdGVkIHdpdGggdGhpcyBrZXkuXG4gICAqXG4gICAqIEByZXR1cm5zIFRoZSBbW0tleVBhaXJdXSdzIEh1bWFuLVJlYWRhYmxlLVBhcnQgb2YgdGhlIG5ldHdvcmsncyBCZWNoMzIgYWRkcmVzc2luZyBzY2hlbWVcbiAgICovXG4gIGdldEhSUCA9ICgpOiBzdHJpbmcgPT4gdGhpcy5ocnBcblxuICAvKipcbiAgICogU2V0cyB0aGUgdGhlIEh1bWFuLVJlYWRhYmxlLVBhcnQgb2YgdGhlIG5ldHdvcmsgYXNzb2NpYXRlZCB3aXRoIHRoaXMga2V5LlxuICAgKlxuICAgKiBAcGFyYW0gaHJwIFN0cmluZyBmb3IgdGhlIEh1bWFuLVJlYWRhYmxlLVBhcnQgb2YgQmVjaDMyIGFkZHJlc3Nlc1xuICAgKi9cbiAgc2V0SFJQID0gKGhycDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5ocnAgPSBocnBcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IGN1c3RvbSBoZWFkZXIgdG8gYmUgaW5jbHVkZWQgd2l0aCBhbGwgcmVxdWVzdHMuXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgSGVhZGVyIG5hbWVcbiAgICogQHBhcmFtIHZhbHVlIEhlYWRlciB2YWx1ZVxuICAgKi9cbiAgc2V0SGVhZGVyID0gKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5oZWFkZXJzW2Ake2tleX1gXSA9IHZhbHVlXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIHByZXZpb3VzbHkgYWRkZWQgY3VzdG9tIGhlYWRlci5cbiAgICpcbiAgICogQHBhcmFtIGtleSBIZWFkZXIgbmFtZVxuICAgKi9cbiAgcmVtb3ZlSGVhZGVyID0gKGtleTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgZGVsZXRlIHRoaXMuaGVhZGVyc1tgJHtrZXl9YF1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBoZWFkZXJzLlxuICAgKi9cbiAgcmVtb3ZlQWxsSGVhZGVycyA9ICgpOiB2b2lkID0+IHtcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gdGhpcy5oZWFkZXJzKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuaGVhZGVycywgcHJvcCkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuaGVhZGVyc1tgJHtwcm9wfWBdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgY3VzdG9tIGNvbmZpZyB2YWx1ZSB0byBiZSBpbmNsdWRlZCB3aXRoIGFsbCByZXF1ZXN0cy5cbiAgICpcbiAgICogQHBhcmFtIGtleSBDb25maWcgbmFtZVxuICAgKiBAcGFyYW0gdmFsdWUgQ29uZmlnIHZhbHVlXG4gICAqL1xuICBzZXRSZXF1ZXN0Q29uZmlnID0gKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIHRoaXMucmVxdWVzdENvbmZpZ1tgJHtrZXl9YF0gPSB2YWx1ZVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBwcmV2aW91c2x5IGFkZGVkIHJlcXVlc3QgY29uZmlnLlxuICAgKlxuICAgKiBAcGFyYW0ga2V5IEhlYWRlciBuYW1lXG4gICAqL1xuICByZW1vdmVSZXF1ZXN0Q29uZmlnID0gKGtleTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgZGVsZXRlIHRoaXMucmVxdWVzdENvbmZpZ1tgJHtrZXl9YF1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCByZXF1ZXN0IGNvbmZpZ3MuXG4gICAqL1xuICByZW1vdmVBbGxSZXF1ZXN0Q29uZmlncyA9ICgpOiB2b2lkID0+IHtcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gdGhpcy5yZXF1ZXN0Q29uZmlnKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMucmVxdWVzdENvbmZpZywgcHJvcCkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucmVxdWVzdENvbmZpZ1tgJHtwcm9wfWBdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRlbXBvcmFyeSBhdXRoIHRva2VuIHVzZWQgZm9yIGNvbW11bmljYXRpbmcgd2l0aCB0aGUgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIGF1dGggQSB0ZW1wb3JhcnkgdG9rZW4gcHJvdmlkZWQgYnkgdGhlIG5vZGUgZW5hYmxpbmcgYWNjZXNzIHRvIHRoZSBlbmRwb2ludHMgb24gdGhlIG5vZGUuXG4gICAqL1xuICBzZXRBdXRoVG9rZW4gPSAoYXV0aDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5hdXRoID0gYXV0aFxuICB9XG5cbiAgcHJvdGVjdGVkIF9zZXRIZWFkZXJzID0gKGhlYWRlcnM6IGFueSk6IEF4aW9zUmVxdWVzdEhlYWRlcnMgPT4ge1xuICAgIGlmICh0eXBlb2YgdGhpcy5oZWFkZXJzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmhlYWRlcnMpKSB7XG4gICAgICAgIGhlYWRlcnNbYCR7a2V5fWBdID0gdmFsdWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuYXV0aCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3RoaXMuYXV0aH1gXG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJzXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBBUEkgdG8gdGhlIG1pZGRsZXdhcmUuIFRoZSBBUEkgcmVzb2x2ZXMgdG8gYSByZWdpc3RlcmVkIGJsb2NrY2hhaW4ncyBSUEMuXG4gICAqXG4gICAqIEluIFR5cGVTY3JpcHQ6XG4gICAqIGBgYGpzXG4gICAqIG9keXNzZXkuYWRkQVBJPE15Vk1DbGFzcz4oXCJteWNoYWluXCIsIE15Vk1DbGFzcywgXCIvZXh0L2JjL215Y2hhaW5cIilcbiAgICogYGBgXG4gICAqXG4gICAqIEluIEphdmFzY3JpcHQ6XG4gICAqIGBgYGpzXG4gICAqIG9keXNzZXkuYWRkQVBJKFwibXljaGFpblwiLCBNeVZNQ2xhc3MsIFwiL2V4dC9iYy9teWNoYWluXCIpXG4gICAqIGBgYFxuICAgKlxuICAgKiBAdHlwZXBhcmFtIEdBIENsYXNzIG9mIHRoZSBBUEkgYmVpbmcgYWRkZWRcbiAgICogQHBhcmFtIGFwaU5hbWUgQSBsYWJlbCBmb3IgcmVmZXJlbmNpbmcgdGhlIEFQSSBpbiB0aGUgZnV0dXJlXG4gICAqIEBwYXJhbSBDb25zdHJ1Y3RvckZOIEEgcmVmZXJlbmNlIHRvIHRoZSBjbGFzcyB3aGljaCBpbnN0YW50aWF0ZXMgdGhlIEFQSVxuICAgKiBAcGFyYW0gYmFzZXVybCBQYXRoIHRvIHJlc29sdmUgdG8gcmVhY2ggdGhlIEFQSVxuICAgKlxuICAgKi9cbiAgYWRkQVBJID0gPEdBIGV4dGVuZHMgQVBJQmFzZT4oXG4gICAgYXBpTmFtZTogc3RyaW5nLFxuICAgIENvbnN0cnVjdG9yRk46IG5ldyAoXG4gICAgICBkaW9uZTogT2R5c3NleUNvcmUsXG4gICAgICBiYXNldXJsPzogc3RyaW5nLFxuICAgICAgLi4uYXJnczogYW55W11cbiAgICApID0+IEdBLFxuICAgIGJhc2V1cmw6IHN0cmluZyA9IHVuZGVmaW5lZCxcbiAgICAuLi5hcmdzOiBhbnlbXVxuICApID0+IHtcbiAgICBpZiAodHlwZW9mIGJhc2V1cmwgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuYXBpc1tgJHthcGlOYW1lfWBdID0gbmV3IENvbnN0cnVjdG9yRk4odGhpcywgdW5kZWZpbmVkLCAuLi5hcmdzKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwaXNbYCR7YXBpTmFtZX1gXSA9IG5ldyBDb25zdHJ1Y3RvckZOKHRoaXMsIGJhc2V1cmwsIC4uLmFyZ3MpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhIHJlZmVyZW5jZSB0byBhbiBBUEkgYnkgaXRzIGFwaU5hbWUgbGFiZWwuXG4gICAqXG4gICAqIEBwYXJhbSBhcGlOYW1lIE5hbWUgb2YgdGhlIEFQSSB0byByZXR1cm5cbiAgICovXG4gIGFwaSA9IDxHQSBleHRlbmRzIEFQSUJhc2U+KGFwaU5hbWU6IHN0cmluZyk6IEdBID0+XG4gICAgdGhpcy5hcGlzW2Ake2FwaU5hbWV9YF0gYXMgR0FcblxuICAvKipcbiAgICogQGlnbm9yZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9yZXF1ZXN0ID0gYXN5bmMgKFxuICAgIHhocm1ldGhvZDogTWV0aG9kLFxuICAgIGJhc2V1cmw6IHN0cmluZyxcbiAgICBnZXRkYXRhOiBvYmplY3QsXG4gICAgcG9zdGRhdGE6IHN0cmluZyB8IG9iamVjdCB8IEFycmF5QnVmZmVyIHwgQXJyYXlCdWZmZXJWaWV3LFxuICAgIGhlYWRlcnM6IEF4aW9zUmVxdWVzdEhlYWRlcnMgPSB7fSxcbiAgICBheGlvc0NvbmZpZzogQXhpb3NSZXF1ZXN0Q29uZmlnID0gdW5kZWZpbmVkXG4gICk6IFByb21pc2U8UmVxdWVzdFJlc3BvbnNlRGF0YT4gPT4ge1xuICAgIGxldCBjb25maWc6IEF4aW9zUmVxdWVzdENvbmZpZ1xuICAgIGlmIChheGlvc0NvbmZpZykge1xuICAgICAgY29uZmlnID0ge1xuICAgICAgICAuLi5heGlvc0NvbmZpZyxcbiAgICAgICAgLi4udGhpcy5yZXF1ZXN0Q29uZmlnXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgYmFzZVVSTDogdGhpcy51cmwsXG4gICAgICAgIHJlc3BvbnNlVHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgIC4uLnRoaXMucmVxdWVzdENvbmZpZ1xuICAgICAgfVxuICAgIH1cbiAgICBjb25maWcudXJsID0gYmFzZXVybFxuICAgIGNvbmZpZy5tZXRob2QgPSB4aHJtZXRob2RcbiAgICBjb25maWcuaGVhZGVycyA9IGhlYWRlcnNcbiAgICBjb25maWcuZGF0YSA9IHBvc3RkYXRhXG4gICAgY29uZmlnLnBhcmFtcyA9IGdldGRhdGFcbiAgICAvLyB1c2UgdGhlIGZldGNoIGFkYXB0ZXIgaWYgZmV0Y2ggaXMgYXZhaWxhYmxlIGUuZy4gbm9uIE5vZGU8MTcgZW52XG4gICAgaWYgKHR5cGVvZiBmZXRjaCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgY29uZmlnLmFkYXB0ZXIgPSBmZXRjaEFkYXB0ZXJcbiAgICB9XG4gICAgY29uc3QgcmVzcDogQXhpb3NSZXNwb25zZTxhbnk+ID0gYXdhaXQgYXhpb3MucmVxdWVzdChjb25maWcpXG4gICAgLy8gcHVyZ2luZyBhbGwgdGhhdCBpcyBheGlvc1xuICAgIGNvbnN0IHhocmRhdGE6IFJlcXVlc3RSZXNwb25zZURhdGEgPSBuZXcgUmVxdWVzdFJlc3BvbnNlRGF0YShcbiAgICAgIHJlc3AuZGF0YSxcbiAgICAgIHJlc3AuaGVhZGVycyxcbiAgICAgIHJlc3Auc3RhdHVzLFxuICAgICAgcmVzcC5zdGF0dXNUZXh0LFxuICAgICAgcmVzcC5yZXF1ZXN0XG4gICAgKVxuICAgIHJldHVybiB4aHJkYXRhXG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgYSBHRVQgY2FsbCB0byBhbiBBUEkuXG4gICAqXG4gICAqIEBwYXJhbSBiYXNldXJsIFBhdGggdG8gdGhlIGFwaVxuICAgKiBAcGFyYW0gZ2V0ZGF0YSBPYmplY3QgY29udGFpbmluZyB0aGUga2V5IHZhbHVlIHBhaXJzIHNlbnQgaW4gR0VUXG4gICAqIEBwYXJhbSBoZWFkZXJzIEFuIGFycmF5IEhUVFAgUmVxdWVzdCBIZWFkZXJzXG4gICAqIEBwYXJhbSBheGlvc0NvbmZpZyBDb25maWd1cmF0aW9uIGZvciB0aGUgYXhpb3MgamF2YXNjcmlwdCBsaWJyYXJ5IHRoYXQgd2lsbCBiZSB0aGVcbiAgICogZm91bmRhdGlvbiBmb3IgdGhlIHJlc3Qgb2YgdGhlIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHJldHVybnMgQSBwcm9taXNlIGZvciBbW1JlcXVlc3RSZXNwb25zZURhdGFdXVxuICAgKi9cbiAgZ2V0ID0gKFxuICAgIGJhc2V1cmw6IHN0cmluZyxcbiAgICBnZXRkYXRhOiBvYmplY3QsXG4gICAgaGVhZGVyczogb2JqZWN0ID0ge30sXG4gICAgYXhpb3NDb25maWc6IEF4aW9zUmVxdWVzdENvbmZpZyA9IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPFJlcXVlc3RSZXNwb25zZURhdGE+ID0+XG4gICAgdGhpcy5fcmVxdWVzdChcbiAgICAgIFwiR0VUXCIsXG4gICAgICBiYXNldXJsLFxuICAgICAgZ2V0ZGF0YSxcbiAgICAgIHt9LFxuICAgICAgdGhpcy5fc2V0SGVhZGVycyhoZWFkZXJzKSxcbiAgICAgIGF4aW9zQ29uZmlnXG4gICAgKVxuXG4gIC8qKlxuICAgKiBNYWtlcyBhIERFTEVURSBjYWxsIHRvIGFuIEFQSS5cbiAgICpcbiAgICogQHBhcmFtIGJhc2V1cmwgUGF0aCB0byB0aGUgQVBJXG4gICAqIEBwYXJhbSBnZXRkYXRhIE9iamVjdCBjb250YWluaW5nIHRoZSBrZXkgdmFsdWUgcGFpcnMgc2VudCBpbiBERUxFVEVcbiAgICogQHBhcmFtIGhlYWRlcnMgQW4gYXJyYXkgSFRUUCBSZXF1ZXN0IEhlYWRlcnNcbiAgICogQHBhcmFtIGF4aW9zQ29uZmlnIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBheGlvcyBqYXZhc2NyaXB0IGxpYnJhcnkgdGhhdCB3aWxsIGJlIHRoZVxuICAgKiBmb3VuZGF0aW9uIGZvciB0aGUgcmVzdCBvZiB0aGUgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgZm9yIFtbUmVxdWVzdFJlc3BvbnNlRGF0YV1dXG4gICAqL1xuICBkZWxldGUgPSAoXG4gICAgYmFzZXVybDogc3RyaW5nLFxuICAgIGdldGRhdGE6IG9iamVjdCxcbiAgICBoZWFkZXJzOiBvYmplY3QgPSB7fSxcbiAgICBheGlvc0NvbmZpZzogQXhpb3NSZXF1ZXN0Q29uZmlnID0gdW5kZWZpbmVkXG4gICk6IFByb21pc2U8UmVxdWVzdFJlc3BvbnNlRGF0YT4gPT5cbiAgICB0aGlzLl9yZXF1ZXN0KFxuICAgICAgXCJERUxFVEVcIixcbiAgICAgIGJhc2V1cmwsXG4gICAgICBnZXRkYXRhLFxuICAgICAge30sXG4gICAgICB0aGlzLl9zZXRIZWFkZXJzKGhlYWRlcnMpLFxuICAgICAgYXhpb3NDb25maWdcbiAgICApXG5cbiAgLyoqXG4gICAqIE1ha2VzIGEgUE9TVCBjYWxsIHRvIGFuIEFQSS5cbiAgICpcbiAgICogQHBhcmFtIGJhc2V1cmwgUGF0aCB0byB0aGUgQVBJXG4gICAqIEBwYXJhbSBnZXRkYXRhIE9iamVjdCBjb250YWluaW5nIHRoZSBrZXkgdmFsdWUgcGFpcnMgc2VudCBpbiBQT1NUXG4gICAqIEBwYXJhbSBwb3N0ZGF0YSBPYmplY3QgY29udGFpbmluZyB0aGUga2V5IHZhbHVlIHBhaXJzIHNlbnQgaW4gUE9TVFxuICAgKiBAcGFyYW0gaGVhZGVycyBBbiBhcnJheSBIVFRQIFJlcXVlc3QgSGVhZGVyc1xuICAgKiBAcGFyYW0gYXhpb3NDb25maWcgQ29uZmlndXJhdGlvbiBmb3IgdGhlIGF4aW9zIGphdmFzY3JpcHQgbGlicmFyeSB0aGF0IHdpbGwgYmUgdGhlXG4gICAqIGZvdW5kYXRpb24gZm9yIHRoZSByZXN0IG9mIHRoZSBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSBmb3IgW1tSZXF1ZXN0UmVzcG9uc2VEYXRhXV1cbiAgICovXG4gIHBvc3QgPSAoXG4gICAgYmFzZXVybDogc3RyaW5nLFxuICAgIGdldGRhdGE6IG9iamVjdCxcbiAgICBwb3N0ZGF0YTogc3RyaW5nIHwgb2JqZWN0IHwgQXJyYXlCdWZmZXIgfCBBcnJheUJ1ZmZlclZpZXcsXG4gICAgaGVhZGVyczogb2JqZWN0ID0ge30sXG4gICAgYXhpb3NDb25maWc6IEF4aW9zUmVxdWVzdENvbmZpZyA9IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPFJlcXVlc3RSZXNwb25zZURhdGE+ID0+XG4gICAgdGhpcy5fcmVxdWVzdChcbiAgICAgIFwiUE9TVFwiLFxuICAgICAgYmFzZXVybCxcbiAgICAgIGdldGRhdGEsXG4gICAgICBwb3N0ZGF0YSxcbiAgICAgIHRoaXMuX3NldEhlYWRlcnMoaGVhZGVycyksXG4gICAgICBheGlvc0NvbmZpZ1xuICAgIClcblxuICAvKipcbiAgICogTWFrZXMgYSBQVVQgY2FsbCB0byBhbiBBUEkuXG4gICAqXG4gICAqIEBwYXJhbSBiYXNldXJsIFBhdGggdG8gdGhlIGJhc2V1cmxcbiAgICogQHBhcmFtIGdldGRhdGEgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGtleSB2YWx1ZSBwYWlycyBzZW50IGluIFBVVFxuICAgKiBAcGFyYW0gcG9zdGRhdGEgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGtleSB2YWx1ZSBwYWlycyBzZW50IGluIFBVVFxuICAgKiBAcGFyYW0gaGVhZGVycyBBbiBhcnJheSBIVFRQIFJlcXVlc3QgSGVhZGVyc1xuICAgKiBAcGFyYW0gYXhpb3NDb25maWcgQ29uZmlndXJhdGlvbiBmb3IgdGhlIGF4aW9zIGphdmFzY3JpcHQgbGlicmFyeSB0aGF0IHdpbGwgYmUgdGhlXG4gICAqIGZvdW5kYXRpb24gZm9yIHRoZSByZXN0IG9mIHRoZSBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSBmb3IgW1tSZXF1ZXN0UmVzcG9uc2VEYXRhXV1cbiAgICovXG4gIHB1dCA9IChcbiAgICBiYXNldXJsOiBzdHJpbmcsXG4gICAgZ2V0ZGF0YTogb2JqZWN0LFxuICAgIHBvc3RkYXRhOiBzdHJpbmcgfCBvYmplY3QgfCBBcnJheUJ1ZmZlciB8IEFycmF5QnVmZmVyVmlldyxcbiAgICBoZWFkZXJzOiBvYmplY3QgPSB7fSxcbiAgICBheGlvc0NvbmZpZzogQXhpb3NSZXF1ZXN0Q29uZmlnID0gdW5kZWZpbmVkXG4gICk6IFByb21pc2U8UmVxdWVzdFJlc3BvbnNlRGF0YT4gPT5cbiAgICB0aGlzLl9yZXF1ZXN0KFxuICAgICAgXCJQVVRcIixcbiAgICAgIGJhc2V1cmwsXG4gICAgICBnZXRkYXRhLFxuICAgICAgcG9zdGRhdGEsXG4gICAgICB0aGlzLl9zZXRIZWFkZXJzKGhlYWRlcnMpLFxuICAgICAgYXhpb3NDb25maWdcbiAgICApXG5cbiAgLyoqXG4gICAqIE1ha2VzIGEgUEFUQ0ggY2FsbCB0byBhbiBBUEkuXG4gICAqXG4gICAqIEBwYXJhbSBiYXNldXJsIFBhdGggdG8gdGhlIGJhc2V1cmxcbiAgICogQHBhcmFtIGdldGRhdGEgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGtleSB2YWx1ZSBwYWlycyBzZW50IGluIFBBVENIXG4gICAqIEBwYXJhbSBwb3N0ZGF0YSBPYmplY3QgY29udGFpbmluZyB0aGUga2V5IHZhbHVlIHBhaXJzIHNlbnQgaW4gUEFUQ0hcbiAgICogQHBhcmFtIHBhcmFtZXRlcnMgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIEFQSSBjYWxsXG4gICAqIEBwYXJhbSBoZWFkZXJzIEFuIGFycmF5IEhUVFAgUmVxdWVzdCBIZWFkZXJzXG4gICAqIEBwYXJhbSBheGlvc0NvbmZpZyBDb25maWd1cmF0aW9uIGZvciB0aGUgYXhpb3MgamF2YXNjcmlwdCBsaWJyYXJ5IHRoYXQgd2lsbCBiZSB0aGVcbiAgICogZm91bmRhdGlvbiBmb3IgdGhlIHJlc3Qgb2YgdGhlIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHJldHVybnMgQSBwcm9taXNlIGZvciBbW1JlcXVlc3RSZXNwb25zZURhdGFdXVxuICAgKi9cbiAgcGF0Y2ggPSAoXG4gICAgYmFzZXVybDogc3RyaW5nLFxuICAgIGdldGRhdGE6IG9iamVjdCxcbiAgICBwb3N0ZGF0YTogc3RyaW5nIHwgb2JqZWN0IHwgQXJyYXlCdWZmZXIgfCBBcnJheUJ1ZmZlclZpZXcsXG4gICAgaGVhZGVyczogb2JqZWN0ID0ge30sXG4gICAgYXhpb3NDb25maWc6IEF4aW9zUmVxdWVzdENvbmZpZyA9IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPFJlcXVlc3RSZXNwb25zZURhdGE+ID0+XG4gICAgdGhpcy5fcmVxdWVzdChcbiAgICAgIFwiUEFUQ0hcIixcbiAgICAgIGJhc2V1cmwsXG4gICAgICBnZXRkYXRhLFxuICAgICAgcG9zdGRhdGEsXG4gICAgICB0aGlzLl9zZXRIZWFkZXJzKGhlYWRlcnMpLFxuICAgICAgYXhpb3NDb25maWdcbiAgICApXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgT2R5c3NleSBpbnN0YW5jZS4gU2V0cyB0aGUgYWRkcmVzcyBhbmQgcG9ydCBvZiB0aGUgbWFpbiBPZHlzc2V5IENsaWVudC5cbiAgICpcbiAgICogQHBhcmFtIGhvc3QgVGhlIGhvc3RuYW1lIHRvIHJlc29sdmUgdG8gcmVhY2ggdGhlIE9keXNzZXkgQ2xpZW50IEFQSXNcbiAgICogQHBhcmFtIHBvcnQgVGhlIHBvcnQgdG8gcmVzb2x2ZSB0byByZWFjaCB0aGUgT2R5c3NleSBDbGllbnQgQVBJc1xuICAgKiBAcGFyYW0gcHJvdG9jb2wgVGhlIHByb3RvY29sIHN0cmluZyB0byB1c2UgYmVmb3JlIGEgXCI6Ly9cIiBpbiBhIHJlcXVlc3QsIGV4OiBcImh0dHBcIiwgXCJodHRwc1wiLCBcImdpdFwiLCBcIndzXCIsIGV0YyAuLi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGhvc3Q/OiBzdHJpbmcsIHBvcnQ/OiBudW1iZXIsIHByb3RvY29sOiBzdHJpbmcgPSBcImh0dHBcIikge1xuICAgIGlmIChob3N0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRBZGRyZXNzKGhvc3QsIHBvcnQsIHByb3RvY29sKVxuICAgIH1cbiAgfVxufVxuIl19