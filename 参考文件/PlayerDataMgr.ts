import pb from "../../proto/pb.js";
import EventMgr from "../../Core/Event/EventMgr";
import Instance from "../../Core/Utils/Instance";
import { EventConfig } from "../Config/EventConfig";
import ProtocolManager from "../../Core/Net/Protocol/ProtocolManager";
import { NextFunction } from "../../Core/Utils/AsyncQueue";
import { ResponseID } from "../Config/ResponseID";
import Logger from "../../Core/Log/Logger";
import UIMgr from '../../Core/UI/UIMgr';

/** 玩家数据类*/
class PlayerDataMgr {

    //单例
    public static getInstance(): PlayerDataMgr {
        return Instance.get(PlayerDataMgr);
    }

    private _user_id: number;
    private _user_name: string;
    private _user_level: number;
    private _user_exp: number;
    private _user_head: string;
    private _server_id: number = 1;
    private _attribute: Map<number, number> = new Map<number, number>();
    private _power: number;

    /** 玩家id*/
    get Id(): number { return this._user_id; }
    /** 玩家名字*/
    get Name(): string { return this._user_name; }

    /**玩家等级*/
    public get Level(): number { return this._user_level }
    /**玩家当前等级经验*/
    public get Exp(): number { return this._user_exp }
    /**玩家头像，可以是地址可以是配置id*/
    public get Head(): string { return this._user_head }
    /**玩家服务器id */
    public get ServerID(): number { return this._server_id }
    /**根据属性id获取玩家属性值*/
    public GetAttribute(id: number): number {
        if (this._attribute != undefined && this._attribute.has(id)) {
            return this._attribute.get(id);
        }
        return 0;
    }
    public get Power() { return this._power }



    public Init() {
        const mgr = this;
        ProtocolManager.getInstance().registerProtocolHandler(ResponseID.UserInfo, pb.player.UserInfo, data => mgr.OnPlayerData(data));
        ProtocolManager.getInstance().registerProtocolHandler(ResponseID.UserAttribute, pb.player.UserAttribute, data => mgr.OnPlayAttribute(data));
    }

    public OnPlayerData(data: pb.player.UserInfo) {
        this._user_id = data.id;
        this._user_name = data.name;
        if (this._user_level != data.level) {
            this._user_level = data.level;
            EventMgr.emit(EventConfig.PLAYRE_LEVEL_UPDATE);
        } else {
            this._user_level = data.level;
        }
        if (this._user_exp != data.exp) {
            let delta = this._user_exp === undefined ? 0 : data.exp - this._user_exp;
            this._user_exp = data.exp;
            Logger.Log(`经验增加${delta}`);
            EventMgr.emit(EventConfig.PLAYRE_EXP_UPDATE, delta);
        } else {
            this._user_exp = data.exp;
        }
        this._user_head = data.head;
        this._server_id = data.server;

        EventMgr.emit(EventConfig.PLAYER_INFO_UPDATE);
    }
    public OnPlayAttribute(data: pb.player.UserAttribute) {
        for (let key in data.attribute) {
            this._attribute.set(parseInt(key), data.attribute[key]);
        }
        if (this._power && this._power != data.combatPower){
            EventMgr.emit(EventConfig.PLAYRE_POWER_UPDATE, data.combatPower - this._power);
        }
        this._power = data.combatPower;
        EventMgr.emit(EventConfig.PLAYRE_ATTRIBUTE_UPDATE);
    }
    public RequestLogin(code: string, callback: NextFunction) {
        ProtocolManager.getInstance().sendProtocolToServer("auth/login", {
            jsCode: code,
            serverId: 1,
        }, callback);
    }
    public RequestUserInfo(callback: NextFunction) {
        ProtocolManager.getInstance().sendProtocolToServer("api/user/info", null, callback, undefined, "GET");
    }
}

export const playerDataMgr: PlayerDataMgr = PlayerDataMgr.getInstance();