import { STORAGE_KEY_AUTO_FEED, STORAGE_KEY_AUTO_LEARN, STORAGE_KEY_AUTO_WORK } from "../../common/Consts";
import ModelBase from "../../core/mvc/ModelBase";
import GameManager from "../../manager/GameManager";
import StorageManager from "../../core/storage/StorageManager";
import EventManager from "../../core/event/EventManager";
import { EventName } from "../../common/EventName";
import GameProtocolManager from "../../manager/GameProtocolManager";


export class TutelageModel extends ModelBase {
    public static get Instance(): TutelageModel {
        return this.getInstance<TutelageModel>();
    }

    public get autoFeed() {
        const result = StorageManager.Instance.getById(STORAGE_KEY_AUTO_FEED, 0, GameManager.Instance.userId);
        return !!result;
    }

    public set autoFeed(flag: boolean) {
        StorageManager.Instance.setById(STORAGE_KEY_AUTO_FEED, flag ? 1 : 0, GameManager.Instance.userId);
    }

    public get autoLearn() {
        // if (this.autoWork) {
        //     return false;
        // }
        const result = StorageManager.Instance.getById(STORAGE_KEY_AUTO_LEARN, 0, GameManager.Instance.userId);
        return !!result;
    }

    public set autoLearn(flag: boolean) {
        // if (flag && this.autoWork) {
        //     this.autoWork = false;
        // }
        StorageManager.Instance.setById(STORAGE_KEY_AUTO_LEARN, flag ? 1 : 0, GameManager.Instance.userId);
    }

    public get autoWork() {
        // if (this.autoLearn) {
        //     return false;
        // }
        const result = StorageManager.Instance.getById(STORAGE_KEY_AUTO_WORK, 0, GameManager.Instance.userId);
        return !!result;
    }

    public set autoWork(flag: boolean) {
        // if (flag && this.autoLearn) {
        //     this.autoLearn = false;
        // }
        StorageManager.Instance.setById(STORAGE_KEY_AUTO_WORK, flag ? 1 : 0, GameManager.Instance.userId);
    }

    public sendTutelage() {
        GameProtocolManager.Instance.sendTutelage(
            GameManager.Instance.tutelage,
            this.autoFeed,
            this.autoWork,
            this.autoLearn,
        );
    }
}


