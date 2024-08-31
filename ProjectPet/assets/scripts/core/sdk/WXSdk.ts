import { WECHAT } from "cc/env";
import GameConfig from "../../GameConfig";
import { EAdVideoType, IAdAwardVisitInfo } from "../../common/Types";
import { SdkManager } from "../../manager/SdkManager";
import HttpManager, { IHttpMethod } from "../network/HttpManager";
import Logger from "../utils/Logger";
import SdkInterface from "./SdkInterface";
import { sys } from "cc";
import EventManager from "../event/EventManager";
import { EventName } from "../../common/EventName";
import LocalUtils from "../../tools/LocalUtils";
export class WXSdk implements SdkInterface {

    private _wx = window['wx'];

    // 激励视频广告对象
    private _wxRewardedVideoAdObj = null;

    // BANNER广告对象
    private _wxBannerAdObj = null;

    // 插屏广告
    private _wxInterstitialAdObj = null;

    // 格子广告
    private _wxGridAdObj = null;

    // 原生模版广告
    private _wxCustomAdObj = null;


    //广告功能id
    private _videoAdAwardInfo: IAdAwardVisitInfo = { type: EAdVideoType.NONE };
    //广告观看时长
    private _videoAdTime: Date = new Date();

    init(): void {
        Logger.log("WXSdk_init");
        this._wxRewardedVideoAdObj = null;
        this._wxBannerAdObj = null;
        this._wxInterstitialAdObj = null;
        this._wxGridAdObj = null;
        this._wxCustomAdObj = null;
    }

    login(callbackS: Function, callbackF: Function, target: Object): void {
        Logger.log("WXSdk_login");

        if (!WECHAT) return;

        this._wx.login({
            success(res: any) {
                Logger.log('微信登录成功！', res)
                if (res.code) {
                    GameConfig.code = res.code;
                    // //发起后台请求
                    // const url = ""; // GameConfigtManager.Instance.getWXMiniLoginUrl(); // 获取实际情况获取网址
                    // // if (url == null) {
                    // //     Logger.log('微信小游戏登录获取错误')
                    // //     return;
                    // // }

                    // let params = 'js_code=' + res.code;
                    // if (this._wx['wopGlobal'] != null) {
                    //     let wopGlobal = this._wx['wopGlobal'];
                    //     if (wopGlobal["clue_token"] != null) {
                    //         params += '&clue_token=' + wopGlobal["clue_token"];
                    //     }
                    //     if (wopGlobal["promotion_id"] != null) {
                    //         params += '&promotion_id=' + wopGlobal["promotion_id"];
                    //     }
                    //     if (wopGlobal["project_id"] != null) {
                    //         params += '&project_id=' + wopGlobal["project_id"];
                    //     }
                    //     if (wopGlobal["advertiser_id"] != null) {
                    //         params += '&advertiser_id=' + wopGlobal["advertiser_id"];
                    //     }
                    //     if (wopGlobal["mid3"] != null) {
                    //         params += '&mid3=' + wopGlobal["mid3"];
                    //     }
                    // }
                    // HttpManager.Instance.onHttp(IHttpMethod.GET ,url, "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWQiOjEsImlhdCI6MTcyMDM0MzczNCwiZXhwIjoxNzIxODgwNzY3fQ.j-2j67ddBeXVx-Ps7fOKwiPV-sr_sHqDbN7MA0kt8C1RGLFA7sndHaYkiX-YQPMdlI96BKItrGTrBfQN2-Xcxg", params, (xhr: any) => {
                    //     const res = xhr.response;
                    //     if (res.ret !== 0) {
                    //         Logger.log('微信小游戏登录失败: ', res)
                    //         return;
                    //     } else {
                    //         Logger.log("openId: ", res.openId);
                    //         if (res.openId) {
                    //             SdkManager.setUID(res.openId, 1);
                    //         }
                    //     }
                    // }, null, this);
                    callbackS.call(target)
                } else {
                    console.log('登录失败！' + res.errMsg);
                    callbackF.call(target);
                }
            }
        });

        this.initMiniGameEnv();

        this.initWXAds();
    }

    /** 初始化微信小游戏运行环境 */
    public initMiniGameEnv() {
        if (WECHAT) {
            let accountInfo = this._wx.getAccountInfoSync();
            if (accountInfo) {
                let miniProgram = accountInfo.miniProgram;
                if (miniProgram) {
                    GameConfig.envVersion = miniProgram.envVersion;
                    GameConfig.GAME_VER = miniProgram.version;
                    console.log('wxEnvVersion:', GameConfig.envVersion);
                }
            }
        }
    }

    //#region 初始化微信广告
    public initWXAds() {
        if (WECHAT) {
            this.initWXRewardVideoAdObj();
            this.initInterstitialAdObj();
        }
    }

