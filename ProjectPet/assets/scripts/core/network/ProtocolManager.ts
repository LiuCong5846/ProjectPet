import { WECHAT } from "cc/env";
import { SdkManager } from "../../manager/SdkManager";
import LocalUtils from "../../tools/LocalUtils";
import { Singleton } from "../common/Singleton";
import Logger from "../utils/Logger";
import { Base64 } from "js-base64";
import HttpManager, { IHttpMethod } from "./HttpManager";
import { ResponseID } from "../../protocol/ResponseID";
import { EProtocalPostName, EProtocolGetName } from "../../protocol/ProtocolName";
import GameManager from "../../manager/GameManager";
import GameConfig from "../../GameConfig";

export type ProtocolHandler = (data: any) => void;
export type NetCallFunc = () => void;

export interface IProtoActionType{
    /**反序列化类 */
    pbType: any;
    /**处理回调 */
    pbhandler: ProtocolHandler;
}

export interface IRequestProtocol{
    /**动作名 */
    action: string;
    /**动作参数 */
    body: any;
    HttpType: IHttpMethod;
    param: any;
    /**成功回调 */
    successFunc: NetCallFunc;
    /**失败回调 */
    failureFunc: NetCallFunc;
    funcTarget: any;
}

export default class ProtocolManager extends Singleton {
    public static get Instance():ProtocolManager {
        return this.getInstance<ProtocolManager>();
    }

    private protocolHandlers: Map<string, IProtoActionType> = new Map();

    /**正在请求还未返回的动作 */
    private requestMap: Map<string, any> = new Map();
    /**当前在队伍里的动作 */
    private requestQue: Array<IRequestProtocol> = [];

    protected init() {
        this.protocolHandlers.clear();
        this.requestMap.clear();
        this.requestQue = [];
    }
    
    // 注册协议处理函数
    public registerProtocolHandler(responseId: ResponseID, _pbType: any, _handler: ProtocolHandler) {
        const handle: IProtoActionType = {
            pbType: _pbType,
            pbhandler: _handler
        };
        this.protocolHandlers.set(responseId, handle);

        Logger.log(`registe responseId: ${responseId}: `, handle);
    }

    // 发送协议到服务器
    public sendProtocolToServer(
        protocol: EProtocalPostName | EProtocolGetName,
        httpType: IHttpMethod = IHttpMethod.POST,
        data?: any,
        successF?: NetCallFunc,
        failureF?: NetCallFunc,
        thisArg?: any,
        _param?: string
    ) {

        if (this.requestMap.has(protocol)){
            !LocalUtils.isNil(failureF) && failureF();
        }
        const request: IRequestProtocol = {
            action: protocol,
            body: data,
            param: _param,
            HttpType: httpType,
            successFunc: successF,
            failureFunc: failureF,
            funcTarget: thisArg,
        }
        if (this.requestMap.size === 0)
        {
            this.requestMap.set(protocol, data);
            this.requestQue.push(request);
            this.sendRequestToServer();
        }else{
            this.requestMap.set(protocol, data);
            this.requestQue.push(request);
        }
    }

    private sendRequestToServer(){
        if (this.requestQue.length == 0) return;
        const request = this.requestQue.shift();

        if (request.action === EProtocalPostName.LOGIN) {
            this.CocosHttp(request, false);
        } else {
            if (WECHAT){
                this.WechatHttp(request);
            }else{
                this.CocosHttp(request);
            }
        }
    }


    /**
     * wx.request 内部把data转译成字符串
     * @param request 
     */
    private WechatHttp(request: IRequestProtocol) {
        Logger.log("微信小游戏http");
        let header: any = {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": GameConfig.token,
            //"User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        };
        let request_url = `${GameConfig.url}${request.action}`;
        Logger.log(`Wechat Action:${request.action}  body: ${JSON.stringify(request.body)}, url: ${request_url}`);
        const successFunc = (res: any) => {
            Logger.log(`微信小游戏http返回成功: `, res);
            const response = res.data;
    
            if (response.raw != null && response.raw["accessToken"] != undefined){
                Logger.log(`默认token:${GameConfig.token}`);
                GameConfig.token = response.raw["accessToken"];
                Logger.log(`token:${GameConfig.token}`);
            }
            for(let key in response.data) {
                if(key != "stt")
                {
                    this.handleServerResponse(key, response)
                }else{
                    GameManager.Instance.updateServerTime(response.data[key]);
                }
            }

            !LocalUtils.isNil(request.successFunc) && request.successFunc.call(request.funcTarget);
            this.sendRequestToServer();
            this.requestMap.delete(request.action);
        };

        const failFunc = (res: any) => {
            Logger.log(`微信小游戏http返回失败: `, res);
            if (request.failureFunc != undefined)
            request.failureFunc.call(request.funcTarget);
            this.sendRequestToServer();
            this.requestMap.delete(request.action);

        };

        SdkManager.Instance.wxRequest(
            request_url,
            request.body,
            header, 
            successFunc,
            failFunc,
        );
    }

    private CocosHttp(request: IRequestProtocol, withToken = true) {
        let request_url = `${GameConfig.url}${request.action}`;
        if (request.param){
            request_url = `${request_url}?key=${request.param}`;
        }
        Logger.log(`Cocos Action:${request.action}  body: ${JSON.stringify(request.body)}, url: ${request_url}`);
        
        const successFunc = (xhr: XMLHttpRequest) => {
            const response = JSON.parse(xhr.response);
            Logger.log(`返回成功:${xhr.response}`);

            const data = response.data;
            
            if (!LocalUtils.isNil(data.accessToken)){
                Logger.log(`默认token:${GameConfig.token}`);
                GameConfig.token = data.accessToken;
                Logger.log(`token:${GameConfig.token}`);
            }
            for(let key in response.data) {
                if(key != "stt")
                {
                    this.handleServerResponse(key, response)
                }else{
                    GameManager.Instance.updateServerTime(response.data[key]);
                }
            }

            !LocalUtils.isNil(request.successFunc) && request.successFunc.call(request.funcTarget);
            this.sendRequestToServer();
            this.requestMap.delete(request.action);
        };

        const failFunc = () => {
            !LocalUtils.isNil(request.failureFunc) && request.failureFunc.call(request.funcTarget);
            this.sendRequestToServer();
            this.requestMap.delete(request.action);
        };

        const errorFunc = () => {
            // !LocalUtils.isNil(request.failureFunc) && request.failureFunc.call(request.funcTarget);
            // this.sendRequestToServer();
            this.requestMap.delete(request.action);
        };

        HttpManager.Instance.onHttp(
            request.HttpType,
            request_url,
            request.body,
            withToken ? GameConfig.token : null,
            successFunc,
            failFunc,
            this,
            errorFunc,
        );
    }

    // 处理服务器响应
    private handleServerResponse(ResponseID: string, response: any) {
        Logger.log("handleServerResponse_ResponseID: ", ResponseID);
        Logger.log("handleServerResponse_response: ", response);
        const handler = this.protocolHandlers.get(ResponseID);
        if (handler) {
            // 调用注册的协议处理函数
            const bytes = new Uint8Array(Base64.atob(response.data[ResponseID]).split("").map(c => c.charCodeAt(0)));

            const data = handler.pbType.decode(bytes);
            Logger.log(JSON.stringify(data));

            handler.pbhandler(data);
        }
    }
}

