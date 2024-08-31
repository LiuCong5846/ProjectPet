import { _decorator, Component, Node } from 'cc';
import ViewBase from '../../core/mvc/ViewBase';
import { ButtonComp } from '../../component/ButtonComp';
import { VirtualList } from '../../component/VirtualList';
import { FriendsApplyListControl } from './FriendsApplyListControl';
import { FriendsModel } from './FriendsModel';
import { EFriendCellType } from '../../common/Types';
const { ccclass, property } = _decorator;

@ccclass('FriendsApplyListView')
export class FriendsApplyListView extends ViewBase {
    @property(ButtonComp)
    private closeBtn: ButtonComp = null;

    @property(VirtualList)
    private list: VirtualList = null;

    protected _show(): void {
        this.closeBtn.setClickFunc(this.onCloseBtnClicked, this);

        this.initList();
    }

    private initList() {
        this.list.Init(FriendsModel.Instance.testApplyList, 210, "FriendCell", EFriendCellType.APPLY);
    }

    public resetList() {
        this.list.Reload(FriendsModel.Instance.testApplyList);
    }

    private onCloseBtnClicked() {
        FriendsApplyListControl.Instance.closePanel();
    }
}


