import { IPetGrowthEntity } from "../../config/PetGrowthEntity";
import ConfigManager from "../../core/config/ConfigManager";
import Logger from "../../core/utils/Logger";
import ModelBase from "../../core/mvc/ModelBase";

export class HomeModel extends ModelBase {
    public static get Instance(): HomeModel {
        return this.getInstance<HomeModel>();
    }

    public petOwnNames: Array<string> = ["dog_2"];

    private _petGrowthCfg: any = null;

    protected init() {
        this._petGrowthCfg = ConfigManager.Instance.getConfigByName('petGrowth');
        // Logger.log("this._petGrowthCfg: ", this._petGrowthCfg);
    }

    public getPetGrowthConfig(level: number) {
        const cfg = this._petGrowthCfg[level] as IPetGrowthEntity;
        // Logger.log("getPetGrowthConfig_cfg: ", cfg)
        return cfg;
    }
}


