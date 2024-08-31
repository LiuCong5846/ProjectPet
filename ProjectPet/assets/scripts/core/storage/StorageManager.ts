import { sys } from "cc";
import { md5 } from "../../../libs/encrypt/Md5";
import EncryptUtil from "../utils/EncryptUtil";
import { Singleton } from "../common/Singleton";
import Logger from "../utils/Logger";

export default class StorageManager extends Singleton {
    public static get Instance(): StorageManager {
        return this.getInstance<StorageManager>();
    }

    private _key: string | null = null;
    private _iv: string | null = null;
    private _id: string = '';

    /**
     * 初始化密钥
     * @param key aes加密的key 
     * @param iv  aes加密的iv
     */
    protected init() {
        this._key = md5('mwy');
        this._iv = md5('pet');
    }

    /**
     * 设置用户id 作为前缀防止重复
     * @param id 
     */
    public setUserId(id: string) {
        this._id = id;
    }

    /**
     * 存储
     * @param key 存储key
     * @param value 存储值
     * @returns 
     */
    public set(key: string, value: any) {
        this.setById(key, value, this._id)
    }

    /**
     * 根据id存储
     * @param key 存储key
     * @param value 存储值
     * @returns 
     */
    public setById(key: string, value: any, id: string = '') {
        key = `${key}_${id}`;

        if (null == key) {
            Logger.error("存储的key不能为空");
            return;
        }

        key = md5(key);

        if (null == value) {
            Logger.warn("存储的值为空，则直接移除该存储");
            this.remove(key);
            return;
        }

        if (typeof value === 'function') {
            Logger.error("储存的值不能为方法");
            return;
        }

        if (typeof value === 'object') {
            try {
                value = JSON.stringify(value);
            }
            catch (e) {
                Logger.error(`解析失败，str = ${value}`);
                return;
            }
        } else if (typeof value === 'number') {
            value = value + "";
        }

        if (null != this._key && null != this._iv) {
            try {
                value = EncryptUtil.aesEncrypt(value, this._key, this._iv);
            } catch (e) {
                value = null;
            }
        }

        sys.localStorage.setItem(key, value);
    }

    /**
     * 获取
     * @param key 获取的key
     * @param defaultValue 获取的默认值
     * @param id 用户id
     * @returns 
     */
    public getById(key: string, defaultValue?: any, id: string = '') {
        if (null == key) {
            Logger.error("存储的key不能为空");
            return;
        }

        key = `${key}_${id}`;
        key = md5(key);

        let str: string | null = sys.localStorage.getItem(key);
        if (null != str && '' !== str && null != this._key && null != this._iv) {
            try {
                str = EncryptUtil.aesDecrypt(str, this._key, this._iv);
            } catch (e) {
                str = null;
            }

        }
        if (null == defaultValue) {
            return str;
        }

        if (null === str) {
            return defaultValue;
        }

        if (typeof defaultValue === 'number') {
            if (Number(str) != null && str != '') {
                return Number(str)  
            }
            return Number(defaultValue);
        }

        if (typeof defaultValue === 'boolean') {
            return "true" == str; // 不要使用Boolean("false");
        }

        if (typeof defaultValue === 'object') {
            try {
                return JSON.parse(str);
            }
            catch (e) {
                Logger.error("解析数据失败,str=" + str);
                return defaultValue;
            }

        }

        return str;
    }

    /**
     * 获取
     * @param key 获取的key
     * @param defaultValue 获取的默认值
     * @returns 
     */
    public get(key: string, defaultValue?: any) {
        return this.getById(key, defaultValue, this._id);
    }

    /**
     * 移除某个值
     * @param key 需要移除的key 
     * @returns 
     */
    public remove(key: string) {
        if (null == key) {
            Logger.error("存储的key不能为空");
            return;
        }

        key = `${key}_${this._id}`;
        key = md5(key);

        sys.localStorage.removeItem(key);
    }

    /**
     * 清空整个本地存储
     */
    public clear() {
        sys.localStorage.clear();
    }
}