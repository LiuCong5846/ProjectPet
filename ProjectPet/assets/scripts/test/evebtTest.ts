import { _decorator, Component, Label, Node } from 'cc';
import EventManager from '../core/event/EventManager';
import { EventName } from '../common/EventName';
const { ccclass, property } = _decorator;

@ccclass('evebtTest')
export class evebtTest extends Component {
    @property(Node)
    private buttonNode: Node = null;
    @property(Label)
    private lab: Label = null;

    protected onLoad() {
        this.buttonNode.on(Node.EventType.TOUCH_END, this.onBtnClicked, this);

        EventManager.Instance.on(EventName.EVENT_TEST, this.onEvt, this);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    private onBtnClicked() {
        EventManager.Instance.emit(EventName.EVENT_TEST, "EVENT_TEST");
    }

    private onEvt(str: string) {
        this.lab.string = str;
    }
}


