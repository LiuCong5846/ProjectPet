import { Prefab, _decorator, Node, instantiate, v3 } from 'cc';
import { ButtonComp } from '../../component/ButtonComp';
import ViewBase from '../../core/mvc/ViewBase';
import { FriendSearchControl } from './FriendSearchControl';
import Logger from '../../core/utils/Logger';
import { FriendsModel } from './FriendsModel';
import { FriendCell } from './FriendCell';
import { EFriendCellType } from '../../common/Types';
import ResManager from '../../manager/ResManager';
const { ccclass, property } = _decorator;

@ccclass('FriendSearchView')
export class FriendSearchView extends ViewBase {
    @property(ButtonComp)
    private closeBtn: ButtonComp = null;

    @property(ButtonComp)
    private addBtn: ButtonComp = null;

    @property(Node)
    private cellRoot: Node = null;

    @property(Prefab)
    private cellPrefab: Prefab = null;

    private _data: any;

    protected async _open(data: any): Promise<void> {
        this._data = data;
        Logger.log("FriendSearchView_data: ", this._data);
        await super._open();
    }


    protected _show(): void {
        this.closeBtn.setClickFunc(this.onCloseBtnClicked, this);
        this.addBtn.setClickFunc(this.onAddBtnClicked, this);

        this.cellRoot.destroyAllChildren();
        const node = ResManager.instantiate(this.cellPrefab);
        const cell = node.getComponent(FriendCell);
        cell.isRender = false;
        node.setParent(this.cellRoot);
        node.setPosition(v3(0, 0, 0));
        cell.UpdateContent(this._data, -1, EFriendCellType.SEARCH);
    }

    private onCloseBtnClicked() {
        FriendSearchControl.Instance.closePanel();
    }

    private onAddBtnClicked() {
        FriendsModel.Instance.testFunc(this._data);
        this.onCloseBtnClicked();
    }
    
}


