import { _decorator, Component, Node, Sprite, tween, Tween, v3, Vec3 } from 'cc';
import LocalUtils from '../tools/LocalUtils';
const { ccclass, property } = _decorator;

@ccclass('SwitchComp')
export class SwitchComp extends Component {
    @property(Sprite)
    public bgSprite: Sprite = null;

    @property(Node)
    public pointNode: Node = null;

    @property
    public onPointPos: Vec3 = v3(0, 0, 0);

    @property
    public offPointPos: Vec3 = v3(0, 0, 0);

    @property
    public offGray: boolean = false;

    @property
    public offHandlePoint: boolean = false;

    private _switchStatus: boolean = false;

    private _tweenPoint: Tween<Node> = null;
    private clearTweenPoint() {
        if (!LocalUtils.isNil(this._tweenPoint)) {
            this._tweenPoint.stop();
        }
        this._tweenPoint = null;
    }

    private _clickCallBack: (status: boolean, evt?: any) => void;
    private _thisArg: any = null;

    public setClickFunc(clickCallBack: (status: boolean, evt?: any) => void, thisArg: any) {
        this._clickCallBack = clickCallBack;
        this._thisArg = thisArg;
    }

    protected onLoad() {
        this._switchStatus = false;
        this.clearTweenPoint();

        this._setSwitchStatus();
    }

    public setSwichStatus(status: boolean) {
        this._switchStatus = status;
        this._setSwitchStatus();
    }

    private _setSwitchStatus() {
        this.pointNode.setPosition(this._switchStatus ? this.onPointPos : this.offPointPos);

        this.bgSprite.grayscale = (!this.offGray && !this._switchStatus);
    }

    private onClicked(evt: any) {
        this.clearTweenPoint();
        this._switchStatus = !this._switchStatus;
        if (!this.offHandlePoint) {
            this._tweenPoint = tween(this.pointNode)
                .to(0.3, {position: this._switchStatus ? this.onPointPos : this.offPointPos})
                .call(() => {
                    this._setSwitchStatus();
                    !LocalUtils.isNil(this._clickCallBack) && this._clickCallBack.call(this._thisArg, this._switchStatus, evt);
                })
                .start();
        } else {
            this._setSwitchStatus();
            !LocalUtils.isNil(this._clickCallBack) && this._clickCallBack.call(this._thisArg, this._switchStatus, evt);
        }
       
    }
}


