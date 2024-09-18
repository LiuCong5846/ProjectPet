import { IItemsEntity } from '../../config/ItemsEntity';
import { _decorator, Component, Node, Sprite } from 'cc';
import { GListCell } from '../../component/GListCell';
import ResManager from '../../manager/ResManager';
import { ItemSprite } from '../common/ItemSprite';
import { ItemsManager } from '../../manager/ItemsManager';
import EventManager from '../../core/event/EventManager';
import { EventName } from '../../common/EventName';
import LocalUtils from '../../tools/LocalUtils';
const { ccclass, property } = _decorator;

@ccclass('TutelageListItem')
export class TutelageListItem extends GListCell {
    @property(ItemSprite)
    private itemSpr: ItemSprite = null;
    
    private _data: [string, IItemsEntity] = null;

    protected onLoad() {
        EventManager.Instance.on(EventName.E_TUTELAGE_ITEM_SELECTED, this.onEvtTutelageSelected, this);
    }

    protected onDestroy() {
        EventManager.Instance.off(EventName.E_TUTELAGE_ITEM_SELECTED, this.onEvtTutelageSelected, this);
    }

    public UpdateContent(data?: [string, IItemsEntity], idx?: number, other?: any): void {
        this._data = data;
        this.itemSpr.itemId = this._data[0];

        this.setTutelageState();
    }

    private setTutelageState() {
        this.itemSpr.setItemGray(!ItemsManager.Instance.checkItemTutelage(this.itemSpr.itemId));
    }

    private onEvtTutelageSelected(data: {itemId: number, selected: boolean}) {
        if (LocalUtils.isNil(this._data)) return;
        if (String(data.itemId) !== this._data[0]) return;
        this.setTutelageState();
    }
}


