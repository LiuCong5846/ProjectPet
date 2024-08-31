import { EItemType } from '../../common/Types';
import { ButtonComp } from '../../component/ButtonComp';
import { TabView } from '../../component/TabView';
import { VirtualList } from '../../component/VirtualList';
import ViewBase from '../../core/mvc/ViewBase';
import Logger from '../../core/utils/Logger';
import { _decorator, Component, Node } from 'cc';
import { BagModel } from './BagModel';
import { BagController } from './BagController';
const { ccclass, property } = _decorator;

@ccclass('BagView')
export class BagView extends ViewBase {
    @property([VirtualList])
    public lists: Array<VirtualList> = [];

    @property(TabView)
    public tabView: TabView = null;

    @property(ButtonComp)
    public closeBtn: ButtonComp = null;

    private _tabIndex: number = 0;

    protected async _open(initTabIdx: number) {
        this._tabIndex = initTabIdx || 0;
    }

    protected _show() {
        const cellSize = 290;
        const identifer = "BagListCell";
        this.lists[0].Init(BagModel.Instance.getBagListItemsList(EItemType.FOOD), cellSize, identifer);
        this.lists[1].Init(BagModel.Instance.getBagListItemsList(EItemType.CLEAN), cellSize, identifer);
        this.lists[2].Init(BagModel.Instance.getBagListItemsList(EItemType.TOY), cellSize, identifer);
        this.lists[3].Init(BagModel.Instance.getBagListItemsList(EItemType.MEDICINE), cellSize, identifer);
        this.lists[4].Init(BagModel.Instance.getBagListItemsList(EItemType.OTHER), cellSize, identifer);
       
        this.tabView.Init(this, this.onTabChange, this.onTabClear, this.onTabCheck, this._tabIndex);
        this.closeBtn.setClickFunc(this.onCloseBtnClicked, this);
    }

    private onCloseBtnClicked() {
        BagController.Instance.closePanel();
    }

    private onTabChange(idx: number) {
        Logger.log("ShopView_tab_change", idx);
        this._tabIndex = idx;
    }

    private onTabClear(idx: number) {
        Logger.log("ShopView_tab_clear", idx);
    }

    private onTabCheck(idx: number) {
        Logger.log("ShopView_tab_check", idx);
        return true;
    }
}

