import { _decorator, Component, instantiate, Node, Skeleton, Sprite, SpriteFrame, sp } from 'cc';
import ResManager from '../manager/ResManager';

const { ccclass, property } = _decorator;

@ccclass('resTest')
export class resTest extends Component {
    @property(Node)
    private rootNode: Node = null;
    @property(Sprite)
    private spi: Sprite = null;

    @property(sp.Skeleton)
    private skel: sp.Skeleton = null;

    start() {
        this.loadTest();
    }

    private async loadTest() {
        const prefab = await ResManager.Instance.getPrefab("prefab/button");
        const node: Node = instantiate(prefab);
        node.setParent(this.rootNode);

        const sfm = await ResManager.Instance.getSpriteFrames("btn_pressed", "ui");
        this.spi.spriteFrame = sfm;


    }
}


