import { game, sys, Node, Label } from "cc";
import { Singleton } from "../core/common/Singleton";
import { WECHAT } from "cc/env";
import { SdkManager } from "./SdkManager";
import AudioManager from "../core/audio/AudioManager";
import StorageManager from "../core/storage/StorageManager";
import { STORAGE_KEY_EFFECT_SWITCH, STORAGE_KEY_EFFECT_VOLUME, STORAGE_KEY_MUSIC_SWITCH, STORAGE_KEY_MUSIC_VOLUME, STORAGE_KEY_VIBRATE_PHONE } from "../common/Consts";
import { EGameLayers, EPetAction, EPetSchoolType, EPetStatus, EPlayerPropety, ILanguageData } from "../common/Types";
import { SETTING_TYPE } from "../GameSetting";
import GameConfig from "../GameConfig";
import EventManager from "../core/event/EventManager";
import { EventName } from "../common/EventName";
import LocalUtils from "../tools/LocalUtils";
import Logger from "../core/utils/Logger";
import { ProtobufUtil } from "../tools/ProtobufUtil";
import TimerManager from "../core/timer/TimerManager";
import pb from "pb";
import GameProtocolManager from "./GameProtocolManager";
import { eventNames } from "process";
import TipManager from "./TipManager";

export default class GameManager extends Singleton {
    public static get Instance(): GameManager{
        return this.getInstance<GameManager>();
    }

    //#region game_time
    private _oneMinuteStand: number = 0;
    private _serverTime: string = "0"; // ms
	get serverTime() {
		return this._serverTime;
	}
    private _serverTimerSwitch: boolean = false;
	public updateServerTime(_stt: string | number) {
        this._serverTimerSwitch = false;
		const stt = typeof _stt === "string" ? Number(_stt) : _stt;
		this._serverTime = `${stt * 1000}`;

        Logger.log("_serverTime is : ", this._serverTime);

        TimerManager.Instance.doNext(() => {
            this._serverTimerSwitch = true;
        }, this);
	}
    //#endregion
   
    private _userInfo: pb.com.wmy.pets.model.proto.Player.IUserInfo = {};
    get userInfo() {
        return this._userInfo;
    }
    set userInfo(info: pb.com.wmy.pets.model.proto.Player.IUserInfo) {
        if (LocalUtils.isNil(info)) {
            this._userInfo = {
                id: 0,
                nickname: "unknow",
                sex: 0,
                wxName: "unknow",
                wxHead: "unknow",
            };
        } else {
            this._userInfo.id = info.id || 0;
            this._userInfo.nickname = info.nickname || "unknow";
            this._userInfo.sex = info.sex || 0;
            this._userInfo.wxName = info.wxName || "unknow";
            this._userInfo.wxHead = info.wxHead || "unknow";
        }
        Logger.log("this._userInfo: ", this._userInfo);
    }
    get userId() {
        return `${this._userInfo.id || 0}`;
    }

    private _defaultPetInfo: pb.com.wmy.pets.model.proto.Player.IPetsInfo = {
        id: 0,
        level: 1,
        exp: 0,
        growthRate: 0,
        valHunger: 0,
        valClean: 0,
        valMood: 0,
        valHealth: 0,
        health: EPetStatus.HEALTH,
        action: EPetAction.IDLE,
        action2: 0, // TODO
        actionEndTime: 0, // TODO
        nurseStatus: 0,
        nurseTime: 0,
        nurseQueueTime: 0,
        nurseAutoFeed: 0, // TODO
        nurseAutoWork: 0, // TODO
        nurseAutoStudy: 0, // TODO
        money: 0,
    }

    private _petInfo: pb.com.wmy.pets.model.proto.Player.IPetsInfo = null;
    get petInfo() {
        if (LocalUtils.isNil(this._petInfo)) {
            return this._defaultPetInfo;
        }
        return this._petInfo;
    }
    set petInfo(info: pb.com.wmy.pets.model.proto.Player.IPetsInfo) {
        if (LocalUtils.isNil(info)) {
            this._petInfo = LocalUtils.deepClone(this._defaultPetInfo);
        } else {
            this._petInfo.id = info.id || 0;
            this._petInfo.level = info.level || 0;
            this._petInfo.exp = info.exp || 0;
            this._petInfo.growthRate = info.growthRate || 0;
            this._petInfo.valHunger = info.valHunger || 0;
            this._petInfo.valClean = info.valClean || 0;
            this._petInfo.valMood = info.valMood || 0;
            this._petInfo.valHealth = info.valHealth || 0;
            this._petInfo.health = info.health || EPetStatus.HEALTH;
            this._petInfo.action = info.action || EPetAction.IDLE;
            this._petInfo.action2 = info.action2 || 0; // TODO
            this._petInfo.actionEndTime = info.actionEndTime || 0; // TODO
            this._petInfo.nurseStatus = info.nurseStatus || 0;
            this._petInfo.nurseTime = info.nurseTime || 0;
            this._petInfo.nurseQueueTime = info.nurseQueueTime || 0;
            this._petInfo.nurseAutoFeed = info.nurseAutoFeed || 0; // TODO
            this._petInfo.nurseAutoWork = info.nurseAutoWork || 0; // TODO
            this._petInfo.nurseAutoStudy = info.nurseAutoStudy || 0; // TODO
            this._petInfo.money = info.money || 0;
        }
        Logger.log("this._petInfo: ", this._petInfo);
        Logger.log("this.money", this.money);
    }

