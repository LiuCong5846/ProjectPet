import { Node } from "cc";
import ControlBase from "../../core/mvc/ControlBase";
import { JobInfoView } from "./JobInfoView";
import GameManager from "../../manager/GameManager";
import { EGameLayers } from "../../common/Types";

export class JobInfoControl extends ControlBase {
    public static get Instance(): JobInfoControl {
        return this.getInstance<JobInfoControl>();
    }

    protected viewBase: JobInfoView;
    protected prefabPath: string = "job/JobInfo";
    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.PANEL_LAYER);
}


