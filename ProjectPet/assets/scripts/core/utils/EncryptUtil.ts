/**
 * AES 加密解密
 */

export default class EncryptUtil {
    /**
     * AES 加密
     * @param msg 
     * @param key 
     * @param iv 
     * @returns 
     */
    public static aesEncrypt(msg: string, key: string, iv: string): string {
        let encrypt = CryptoJS.AES.encrypt(msg, this.utf8Parse(key),
            {
                iv: this.utf8Parse(iv),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );
        return encrypt.toString();
    }

    /**
     * AES 解密
     * @param str 
     * @param key 
     * @param iv 
     * @returns 
     */
    public static aesDecrypt(str: string, key: string, iv: string): string {
        let decrypt = CryptoJS.AES.decrypt(str, this.utf8Parse(key), {
            iv: this.utf8Parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Utf8.stringify(decrypt);
    }

    public static utf8Parse(utf8Str: string): string {
        return CryptoJS.enc.Utf8.parse(utf8Str);
    }
}