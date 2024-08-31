import { Node } from "cc";
import ControlBase from "../../core/mvc/ControlBase";
import { FriendSearchView } from "./FriendSearchView";
import GameManager from "../../manager/GameManager";
import { EGameLayers } from "../../common/Types";

export class FriendSearchControl extends ControlBase {
    public static get Instance(): FriendSearchControl {
        return this.getInstance<FriendSearchControl>();
    }

    protected viewBase: FriendSearchView;
    protected prefabPath: string = "friends/FriendSearch";
    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.PANEL_LAYER);
}


