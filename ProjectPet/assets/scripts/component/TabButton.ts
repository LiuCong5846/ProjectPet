import { _decorator, Color, Component, Label, Node, Sprite } from 'cc';
import LocalUtils from '../tools/LocalUtils';
const { ccclass, property } = _decorator;

@ccclass('TabButton')
export class TabButton extends Component {
    @property(Sprite)
    public normalSprite: Sprite = null;

    @property(Sprite)
    public checkSprite: Sprite = null;

    @property
    private _check: boolean = false;
    @property
    get check() {
        return this._check;
    }
    set check(v: boolean) {
        this._check = v;
        !LocalUtils.isNil(this.checkSprite) && (this.checkSprite.node.active = this._check);
        !LocalUtils.isNil(this.normalSprite) && (this.normalSprite.node.active = !this._check);

        if (this.useDiffLabColor) {
            this.btnLab.color = this.check ? this.selectLabColor : this.normalLabColor;
        }
    }

    @property(Label)
    public btnLab: Label = null;

    @property
    private _useDiffLabColor: boolean = false;
    @property
    get useDiffLabColor() {
        return this._useDiffLabColor;
    }
    set useDiffLabColor(v: boolean) {
        this._useDiffLabColor = v;

        if (this.useDiffLabColor) {
            this.btnLab.color = this.check ? this.selectLabColor : this.normalLabColor;
        }
    }

    @property(Color)
    private _normalLabColor: Color = new Color(255, 255, 255, 255);
    @property({
        visible() {
            return this.useDiffLabColor;
        },
    })
    get normalLabColor() {
        return this._normalLabColor;
    }
    set normalLabColor(v: Color) {
        this._normalLabColor = v;
    }
   
    @property(Color)
    private _selectLabColor: Color = new Color(0, 0, 0, 255);
    @property({
        visible() {
            return this.useDiffLabColor;
        },
    })
    get selectLabColor() {
        return this._selectLabColor;
    }
    set selectLabColor(v: Color) {
        this._selectLabColor = v;
    }

    @property(Node)
    public redPoint: Node = null;

    public idx: number = -1;
    private _clickCallBack: (evt: any, custom: any) => void;
    private _thisArg: any = null;

    public setClickFunc(clickCallBack: (idx: number) => void, thisArg: any) {
        this._clickCallBack = clickCallBack;
        this._thisArg = thisArg;
    }

    private onClicked() {
        !LocalUtils.isNil(this._clickCallBack) && this._clickCallBack.call(this._thisArg, this.idx);
    }
}


