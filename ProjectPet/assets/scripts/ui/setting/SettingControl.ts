import { Node } from "cc";
import ControlBase from "../../core/mvc/ControlBase";
import GameManager from "../../manager/GameManager";
import { EGameLayers } from "../../common/Types";

export class SettingControl extends ControlBase {
    public static get Instance(): SettingControl {
        return this.getInstance<SettingControl>();
    }

    protected prefabPath: string = "setting/Setting";
    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.PANEL_LAYER)
}


