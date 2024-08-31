import { _decorator, Component, Node } from 'cc';
import { GListCell } from '../../component/GListCell';
import Logger from '../../core/utils/Logger';
import { ShopGood } from './ShopGood';
import { publicDecrypt } from 'crypto';
import LocalUtils from '../../tools/LocalUtils';
import { IItemsEntity } from '../../config/ItemsEntity';
const { ccclass, property } = _decorator;

@ccclass('ShopListCell')
export class ShopListCell extends GListCell {
    @property([ShopGood])
    public shopGoods: Array<ShopGood> = [];

    /**
     * 
     */
    public UpdateContent(datas: Array<[string, IItemsEntity]>, idx: number, other: any) {
        for (let i = 0; i < 3; i ++) {
            if (LocalUtils.isNil(this.shopGoods[i])) {
                continue;
            }
            if (LocalUtils.isNil(datas[i])) {
                this.shopGoods[i].node.active = false;
                continue;
            }
            this.shopGoods[i].node.active = true;
            this.shopGoods[i].setData(datas[i]);
        }
    }
}


