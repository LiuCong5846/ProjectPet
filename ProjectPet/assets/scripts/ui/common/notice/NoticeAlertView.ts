import { _decorator, Component, Label, Node } from 'cc';
import ViewBase from '../../../core/mvc/ViewBase';
import { ButtonComp } from '../../../component/ButtonComp';
import { INoticeInfo } from '../../../common/Types';
import LocalUtils from '../../../tools/LocalUtils';
import { NoticeAlertControl } from './NoticeAlertControl';
const { ccclass, property } = _decorator;

@ccclass('NoticeAlertView')
export class NoticeAlertView extends ViewBase {
    @property(ButtonComp)
    private closeBtn: ButtonComp = null;

    @property(ButtonComp)
    private sureBtn: ButtonComp = null;

    @property(Label)
    private titleLab: Label = null;

    @property(Label)
    private textLab: Label = null;

    private _info: INoticeInfo = null;

    protected async _open(info: INoticeInfo): Promise<void> {
        this._info = info;
        await super._open();
    }

    protected _show(): void {
        !LocalUtils.isNil(this._info.titleTxt) && (this.titleLab.string = this._info.titleTxt);
        !LocalUtils.isNil(this._info.contentTxt) && (this.textLab.string = this._info.contentTxt);
        !LocalUtils.isNil(this._info.btnTxt) && (this.sureBtn.btnLabel.string = this._info.btnTxt);

        this.sureBtn.setClickFunc(this.onSureBtnClicked, this);
        this.closeBtn.setClickFunc(this.onCloseBtnClicked, this);
    }

    private onSureBtnClicked() {
        if (!LocalUtils.isNil(this._info.sureCallBack)) {
            if (!LocalUtils.isNil(this._info.thisArg)) {
                this._info.sureCallBack.call(this._info.thisArg);
            } else {
                this._info.sureCallBack();
            }
        }
    }

    private onCloseBtnClicked() {
        NoticeAlertControl.Instance.closePanel();
    }
}