    logout(): void {
        Logger.log("WXSdk_logout");
    }

    exit(): void {
        Logger.log("WXSdk_exit");
    }

    switchLogin(): void {
        Logger.log("WXSdk_switchLogin");
    }

    report(...param: any[]): void {
        Logger.log("WXSdk_report");
    }

    pay(partnerOrder: string, buyQuantity: number, successFun: Function): void {
        Logger.log("WXSdk_pay");
        if (!WECHAT) return;

        switch (sys.os) {
            case sys.OS.IOS:
                this.iosPay(partnerOrder, buyQuantity, successFun);
                break;
            case sys.OS.ANDROID:
                this.androidPay(partnerOrder, buyQuantity, successFun);
                break;
        }
    }

     //IOS支付
     public iosPay(partnerOrder: string, buyQuantity: number, successFun: Function) {
        var state = partnerOrder + "_" + GameConfig.serverid + "_" + buyQuantity + "_" + GameConfig.openid;
        let query: string = "gameOrderId=" + partnerOrder + "&serverId=" + GameConfig.serverid + "&total=" + buyQuantity + "&openId=" + GameConfig.openid + "&state=" + state;
        let sessionFrom = {};
        sessionFrom['params'] = query;
        let sf = JSON.stringify(sessionFrom);
        this._wx.openCustomerServiceConversation({
            sessionFrom: sf,
            showMessageCard: true,
            sendMessageImg: "https://wopcdn.gameserver.youxigu.com/wop_wx/wxshare/share1.jpg", // TODO
            query: query,
            success: function (data: any) {
                console.log("iospay success", data);
            },
            fail: function (data: any) {
                console.log("iospay fail", data);
            },
            complete: function (data: any) {
                console.log("iospay complete", data);
            }
        })
    }

    //安卓支付
    public androidPay(partnerOrder: string, buyQuantity: number, successFun: Function) {
        //Logger.warn("是否是沙箱版本:", envValue, "platform:", GameConfig.platform);
        const obj = {
            mode: "game",
            env: GameConfig.midasEnv,
            offerId: GameConfig.midasOfferId,
            currencyType: "CNY",
            buyQuantity: buyQuantity,
            zoneId: GameConfig.serverid,
            outTradeNo: partnerOrder,
            success: (res: any) => {
                successFun();
            },
            fail: (e: any) => {
                console.warn("支付失败:", e);
            },
            complete: (e: any) => {
                console.warn("支付完成:", e);
            }

        };
        this._wx.requestMidasPayment(obj);
    }

      // 激励视频广告
      private initWXRewardVideoAdObj() {
        if (LocalUtils.isNil(this._wxRewardedVideoAdObj)) {
            this.createRewardAd();
        }
    }

    createRewardAd(): void {
        Logger.log("WXSdk_createRewardAd");

        this._wxRewardedVideoAdObj = this._wx.createRewardedVideoAd({ adUnitId: GameConfig.WX_AD_UNIT_ID }); // TODO
        this._wxRewardedVideoAdObj.onError(this._errorWXRewardVideoAdFunc);
        this._wxRewardedVideoAdObj.onClose(this._closeWXRewardVideoAdFunc);
    }

    showRewardAd(callback: Function, target: any, adAwardInfo: IAdAwardVisitInfo): void {
        Logger.log("WXSdk_playRewardAd");

        this._videoAdAwardInfo = adAwardInfo;
        if (!WECHAT) {
            EventManager.Instance.emit(EventName.E_WX_REWARD_VIDEO_AD_FINIDHED, this._videoAdAwardInfo);
            return;
        }

        if (LocalUtils.isNil(this._wxRewardedVideoAdObj)) {
            Logger.log(`ERROR: SDKManager -> _wxRewardedVideoAd is null`);
            return;
        }

        this._wxRewardedVideoAdObj.load(() => {
            Logger.log("_wxRewardedVideoAd onLoad success");
        }).then(() => {
            this._wxRewardedVideoAdObj.show()
                .catch(err => {
                    Logger.log(err);
                    // 重新拉取一次
                    this._wxRewardedVideoAdObj.load(() => {
                        Logger.log("_wxRewardedVideoAd onLoad again success");
                    }).then(() => this._wxRewardedVideoAdObj.show());
                })
                .then(() => {
                    this._videoAdTime.setTime(Date.now());
                    EventManager.Instance.emit(EventName.E_WX_REWARD_VIDEO_AD_COMPLETE, this._videoAdAwardInfo.type); // TODO 通知后端广告播放完毕
                    Logger.log("_wxRewardedVideoAd show success");
                }).catch(err => {
                    Logger.log("RewardedVideoAdError: ", err);
                });
        })
    }

