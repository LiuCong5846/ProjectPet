import { EventTarget } from "cc";
import { EventName } from "../../common/EventName";
import { Singleton } from "../common/Singleton";
import Logger from "../utils/Logger";

export type EventCallBack = (...any: any[]) => void;

export default class EventManager extends Singleton {
    public static get Instance(): EventManager {
        return this.getInstance<EventManager>();
    }

    private _eveTag: EventTarget = new EventTarget();

    //监听事件，target必须传递
    public on(name: EventName | string | number, callback: EventCallBack, target: any) {
        this._eveTag.on(name, callback, target);
    }

    //删除监听
    public off(name: EventName | string | number, callback?: EventCallBack, target?: any) {
        this._eveTag.off(name, callback, target);
    }

    //抛出事件
    public emit(name: EventName | string | number, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) {
        this._eveTag.emit(name, arg1, arg2, arg3, arg4, arg5);
    }

    //EevntName查重,针对 key和value两项查重
    public checkRepeatName(): void {
        const sName = new Set();
        const sValue = new Set();
        const test = (EN: any) => {
            for (let k in EN) {
                if (sName.has(k)) {
                    Logger.error("checkRepeatName Error! name=" + k);
                } else {
                    sName.add(k);
                }
                if (sValue.has(EN[k])) {
                    Logger.error("checkRepeatName Error! value=" + k);
                } else {
                    sValue.add(EN[k]);
                }
            }
        }
        test(EventName);
    }
    
}


