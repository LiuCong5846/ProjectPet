import { Game } from "cc";
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
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.Prop, pb.com.wmy.pets.model.proto.Player.Prop, data => mgr.onPropResp(data));
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.PetsBag, pb.com.wmy.pets.model.proto.Player.PetsBag, data => mgr.onPetsBagResp(data));
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.NursePropList, pb.com.wmy.pets.model.proto.Player.NursePropList, data => mgr.onNursePropListResp(data));
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.Subject, pb.com.wmy.pets.model.proto.Player.Subject, data => mgr.onSubjectResp(data));
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.School, pb.com.wmy.pets.model.proto.Player.School, data => mgr.onSchoolResp(data));
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.SchoolList, pb.com.wmy.pets.model.proto.Player.SchoolList, data => mgr.onSchoolListResp(data));
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

    private onPropResp(data: pb.com.wmy.pets.model.proto.Player.IProp) {
        Logger.log("onPropResp: ", data);
    }

    private onPetsBagResp(data: any) {
        Logger.log("onPetsBagResp: ", data);
        const keys = Object.keys(data);
        for (let key of keys) {
            Logger.log(`onPetsBagResp_key_${key}: `, key);
            const val = data[key] as pb.com.wmy.pets.model.proto.Player.IProp;
            Logger.log(`onPetsBagResp_val_${key}: `, val);
            GameManager.Instance.setPetsBagOne(val.id, val.num);
        }
    }

    private onNursePropListResp(data: any) {
        Logger.log("onNursePropListResp: ", data);
        const keys = Object.keys(data);
        for (let key of keys) {
            Logger.log(`onNursePropListResp_key_${key}: `, key);
            const val = data[key] as pb.com.wmy.pets.model.proto.Player.IProp;
            Logger.log(`onNursePropListResp_val_${val}: `, val);
            GameManager.Instance.setTutelageItem(val.id, val.num);
        }
    }

    private onSubjectResp(data: pb.com.wmy.pets.model.proto.Player.ISubject) {
        Logger.log("onSubjectResp: ", data);
    }

    private onSchoolResp(data: pb.com.wmy.pets.model.proto.Player.ISchool) {
        Logger.log("onSchoolResp: ", data);
    }

    private onSchoolListResp(data: pb.com.wmy.pets.model.proto.Player.ISchoolList) {
        Logger.log("onSchoolListResp: ", data);
        GameManager.Instance.curEducation = data.curEducation;
        const keys = Object.keys(data.school);
        for (let key of keys) {
            Logger.log(`onSchoolListResp_key_${key}: `, key);
            const val = data.school[key] as pb.com.wmy.pets.model.proto.Player.ISchool;
            Logger.log(`onSchoolListResp_val_${val}: `, val);
            GameManager.Instance.setSchoolOne(val.qualification, val);
        }
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
            "nickname": "menghuanjiayuan", // TODO
            "sex": 1, // TODO
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

    //#region 第二版增加
    public sendTutelage(status: boolean, feed: boolean, work: boolean, study: boolean) {
        Logger.log(`sendTutelage_status:${status}_feed:${feed}_work:${work}_study:${study}`);
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocalPostName.TUTELAGE,
            IHttpMethod.POST,
            {
                status: !!status,
                feedStatus: !!feed,
                workStatus: !!work,
                studyStatus: !!study,
            }
        );
    }

    public sendPurchaseShopGood(propId: number, buyNum: number, successS: NetCallFunc, failureF: NetCallFunc, target: any) {
        Logger.log(`sendPurchaseShopGood_propId:${propId}_buyNum:${buyNum}`);
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocalPostName.PURCHASE_SHOP_GOOD,
            IHttpMethod.POST,
            {
                propId: propId,
                buyNum: buyNum,
            },
            successS,
            failureF,
            target,
        );
    }

    public sendBagItems(successS?: NetCallFunc, failureF?: NetCallFunc, target?: any) {
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocalPostName.GET_BAG_ITEMS,
            IHttpMethod.POST,
            null,
            successS,
            failureF,
            target,
        );
    }

    public sendItemUsed(propId: number, useNum: number, successS?: NetCallFunc, failureF?: NetCallFunc, target?: any) {
        Logger.log(`sendItemUsed_propId:${propId}_useNum:${useNum}`);
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocalPostName.ITEM_USED,
            IHttpMethod.POST,
            {
                propId: propId,
                useNum: useNum,
            },
            successS,
            failureF,
            target,
        );
    }

    public sendTutelageItemsSelect(arr: Array<{propId: number, selected: boolean}>) {
        Logger.log("sendTutelageItemsSelect: ", arr);
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocalPostName.TUTELAGE_ITEMS_SELECTED,
            IHttpMethod.POST,
            arr,
        );
    }

    public sendTutelageItemsList(successS?: NetCallFunc, failureF?: NetCallFunc, target?: any) {
        Logger.log("sendTutelageItemsList");
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocalPostName.TUTELAGE_ITEMS_LIST,
            IHttpMethod.POST,
            null,
            successS,
            failureF,
            target,
        );
    }

    public sendSchoolInfo(successS?: NetCallFunc, failureF?: NetCallFunc, target?: any) {
        Logger.log("sendSchoolInfo");
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocalPostName.SCHOOL_INFO,
            IHttpMethod.POST,
            null,
            successS,
            failureF,
            target,
        );
    }

    public sendCancelAction(successS?: NetCallFunc, failureF?: NetCallFunc, target?: any) {
        Logger.log("sendCancelAction");
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocalPostName.CANCEL_ACTION,
            IHttpMethod.POST,
            null,
            successS,
            failureF,
            target,
        );
    }

    public sendStudyBegin(successS?: NetCallFunc, failureF?: NetCallFunc, target?: any) {
        Logger.log("sendStudyBegin");
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocalPostName.BEGIN_STUDY,
            IHttpMethod.POST,
            null,
            successS,
            failureF,
            target,
        );
    }

    public sendWorkBegin(successS?: NetCallFunc, failureF?: NetCallFunc, target?: any) {
        Logger.log("sendWorkBegin");
        ProtocolManager.Instance.sendProtocolToServer(
            EProtocalPostName.BEGIN_WORK,
            IHttpMethod.POST,
            null,
            successS,
            failureF,
            target,
        );
    }


    //#endregion

    //#endregion
}

