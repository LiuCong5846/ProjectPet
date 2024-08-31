import { WECHAT } from "cc/env";
import GameConfig from "../../GameConfig";
import { Singleton } from "../common/Singleton";

export default class ConfigManager extends Singleton {
    public static get Instance(): ConfigManager {
        return this.getInstance<ConfigManager>();
    }

    private _configMap: Map<string, any> = new Map();
    get configMap() {
        return this._configMap;
    }

    /**
     * 添加配置文件
     * @param name 
     * @param data 
     */
    public addConfig(name: string, data: any) {
        this._configMap.set(name, data);
    }

    public getConfigByName(name: string): any {
        let configData = null;
        if (this._configMap) {
            configData = this._configMap.get(name);
        }
        return configData;
    }
    
}


