import Logger from "../utils/Logger";
import SdkInterface from "./SdkInterface";

export class DefaultSdk implements SdkInterface {
    init(): void {
        Logger.log("DefaultSdk_init");
    }
    login(callbackS: Function, callbackF: Function, target: Object): void {
        Logger.log("DefaultSdk_login");
        callbackS.call(target);
    }
    logout(): void {
        Logger.log("DefaultSdk_logout");
    }
    exit(): void {
        Logger.log("DefaultSdk_exit");
    }
    switchLogin(): void {
        Logger.log("DefaultSdk_switchLogin");
    }
    report(...param: any[]): void {
        Logger.log("DefaultSdk_report");
    }
    pay(...param: any[]): void {
        Logger.log("DefaultSdk_pay");
    }
    createRewardAd(): void {
        Logger.log("DefaultSdk_createRewardAd");
    }
    showRewardAd(callback: Function, target: any): void {
        Logger.log("DefaultSdk_playRewardAd");
    }
    showBannerAd(show: boolean): void {
        Logger.log("DefaultSdk_showBannerAd");
    }
    showInterstitialAd(): void {
        Logger.log("DefaultSdk_showInterstitialAd");
    }
    showCustomAd(show: any, top?: any, left?: any): void {
        Logger.log("DefaultSdk_showCustomAd");
    }
    shareAppMessage(title: string, imageUrlId: string, imageUrl: string, query: any, shareCallback: any): void {
        Logger.log("DefaultSdk_shareAppMessage");
    }
    
}


