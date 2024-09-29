import LocalUtils from "../../tools/LocalUtils";
import { Singleton } from "../common/Singleton";
import Logger from "../utils/Logger";

export const enum IHttpMethod {
    GET = "GET",
    POST = "POST",
}

/*
 * http请求，直接返回相应数据 处理为JSON格式
 */
export default class HttpManager extends Singleton {
    public static get Instance(): HttpManager {
        return this.getInstance<HttpManager>();
    }

    private setRequestHeader(xhr: XMLHttpRequest, token: string) {
        token && xhr.setRequestHeader("Authorization", token);
        // xhr.setRequestHeader("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }

    //post请求为urlencoded 格式，传入数据为URL编码串拼接,例如 name=111&age=200
    //GET请求,传入数据为URL编码串拼接,例如 name=111&age=200
    public onHttp(httpMethod: IHttpMethod, url: string, data: string, token: string, successFun: Function, failFunc: Function, thisArg: any, errorFunc: Function = null) {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText;
                    Logger.log("response: ", response)
                    //按照json解析
                    !LocalUtils.isNil(successFun) && successFun.call(thisArg, xhr);
                } else {
                    Logger.log(`${url}请求失败:${xhr.status}`);
                    !LocalUtils.isNil(failFunc) && failFunc.call(thisArg);
                }
            } else {
                Logger.log(`xhr.readyState is not 4, xhr.readyState is ${xhr.readyState}`);
            }
        };

        xhr.open(httpMethod, url, true);
        this.setRequestHeader(xhr, token);
        
        xhr.onerror = () => {
            !LocalUtils.isNil(errorFunc) && errorFunc.call(thisArg);
        }

        xhr.send(data);
    }
}