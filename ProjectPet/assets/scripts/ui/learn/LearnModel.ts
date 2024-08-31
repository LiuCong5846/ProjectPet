import { IPetSchoolEntity } from "../../config/PetSchoolEntity";
import { EPetSchoolType } from "../../common/Types";
import ModelBase from "../../core/mvc/ModelBase";
import ConfigManager from "../../core/config/ConfigManager";
import LocalUtils from "../../tools/LocalUtils";
import GameManager from "../../manager/GameManager";
import EventManager from "../../core/event/EventManager";
import { EventName } from "../../common/EventName";

export class LearnModel extends ModelBase {
    public static get Instance(): LearnModel {
        return this.getInstance<LearnModel>();
    }

    private _education: EPetSchoolType = EPetSchoolType.PRIMARY;
    get education() {
        return this._education;
    }
    set education(v: any) {
        this._education = v;
    }

    private _schoolCfg: any = null;
    private _schoolMap: Map<EPetSchoolType, Map<string, IPetSchoolEntity>> = new Map();
    private _learnedSubjects: Array<string> = [];
    private _learningSubjects: Map<string, string> = new Map();
    public learnSubject(subjectId: string, startTime: string) {
        this._learningSubjects.set(subjectId, startTime);
    }
    public checkIsLearning(subjectId: string) {
        return this._learningSubjects.has(subjectId)
    }

    protected init() {
        this._schoolMap.clear();
        this._learnedSubjects = [];
        this._learningSubjects.clear();

        this._schoolCfg = ConfigManager.Instance.getConfigByName('petSchool');
        for (let subJectId in this._schoolCfg) {
            const e = this._schoolCfg[subJectId] as IPetSchoolEntity;
            const schoolType = e.type as EPetSchoolType;
            let map = this._schoolMap.get(schoolType);
            if (LocalUtils.isNil(map)) {
                map = new Map();
                this._schoolMap.set(schoolType, map);
            }
            map.set(subJectId, e);
        }
    }

    public listenLearningSubjects() {
        const curTime = Number(GameManager.Instance.serverTime);

        this._learningSubjects.forEach((startTime, subjectId) => {
            const cfg = this._schoolCfg[subjectId];
            if (curTime - Number(startTime) >= (cfg.minutes * 60000)) {
                if (this._learnedSubjects.findIndex(id => id === subjectId) < 0) {
                    this._learnedSubjects.push(subjectId);
                    this._learningSubjects.delete(subjectId);

                    EventManager.Instance.emit(EventName.E_SUBJECT_LEARNED, subjectId);
                }
            }
        });
    }

    public convertSchoolTypeDesc(tp: EPetSchoolType) {
        switch (tp) {
            case EPetSchoolType.PRIMARY:
                return "小学";
            case EPetSchoolType.MIDDLE:
                return "中学";
            case EPetSchoolType.UNIVERSITY:
                return "大学";
        }
    }

    public getShoolCfg(subjectId: string) {
        return this._schoolCfg[subjectId] as IPetSchoolEntity
    }
    
    public getSchoolList() {
        return Array.from(this._schoolMap.entries());
    }

    public getSchoolProgressParams(sTp: EPetSchoolType) {
        const learned = this._learnedSubjects.filter(sId => {
            const cfg = this.getShoolCfg(sId);
            return sTp === cfg.type;
        });
        const map = this._schoolMap.get(sTp);
        return [learned.length, map.size];
    }

    public getSubjectProgress(subjectId: string) {
        const curTime = Number(GameManager.Instance.serverTime);
        const cfg = this.getShoolCfg(subjectId);
        const startTime = this._learningSubjects.get(subjectId);
        if (!LocalUtils.isNil(startTime)) {
            return Math.max(0, curTime - Number(startTime)) * (1 / (cfg.minutes * 60000));
        }

        const findIdx = this._learnedSubjects.findIndex(sId => sId === subjectId);
        if (findIdx >= 0) {
            return 1;
        } else {
            return 0;
        }
    }

    public checkSubjectsLearned(subiectIds: Array<string>) {
        let result: boolean = true;
        for (let i = 0; i < subiectIds.length; i ++) {
            const _sId = subiectIds[i];
            if (this._learnedSubjects.findIndex(sId => sId === _sId) < 0) {
                result = false;
                break;
            }
        }

        return result;
    }
}


