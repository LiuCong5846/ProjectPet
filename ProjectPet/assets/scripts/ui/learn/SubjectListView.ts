import { _decorator, Component, Label, Node } from 'cc';
import ViewBase from '../../core/mvc/ViewBase';
import { VirtualList } from '../../component/VirtualList';
import { ButtonComp } from '../../component/ButtonComp';
import { LearnModel } from './LearnModel';
import { SubjectListControl } from './SubjectListControl';
import { IPetSchoolEntity } from 'assets/scripts/config/PetSchoolEntity';
const { ccclass, property } = _decorator;

@ccclass('SubjectListView')
export class SubjectListView extends ViewBase {
    @property(VirtualList)
    private list: VirtualList = null;

    @property(ButtonComp)
    private closeBtn: ButtonComp = null;

    @property(Label)
    private titleLab: Label = null;

    private _data: any;

    protected async _open(data: any): Promise<void> {
        this._data = data; // [EPetSchoolType, cfg[]]
        await super._open();
    }

    protected _show(): void {
        this.titleLab.string = `${LearnModel.Instance.convertSchoolTypeDesc(this._data[0])}`;

        const listDta = Array.from((this._data[1] as Map<string, IPetSchoolEntity>).entries());
        this.list.Init(listDta, 337, "SubjectCell");

        this.closeBtn.setClickFunc(this.onCloseBtnClicked, this);
    }

    private onCloseBtnClicked() {
        SubjectListControl.Instance.closePanel();
    }
}


