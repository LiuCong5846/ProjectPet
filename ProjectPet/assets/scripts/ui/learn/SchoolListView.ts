import { _decorator, Component, Label, Node } from 'cc';
import ViewBase from '../../core/mvc/ViewBase';
import { ButtonComp } from '../../component/ButtonComp';
import { VirtualList } from '../../component/VirtualList';
import { SchoolListControl } from './SchoolListControl';
import { LearnModel } from './LearnModel';
const { ccclass, property } = _decorator;

@ccclass('SchoolListView')
export class SchoolListView extends ViewBase {
    @property(Label)
    private educationLab: Label = null;

    @property(ButtonComp)
    private closeBtn: ButtonComp = null;

    @property(VirtualList)
    private list: VirtualList = null;

    protected _show(): void {
        this.closeBtn.setClickFunc(this.onCloseBtnClicked, this);

        const listData = LearnModel.Instance.getSchoolList();
        this.list.Init(listData, 252, "SchoolCell");
        this.educationLab.string = `当前学历: ${LearnModel.Instance.convertSchoolTypeDesc(LearnModel.Instance.education)}`;
    }

    private onCloseBtnClicked() {
        SchoolListControl.Instance.closePanel();
    }
}


