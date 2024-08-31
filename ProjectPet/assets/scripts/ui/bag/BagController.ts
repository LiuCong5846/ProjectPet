import { EGameLayers } from "../../common/Types";
import ControlBase from "../../core/mvc/ControlBase";
import GameManager from "../../manager/GameManager";
import ResManager from "../../manager/ResManager";
import { Node } from "cc";
import { BagView } from "./BagView";

export class BagController extends ControlBase {
    public static get Instance(): BagController {
        return this.getInstance<BagController>();
    }
    protected viewBase: BagView;

    protected prefabPath: string = "bag/Bag";

    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.PANEL_LAYER);

    protected async preloadComps() {
        await ResManager.Instance.getPrefab("bag/BagListCell");
    }

    protected releaseComps() {
        // ResLoadManager.Instance.releaseDir("shop", "prefabs");
        ResManager.Instance.releasePrefab("bag/BagListCell");
    }
}

