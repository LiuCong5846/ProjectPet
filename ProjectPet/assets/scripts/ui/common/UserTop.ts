import EventManager from '../../core/event/EventManager';
import { _decorator, Component, Label, Node } from 'cc';
import { UserHead } from './UserHead';
import { EventName } from '../../common/EventName';
import GameManager from '../../manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('UserTop')
export class UserTop extends Component {
    @property(UserHead)
    public userHead: UserHead = null;

    @property(Label)
    public labAge: Label = null;

    @property(Label)
    public labMoney: Label = null;

    protected onLoad() {
        EventManager.Instance.on(EventName.E_AGE_CHANGED, this.evtAgeChanged, this);
        EventManager.Instance.on(EventName.E_MONEY_CHANGED, this.evtMoneyChanged, this);
    }

    private evtAgeChanged() {
        this.setAgeLabShow(GameManager.Instance.age);
    }

    private evtMoneyChanged() {
        this.setMoneyLabShow(GameManager.Instance.money);
    }

    public setAgeLabShow(v: number) {
        this.labAge.string = `年龄:${v}`;
    }

    public setMoneyLabShow(v: number) {
        this.labMoney.string = `现金￥${v}`;
    }
}


