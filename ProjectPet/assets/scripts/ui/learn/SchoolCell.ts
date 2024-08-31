import { _decorator, Component, Label, Node, ProgressBar, Sprite } from 'cc';
import { GListCell } from '../../component/GListCell';
import { ButtonComp } from '../../component/ButtonComp';
import Logger from '../../core/utils/Logger';
import ResManager from '../../manager/ResManager';
import { SubjectListControl } from './SubjectListControl';
import { LearnModel } from './LearnModel';
import EventManager from '../../core/event/EventManager';
import { EventName } from '../../common/EventName';
import LocalUtils from '../../tools/LocalUtils';
const { ccclass, property } = _decorator;

@ccclass('SchoolCell')
export class SchoolCell extends GListCell {
    @property(Sprite)
    private rectSpr: Sprite = null;

    @property(Sprite)
    private schoolSpr: Sprite = null;

    @property(ProgressBar)
    private progressBar: ProgressBar = null;

    @property(Label)
    private schoolNameLab: Label = null;

    @property(Label)
    private progressLab: Label = null;

    @property(ButtonComp)
    private btn: ButtonComp = null;

    private _data: any = null;

    protected onLoad(): void {
        this.btn.setClickFunc(this.onBtnClicked, this);

        EventManager.Instance.on(EventName.E_SUBJECT_LEARNED, this.evtLeraned, this);
    }

    protected onDestroy() {
        this._data = null;
        EventManager.Instance.off(EventName.E_SUBJECT_LEARNED, this.evtLeraned, this);
    }

    public UpdateContent(data?: any, idx?: number, other?: any): void {
        this._data = data; // [EPetSchoolType, cfg[]]

        const sTp = this._data[0];

        this.schoolNameLab.string = `${LearnModel.Instance.convertSchoolTypeDesc(sTp)}`;

        (async() => {
            this.schoolSpr.spriteFrame = await ResManager.Instance.getSpriteFrames(`${idx % 2 === 0 ? "school1" : "school2"}`, "learn/ui/school");
        })();

        this.resetProgressBar();
    }

    private resetProgressBar() {
        const [learned, total] = LearnModel.Instance.getSchoolProgressParams(this._data[0]);
        this.progressBar.progress = learned * (1 / total); 
        this.progressLab.string = `${learned}/${total}`;
    }

    private evtLeraned(subjectId: string) {
        if (LocalUtils.isNil(this._data) || this._data.length <= 0) return;
        const cfg = LearnModel.Instance.getShoolCfg(subjectId);
        if (cfg.type !== this._data[0]) return;
        this.resetProgressBar();
    }

    private onBtnClicked() {
        Logger.log(this._data);
        SubjectListControl.Instance.openPanel(this._data);
    }
}


