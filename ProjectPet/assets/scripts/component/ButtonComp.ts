import { _decorator, Component, EventTouch, Label, Node, Sprite } from 'cc';
import LocalUtils from '../tools/LocalUtils';
import Logger from '../core/utils/Logger';
const { ccclass, property } = _decorator;

@ccclass('ButtonComp')
export class ButtonComp extends Component {
    @property(Sprite)
    public btnSprite: Sprite = null;

    @property(Label)
    public btnLabel: Label = null;

    @property(Node)
    public btnRedNode: Node = null;

    private _clickCallBack: (evt: any, custom: any) => void;
    private _thisArg: any = null;

    public setClickFunc(clickCallBack: (evt: any,custom: any) => void, thisArg: any) {
        this._clickCallBack = clickCallBack;
        this._thisArg = thisArg;
    }

    private onClicked(evt: EventTouch, custom: any) {
        !LocalUtils.isNil(this._clickCallBack) && this._clickCallBack.call(this._thisArg, evt, custom);
    }

    public setRedVisible(visible: boolean) {
        this.btnRedNode.active !== visible && (this.btnRedNode.active = visible);
    }
}