    //#region 玩家属性 // TODO 等后端和配置
    get money() {
        return this._petInfo.money as number;
    }
    set money(val: number) {
        this._petInfo.money = val;
        EventManager.Instance.emit(EventName.E_MONEY_CHANGED);
    }
    get age() {
        return this._petInfo.level;
    }
    set age(v: number) {
        this._petInfo.level = v;
        EventManager.Instance.emit(EventName.E_AGE_CHANGED);
    }
    get exp() {
        return this._petInfo.exp;
    }
  
    // 托管
    get tutelage() {
        return !!this._petInfo.nurseStatus;
    }
    set tutelage(flag: boolean) {
        this._petInfo.nurseStatus = flag ? 1 : 0;
        EventManager.Instance.emit(EventName.E_TUTELAGE_SWITCH_CHANGED);
    }
    get tutelageFeed() {
        return !!this._petInfo.nurseAutoFeed;
    }
    set tutelageFeed(flag: boolean) {
        this._petInfo.nurseAutoFeed = flag ? 1 : 0;
        EventManager.Instance.emit(EventName.E_TUTELAGE_FEED_CHANGED);
    }
    get tutelageWork() {
        return !!this._petInfo.nurseAutoWork;
    }
    set tutelageWork(flag: boolean) {
        this._petInfo.nurseAutoWork = flag ? 1 : 0;
        EventManager.Instance.emit(EventName.E_TUTELAGE_WORK_CHANGED);
    }
    get tutelageStudy() {
        return !!this._petInfo.nurseAutoStudy;
    }
    set tutelageStudy(flag: boolean) {
        this._petInfo.nurseAutoStudy = flag ? 1 : 0;
        EventManager.Instance.emit(EventName.E_TUTELAGE_STUDY_CHANGED);
    }

    get growthRate() {
        return this._petInfo.growthRate;
    }
    set growthRate(rate: number) {
        this._petInfo.growthRate = rate;
        EventManager.Instance.emit(EventName.E_GROWTH_RATE_CHANGED);
    }
    get action() {
        return this._petInfo.action;
    }
    set action(v: EPetAction) {
        this._petInfo.action = v;
        EventManager.Instance.emit(EventName.E_ACTION_CHANGED);
    }

    //#region 第二版添加
    // <id, num>
    private _petsBag: Map<number, number> = new Map(); // TODO
    public getPetsBagOne(id: number) {
        return this._petsBag.get(id) || 0;
    }
    public getPetsBagAll(formatType: number = 0) {
        switch (formatType) {
            case 0:
                return this._petsBag;
            case 1:
                return Array.from(this._petsBag.entries());
        } 
    }
    public setPetsBagOne(id: number, num: number) {
        this._petsBag.set(id, num);
    }

    private _tutelageItems: Map<number, number> = new Map();
    public getTutelageItem(id: number) {
        return this._tutelageItems.get(id) || 0;
    }
    public getTutelageItems(formatType: number = 0) {
        switch (formatType) {
            case 0:
                return this._tutelageItems;
            case 1:
                return Array.from(this._tutelageItems.entries());
        }
    }
    public setTutelageItem(id: number, num: number) {
        this._tutelageItems.set(id, num);
    }

    private _curEducation = EPetSchoolType.PRIMARY;
    get curEducation() {
        return this._curEducation;
    }
    set curEducation(education: EPetSchoolType) {
        this._curEducation = education;
    }

    private _schoolInfo: Map<EPetSchoolType, pb.com.wmy.pets.model.proto.Player.ISchool> = new Map();
    public getSchoolOne(schoolType: EPetSchoolType) {
        return this._schoolInfo.get(schoolType);
    }
    public setSchoolOne(schoolType: EPetSchoolType, schoolInfo: pb.com.wmy.pets.model.proto.Player.ISchool) {
        this._schoolInfo.set(schoolType, schoolInfo);
    }
    public getSchoolAll(formatType: number = 0) {
        switch (formatType) {
            case 0:
                return this._schoolInfo;
            case 1:
                return Array.from(this._schoolInfo.entries());
        } 
    }

