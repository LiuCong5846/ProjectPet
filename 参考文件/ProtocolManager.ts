
import { Base64 } from "js-base64";
import { timeDataMgr } from "../../../Game/Data/TimeDataMgr";
import pb from "../../../proto/pb.js";
import Logger from "../../Log/Logger";
import { List, Queue } from "../../Utils/ListUtils";
import { sys } from "cc";
import { wxSdk } from "../../Sdk/WxSdk";


type ProtocolHandler = (data: any) => void;
type NetCallFunc = () => void;

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
    HttpType: string;
    param: any;
    /**成功回调 */
    successFunc: NetCallFunc;
    /**失败回调 */
    failureFunc: NetCallFunc;
}

// interface 
class ProtocolManager {
    private static instance: ProtocolManager;

    private protocolHandlers: Map<string, IProtoActionType> = new Map();

    /**正在请求还未返回的动作 */
    private requestList: List<string> = new List<string>();
    /**当前在队伍里的动作 */
    private requestQue: Queue<IRequestProtocol> = new Queue<IRequestProtocol>();

    private url: string = "https://master-88173-7-1323643433.sh.run.tcloudbase.com/";

    private token: string = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWQiOjMsImlhdCI6MTcxMTQxNzg4MCwiZXhwIjoxNzEzMzYxODgwfQ.1aqu4HsBz3a91FmjUbv0LClvN8yM9hMTePAQiXDmYHHT2JHaJ-sYC2NKAbioRtAA-ShNaQXYqSEZ3YgNLnqaeA";


    private constructor() {
        // 私有构造函数，确保只有一个实例
    }

    public static getInstance(): ProtocolManager {
        if (!ProtocolManager.instance) {
            ProtocolManager.instance = new ProtocolManager();
        }
        return ProtocolManager.instance;
    }

    // 注册协议处理函数
    public registerProtocolHandler(ResponseID: string, _pbType: any, _handler: ProtocolHandler) {
        const handle: IProtoActionType = {
            pbType: _pbType,
            pbhandler: _handler
        };
        this.protocolHandlers.set(ResponseID, handle);
    }

    // 发送协议到服务器
    public sendProtocolToServer(protocol: string, data?: any, successF?: NetCallFunc, failureF?: NetCallFunc, httpType: string = "POST", _param?: string) {

        if (this.requestList.Contains(protocol)){
            if (failureF != null) failureF();
        }
        const request: IRequestProtocol = {
            action: protocol,
            body: data,
            param: _param,
            HttpType: httpType,
            successFunc: successF,
            failureFunc: failureF,
        }
        if (this.requestList.Count == 0)
        {
            this.requestList.Add(protocol);
            this.requestQue.Enquque(request);
            this.sendRequestToServer();
        }else{
            this.requestList.Add(protocol);
            this.requestQue.Enquque(request);
        }
    }
    private sendRequestToServer(){
        if (this.requestQue.Count == 0) return;
        const request = this.requestQue.Dequeue();
        
        // if (sys.platform === sys.Platform.WECHAT_GAME){
        if (false){
            // Logger.Log("微信小游戏");
            let header: any = {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": this.token,
            };
            wxSdk.request(`${this.url}${request.action}`, JSON.stringify(request.body), header, () =>{
                if (request.successFunc != undefined)
                    request.successFunc();
                this.sendRequestToServer();
                this.requestList.Remove(request.action);
            }, () =>{
                if (request.failureFunc != undefined)
                request.failureFunc();
                this.sendRequestToServer();
                this.requestList.Remove(request.action);
            })
        }else{
            this.CocosHttp(request);
        }
    }

    private CocosHttp(request: IRequestProtocol){
        const xhr = new XMLHttpRequest();
        let request_url = `${this.url}${request.action}`;
        if (request.param){
            request_url = `${request_url}?key=${request.param}`;
        }
        Logger.Log(`Action:${request.action}  body: ${JSON.stringify(request.body)}, url: ${request_url}`);
        xhr.open(request.HttpType, request_url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        if (this.token != undefined){
            xhr.setRequestHeader("Authorization", this.token);
        }
        // xhr.timeout = 30;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                // 协议发送成功，接收服务器响应
                if (xhr.status != 200)
                {
                    Logger.Log(`返回错误：${xhr.status}`);
                    this.requestList.Remove(request.action);
                    return;
                }
                const response = JSON.parse(xhr.response);
                Logger.Log(`返回成功:${xhr.response}`);
                
                if (response.raw != null && response.raw["accessToken"] != undefined){
                    this.token = response.raw["accessToken"];
                    Logger.Log(`token:${this.token}`);
                }
                for(let key in response.data)
                {
                    if(key != "stt")
                    {
                        this.handleServerResponse(key, response)
                    }else{
                        timeDataMgr.UpdateServerTime(response.data[key])
                    }
                }
                if (request.successFunc != undefined)
                    request.successFunc();
                this.sendRequestToServer();
                this.requestList.Remove(request.action);
            }
        };
        xhr.onerror = () =>{
            
            if (request.failureFunc != undefined)
                request.failureFunc();
            this.sendRequestToServer();
            this.requestList.Remove(request.action);
        }
        // const requestData = { protocol, data };
        xhr.send(JSON.stringify(request.body));
    }

    // 处理服务器响应
    private handleServerResponse(ResponseID: string, response: any) {
        const handler = this.protocolHandlers.get(ResponseID);
        if (handler) {
            // 调用注册的协议处理函数
            const bytes = new Uint8Array(Base64.atob(response.data[ResponseID]).split("").map(c => c.charCodeAt(0)));

            const data = handler.pbType.decode(bytes);
            Logger.Log(JSON.stringify(data));

            handler.pbhandler(data);
        }
    }
}

export default ProtocolManager;
