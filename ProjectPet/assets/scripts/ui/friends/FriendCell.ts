import { _decorator, Component, Label, Node, Sprite } from 'cc';
import { GListCell } from '../../component/GListCell';
import { ButtonComp } from '../../component/ButtonComp';
import Logger from '../../core/utils/Logger';
import { EFriendCellType } from '../../common/Types';
import LocalUtils from '../../tools/LocalUtils';
import { FriendsModel } from './FriendsModel';
import EventManager from '../../core/event/EventManager';
import { EventName } from '../../common/EventName';
const { ccclass, property } = _decorator;

@ccclass('FriendCell')
export class FriendCell extends GListCell {
    @property(Sprite)
    private headFrameSpr: Sprite = null;

    @property(Sprite)
    private headSpr: Sprite = null;

    @property(Sprite)
    private sexSpr: Sprite = null;

    @property(Label)
    private ageLab: Label = null;

    @property(Label)
    private nameLab: Label = null;

    @property(Label)
    private moneyLab: Label = null;

    @property(Label)
    private tipLab: Label = null;

    @property(ButtonComp)
    private btn: ButtonComp = null;

    private _data: any = null;
    private friendCellType: EFriendCellType = null;

    protected onLoad(): void {
        this.btn.setClickFunc(this.onBtnClicked, this);
    }

    public UpdateContent(data?: any, idx?: number, tp?: EFriendCellType): void {
        this._data = data;
        this.friendCellType = tp;

        this.nameLab.string = this._data;

        const showBtn = !LocalUtils.isNil(this.friendCellType) && this.friendCellType !== EFriendCellType.SEARCH;
        this.btn.node.active = showBtn;
        if (showBtn) {
            let txt = "";
            switch (this.friendCellType) {
                case EFriendCellType.MY_FRIEND:
                    txt = "拜访";
                    break;
                case EFriendCellType.APPLY:
                    txt = "同意";
                    break;
            }
            this.btn.btnLabel.string = txt;
        }
    }

    private onBtnClicked() {
        Logger.log(this._data);
        switch (this.friendCellType) {
            case EFriendCellType.MY_FRIEND:
               
                break;
            case EFriendCellType.APPLY:
                FriendsModel.Instance.testFunc(this._data);
                break;
        }
    }
}


