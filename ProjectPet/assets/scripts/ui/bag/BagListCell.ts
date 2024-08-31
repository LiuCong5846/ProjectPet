import { GListCell } from '../../component/GListCell';
import { IItemsEntity } from '../../config/ItemsEntity';
import LocalUtils from '../../tools/LocalUtils';
import { _decorator, Component, Node } from 'cc';
import { BagCell } from './BagCell';
const { ccclass, property } = _decorator;

@ccclass('BagListCell')
export class BagListCell extends GListCell {
    @property([BagCell])
    public bagCells: Array<BagCell> = [];

    public UpdateContent(datas: Array<[string, IItemsEntity]>, idx: number, other: any) {
        for (let i = 0; i < 3; i ++) {
            if (LocalUtils.isNil(this.bagCells[i])) {
                continue;
            }
            if (LocalUtils.isNil(datas[i])) {
                this.bagCells[i].node.active = false;
                continue;
            }
            this.bagCells[i].node.active = true;
            this.bagCells[i].setData(datas[i]);
        }
    }
}

