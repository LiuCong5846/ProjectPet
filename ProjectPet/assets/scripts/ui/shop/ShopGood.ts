import { IItemsEntity } from '../../config/ItemsEntity';
import { _decorator, Component, Label, Node, Sprite } from 'cc';
import { ButtonComp } from '../../component/ButtonComp';
import Logger from '../../core/utils/Logger';
import { ItemSprite } from '../common/ItemSprite';
import { CostItemAlertControl } from '../common/cost_item/CostItemAlertControl';
import { ICostItemData } from '../common/cost_item/CostItemAlertView';
import { ItemsManager } from '../../manager/ItemsManager';
import GameManager from '../../manager/GameManager';
import TipManager from '../../manager/TipManager';
import EventManager from 'assets/scripts/core/event/EventManager';
import { EventName } from 'assets/scripts/common/EventName';
import { ShopModel } from './ShopModel';
const { ccclass, property } = _decorator;

@ccclass('ShopGood')
export class ShopGood extends Component {
    @property(ButtonComp)
    public btn: ButtonComp = null;

    @property(ItemSprite)
    public itemShop: ItemSprite = null;

    @property(Label)
    public nameLab: Label = null;

    @property(Label)
    public priceLab: Label = null;

    private _itemId: string;
    private _shopItem: IItemsEntity;

    protected onLoad(): void {
        this.btn.setClickFunc(this.goodClicked, this);
        EventManager.Instance.on(EventName.E_PURCHASE_SHOP_GOOD_BACK, this.onEvtPurchaseBack, this);
    }

    protected onDestroy() {
        EventManager.Instance.off(EventName.E_PURCHASE_SHOP_GOOD_BACK, this.onEvtPurchaseBack, this);
    }

    public setData(data: [string, IItemsEntity]) {
        this._itemId = data[0];
        this._shopItem = data[1];

        this.itemShop.itemId = this._itemId;

        this.nameLab.string = this._shopItem.itemName;
        this.priceLab.string = `￥${this._shopItem.value}`;
    }

    private goodClicked() {
        // Logger.log(this._shopItem);
        //ShopPurchaseControl.Instance.openPanel(this._shopItem);

        CostItemAlertControl.Instance.openPanel(<ICostItemData>{
            itemId: this._itemId,
            cfg: this._shopItem,
            initCnt: 1,
            maxCnt: ItemsManager.Instance.getItemMaxNum(this._itemId, true),
            isShop: true,
            callBackFunc: this.buyShopItem,
            callBackTarget: this,
        });
    }

    private buyShopItem(itemId: string, cnt: number) {
        if (itemId !== this._itemId) return;
        if (cnt <= 0) return;

        const costMoney = this._shopItem.value * cnt;
        if (GameManager.Instance.money < costMoney) {
            TipManager.Instance.addTipShow("钱不够...");
            return;
        }

        ShopModel.Instance.purchaseGood(Number(itemId), cnt);
    }

    private onEvtPurchaseBack(data: any) {
        CostItemAlertControl.Instance.closePanel();

        if (data.success) {
            if (data.itemId === this._itemId) {
                ItemsManager.Instance.changePlayerItemCount(data.itemId, data.buyNum);
                const costMoney = this._shopItem.value * data.buyNum;
                GameManager.Instance.money -= costMoney;
            }
        }
    }
}


