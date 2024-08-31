import { Node } from "cc";
import ControlBase from "../../core/mvc/ControlBase";
import { TutelageSubjectListView } from "./TutelageSubjectListView";
import GameManager from "../../manager/GameManager";
import { EGameLayers } from "../../common/Types";
import ResManager from "../../manager/ResManager";

export class TutelageSubjectListControl extends ControlBase {
    public static get Instance(): TutelageSubjectListControl {
        return this.getInstance<TutelageSubjectListControl>();
    }

    protected viewBase: TutelageSubjectListView;
    protected prefabPath: string = "tutelage/TutelageSubjectList";
    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.PANEL_LAYER);
    protected resDir: Array<string> = ["learn/ui/book"];

    protected async preloadComps(): Promise<void> {
        await ResManager.Instance.getPrefab("tutelage/TutelageSubjectCell");
    }

    protected releaseComps(): void {
        ResManager.Instance.releasePrefab("tutelage/TutelageSubjectCell");
    }
}


