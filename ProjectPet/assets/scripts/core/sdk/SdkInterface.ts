export default interface SdkInterface {
    /**
     * 初始化
     */
    init(): void;

    /**
     * 登录
     * @param callbackS 登录成功后回调
     * @param callbackF 登录失败后回调
     * @param target 监听对象
     */
    login(callbackS: Function, callbackF: Function, target: Object): void;

    /**
     * 登出
     */
    logout(): void;

    /**
     * 退出
     */
    exit(): void;

    /**
     * 切换账号
     */
    switchLogin(): void;

    /**
     * 数据上报
     * @param param 参数
     */
    report(...param: any[]): void;

    /**
     * 支付
     * @param param 参数
     */
    pay(...param: any[]): void;

    /**
     * 播放激励视频广告
     */
    createRewardAd(): void;
    /**
     * 播放激励视频广告
     */
    showRewardAd(callback: Function, target: any, ...args: any): void;
    /**
     * 显示banner广告
     */
    showBannerAd(show: boolean, ...args: any): void;
    /**
     * 显示插屏广告
     */
    showInterstitialAd(): void;
    /**
     * 显示原生模版广告
     */
    showCustomAd(show, top?, left?): void;
    /**
     * 主动拉起转发(小程序)
     */
    shareAppMessage(title: string, imageUrlId: string, imageUrl: string, query: any, shareCallback: any): void;
}