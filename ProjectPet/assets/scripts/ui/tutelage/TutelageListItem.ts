import { IItemsEntity } from '../../config/ItemsEntity';
import { _decorator, Component, Node, Sprite } from 'cc';
import { GListCell } from '../../component/GListCell';
import ResManager from '../../manager/ResManager';
import { ItemSprite } from '../common/ItemSprite';
const { ccclass, property } = _decorator;

@ccclass('TutelageListItem')
export class TutelageListItem extends GListCell {
    @property(ItemSprite)
    private itemSpr: ItemSprite = null;
    
    private _data: [string, IItemsEntity] = null;

    public UpdateContent(data?: [string, IItemsEntity], idx?: number, other?: any): void {
        this._data = data;
        this.itemSpr.itemId = this._data[0];
    }
}


