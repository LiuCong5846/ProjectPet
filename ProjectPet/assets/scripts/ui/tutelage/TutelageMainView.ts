import { _decorator, Component, Label, Node } from 'cc';
import ViewBase from '../../core/mvc/ViewBase';
import { VirtualList } from '../../component/VirtualList';
import { ToggleComp } from '../../component/ToggleComp';
import { ButtonComp } from '../../component/ButtonComp';
import { TutelageModel } from './TutelageModel';
import TimerManager from '../../core/timer/TimerManager';
import DateUtils from '../../core/utils/DateUtils';
import { TutelageMainControl } from './TutelageMainControl';
import { TutelageSubjectListControl } from './TutelageSubjectListControl';
import GameManager from '../../manager/GameManager';
import { BagModel } from '../bag/BagModel';
import { EItemType } from '../../common/Types';
import { IItemsEntity } from '../../config/ItemsEntity';
const { ccclass, property } = _decorator;

@ccclass('TutelageMainView')
export class TutelageMainView extends ViewBase {
    @property(VirtualList)
    private list1: VirtualList = null;

    @property(VirtualList)
    private list2: VirtualList = null;

    @property(VirtualList)
    private list3: VirtualList = null;

    @property(ToggleComp)
    private autoFeed: ToggleComp = null;

    @property(ToggleComp)
    private autoLearn: ToggleComp = null;

    @property(ToggleComp)
    private autoWork: ToggleComp = null;

    @property(ButtonComp)
    private closeBtn: ButtonComp = null;

    @property(ButtonComp)
    private subjectBtn: ButtonComp = null;

    @property(ButtonComp)
    private switchBtn: ButtonComp = null;

    @property(Label)
    private tutoLeftTimeLab: Label = null;

    protected _show(): void {
        const list1 = BagModel.Instance.getItemsList(EItemType.FOOD);
        this.initList(this.list1, list1);
        const list2 = BagModel.Instance.getItemsList(EItemType.MEDICINE);
        this.initList(this.list2, list2);
        let list3 = BagModel.Instance.getItemsList(EItemType.CLEAN);
        list3.concat(BagModel.Instance.getItemsList(EItemType.TOY));
        list3.concat(BagModel.Instance.getItemsList(EItemType.OTHER));
        this.initList(this.list3, list3);
        this.autoFeed.onToggle(this.onToggleAutoFeed, this);
        this.autoLearn.onToggle(this.onToggleAutoLearn, this);
        this.autoWork.onToggle(this.onToggleAutoWork, this);
        this.closeBtn.setClickFunc(this.onCloseBtnClicked, this);
        // this.subjectBtn.setClickFunc(this.onSubjectBtnClicked, this);
        this.switchBtn.setClickFunc(this.onSwitchBtnClicked, this);
        this.resetToggles();
        this.setTuteLeftTime();

        this.tutoLeftTimeLab.string = `${DateUtils.getFormatBySecond(GameManager.Instance.petInfo.nurseQueueTime, 1)}`;
    }

    protected _close(): void {
        this.autoFeed.offToggle();
        this.autoLearn.offToggle();
        this.autoWork.offToggle();
    }

    private initList(list: VirtualList, listDta: Array<[string, IItemsEntity]>) {
        list.Init(listDta, 90, "TutelageListItem")
    }

    private resetList(list: VirtualList, listDta: Array<[string, IItemsEntity]>) {
        list.Reload(listDta);
    }

    private onToggleAutoFeed() {
        TutelageModel.Instance.autoFeed = !TutelageModel.Instance.autoFeed;
        this.resetToggles();
    }

    private onToggleAutoLearn() {
        const flag = !TutelageModel.Instance.autoLearn
        TutelageModel.Instance.autoLearn = flag;
        if (flag && TutelageModel.Instance.autoWork) {
            TutelageModel.Instance.autoWork = false;
        }
        this.resetToggles();
    }

    private onToggleAutoWork() {
        const flag = !TutelageModel.Instance.autoWork;
        TutelageModel.Instance.autoWork = flag;
        if (flag && TutelageModel.Instance.autoLearn) {
            TutelageModel.Instance.autoLearn = false;
        }
        this.resetToggles();
    }

    private resetToggles() {
        this.autoFeed.stopToggle();
        this.autoLearn.stopToggle();
        this.autoWork.stopToggle();
        this.autoFeed.toggle.isChecked = TutelageModel.Instance.autoFeed;
        this.autoLearn.toggle.isChecked = TutelageModel.Instance.autoLearn;
        this.autoWork.toggle.isChecked = TutelageModel.Instance.autoWork;
        this.autoFeed.openToggle();
        this.autoLearn.openToggle();
        this.autoWork.openToggle();
    }

    private onCloseBtnClicked() {
        TutelageMainControl.Instance.closePanel();
    }

    private onSubjectBtnClicked() {
        // TutelageSubjectListControl.Instance.openPanel("海淀小学"); // TODO
    }

    private onSwitchBtnClicked() {
        GameManager.Instance.tutelage = !GameManager.Instance.tutelage;
    }

    public setSwitchState() {
        this.switchBtn.btnLabel.string = GameManager.Instance.tutelage ? "停止托管" : "打开托管";
    }

    public setTuteLeftTime() {
        // if (!TutelageModel.Instance.tutelage) {
        //     this.tutoLeftTimeLab.string = "";
        //     return;
        // }
        // const left = Number(TutelageModel.Instance.tutelageEndTime) - TimerManager.Instance.getCurrTime();
        // if (left <= 0) {
        //     this.tutoLeftTimeLab.string = "";
        //     return;
        // }
        // this.tutoLeftTimeLab.string = `剩余时间: ${DateUtils.getFormatBySecond(Math.round(left * (1 / 1000)), 1)}`;
    }
}


