import { DynamicAtlasManager, assetManager, game, macro, profiler, sys, view } from "cc";
import { DEV, WECHAT } from "cc/env";
import { LanguageType } from "./common/Types";

//动态合图设置
macro.ENABLE_MULTI_TOUCH = false;

if (WECHAT || DEV) {
    macro.CLEANUP_IMAGE_CACHE = true;
    DynamicAtlasManager.instance.enabled = false;
} else {
    macro.CLEANUP_IMAGE_CACHE = false;
    DynamicAtlasManager.instance.enabled = true;
    DynamicAtlasManager.instance.maxFrameSize = 1024;
}

export default class GameConfig {
    public static remoteUrlss: string = "https://7072-prod-6g6ejw7f5fda7660-1327431214.tcb.qcloud.la/";
    public static GAME_VER = "0.0.1";
    public static onPause: boolean = false;//游戏进入后台
    public static isPublish: boolean = false; // 是否线上版本
    public static isDebug: boolean = true;//是否是调试状态
    public static isHotUpdate: boolean = true;//是否是热更新
    public static language: LanguageType = LanguageType.ZH_CH;//默认语言
    public static account: string = "test";//测试使用账号xt153
    public static code: string = "0d1lyKGa1yaREG0jxqFa133CCe2lyKG9";//微信登录code
    public static platID: number = 2; //ios 0 /android 1 / pc 2
    public static url: string = "https://pets.2048d.cn/";

    public static token: string = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWQiOjEsImlhdCI6MTcyNzUxNTQ2OCwiZXhwIjoxNzI4NjQxOTQwfQ.Be_nWsMaKVryCtZBgaWHXlO7RAdmZ9s1mx6z_-I1ikgadprLOC2w3vdDFH4yIv_kSyuSVy0MFp1h2dXPcfRuEA";//服务器返回token
    public static openIosPay: boolean = true;//是否开启IOS付费
    public static midasOfferId = '1450076927';//米大师id
    public static midasEnv = 0;//小游戏支付环境 0米大师正式环境 1米大师沙箱环境
    public static midasPlatform = 'android';//申请接入时的平台，platform 与应用id有关。
    public static envVersion: string = 'develop';//小程序环境

    //广告ID
    public static WX_AD_UNIT_ID = ""; //"adunit-bdcafa9b29902b95"; // TODO

    public static isIOS = false;//是否是IOS
    public static isAndroid = false;//是否是IOS

    public static GAME_WIDTH: number = 1080;
    public static GAME_HEIGHT: number = 1920;
    public static SCENE_WIDTH: number = 1080;//真实大小宽
    public static SCENE_HEIGHT: number = 1920;//真实大小高

    public static isLongScreen: boolean = false;//长的屏幕


    //是否是微信
    public static isMiniGame: boolean = false;
    //是否是apk ipad 包
    public static isApp: boolean = false;
    //是否是QQ平台(isMiniGame 也要修改为 true)
    public static isQQ: boolean = false;
    /**
     * 微信app 9901/9900
     * 微信小游戏 9902
     */
    public static platFormType: number = 1;
    public static wechatPlatFormType: number = 1;//商务体验包写1 //9901
    //微信小游戏平台
    public static wechatMiniPlatFormType: number = 9902;

    //ua标识
    public static ua: string = '';
    //渠道号
    public static channelId: number = 1;

    public static socketIpHead: string = 'ws://';
    public static socketIp: string = '127.0.0.1'; // TODO
    public static serverName: string = '139测试服';
    public static port: number = 3000; // TODO
    public static openid: string = '1'; //玩家ID
    public static useSSL: boolean = false; //是否使用SSL加密

    public static serverid: number = 1; //服务器id
    public static serverState: number = 1;

    public static isLogin: boolean;

    public static time = 0;

    //是否开启新手引导
    public static isGuide = true;

    //语言
    public static languages = { 1: { id: 1, name: '简体中文', type: 'zh_CN' }, 2: { id: 2, name: 'ENGLISH', type: 'en' } };

    public static init(): void {
        view.resizeWithBrowserSize(true);
        if (DEV) { // || (GameConfig.isDebug && WECHAT)
            profiler.showStats()
        } else {
            profiler.hideStats();
        }

        game.frameRate = 60;//帧频
        /**
        if (sys.os == sys.OS.IOS && WECHAT) {
            game.frameRate = 30;//帧频
        } */

        this.setHighConcurrency();

        if (assetManager.presets['preload']) {
            assetManager.presets['preload'].maxConcurrency = 1024;
            assetManager.presets['preload'].maxRequestsPerFrame = 1024;
        }

        if (assetManager.presets['bundle']) {
            assetManager.presets['bundle'].maxConcurrency = 1024;
            assetManager.presets['bundle'].maxRequestsPerFrame = 1024;
        }

        if (assetManager.presets['scene']) {
            assetManager.presets['scene'].maxConcurrency = 1024;
            assetManager.presets['scene'].maxRequestsPerFrame = 1024;
        }

        if (assetManager.cacheManager) {
            assetManager.cacheManager.cacheInterval = 50;
        }

        //手机类型
        let winSize = view.getVisibleSize();
        GameConfig.isIOS = sys.isNative && sys.os == sys.OS.IOS;
        GameConfig.isAndroid = sys.isNative && sys.platform == sys.Platform.ANDROID;

        let screenRatio = winSize.width / winSize.height;
        GameConfig.isLongScreen = screenRatio <= 0.4;
    }

    public static setHighConcurrency() {
        assetManager.downloader.maxConcurrency = 8; //并发数量
        assetManager.downloader.maxRequestsPerFrame = 8; //每帧最大请求
    }

    public static SetConcurrency() {
        if (!GameConfig.isDebug) {
            assetManager.downloader.maxConcurrency = 4; //并发数量
            assetManager.downloader.maxRequestsPerFrame = 4; //每帧最大请求
        }
    }

    /** 是否显示支付 */
    public static get isShowPay() {
        //苹果手机屏蔽支付
        if (!GameConfig.isDebug && sys.os == sys.OS.IOS && this.envVersion != 'release') {
            return false;
        }
        return true;
    }

    /** 微信小游戏是否是release版本 */
    public static get isMiniGameRelease() {
        switch (this.envVersion) {
            case "develop":
            case "trial":
                return false;
            case "release":
                return true;
        }
    }

    /** 获取平台类型id */
    public static getPlatFormType() {
        if (this.isDebug) {
            return 1;
        }
        if (WECHAT) {
            return GameConfig.wechatMiniPlatFormType;
        }
        if (sys.isNative) {
            return GameConfig.wechatPlatFormType;
        }
        return GameConfig.platFormType;
    }
}

