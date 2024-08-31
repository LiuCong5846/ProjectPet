import { _decorator, Component, Node } from 'cc';
import ViewBase from '../core/mvc/ViewBase';
import { testPanelControl } from './testPanelControl';
const { ccclass, property } = _decorator;

@ccclass('testPanelView')
export class testPanelView extends ViewBase {
    @property(Node)
    private closeNode: Node = null;

    protected onLoad() {
        this.closeNode.on(Node.EventType.TOUCH_END, this.closePanel, this);
    }

    private closePanel() {
        testPanelControl.Instance.closePanel();
    }
}

