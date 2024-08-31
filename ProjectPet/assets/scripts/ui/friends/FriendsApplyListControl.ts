import { Node } from "cc";
import ControlBase from "../../core/mvc/ControlBase";
import GameManager from "../../manager/GameManager";
import { EGameLayers } from "../../common/Types";
import { FriendsApplyListView } from "./FriendsApplyListView";
import EventManager from "../../core/event/EventManager";
import { EventName } from "../../common/EventName";

export class FriendsApplyListControl extends ControlBase {
    public static get Instance(): FriendsApplyListControl {
        return this.getInstance<FriendsApplyListControl>();
    }

    protected viewBase: FriendsApplyListView;
    protected prefabPath: string = "friends/FriendsApplyList";
    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.PANEL_LAYER);

    protected registEvents(): void {
        EventManager.Instance.on(EventName.E_FRIENDS_APPLY_LIST_CHANGED, this.onEvtApplyListChanged, this);
    }

    protected releaseEvents(): void {
        EventManager.Instance.off(EventName.E_FRIENDS_APPLY_LIST_CHANGED, this.onEvtApplyListChanged, this);
    }

    private onEvtApplyListChanged() {
        this.viewBase.resetList();
    }
}


