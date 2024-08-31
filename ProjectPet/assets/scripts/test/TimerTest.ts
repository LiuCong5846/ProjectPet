import { _decorator, Component, Label, Node } from 'cc';
import TimerManager from '../core/timer/TimerManager';
import Logger from '../core/utils/Logger';
const { ccclass, property } = _decorator;

@ccclass('TimerTest')
export class TimerTest extends Component {
    @property(Label)
    private lab1: Label = null;
    @property(Label)
    private lab2: Label = null;

    private _interval: number = 1;
    private _cnt1: number = 0;
    private _cnt2: number = 0;

    start() {
        TimerManager.Instance.doLoopTimer(1000, 1000, 0, this.tick, this);
    }

    update(deltaTime: number) {
        Logger.log("update_deltaTime: ", deltaTime);
         this._interval += deltaTime;
        if(this._interval >= 1){
            this._interval -= 1;
            this._cnt2++;
            this.lab2.string = `${this._cnt2}`;
        }
    }

    private tick(dt: number) {
        Logger.log("tick_dt: ", dt);
        this._cnt1 ++;
        this.lab1.string = `${this._cnt1}`;
    }
}