    private _errorWXRewardVideoAdFunc = this.errorWXRewardVideoAd.bind(this);
    private errorWXRewardVideoAd(err: any) {
        Logger.log(err);
        EventManager.Instance.emit(EventName.E_WX_REWARD_VIDEO_AD_ERROR, this._videoAdAwardInfo);
    }

    private _closeWXRewardVideoAdFunc = this.closeWXRewardVideoAd.bind(this);
    private closeWXRewardVideoAd(res: any) {
        // 用户点击了【关闭广告】按钮
        // 小于 2.1.0 的基础库版本，res 是一个 undefined
        let time = Math.floor((Date.now() - this._videoAdTime.getTime()) / 1000);
        if (res && res.isEnded || res === undefined) {
            // 正常播放结束，可以下发游戏奖励
            EventManager.Instance.emit(EventName.E_WX_REWARD_VIDEO_AD_FINIDHED, this._videoAdAwardInfo);
            EventManager.Instance.emit(EventName.E_WX_REWARD_VIDEO_AD_COMPLETE, this._videoAdAwardInfo.type, time, 1);
        } else {
            // 播放中途退出，不下发游戏奖励
            EventManager.Instance.emit(EventName.E_WX_REWARD_VIDEO_AD_BREAKED, this._videoAdAwardInfo);
            // EventManager.Instance.emit(EventName.E_WX_REWARD_VIDEO_AD_COMPLETE, this._videoAdAwardInfo.type, time, 0);
        }
        
        // TODO 后续处理，eg 播放背景音乐
    }

    private createWXBannerAdObj(adIntervals: number = 30) {
        if (LocalUtils.isNil(this._wxBannerAdObj)) {
            this._wxBannerAdObj = this._wx.createBannerAd({
                adUnitId: GameConfig.WX_AD_UNIT_ID,
                style: {
                    left: 10,
                    top: 76,
                    width: 320,
                },
                adIntervals: Math.max(30, adIntervals),
            });
        }
    }

    showBannerAd(show: boolean = false, adIntervals?: number): void {
        Logger.log("WXSdk_showBannerAd");

        if (!LocalUtils.isNil(this._wxBannerAdObj)) {
            this._wxBannerAdObj.destroy();
            this._wxBannerAdObj = null;
        }

        this.createWXBannerAdObj(adIntervals);

        if (!show) {
            this._wxBannerAdObj.hide();
            return;
        }

        this._wxBannerAdObj.onLoad(() => {
            Logger.log("_wxBannerAdObj onLoad success");
        });

        this._wxBannerAdObj.show()
                .catch(err => this._errorWXBannerAdFunc(err));
    }

    public resetBannerAdWidth(wth: number) {
        if (LocalUtils.isNil(this._wxBannerAdObj)) {
            Logger.log('ERROR: SDKManager: resetBannerWidth -> _showBannerAd is null');
            return;
        }
        this._wxBannerAdObj.style.width = wth;
    }

    private _errorWXBannerAdFunc = this.errorWXBannerAd.bind(this);
    private errorWXBannerAd(err: any) {
        Logger.log(err);
    }

    private initInterstitialAdObj() {
        if (LocalUtils.isNil(this._wxInterstitialAdObj)) {
            this._wxInterstitialAdObj = this._wx.createInterstitialAd({ adUnitId: GameConfig.WX_AD_UNIT_ID });
            this._wxInterstitialAdObj.onError(this._errorWXInterstitialAdFunc);
            this._wxInterstitialAdObj.onClose(this._closeWXInterstitialAdFunc);
        }
    }

    showInterstitialAd(): void {
       if (LocalUtils.isNil(this._wxInterstitialAdObj)) {
            Logger.log('_interstitialAdObj is nil');
            return;
       }
       this._wxInterstitialAdObj.load(() => {
            Logger.log("_wxInterstitialA onLoad success");
       })
       .catch(err => {
            Logger.log(err)
       })
       .then(() => {
            this._wxInterstitialAdObj.show()
                .catch(err => Logger.log(err));
       });
    }

    private _errorWXInterstitialAdFunc = this.errorWXInterstitialAd.bind(this);
    private errorWXInterstitialAd(err: any) {
        Logger.log(err);
    }

    private _closeWXInterstitialAdFunc = this.closeWXInterstitialAd.bind(this);
    private closeWXInterstitialAd(res: any) {
        Logger.log(res)
    }

    private createWXGridAdObj(gridCount: number = 5, adIntervals: number = 30) {
        if (LocalUtils.isNil(this._wxGridAdObj)) {
            this._wxGridAdObj = this._wx.createGridAd({
                adUnitId: GameConfig.WX_AD_UNIT_ID,
                style: {
                    left: 10,
                    top: 76,
                    width: 330,
                    opacity: 0.8
                },
                adTheme: 'white',
                gridCount: gridCount,
                adIntervals: Math.max(30, adIntervals),
            });

            this._wxGridAdObj.onError(this._errorGridAdFunc)
        }
    }

