import { Node } from "cc";
import ControlBase from "../../core/mvc/ControlBase";
import { TutelageMainView } from "./TutelageMainView";
import GameManager from "../../manager/GameManager";
import { EGameLayers } from "../../common/Types";
import EventManager from "../../core/event/EventManager";
import { EventName } from "../../common/EventName";
import TimerManager from "../../core/timer/TimerManager";
import TipManager from "../../manager/TipManager";

export class TutelageMainControl extends ControlBase {
    public static get Instance(): TutelageMainControl {
        return this.getInstance<TutelageMainControl>();
    }

    protected viewBase: TutelageMainView;
    protected prefabPath: string = "tutelage/TutelageMain";
    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.PANEL_LAYER);

    public async openPanel<T>(args?: any, layer?: Node): Promise<void> {
        await super.openPanel();
        TimerManager.Instance.doLoopTimer(0, 1000, 0, this.onTimer, this);
        TipManager.Instance.addTipShow("开发中");
    }

    public async closePanel(): Promise<void> {
        TimerManager.Instance.remove(this.onTimer, this);
        await super.closePanel();
    }

    private onTimer() {
        this.viewBase.setTuteLeftTime();
    }
    
    protected registEvents(): void {
        EventManager.Instance.on(EventName.E_TUTELAGE_SWITCH_CHANGED, this.evtTutelageSwitchChanged, this);
    }

    protected releaseEvents(): void {
        EventManager.Instance.off(EventName.E_TUTELAGE_SWITCH_CHANGED, this.evtTutelageSwitchChanged, this);
    }

    private evtTutelageSwitchChanged() {
        this.viewBase.setSwitchState();
        this.viewBase.setTuteLeftTime();
    }
}


