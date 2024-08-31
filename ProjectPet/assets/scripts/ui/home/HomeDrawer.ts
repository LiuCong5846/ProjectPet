import { _decorator, CCFloat, Component, Node, tween, Tween, v3 } from 'cc';
import { ButtonComp } from '../../component/ButtonComp';
import LocalUtils from '../../tools/LocalUtils';
const { ccclass, property } = _decorator;

@ccclass('HomeDrawer')
export class HomeDrawer extends Component {
    @property(ButtonComp)
    public knob: ButtonComp = null;

    @property([Node])
    public drawers: Array<Node> = [];

    @property([CCFloat])
    public drawerDisArr: Array<number> = [];

    private _openStatus: boolean = true;

    private _tweenDrawer1: Tween<Node> = null;
    private _tweenDrawer2: Tween<Node> = null;
    private _tweenKnobRota: Tween<Node> = null;
    private clearTweenDrawers() {
        !LocalUtils.isNil(this._tweenDrawer1) && this._tweenDrawer1.stop();
        this._tweenDrawer1 = null;
        !LocalUtils.isNil(this._tweenDrawer2) && this._tweenDrawer2.stop();
        this._tweenDrawer2 = null;
        !LocalUtils.isNil(this._tweenKnobRota) && this._tweenKnobRota.stop();
        this._tweenKnobRota = null;
    }
    private playTweenDrawers() {
        this.clearTweenDrawers();

        this._tweenDrawer1 = tween(this.drawers[0])
                                .to(0.3, {position: v3(this._openStatus ? 0 : this.drawerDisArr[0], 0, 0)})
                                .start();
        this._tweenDrawer2 = tween(this.drawers[1])
                                .to(0.3, {position: v3(0, this._openStatus ? 0 : - this.drawerDisArr[1], 0)})
                                .start();
        this._tweenKnobRota = tween(this.knob.btnSprite.node)
                                .to(0.3, {angle: this._openStatus ? 0 : 45})
                                .start();
    }

    protected onLoad() {
        this._openStatus = true;
        this.clearTweenDrawers();
        this._setDrawerOpen();

        this.knob.setClickFunc(this.onKnockClicked, this);
    }

    public setDrawerOpen(flag: boolean) {
        this._openStatus = flag;
        this._setDrawerOpen();
    }

    private _setDrawerOpen() {
        this.drawers[0].setPosition(this._openStatus ? 0 : this.drawerDisArr[0], 0, 0);
        this.drawers[1].setPosition(0, this._openStatus ? 0 : - this.drawerDisArr[1], 0);
        this.knob.btnSprite.node.angle = this._openStatus ? 0 : 45;
    }
    
    private onKnockClicked(evt, custom) {
        this.clearTweenDrawers();
        this._openStatus = !this._openStatus;
        this.playTweenDrawers();
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


