import { _decorator, Component, Node } from 'cc';
import ViewBase from '../../core/mvc/ViewBase';
import { VirtualList } from '../../component/VirtualList';
import { ButtonComp } from '../../component/ButtonComp';
import { LearnModel } from '../learn/LearnModel';
import { TutelageSubjectListControl } from './TutelageSubjectListControl';
const { ccclass, property } = _decorator;

@ccclass('TutelageSubjectListView')
export class TutelageSubjectListView extends ViewBase {
    @property(VirtualList)
    private list: VirtualList = null;

    @property(ButtonComp)
    private closeBtn: ButtonComp = null;

    private _data: any;

    protected async _open(data: any): Promise<void> {
        this._data = data;
        await super._open();
    }

    protected _show(): void {

        const listDta = []; // TODO//LearnModel.Instance.getTestList2(this._data);
        this.list.Init(listDta, 337, "TutelageSubjectCell");

        this.closeBtn.setClickFunc(this.onCloseBtnClicked, this);
    }

    private onCloseBtnClicked() {
        TutelageSubjectListControl.Instance.closePanel();
    }
}


