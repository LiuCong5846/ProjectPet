import { _decorator, Component, Label, Node, ProgressBar, Sprite } from 'cc';
import { GListCell } from '../../component/GListCell';
import { ButtonComp } from '../../component/ButtonComp';
import ResManager from '../../manager/ResManager';
import { IPetSchoolEntity } from '../../config/PetSchoolEntity';
import EventManager from '../../core/event/EventManager';
import { EventName } from '../../common/EventName';
import { LearnModel } from './LearnModel';
import LocalUtils from '../../tools/LocalUtils';
import GameManager from '../../manager/GameManager';
import { EPetAction } from '../../common/Types';
const { ccclass, property } = _decorator;

@ccclass('SubjectCell')
export class SubjectCell extends GListCell {
    @property(Sprite)
    private rectSpr: Sprite = null;

    @property(Sprite)
    private bookSpr: Sprite = null;

    @property(ProgressBar)
    private progressBar: ProgressBar = null;

    @property(ButtonComp)
    private gotoBtn: ButtonComp = null;

    @property(ButtonComp)
    private watchBtn: ButtonComp = null;

    @property(Label)
    private subkectNameLab: Label = null;

    @property(Label)
    private progressLab: Label = null;

    @property(Label)
    private timeLab: Label = null;

    @property(Label)
    private learnedLab: Label = null;

    private _data: any = null;

    protected onLoad(): void {
        this.gotoBtn.setClickFunc(this.onGotoBtnClicked, this);
        this.watchBtn.setClickFunc(this.onWatchBtnClicked, this);

        EventManager.Instance.on(EventName.E_SUBJECT_LEARNED, this.evtLeraned, this);
    }

    protected onDestroy() {
        this._data = null;
        EventManager.Instance.on(EventName.E_SUBJECT_LEARNED, this.evtLeraned, this);
    }

    protected onDisable() {
        this.offProgressTimer();
    }

    public UpdateContent(data?: any, idx?: number, other?: any): void {
        this._data = data; // [subjectId, IPetSchoolEntity]

        this.subkectNameLab.string = `${(this._data[1] as IPetSchoolEntity).course}`;
        (async() => {
            this.bookSpr.spriteFrame = await ResManager.Instance.getSpriteFrames(`${idx % 2 === 0 ? "book1" : "book2"}`, "learn/ui/book");
        })();

        this.setProgress();
        this.onProgressTimer();
    }

    private _runProgressTimerFunc = this.runProgressTimer.bind(this);
    
    private offProgressTimer() {
        if (LocalUtils.isNil(this._data)) return;
        this.unschedule(this._runProgressTimerFunc);
    }

    private onProgressTimer() {
        this.offProgressTimer();
        if (LocalUtils.isNil(this._data)) return;
        if (!LearnModel.Instance.checkIsLearning(this._data[0])) return;

        this._runProgressTimerFunc();
        this.schedule(this._runProgressTimerFunc, 0.1);
    }

    private runProgressTimer() {
        this.setProgress();
    }

    private evtLeraned(subjectId: string) {
        if (LocalUtils.isNil(this._data)) return;
        if (this._data[0] !== subjectId) return;

        this.offProgressTimer();
        this.setProgress();
    }

    private setProgress() {
        const p = LearnModel.Instance.getSubjectProgress(this._data[0]);
        this.progressBar.progress = p;
        this.progressLab.string = `${Math.floor(p * 100)}%`;

        this.gotoBtn.node.active = !LearnModel.Instance.checkIsLearning(this._data[0]);
        this.learnedLab.string = p >= 1 ? "已完成" : "";
    }

    private onGotoBtnClicked() {
        if (LocalUtils.isNil(this._data)) return;

        LearnModel.Instance.learnSubject(this._data[0], GameManager.Instance.serverTime);
        this.setProgress();

        GameManager.Instance.petInfo.action = EPetAction.STUDYING;
    }

    private onWatchBtnClicked() {

    }
}


