import { _decorator, Component, EditBox, Node } from 'cc';
import ViewBase from '../../core/mvc/ViewBase';
import { ButtonComp } from '../../component/ButtonComp';
import { FriendsListControl } from './FriendsListControl';
import { VirtualList } from '../../component/VirtualList';
import { EFriendCellType } from '../../common/Types';
import { FriendsModel } from './FriendsModel';
import { EditBoxComp } from '../../component/EditBoxComp';
import Logger from '../../core/utils/Logger';
import { FriendsApplyListControl } from './FriendsApplyListControl';
import { FriendSearchControl } from './FriendSearchControl';
const { ccclass, property } = _decorator;

@ccclass('FriendsListView')
export class FriendsListView extends ViewBase {
    @property(ButtonComp)
    private btnClose: ButtonComp = null;

    @property(EditBoxComp)
    private editBox: EditBoxComp = null;

    @property(VirtualList)
    private friendsList: VirtualList = null;

    @property(ButtonComp)
    private newFriendsBtn: ButtonComp = null;

    @property(ButtonComp)
    private searchBtn: ButtonComp = null;

    protected _show(): void {
        this.btnClose.setClickFunc(this.onCloseBtnClicked, this);
        this.newFriendsBtn.setClickFunc(this.openApplyList, this);
        this.searchBtn.setClickFunc(this.searchFriend, this);

        this.editBox.Init(this, this.offEditBoxEditing, this.changedEditBoxEditing);

        this.initFriendsList();

        this.setNewFriendsRed();
    }

    private setNewFriendsRed() {
        this.newFriendsBtn.setRedVisible(FriendsModel.Instance.testApplyList.length > 0); // TODO
    }

    private offEditBoxEditing(str: string) {
        Logger.log("offEditBoxEditing_1", str);
        Logger.log("offEditBoxEditing_2", this.editBox.editStr);
    }

    private changedEditBoxEditing(str: string) {
        Logger.log("changedEditBoxEditing_1", str);
        Logger.log("changedEditBoxEditing_2", this.editBox.editStr);
    }

    private initFriendsList() {
        this.friendsList.Init(FriendsModel.Instance.testList, 210, "FriendCell", EFriendCellType.MY_FRIEND); 
    }

    private resetFriendsList() {
        this.friendsList.Reload(FriendsModel.Instance.testList);
    }

    public onListChanged() {
        this.resetFriendsList();
        this.setNewFriendsRed();
    }

    private onCloseBtnClicked() {
        FriendsListControl.Instance.closePanel();
    }

    private openApplyList() {
        FriendsApplyListControl.Instance.openPanel();
    }

    private searchFriend() {
        if (this.editBox.editStr === "") return;
        Logger.log("searchFriend", this.editBox.editStr);
        FriendSearchControl.Instance.openPanel(this.editBox.editStr);
    }
}


