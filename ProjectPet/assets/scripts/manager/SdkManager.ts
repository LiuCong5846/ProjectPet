import { WECHAT } from "cc/env";
import GameConfig from "../GameConfig";
import { Singleton } from "../core/common/Singleton";
import { DefaultSdk } from "../core/sdk/DefaultSdk";
import SdkInterface from "../core/sdk/SdkInterface";
import { WXSdk } from "../core/sdk/WXSdk";
import Logger from "../core/utils/Logger";


export class SdkManager extends Singleton {
    public static get Instance(): SdkManager {
        return this.getInstance<SdkManager>();
    }

    private _sdkObj: SdkInterface = null;

    private _vibrateSwitch: boolean = false;
    get vibrateSwitch() {
        return this._vibrateSwitch;
    }
    set vibrateSwitch(flag: boolean) {
        if (this._vibrateSwitch === flag) return;
        this._vibrateSwitch = flag;
    }

    protected init(): void {
        // if (GameConfig.isPublish) {
        //     if (WECHAT) {
        //         this._sdkObj = new WXSdk();
        //     } else {
        //         this._sdkObj = new DefaultSdk();
        //     }
        // } else {
        //     this._sdkObj = new DefaultSdk();
        // }
        if (WECHAT) {
            this._sdkObj = new WXSdk();
        } else {
            this._sdkObj = new DefaultSdk();
        }

        this._sdkObj.init();
    }

    public static setUID(openId: string, platID: number) {
        GameConfig.account = openId;
        GameConfig.platID = platID;
    }

    /**
     * 登录
     * @param callback 登录成功后回调
     * @param target 监听对象
     */
    public login(callbackS: Function, callbackF: Function, target: Object): void {
        Logger.log("SdkMgr login");
        this._sdkObj.login(callbackS, callbackF, target);
    }

    /**
     * 登出
     */
    public logout(): void {
        Logger.log("SdkMgr logout");
        this._sdkObj.logout();
    }

    /**
     * 退出
     */
    public exit(): void {
        Logger.log("SdkMgr exit");
        this._sdkObj.exit();
    }

    /**
     * 切换账号
     */
    public switchLogin(): void {
        Logger.log("SdkMgr switchLogin");
        this._sdkObj.switchLogin();
    }

    /**
     * 数据上报
     * @param param 参数
     */
    public report(...param: any[]): void {
        Logger.log("SdkMgr report");
        this._sdkObj.report(param);
    }

    /**
     * 数据上报
     * @param param 参数
     */
    public pay(...param: any[]): void {
        Logger.log("SdkMgr pay");
        this._sdkObj.pay(param);
    }

    /**
     * 主动拉起转发(小程序)
     */
    shareAppMessage(title: string = "", imageUrlId: string = "", imageUrl: string = "", query: any = null, shareCallback: any = null): void {
        this._sdkObj.shareAppMessage(title, imageUrlId, imageUrl, query, shareCallback);
    }

    public decodeBinaryText(buffer: any) {
        if (WECHAT) {
            (this._sdkObj as WXSdk).decodeBinaryText(buffer);
        }
    }

    public wxRequest(url: string, data: any, header: any, successFunc: Function, failFunc: Function) {
        if (!WECHAT) {
            failFunc();
            return;
        }
        (this._sdkObj as WXSdk).request(url, data, header, successFunc, failFunc);
    }

     /**
     * 手机震动
     * @param ms 
     * @returns 
     */
    public vibratePhone(ms: number) {
        if (!this._vibrateSwitch) return;
        if (WECHAT) {
            (this._sdkObj as WXSdk).vibratePhone(ms);
        } else {
            Logger.log("手机震动暂无");
        }
    }
   
}


