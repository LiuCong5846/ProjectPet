import { _decorator, Component, Node } from 'cc';
import ViewBase from '../../core/mvc/ViewBase';
import { VirtualList } from '../../component/VirtualList';
import { TabView } from '../../component/TabView';
import Logger from '../../core/utils/Logger';
import { ShopModel } from './ShopModel';
import { ButtonComp } from '../../component/ButtonComp';
import { ShopControl } from './ShopControl';
import { EItemType } from '../../common/Types';
const { ccclass, property } = _decorator;

@ccclass('ShopView')
export class ShopView extends ViewBase {
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
        const identifer = "ShopListCell";
        this.lists[0].Init(ShopModel.Instance.getShopitems(EItemType.FOOD), cellSize, identifer);
        this.lists[1].Init(ShopModel.Instance.getShopitems(EItemType.CLEAN), cellSize, identifer);
        this.lists[2].Init(ShopModel.Instance.getShopitems(EItemType.TOY), cellSize, identifer);
        this.lists[3].Init(ShopModel.Instance.getShopitems(EItemType.MEDICINE), cellSize, identifer);
        this.lists[4].Init(ShopModel.Instance.getShopitems(EItemType.OTHER), cellSize, identifer);
       
        this.tabView.Init(this, this.onTabChange, this.onTabClear, this.onTabCheck, this._tabIndex);
        this.closeBtn.setClickFunc(this.onCloseBtnClicked, this);
    }

    private onCloseBtnClicked() {
        ShopControl.Instance.closePanel();
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