    //#endregion

    /**
     * @deprecated
     * @param prop 
     * @param val 
     */
    public resetPetProp(prop: EPlayerPropety, val: number) {
        switch (prop) {
            case EPlayerPropety.GROWTH:
                this._petInfo.exp += val;
                val < 0 && (this._petInfo.exp = Math.max(0, this._petInfo.exp));
                break;
            case EPlayerPropety.HUNGRY:
                this._petInfo.valHunger += val;
                val < 0 && (this._petInfo.valHunger = Math.max(0, this._petInfo.valHunger));
                break;
            case EPlayerPropety.CLEAN:
                this._petInfo.valClean += val;
                val < 0 && (this._petInfo.valClean = Math.max(0, this._petInfo.valClean));
                break;
            case EPlayerPropety.MOOD:
                this._petInfo.valMood += val;
                val < 0 && (this._petInfo.valMood = Math.max(0, this._petInfo.valMood));
                break;
            case EPlayerPropety.HEALTH:
                this._petInfo.valHealth += val;
                val < 0 && (this._petInfo.valHealth = Math.max(0, this._petInfo.valHealth));
                break;
        }

        EventManager.Instance.emit(EventName.E_PROPERTY_VALUE_CHANGED, prop)
    }

    //#endregion

    //#region 层级节点
    public layerMap: Map<EGameLayers, Node> = new Map();
    //#endregion

    //#region 音效
    public get musicVolume() {
        return StorageManager.Instance.getById(STORAGE_KEY_MUSIC_VOLUME, 1, this.userId);
    }
    public set musicVolume(value: number) {
        StorageManager.Instance.setById(STORAGE_KEY_MUSIC_VOLUME, value, this.userId);
        AudioManager.Instance.musicVolume = value;
    }
    public get effectVolume() {
        return StorageManager.Instance.getById(STORAGE_KEY_EFFECT_VOLUME, 0.5, this.userId);
    }
    public set effectVolume(value: number) {
        StorageManager.Instance.setById(STORAGE_KEY_EFFECT_VOLUME, value, this.userId);
        AudioManager.Instance.effectVolume = value;
    }
    public get musicSwitch() {
        const result = StorageManager.Instance.getById(STORAGE_KEY_MUSIC_SWITCH, 1, this.userId);
        return !!result;
    }
    public set musicSwitch(flag: boolean) {
        StorageManager.Instance.setById(STORAGE_KEY_MUSIC_SWITCH, flag ? 1 : 0, this.userId);
        AudioManager.Instance.setSwitchMusic(flag);
    }
    public get effectSwitch() {
        const result = StorageManager.Instance.getById(STORAGE_KEY_EFFECT_SWITCH, 1, this.userId);
        return !!result;
    }
    public set effectSwitch(flag: boolean) {
        StorageManager.Instance.setById(STORAGE_KEY_EFFECT_SWITCH, flag ? 1 : 0, this.userId);
        AudioManager.Instance.setSwitchEffect(flag);
    }
    //#endregion

    //#region 
    public get vibratePhoneSwitch() {
        const result = StorageManager.Instance.getById(STORAGE_KEY_VIBRATE_PHONE, 0, this.userId);
        return !!result;
    }
    public set vibratePhoneSwitch(flag: boolean) {
        StorageManager.Instance.setById(STORAGE_KEY_VIBRATE_PHONE, flag ? 1 : 0, this.userId);
        SdkManager.Instance.vibrateSwitch = flag;
    }
    //#endregion
    
    protected init() {
        this.layerMap.clear();
        //#region 设置音效
        AudioManager.Instance.musicVolume = this.musicVolume;
        AudioManager.Instance.effectVolume = this.effectVolume;
        AudioManager.Instance.setSwitchMusic(this.musicSwitch);
        AudioManager.Instance.setSwitchEffect(this.effectSwitch);
        //#endregion
        this._blockKeys = [];

        this._oneMinuteStand = 0;
        this._serverTimerSwitch = false;
        this._serverTime = "0";

        Logger.log("GameManager_init");
    }

    public onGameHeart(dt?: number) {
        Logger.log("onGameHeart");
        this._serverTimerSwitch = true;

        // 心跳 每分钟
        this.runGameHeart(0);
        TimerManager.Instance.doLoopTimer(0, 0.1, 0, this.runGameHeart, this);
    }

    public offGameHeart() {
        Logger.log("offGameHeart");
        this._serverTimerSwitch = false;
        TimerManager.Instance.remove(this.runGameHeart, this);
    }

