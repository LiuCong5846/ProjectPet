import { ItemsManager } from '../../manager/ItemsManager';
import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemSprite')
export class ItemSprite extends Component {
    private _itemId: string = null;
    get itemId() {
        return this._itemId;
    }
    set itemId(id: string) {
        this._itemId = id;
        ItemsManager.Instance.setItemSprFrame(this._itemId, this.node.getComponent(Sprite));
    }
}

