import { Node } from "cc";
import ControlBase from "../../../core/mvc/ControlBase";
import { NoticeAlertView } from "./NoticeAlertView";
import GameManager from "../../../manager/GameManager";
import { EGameLayers } from "../../../common/Types";

export class NoticeAlertControl extends ControlBase {
    public static get Instance(): NoticeAlertControl {
        return this.getInstance<NoticeAlertControl>();
    }

    protected viewBase: NoticeAlertView;
    protected prefabPath: string = "common/NoticeAlert";
    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.POP_LAYER);
}


