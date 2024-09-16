import { EItemType } from "../../common/Types";
import { ItemsManager } from "../../manager/ItemsManager";
import ModelBase from "../../core/mvc/ModelBase";
import GameProtocolManager from "assets/scripts/manager/GameProtocolManager";
import TipManager from "assets/scripts/manager/TipManager";
import EventManager from "assets/scripts/core/event/EventManager";
import { EventName } from "assets/scripts/common/EventName";

export class ShopModel extends ModelBase {
    public static get Instance(): ShopModel {
        return this.getInstance<ShopModel>();
    }

    public getShopitems(tp: EItemType) {
        const list = ItemsManager.Instance.getTypeItems(tp).filter(o => o[1].shop === 1);
        const listDtas1 = [];
        const col = 3;
        const row = Math.ceil(list.length * (1 / col));
        for (let i = 0; i < row; i ++) {
            let tmp = [];
            for (let j = 0; j < col; j ++) {
                tmp.push(list[i * col + j]);
            }
            listDtas1.push(tmp);
        }
        return listDtas1;
    }

    public purchaseGood(propId: number, buyNum: number) {
        GameProtocolManager.Instance.sendPurchaseShopGood(
            propId,
            buyNum,
            () => {
                TipManager.Instance.addTipShow("购买成功");
                EventManager.Instance.emit(EventName.E_PURCHASE_SHOP_GOOD_BACK, {
                    success: true,
                    itemId: propId,
                    buyNum: buyNum,
                });
            },
            () => {
                TipManager.Instance.addTipShow("购买失败");
                EventManager.Instance.emit(EventName.E_PURCHASE_SHOP_GOOD_BACK, {
                    success: false,
                });
            },
            this,
        );
    }
}


