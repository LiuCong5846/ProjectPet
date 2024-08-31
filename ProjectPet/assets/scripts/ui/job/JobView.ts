import { _decorator, Component, Node } from 'cc';
import ViewBase from '../../core/mvc/ViewBase';
import { ButtonComp } from '../../component/ButtonComp';
import { VirtualList } from '../../component/VirtualList';
import { JobControl } from './JobControl';
import Logger from '../../core/utils/Logger';
import { JobModel } from './JobModel';
import { IPetJobEntity } from 'assets/scripts/config/PetJobEntity';
const { ccclass, property } = _decorator;

@ccclass('JobView')
export class JobView extends ViewBase {
    @property(ButtonComp)
    private closeBtn: ButtonComp = null;

    @property(ButtonComp)
    private sortBtn1: ButtonComp = null;

    @property(ButtonComp)
    private sortBtn2: ButtonComp = null;

    @property(VirtualList)
    private list: VirtualList = null;

    private _sortModel = 0; // 0-时长排序 1-收益排序

    protected _show(): void {
        this.sortList(JobModel.Instance.jobCfgList);
        this.list.Init(JobModel.Instance.jobCfgList, 335, "JobCell");

        this.closeBtn.setClickFunc(this.onCloseBtnClicked, this);
        this.sortBtn1.setClickFunc(this.onSort1BtnClicked, this);
        this.sortBtn2.setClickFunc(this.onSort2BtnClicked, this);
    }

    private sortList(list: Array<{id: string, cfg: IPetJobEntity}>) {
        if (this._sortModel === 0) {
            list.sort((a, b) => {
                if (a.cfg.minutes === b.cfg.minutes) {
                    return Number(a.id) - Number(b.id);
                } else {
                    return b.cfg.minutes - a.cfg.minutes;
                }
            });
        } else if (this._sortModel === 1) {
            list.sort((a, b) => {
                if (a.cfg.money === b.cfg.money) {
                    return Number(a.id) - Number(b.id);
                } else {
                    return b.cfg.money - a.cfg.money;
                }
            });
        }
      
    }

    private onCloseBtnClicked() {
        JobControl.Instance.closePanel();
    }

    private onSort1BtnClicked() {
        Logger.log("onSort1BtnClicked")
        this._sortModel = 0;
        this.sortList(JobModel.Instance.jobCfgList);
        this.list.Reload(JobModel.Instance.jobCfgList);
    }

    private onSort2BtnClicked() {
        Logger.log("onSort2BtnClicked")
        this._sortModel = 1;
        this.sortList(JobModel.Instance.jobCfgList);
        this.list.Reload(JobModel.Instance.jobCfgList);
    }


}


