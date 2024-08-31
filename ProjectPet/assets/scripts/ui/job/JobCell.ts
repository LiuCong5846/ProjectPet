import { _decorator, Component, Label, Node, Sprite, ProgressBar } from 'cc';
import { GListCell } from '../../component/GListCell';
import { ButtonComp } from '../../component/ButtonComp';
import Logger from '../../core/utils/Logger';
import ResManager from '../../manager/ResManager';
import { JobInfoControl } from './JobInfoControl';
import LocalUtils from '../../tools/LocalUtils';
import { JobModel } from './JobModel';
import { LearnModel } from '../learn/LearnModel';
import TipManager from '../../manager/TipManager';
import GameManager from '../../manager/GameManager';
import EventManager from '../../core/event/EventManager';
import { EventName } from '../../common/EventName';
import { EPetAction } from '../../common/Types';
const { ccclass, property } = _decorator;

@ccclass('JobCell')
export class JobCell extends GListCell {
    @property(Sprite)
    private rrectSpr: Sprite = null;

    @property(Sprite)
    private avatorSpr: Sprite = null;

    @property(Node)
    private tipRequireNode: Node = null;

    @property(Node)
    private tipTimeNode: Node = null;

    @property(Node)
    private tipRewardNode: Node = null;

    @property(Label)
    private rewardLab: Label = null;

    @property(Label)
    private timeLab: Label = null;

    @property(Label)
    private requireLab: Label = null;

    @property(ButtonComp)
    private jobBtn: ButtonComp = null;

    @property(ButtonComp)
    private workBtn: ButtonComp = null;

    @property(ProgressBar)
    private progressBar: ProgressBar = null;

    @property(Label)
    private progressLab: Label = null;

    private _data: any = null;

    protected onLoad(): void {
        this.workBtn.setClickFunc(this.onWorkBtnClicked, this);

        EventManager.Instance.on(EventName.E_JOB_COMPLETED, this.evtJobCompleted, this);
    }

    protected onDestroy() {
        EventManager.Instance.off(EventName.E_JOB_COMPLETED, this.evtJobCompleted, this);
        this._data = null;
    }

    protected onDisable() {
        this.offJobStatusTimer();
    }

    public UpdateContent(data?: any, idx?: number, isInfo: boolean = false): void {
        this._data = data; // {id, cfg}
        this.jobBtn.btnLabel.string = `${this._data.cfg.typeDesc}`;

        this.rewardLab.string = `￥${this._data.cfg.money}/${this._data.cfg.minutes / 60}小时`;
    

        this.setCellState();

        (async() => {
            this.avatorSpr.spriteFrame = await ResManager.Instance.getSpriteFrames("job_1", "job/ui");
        })();

        this.setRedVisible();

        this.onJobStatusTimer();
    }

    private _runJobStatusTimerFunc = this.runJobStatusTimer.bind(this);
    
    private offJobStatusTimer() {
        if (LocalUtils.isNil(this._data)) return;
        this.unschedule(this._runJobStatusTimerFunc);
    }

    private onJobStatusTimer() {
        this.offJobStatusTimer();
        if (LocalUtils.isNil(this._data)) return;

        this._runJobStatusTimerFunc();
        this.schedule(this._runJobStatusTimerFunc, 0.1);
    }

    private runJobStatusTimer() {
        this.setCellState();
    }

    private setCellState() {
        if (!LocalUtils.isNil(JobModel.Instance.working) && JobModel.Instance.working.id === this._data.id) {
            this.progressBar.node.active = this.tipTimeNode.active = this.timeLab.node.active = true;
            this.timeLab.string = `${this._data.cfg.minutes / 60}小时`;
            this.workBtn.node.active = this.tipRequireNode.active = this.requireLab.node.active = false;
            const p = JobModel.Instance.getJobWorkingProgress(this._data.id);
            this.progressBar.progress = p;
            this.progressLab.string = `${Math.round(p * 100)}%`;
        } else {
            this.progressBar.node.active = false;
            this.progressLab.string = "";
            const subjects = (JSON.parse(this._data.cfg.schoolId || "[]")).map(String);
            const learnedAll = LearnModel.Instance.checkSubjectsLearned(subjects);

            this.tipRequireNode.active = this.requireLab.node.active = !learnedAll;
            this.tipTimeNode.active = this.timeLab.node.active = this.workBtn.node.active = learnedAll;
            
            if (!learnedAll) {
                let txt = "";
                subjects.forEach((sId, i) => {
                    i > 0 && (txt += ",");
                    const cfg = LearnModel.Instance.getShoolCfg(sId);
                    txt += `${cfg.course}`;
                });
                this.requireLab.string = txt;
            } else {
                this.timeLab.string = `${this._data.cfg.minutes / 60}小时`;
            }
        }
    }

    private setRedVisible() {
        this.jobBtn.setRedVisible(false);
    }

    private onWorkBtnClicked() {
        Logger.log(this._data);
        if (LocalUtils.isNil(this._data)) return;
        // JobInfoControl.Instance.openPanel(this._data);
        if (!LocalUtils.isNil(JobModel.Instance.working)) {
            TipManager.Instance.addTipShow("正在工作中");
            return;
        }
        JobModel.Instance.working = {
            id: this._data.id,
            startTime: GameManager.Instance.serverTime,
        };
        this.setCellState();
        GameManager.Instance.action = EPetAction.WORKING;
    }

    private evtJobCompleted(jobId) {
        if (LocalUtils.isNil(this._data)) return;
        if (this._data.id !== jobId) return;

        this.offJobStatusTimer();
        this.setCellState();
    }
}


