import { EItemType } from "../../common/Types";
import { ItemsManager } from "../../manager/ItemsManager";
import ModelBase from "../../core/mvc/ModelBase";

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
}


