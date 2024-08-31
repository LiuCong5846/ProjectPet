import { _decorator, Component, Node, Sprite } from 'cc';
import LocalUtils from '../../tools/LocalUtils';
const { ccclass, property } = _decorator;

@ccclass('UserHead')
export class UserHead extends Component {
    @property(Node)
    public clickNode: Node = null;

    @property(Sprite)
    public frameSprite: Sprite = null;

    @property(Sprite)
    public headSprite: Sprite = null;

    public clickedFunc: Function = null;

    protected onLoad() {
        this.clickNode.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    protected onDestroy() {
        this.clickNode.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchEnd() {
        !LocalUtils.isNil(this.clickedFunc) && this.clickedFunc();
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


