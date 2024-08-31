import pb from "pb";
import { Singleton } from "../core/common/Singleton";
import { IHttpMethod } from "../core/network/HttpManager";
import ProtocolManager, { NetCallFunc } from "../core/network/ProtocolManager";
import Logger from "../core/utils/Logger";
import GameConfig from "../GameConfig";
import { EProtocalPostName, EProtocolGetName } from "../protocol/ProtocolName";
import { ResponseID } from "../protocol/ResponseID";
import { ProtobufUtil } from "../tools/ProtobufUtil";
import GameManager from "./GameManager";

export default class GameProtocolManager extends Singleton {
    public static get Instance(): GameProtocolManager{
        return this.getInstance<GameProtocolManager>();
    }

    protected init() {
        ProtobufUtil.InitAllPb();
    }

    public registerProtocolHandlers() {
        const mgr = this;
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.UserInfo, pb.com.wmy.pets.model.proto.Player.UserInfo, data => mgr.onUserInfoResp(data));
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.PetsInfo, pb.com.wmy.pets.model.proto.Player.PetsInfo, data => mgr.onPetsInfoResp(data));
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.NurseLog, pb.com.wmy.pets.model.proto.Player.NurseLog, data => mgr.onNurseLogResp(data));
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.NurseLogList, pb.com.wmy.pets.model.proto.Player.NurseLogList, data => mgr.onNurseLogListResp(data));
    }

    //#region RESP
    private onUserInfoResp(data: pb.com.wmy.pets.model.proto.Player.IUserInfo) {
        Logger.log("onUserInfoResp: ", data);
        GameManager.Instance.userInfo = data;
    }

    private onPetsInfoResp(data: pb.com.wmy.pets.model.proto.Player.IPetsInfo) {
        Logger.log("onPetsInfoResp: ", data);
        GameManager.Instance.petInfo = data;
    }

    private onNurseLogResp(data: pb.com.wmy.pets.model.proto.Player.INurseLog) {
        Logger.log("onNurseLogResp: ", data);
    }

    private onNurseLogListResp(data: pb.com.wmy.pets.model.proto.Player.INurseLogList) {
        Logger.log("onNurseLogListResp: ", data);
    }
    //#endregion

    //#region SEND
    public sendLogin(successS: NetCallFunc, failureF: NetCallFunc, target: any) {
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocalPostName.LOGIN,
            IHttpMethod.POST,
            {"jsCode": GameConfig.code},
            successS,
            failureF,
            target,
        );
    }

    public sendUpdate(successS: NetCallFunc, failureF: NetCallFunc, target: any) {
        const args = {
            "nickname": "menghuanjiayuan",
            "sex": 1,
        }
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocalPostName.USER_UPDATE,
            IHttpMethod.POST,
            args,
            successS,
            failureF,
            target,
        );
    }


    public sendPetInfo(successS: NetCallFunc, failureF: NetCallFunc, target: any) {
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocolGetName.PET_INFO,
            IHttpMethod.GET,
            null,
            successS,
            failureF,
            target,
        );
    }

    public sendUserInfo(successS: NetCallFunc, failureF: NetCallFunc, target: any) {
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocolGetName.USER_INFO,
            IHttpMethod.GET,
            null,
            successS,
            failureF,
            target,
        );
    }

    public sendPetsLog(successS: NetCallFunc, failureF: NetCallFunc, target: any) {
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocolGetName.PETS_LOG,
            IHttpMethod.GET,
            null,
            successS,
            failureF,
            target,
        );
    }

    //#endregion
}

