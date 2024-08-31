import { _decorator, Component, Node } from 'cc';
import ViewBase from '../../core/mvc/ViewBase';
import { VirtualList } from '../../component/VirtualList';
import { ButtonComp } from '../../component/ButtonComp';
import { JobModel } from './JobModel';
import { JobInfoControl } from './JobInfoControl';
const { ccclass, property } = _decorator;

@ccclass('JobInfoView')
export class JobInfoView extends ViewBase {
    @property(VirtualList)
    private list: VirtualList = null;

    @property(ButtonComp)
    private closeBtn: ButtonComp = null;

    private _data: any = null;

    protected async _open(data: any): Promise<void> {
        this._data = data;
        await super._open();
    }

    protected _show(): void {
        this.closeBtn.setClickFunc(this.onCloseBtnClicked, this);

        const list = JobModel.Instance.getTestList2(this._data);
        this.list.Init(list, 335, "JobCell", true);

    }

    private onCloseBtnClicked() {
        JobInfoControl.Instance.closePanel();
    }
}


