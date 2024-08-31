import { Node } from "cc";
import ControlBase from "../../core/mvc/ControlBase";
import ResLoadManager from "../../core/res/ResLoadManager";
import Logger from "../../core/utils/Logger";
import ResManager from "../../manager/ResManager";
import { ShopView } from "./ShopView";
import GameManager from "../../manager/GameManager";
import { EGameLayers } from "../../common/Types";

export class ShopControl extends ControlBase {
    public static get Instance(): ShopControl {
        return this.getInstance<ShopControl>();
    }
    protected viewBase: ShopView;

    protected prefabPath: string = "shop/Shop";

    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.PANEL_LAYER);

    protected async preloadComps() {
        await ResManager.Instance.getPrefab("shop/ShopListCell");
    }

    protected releaseComps() {
        // ResLoadManager.Instance.releaseDir("shop", "prefabs");
        ResManager.Instance.releasePrefab("shop/ShopListCell");
    }
}


