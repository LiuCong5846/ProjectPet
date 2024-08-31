import { Node } from "cc";
import { Singleton } from "../../core/common/Singleton";
import ControlBase from "../../core/mvc/ControlBase";
import ResManager from "../../manager/ResManager";
import GameManager from "../../manager/GameManager";
import { EGameLayers } from "../../common/Types";
import { FriendsListView } from "./FriendsListView";
import EventManager from "../../core/event/EventManager";
import { EventName } from "../../common/EventName";
import TipManager from "../../manager/TipManager";

export class FriendsListControl extends ControlBase {
    public static get Instance(): FriendsListControl {
        return this.getInstance<FriendsListControl>();
    }

    protected viewBase: FriendsListView;
    protected prefabPath: string = "friends/FriendsList";
    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.PANEL_LAYER);

    public async openPanel<T>(args?: any, layer?: Node): Promise<void> {
        await super.openPanel(args, layer);
        TipManager.Instance.addTipShow("开发中");
    }
    
    protected async preloadComps(): Promise<void> {
        await ResManager.Instance.getPrefab("friends/FriendCell");
    }

    protected releaseComps() {
        ResManager.Instance.releasePrefab("friends/FriendCell");
    }

    protected registEvents(): void {
        EventManager.Instance.on(EventName.E_FRIENDS_LIST_CHANGED, this.onEvtListChanged, this);
    }

    protected releaseEvents(): void {
        EventManager.Instance.off(EventName.E_FRIENDS_LIST_CHANGED, this.onEvtListChanged, this);
    }

    private onEvtListChanged() {
        this.viewBase.onListChanged();
    }
}


