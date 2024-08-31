import GameConfig from "../../GameConfig";
import { Singleton } from "../common/Singleton";

export default class LocalStringManager extends Singleton {
    public static get Instance(): LocalStringManager {
        return this.getInstance<LocalStringManager>();
    }

    private _languageMap: Map<string, any> = new Map();
    private _currentLanguage: any = null;
    private _currentMsgLanguage: any = null;

    /**
     * 添加配置文件
     * @param name 
     * @param data 
     */
    public addLanguage(name: string, data: any) {
        this._languageMap.set(name, data);
    }

    /**
     * 获取语言文字
     * @param name 
     * @returns 
     */
    public getString(name: string): any {
        if (this._languageMap && this._currentLanguage == null) {
            this._currentLanguage = this._languageMap.get(GameConfig.language + '_tip');
        }
        let langStr = this._currentLanguage[name];
        return langStr || `local_string_undefine:${name}`;
    }

    /**
     * 获取语言文字
     * @param name 
     * @returns 
     */
    public getMsgString(name: string): any {
        if (this._languageMap && this._currentMsgLanguage == null) {
            this._currentMsgLanguage = this._languageMap.get(GameConfig.language + '_msg');
        }
        let langStr = this._currentMsgLanguage[name];
        return langStr || `language_undefine:${name}`;
    }

    public clearCurrentLanguage() {
        this._currentLanguage = null;
        this._currentMsgLanguage = null;
    }
    
}


