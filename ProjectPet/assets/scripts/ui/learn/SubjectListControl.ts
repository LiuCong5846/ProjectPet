import { Node } from "cc";
import ControlBase from "../../core/mvc/ControlBase";
import { SubjectListView } from "./SubjectListView";
import GameManager from "../../manager/GameManager";
import { EGameLayers } from "../../common/Types";
import ResManager from "../../manager/ResManager";

export class SubjectListControl extends ControlBase {
    public static get Instance(): SubjectListControl {
        return this.getInstance<SubjectListControl>();
    }

    protected viewBase: SubjectListView;
    protected prefabPath: string = "learn/SubjectList";
    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.PANEL_LAYER);
    protected resDir: Array<string> = ["learn/ui/book"];

    protected async preloadComps(): Promise<void> {
        await ResManager.Instance.getPrefab("learn/SubjectCell");
    }

    protected releaseComps(): void {
        ResManager.Instance.releasePrefab("learn/SubjectCell");
    }
}


