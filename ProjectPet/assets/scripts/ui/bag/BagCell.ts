import { ButtonComp } from '../../component/ButtonComp';
import { IItemsEntity } from '../../config/ItemsEntity';
import Logger from '../../core/utils/Logger';
import { ItemsManager } from '../../manager/ItemsManager';
import { _decorator, Component, Node, Label } from 'cc';
import { CostItemAlertControl } from '../common/cost_item/CostItemAlertControl';
import { ICostItemData } from '../common/cost_item/CostItemAlertView';
import { ItemSprite } from '../common/ItemSprite';
import EventManager from '../../core/event/EventManager';
import { EventName } from '../../common/EventName';
const { ccclass, property } = _decorator;

@ccclass('BagCell')
export class BagCell extends Component {
    @property(ButtonComp)
    public btn: ButtonComp = null;

    @property(ItemSprite)
    public itemSpr: ItemSprite = null;

    @property(Label)
    public nameLab: Label = null;

    @property(Label)
    public numLab: Label = null;

    private _itemId: string;
    private _item: IItemsEntity;

    protected onLoad(): void {
        this.btn.setClickFunc(this.entityClicked, this);

        EventManager.Instance.on(EventName.E_PLAYER_ITEM_NUM_CHANGED, this.evtItemNumChanged, this);
    }

    protected onDestroy() {
        EventManager.Instance.off(EventName.E_PLAYER_ITEM_NUM_CHANGED, this.evtItemNumChanged, this);
    }

    public setData(data: [string, IItemsEntity]) {
        this._itemId = data[0];
        this._item = data[1];

        this.itemSpr.itemId = this._itemId;

        this.nameLab.string = this._item.itemName;
        this.numLab.string = `X${ItemsManager.Instance.getPlayerItemCount(this._itemId)}`;
    }

    private evtItemNumChanged(itemId: string) {
        if (itemId !== this._itemId) return;
        this.numLab.string = `X${ItemsManager.Instance.getPlayerItemCount(this._itemId)}`;
    }

    private entityClicked() {
        // Logger.log(this._item);

        CostItemAlertControl.Instance.openPanel(<ICostItemData>{
            itemId: this._itemId,
            cfg: this._item,
            initCnt: 1,
            maxCnt: ItemsManager.Instance.getItemMaxNum(this._itemId, false),
            isShop: false,
            callBackFunc: this.useItem,
            callBackTarget: this,
        });
    }

    private useItem(itemId: string, cnt: number) {
        if (itemId !== this._itemId) return;
        if (cnt <= 0) return;

        ItemsManager.Instance.changePlayerItemCount(itemId, - cnt);
        ItemsManager.Instance.useItem(itemId, cnt);

        CostItemAlertControl.Instance.closePanel();
    }
}