    private runGameHeart(dt?: number) {
        // Logger.log("onGameHeart", dt);
        if (LocalUtils.isNil(dt) || typeof dt !== "number") {
            Logger.log("onGameHeart_dt_is_nil");
            return;
        }
        this._oneMinuteStand += dt;

        if (this._serverTimerSwitch) {
            this._serverTime = `${Number(this._serverTime) + dt * 1000}`;
            // Logger.log("_serverTime is : ", this._serverTime);
        }

        if (this._oneMinuteStand >= 60) { // 一分钟了
            this._oneMinuteStand = 0;
            EventManager.Instance.emit(EventName.GAME_HEART_BEAT_ONE_MINUTE);
            Logger.log("GAME_HEART_BEAT");

            // TODO DEMO
            // this.resetPetProp(EPlayerPropety.GROWTH, this._petInfo.growthRate * (1 / 60));
            // this.resetPetProp(EPlayerPropety.MOOD, -10);
            // this.resetPetProp(EPlayerPropety.HEALTH, -20);
            // this.resetPetProp(EPlayerPropety.CLEAN, -30);
            // this.resetPetProp(EPlayerPropety.HUNGRY, -40);

            GameProtocolManager.Instance.sendPetInfo(
                () => {
                    EventManager.Instance.emit(EventName.E_ACTOR_LISTEN_STATUS);
                    EventManager.Instance.emit(EventName.E_PROPERTY_VALUE_CHANGED);
                },
                () => {
                    TipManager.Instance.addTipShow("获取数据失败");
                },
                this,
            );
        }
    }

    public async loginGame() {
        this.offGameHeart();
        let flag = false;
        // user_info
        flag = await new Promise(resolve => {
            GameProtocolManager.Instance.sendUserInfo(
                () => resolve(true),
                () => resolve(false),
                this,
            );
        });
        if (!flag) {
            Logger.log("get user_info fail!");
            return flag;
        }
        // pet_info
        flag = await new Promise(resolve => {
            GameProtocolManager.Instance.sendPetInfo(
                () => resolve(true),
                () => resolve(false),
                this,
            );
        });
        if (!flag) {
            Logger.log("get pet_info fail!");
            return flag;
        }

        // bag_items
        flag = await new Promise(resolve => {
            GameProtocolManager.Instance.sendBagItems(
                () => resolve(true),
                () => resolve(false),
                this,
            );
        });
        if (!flag) {
            Logger.log("get bag_items fail!");
            return flag;
        }

        // tutelage_list
        flag = await new Promise(resolve => {
            GameProtocolManager.Instance.sendTutelageItemsList(
                () => resolve(true),
                () => resolve(false),
                this,
            );
        });
        if (!flag) {
            Logger.log("get tutelage_list fail!");
            return flag;
        }

        if (flag) {
            this.onGameHeart();
        }

        return flag;
    }

    public exitGame() {
        this.offGameHeart();
        TipManager.Instance.clearTwMap();
        game.end();
    }

    public decodeBinaryText(buffer: any) {
        if (WECHAT) {
            return SdkManager.Instance.decodeBinaryText(buffer);
        }
        if (sys.isNative) {
            let decode = new TextDecoder("utf-8");
            return decode.decode(new Uint8Array(buffer));
        }
        let decode = new TextDecoder();
        return decode.decode(buffer);
    }

     /**
     * 获取当前语言数据
     * @returns 
     */
     public getCurrentLanguageData(): ILanguageData {
        const defaultId = 1;
        let id = StorageManager.Instance.getById(SETTING_TYPE.SET_LANGUAGE, defaultId, '');
        let data = GameConfig.languages[id || defaultId];
        return data;
    }

    //#region blockinput层
    private _blockKeys: Array<string> = [];
    public setBlockInputLayerVisible() {
        const blockLayer = this.layerMap.get(EGameLayers.BLOCK_LAYER);
        if (LocalUtils.isNil(blockLayer)) return;
        const showBlock = this._blockKeys.length > 0;
        blockLayer.active = showBlock;
        if (showBlock) {
            let str = "";
            this._blockKeys.forEach((k, i) => {
                str += k;
                if (i > 0) {
                    str += "\n";
                }
            });
            blockLayer.children[0].getComponent(Label).string = str;
        }
    }
    public onBlockInputLayer(key: string) {
        const findIdx = this._blockKeys.findIndex(k => k === key);
        if (findIdx < 0) {
            this._blockKeys.push(key);
        }
        this.setBlockInputLayerVisible();
    }
    public offBlockInputLayer(key: string) {
        const findIdx = this._blockKeys.findIndex(k => k === key);
        if (findIdx >= 0) {
            this._blockKeys.splice(findIdx, 1);
        }
        this.setBlockInputLayerVisible();
    }
    //#endregion
}


