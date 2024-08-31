import { Node } from "cc";
import { EGameLayers } from "../../common/Types";
import ControlBase from "../../core/mvc/ControlBase";
import GameManager from "../../manager/GameManager";
import { JobView } from "./JobView";
import ResManager from "../../manager/ResManager";
import TimerManager from "../../core/timer/TimerManager";
import { EventName } from "../../common/EventName";
import EventManager from "../../core/event/EventManager";
import { JobModel } from "./JobModel";

export class JobControl extends ControlBase {
    public static get Instance(): JobControl {
        return this.getInstance<JobControl>();
    }

    protected viewBase: JobView = null;
    protected prefabPath: string = "job/Job";
    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.PANEL_LAYER);
    protected resDir: Array<string> = ["job"];

    public async openPanel(): Promise<void> {
        await super.openPanel();
        TimerManager.Instance.doLoopTimer(0, 1000, 0, this.jobTimerHandle, this);
    }

    public async closePanel() {
        TimerManager.Instance.remove(this.jobTimerHandle, this);
        await super.closePanel();
    }

    protected async preloadComps(): Promise<void> {
        await ResManager.Instance.getPrefab("job/JobCell");
    }

    protected releaseComps(): void {
        ResManager.Instance.releasePrefab("job/JobCell");
    }

    private jobTimerHandle() {
        JobModel.Instance.listenJobWorking();
        EventManager.Instance.emit(EventName.E_JOB_TIMER_HANDLE);
    }
}


