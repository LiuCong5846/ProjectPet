import { _decorator, Component, Node } from 'cc';
import { testPanelControl } from './testPanelControl';
const { ccclass, property } = _decorator;

@ccclass('testUI')
export class testUI extends Component {
    @property(Node)
    private btn: Node = null;
    @property(Node)
    private layer: Node = null;

    protected onLoad() {
        this.btn.on(Node.EventType.TOUCH_END, this.onOpenPanel, this);
    }

    private onOpenPanel() {
        testPanelControl.Instance.openPanel(null, this.layer);
    }
}