    private _errorGridAdFunc = this.errorGridAd.bind(this);
    private errorGridAd(err: any) {
        Logger.log(err);
    }

    showGridAd(show: boolean = false, gridCount?: number, adIntervals?: number) {
        Logger.log("WXSdk_showGridAd");

        if (!LocalUtils.isNil(this._wxGridAdObj)) {
            this._wxGridAdObj.destroy();
            this._wxGridAdObj = null;
        }

        this.createWXGridAdObj(gridCount, adIntervals);

        if (!show) {
            this._wxGridAdObj.hide();
            return;
        }

        this._wxGridAdObj.onLoad(() => {
            Logger.log('gridAd load success');
        });

        this._wxGridAdObj.show().catch(err => Logger.log(err));
    }

    public resetGridAdWidth(wth: number) {
        if (LocalUtils.isNil(this._wxGridAdObj)) {
            Logger.log('ERROR: SDKManager: resetGridAdWidth -> _wxGridAdObj is null');
            return;
        }
        this._wxGridAdObj.style.width = wth;
    }

    private createCustomAdObj(top: number = 75, left: number = 10) {
        if (LocalUtils.isNil(this._wxCustomAdObj)) {
            this._wxCustomAdObj = this._wx.createCustomAd({
                adUnitId: GameConfig.WX_AD_UNIT_ID,
                style: {
                    left: left,
                    top: top,
                    width: 375, // 用于设置组件宽度，只有部分模板才支持，如矩阵格子模板
                    fixed: true // fixed 只适用于小程序环境
                }
            });

            this._wxCustomAdObj.onError((err => Logger.log(err)).bind(this));
            this._wxCustomAdObj.onClose((() => Logger.log('_wxCustomAd close')).bind(this));
            this._wxCustomAdObj.onHide((() => Logger.log('_wxCustomAd hide')).bind(this));
        }
    }

    showCustomAd(show: any, top?: number, left?: number): void {
        if (!LocalUtils.isNil(this._wxCustomAdObj)) {
            this._wxCustomAdObj.destroy();
            this._wxCustomAdObj = null;
        }

        this.createCustomAdObj(top, left);

        if (!show) {
            this._wxCustomAdObj.hide();
            return;
        }

        this._wxCustomAdObj.onLoad(() => {
            Logger.log("wxCustomAdObj onLoad succsee");
        });

        this._wxCustomAdObj.show()
            .catch(err => Logger.log(err));

    }

    shareAppMessage(title: string, imageUrlId: string, imageUrl: string, query: any, shareCallback: any): void {
        Logger.log("WXSdk_shareAppMessage");
    }

    /** 屏幕常亮 */
    public setKeepScreenOn() {
        if (WECHAT) {
            this._wx.setKeepScreenOn({
                keepScreenOn: true
            });
        }
    }

    public decodeBinaryText(buffer: any) {
        return this._wx.decode({ data: buffer, format: 'utf8' });
    }

     /** 注册微信更新 */
     public initWxUpdateManager() {
        if (WECHAT) {
            let updateManager = this._wx.getUpdateManager()
            if (updateManager) {
                updateManager.onCheckForUpdate(res => {
                    console.log('onCheckForUpdate:', res)
                })

                updateManager.onUpdateReady(function () {
                    console.log(`onUpdateReady ~~~~~`)
                    this._wx.showModal({
                        title: '更新提示',
                        content: '新版本已经下载完毕，小程序即将重启',
                        showCancel: false,
                        complete: function () {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启\
                            console.log("applyUpdate ~~~~")
                            updateManager.applyUpdate()
                        }
                    })
                })

                updateManager.onUpdateFailed(function () {
                    // 新的版本下载失败
                    console.log(`onUpdateFail !!!!`)
                })
            }
        }
    }

     /**
     * 手机震动
     * @param ms 
     * @returns 
     */
    public vibratePhone(ms: number) {
        if (LocalUtils.isNil(this._wx)) return;
        this._wx.vibrateLong(ms);
    }

    
    /** 内存警告回收 */
    public onMemoryWarning(callBack: Function, target: any) {
        if (WECHAT) {
            this._wx.onMemoryWarning(() => {
                console.log("内存告警");
                if (callBack) {
                    callBack.call(target);
                }
                this._wx.triggerGC();
            });
        }
    }

    public getWXScreenWidth() {
        let { screenWidth } = this._wx.getSystemInfoSync();
        return screenWidth;
    }

    public request(url: string, data: any, header: any, successFunc: Function, failFunc: Function) {
        this._wx.request({
            url: url,
            data: data,
            header: header,
            success (res) {
                successFunc(res);
            },
            fail (res) {
                failFunc(res);
            }
        });
    }
   
}


