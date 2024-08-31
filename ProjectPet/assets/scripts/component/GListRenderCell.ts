import { _decorator, Component, UIRenderer } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GListRenderCell')
export class GListRenderCell extends Component {
    private _renders: UIRenderer[] = [];
    
    protected onEnable(): void {
        this.init();
    }

    public init() {
        this._renders = this.node.getComponentsInChildren(UIRenderer);
        let len = this._renders.length;
        for (let index = 0; index < len; index++) {
            let uiRender: any = this._renders[index];
            if (uiRender._copyRenderFunc == null) {
                uiRender._copyRenderFunc = uiRender._render;
                uiRender._render = function (render: any) { }
            }
        }
    }

    public renderCell(level: number, batcher: any) {
        let render: any = this._renders[level];
        if (render) {
            if (render.node && render.node.activeInHierarchy) {
                render._copyRenderFunc(batcher);
            }
            return true;
        }

        return false;
    }
}


