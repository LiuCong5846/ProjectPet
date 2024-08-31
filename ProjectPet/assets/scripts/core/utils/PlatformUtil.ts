import { sys } from "cc";

export default class PlatformUtil {
    /** 是否app平台 */
    public static isApp() {
        return sys.platform != sys.Platform.ANDROID && sys.platform != sys.Platform.IOS;
    }

    public static isNativeAndroid() {
        if (sys.isNative && sys.platform === sys.Platform.ANDROID)
            return true
        return false
    }

    public static isNativeIOS() {
        if (sys.isNative && sys.os === sys.OS.IOS)
            return true
        return false
    }

    public static getPlateform() {
        if (this.isNativeAndroid())
            return 'android'
        else if (this.isNativeIOS())
            return 'ios'
        else
            return 'h5'
    }
}
