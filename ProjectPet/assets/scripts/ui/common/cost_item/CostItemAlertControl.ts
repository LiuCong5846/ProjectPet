import { Node } from "cc";
import ControlBase from "../../../core/mvc/ControlBase";
import { CostItemAlertView } from "./CostItemAlertView";
import GameManager from "../../../manager/GameManager";
import { EGameLayers } from "../../../common/Types";

export class CostItemAlertControl extends ControlBase {
    public static get Instance(): CostItemAlertControl {
        return this.getInstance<CostItemAlertControl>();
    }

    protected viewBase: CostItemAlertView;
    protected prefabPath: string = "common/CostItemAlert";
    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.POP_LAYER);
}


