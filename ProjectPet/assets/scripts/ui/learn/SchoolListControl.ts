import { Node } from "cc";
import ControlBase from "../../core/mvc/ControlBase";
import { SchoolListView } from "./SchoolListView";
import GameManager from "../../manager/GameManager";
import { EGameLayers } from "../../common/Types";
import ResManager from "../../manager/ResManager";
import TimerManager from "../../core/timer/TimerManager";
import { LearnModel } from "./LearnModel";
import EventManager from "../../core/event/EventManager";
import { EventName } from "../../common/EventName";

export class SchoolListControl extends ControlBase {
    public static get Instance(): SchoolListControl {
        return this.getInstance<SchoolListControl>();
    }

    protected viewBase: SchoolListView;
    protected prefabPath: string = "learn/SchoolList";
    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.PANEL_LAYER);
    protected resDir: Array<string> = ["learn/ui/school"];

    public async openPanel(): Promise<void> {
        await super.openPanel();
        TimerManager.Instance.doLoopTimer(0, 1000, 0, this.schoolTimerHandle, this);
    }

    public async closePanel() {
        TimerManager.Instance.remove(this.schoolTimerHandle, this);
        await super.closePanel();
    }

    protected async preloadComps(): Promise<void> {
        await ResManager.Instance.getPrefab("learn/SchoolCell");
    }

    protected releaseComps(): void {
        ResManager.Instance.releasePrefab("learn/SchoolCell");
    }

    private schoolTimerHandle() {
        LearnModel.Instance.listenLearningSubjects();
        EventManager.Instance.emit(EventName.E_SCHOOL_TIMER_HANDLE);
    }
}


