import { _decorator, Component, Label, Node, ProgressBar, Sprite } from 'cc';
import { GListCell } from '../../component/GListCell';
import { ToggleComp } from '../../component/ToggleComp';
import { ButtonComp } from '../../component/ButtonComp';
import ResManager from '../../manager/ResManager';
const { ccclass, property } = _decorator;

@ccclass('TutelageSubjectCell')
export class TutelageSubjectCell extends GListCell {
    @property(Sprite)
    private rectSpr: Sprite = null;

    @property(Sprite)
    private bookSpr: Sprite = null;

    @property(ProgressBar)
    private progressBar: ProgressBar = null;

    @property(ToggleComp)
    private toggleComp: ToggleComp = null;

    @property(ButtonComp)
    private watchBtn: ButtonComp = null;

    @property(Label)
    private subjectNameLab: Label = null;

    @property(Label)
    private progressLab: Label = null;

    @property(Label)
    private timeLab: Label = null;

    private _data: any = null;

    protected onLoad(): void {
        this.watchBtn.setClickFunc(this.onWatchBtnClicked, this);
        this.toggleComp.onToggle(this.onToggleFunc, this);
    }

    protected onDestroy(): void {
        // this.toggleComp.offToggle();
    }

    public UpdateContent(data?: any, idx?: number, other?: any): void {
        this._data = data;

        this.subjectNameLab.string = `${this._data}`;
        (async() => {
            this.bookSpr.spriteFrame = await ResManager.Instance.getSpriteFrames(`${idx % 2 === 0 ? "book1" : "book2"}`, "learn/ui/book");
        })();

        const c = 18;
        const t = 30;
        this.progressBar.progress = c / t;
        this.progressLab.string = `${c}/${t}`;
    }

    private onWatchBtnClicked() {

    }

    private onToggleFunc() {

    }
}


