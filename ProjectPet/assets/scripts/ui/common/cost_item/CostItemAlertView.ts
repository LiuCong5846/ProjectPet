import { _decorator, Component, Label, Node, Sprite } from 'cc';
import { SliderComp } from '../../../component/SliderComp';
import { ButtonComp } from '../../../component/ButtonComp';
import Logger from '../../../core/utils/Logger';
import { IItemsEntity } from '../../../config/ItemsEntity';
import { ItemSprite } from '../ItemSprite';
import ViewBase from '../../../core/mvc/ViewBase';
import { CostItemAlertControl } from './CostItemAlertControl';
const { ccclass, property } = _decorator;

export interface ICostItemData {
    itemId: string;
    cfg: IItemsEntity;
    initCnt: number;
    maxCnt: number;

    isShop: boolean;

    callBackFunc: (itemId: string, cnt: number) => void;
    callBackTarget: any;
}

@ccclass('CostItemAlertView')
export class CostItemAlertView extends ViewBase {
    @property(Node)
    public rectMaskNode: Node = null;

    @property(Label)
    public titleLab: Label = null;

    @property(ItemSprite)
    public itemSpr: ItemSprite = null;

    @property(SliderComp)
    public sliderComp: SliderComp = null;

    @property(Label)
    public goodNameLab: Label = null;

    @property(Label)
    public goodNumLab: Label = null;

    @property(ButtonComp)
    public btn: ButtonComp = null;

    private _data: ICostItemData = null;
    private _cnt: number = 1;

    protected async _open(data: ICostItemData): Promise<void> {
        this._data = data;
        this._cnt = this._data.initCnt;
        Logger.log("CostAlert_this._data", this._data);

        this.rectMaskNode.on(Node.EventType.TOUCH_END, this.onRectClicked, this);
    }

    protected _close(): void {
        this.rectMaskNode.off(Node.EventType.TOUCH_END, this.onRectClicked, this);
    }

    protected _show(): void {
        this.sliderComp.Init(
            "CostItemAlert",
            0,
            this._data.maxCnt,
            this._cnt,
            this.onSliderValueChange,
            this.onSliderValueChange,
            this.onSliderValueChange,
            this,
        );
        this.itemSpr.itemId = this._data.itemId;
        this.goodNameLab.string = this._data.cfg.itemName;
        this.titleLab.string = this._data.isShop ? "购买" : "使用";
        this.setNumLab();
        if (!this._data.isShop) {
            this.btn.btnLabel.string = "使用";
        } else {
            this.btn.btnLabel.string = `￥${this._data.cfg.value * this._cnt}`;
        }
        this.btn.setClickFunc(this.onBtnClicked, this);
    }

    private onSliderValueChange(curNum: number, maxNum: number) {
        // Logger.log("curNum: ", curNum);
        // Logger.log("maxNum: ", maxNum);

        this._cnt = curNum;

        this.setNumLab();
        this.setBtnTxtLab();
    }

    private setNumLab() {
        this.goodNumLab.string = `X${this._cnt}`;
    }

    private setBtnTxtLab() {
        if (!this._data.isShop) {
            return;
        }

        this.btn.btnLabel.string = `￥${this._data.cfg.value * this._cnt}`;
    }


    private onBtnClicked() {
        this._data.callBackFunc.call(this._data.callBackTarget, this._data.itemId, this._cnt);
    }

    private onRectClicked() {
        CostItemAlertControl.Instance.closePanel();
    }
}


