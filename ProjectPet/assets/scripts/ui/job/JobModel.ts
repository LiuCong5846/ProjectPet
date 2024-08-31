import { IPetJobEntity } from "../../config/PetJobEntity";
import ConfigManager from "../../core/config/ConfigManager";
import LocalUtils from "../../tools/LocalUtils";
import ModelBase from "../../core/mvc/ModelBase";
import GameManager from "../../manager/GameManager";
import EventManager from "../../core/event/EventManager";
import { EventName } from "../../common/EventName";

export class JobModel extends ModelBase {
    public static get Instance(): JobModel {
        return this.getInstance<JobModel>();
    }

    private _working: {id: string, startTime: string} = null;
    get working() {
        return this._working;
    }
    set working(v: {id: string, startTime: string}) {
        this._working = v;
    }

    private _jobCfg: any = null;
    private _jobCfgList: Array<{
        id: string,
        cfg: IPetJobEntity,
    }> = null;
    get jobCfgList() {
        if (LocalUtils.isNil(this._jobCfgList)) {
            this._jobCfgList = [];
            for (let id in this._jobCfg) {
                this._jobCfgList.push({
                    id: id,
                    cfg: this._jobCfg[id] as IPetJobEntity,
                });
            }
        }
        return this._jobCfgList;
    }

    protected init() {
        this._jobCfg = ConfigManager.Instance.getConfigByName('petJob');
        this._jobCfgList = null;
    }

    public listenJobWorking() {
        if (LocalUtils.isNil(this.working)) return;

        const cfg = this._jobCfg[this.working.id];
        const curTime = Number(GameManager.Instance.serverTime);
        if (curTime - Number(this._working.startTime) >= cfg.minutes * 60000) {
            const jobId = this.working.id;
            this.working = null;
            GameManager.Instance.money += cfg.money;

            EventManager.Instance.emit(EventName.E_JOB_COMPLETED, jobId);
        }
    }

    public getJobWorkingProgress(id: string) {
        if (LocalUtils.isNil(this.working)) return 0;
        if (id !== this.working.id) return 0;
        const cfg = this._jobCfg[this.working.id];
        const curTime = Number(GameManager.Instance.serverTime);
        return Math.max(0, (curTime - Number(this.working.startTime)) * (1 / (cfg.minutes * 60000)));
    }
}


