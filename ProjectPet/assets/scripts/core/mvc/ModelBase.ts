import { EProtocalPostName, EProtocolGetName } from "../../protocol/ProtocolName";
import { ResponseID } from "../../protocol/ResponseID";
import { Singleton } from "../common/Singleton";
import { IHttpMethod } from "../network/HttpManager";
import ProtocolManager, { NetCallFunc } from "../network/ProtocolManager";

export default class ModelBase extends Singleton {
    protected registerProtocolHandler(responseId: ResponseID, _pbType: any, _handler: Function) {
        ProtocolManager.Instance.registerProtocolHandler(responseId, _pbType, (data => {
            _handler(data);
        }).bind(this));
    }

    public requestProtocolHandler(protocol: EProtocalPostName | EProtocolGetName, data?: any, successF?: NetCallFunc, failureF?: NetCallFunc, httpType: IHttpMethod = IHttpMethod.POST, _param?: string) {
        ProtocolManager.Instance.sendProtocolToServer(protocol, httpType, data,
            (() => {
                successF();
            }).bind(this),
            (() => {
                failureF();
            }).bind(this),
            _param);
    } 
}

