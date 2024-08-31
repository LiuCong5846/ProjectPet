import { EItemType } from "../../common/Types";
import { ItemsManager } from "../../manager/ItemsManager";
import ModelBase from "../../core/mvc/ModelBase";

export class BagModel extends ModelBase {
    public static get Instance(): BagModel {
        return this.getInstance<BagModel>();
    }

    public getItemsList(tp: EItemType) {
        let list = [];
        ItemsManager.Instance.playerItemsMap.forEach((num, itemId) => {
            if (num > 0) {
                const cfg = ItemsManager.Instance.getItemCfg(itemId);
                if (cfg.type === tp) {
                    list.push([itemId, cfg]);
                }
            }
        });
        return list;
    }

    public getBagListItemsList(tp: EItemType) {
        const list = this.getItemsList(tp);
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

