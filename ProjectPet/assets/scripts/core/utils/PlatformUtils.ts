import { sys } from "cc";

export default class PlatformUtils {
    public constructor() { }

    public static isPC(): boolean {
        if (window["runtimePlatform"]) {
            let plat = window["runtimePlatform"];
            if (plat == "windows") {
                return true;
            }
        }

        //浏览器
        if (sys.isBrowser) {
            let userAgent: string = navigator.userAgent.toString();
            let agents: string[] = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
            let flag: boolean = true;

            for (let index = 0; index < agents.length; index++) {
                if (userAgent.indexOf(agents[index]) > 0) {
                    flag = false;
                    break;
                }
            }

            return flag;
        } else {
            return sys.os == sys.OS.WINDOWS || sys.os == sys.OS.LINUX || sys.os == sys.OS.OSX;
        }
    }

    public static isIPhone(): boolean {
        return sys.isNative && sys.os == sys.OS.IOS;
    }

    public static isAndroid(): boolean {
        return sys.isNative && sys.os == sys.OS.ANDROID;
    }

    public static getEnvName(): string {
        return sys.isNative && sys.os;
    }

    public static getPlatform(): number {
        if (PlatformUtils.isAndroid()) {
            return 1;
        } else if (PlatformUtils.isIPhone()) {
            return 0;
        } else {
            return 2;
        }
    }

    /**
     * 微信小游戏appid
     * "wx678d4880f01a22b9" //七雄
     * "wx59a17396f853007a// 策马
     */
    public static getAppID(): string {
        let appId = window["miniGameAppId"];
        return appId || "";
    }
}