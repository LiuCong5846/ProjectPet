import { _decorator, Node, UIRenderer } from 'cc';
import { GListRenderCell } from './GListRenderCell';
const { ccclass } = _decorator;

@ccclass('GListRender')
export class GListRender extends UIRenderer {
    public postUpdateAssembler(batcher: any) {
        let children: Array<Node> = this.node.children;
        let len = children.length
        if (len <= 0) return;

        let isfinish = false;
        for (let level = 0; ; level++) {
            if (isfinish) break;
            for (let index = 0; index < len; index++) {
                let renderCell = children[index].getComponent(GListRenderCell);
                if (renderCell) {
                    if (!renderCell.renderCell(level, batcher)) {
                        isfinish = true;
                    }
                } else {
                    isfinish = true;
                }
            }
        }
    }
}


