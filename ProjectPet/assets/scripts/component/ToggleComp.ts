import { _decorator, Component, Node, Toggle } from 'cc';
import LocalUtils from '../tools/LocalUtils';
const { ccclass, property } = _decorator;

@ccclass('ToggleComp')
export class ToggleComp extends Component {
    @property(Toggle)
    public toggle: Toggle = null;

    private _clickedFunc = null;
    private _thisArg = null;

    public onToggle(clickedFunc: Function, thisArg: any) {
        this.offToggle();
        this._clickedFunc = clickedFunc;
        this._thisArg = thisArg;
        this.openToggle();
    }

    public offToggle() {
        this.stopToggle();
        this._clickedFunc = null;
        this._thisArg = null;
    }

    public stopToggle() {
        this.toggle.node.off('toggle');
    }

    public openToggle() {
        if (LocalUtils.isNil(this._clickedFunc) || LocalUtils.isNil(this._thisArg)) return;
        this.node.on('toggle', (tog: Toggle) => {
            this._clickedFunc.call(this._thisArg, tog);
        }, this._thisArg);
    }
}


