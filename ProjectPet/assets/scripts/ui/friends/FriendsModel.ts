import { EventName } from "../../common/EventName";
import EventManager from "../../core/event/EventManager";
import ModelBase from "../../core/mvc/ModelBase";

export class FriendsModel extends ModelBase {
    public static get Instance(): FriendsModel {
        return this.getInstance<FriendsModel>();
    }

    public testList = [
        "PLAYER_0",
        "PLAYER_1",
        "PLAYER_2",
        "PLAYER_3",
        "PLAYER_4",
        "PLAYER_5",
        "PLAYER_6",
        "PLAYER_7",
        "PLAYER_8",
        "PLAYER_9",
        "PLAYER_10",
        "PLAYER_11",
        "PLAYER_12",
        "PLAYER_13",
        "PLAYER_14",
        "PLAYER_15",
    ];

    public testApplyList = [
        "APPLY_PLAYER_0",
        "APPLY_PLAYER_1",
        "APPLY_PLAYER_2",
        "APPLY_PLAYER_3",
        "APPLY_PLAYER_4",
        "APPLY_PLAYER_5",
        "APPLY_PLAYER_6",
        "APPLY_PLAYER_7",
        "APPLY_PLAYER_8",
        "APPLY_PLAYER_9",
    ];

    public testFunc(data: any) {
        const findIdx = FriendsModel.Instance.testApplyList.findIndex(d => d === data);
        if (findIdx >= 0) {
            FriendsModel.Instance.testApplyList.splice(findIdx, 1);
            EventManager.Instance.emit(EventName.E_FRIENDS_APPLY_LIST_CHANGED);
        }
        const findIdx2 = FriendsModel.Instance.testList.findIndex(d => d === data);
        if (findIdx2 < 0) {
            FriendsModel.Instance.testList.push(data);
            EventManager.Instance.emit(EventName.E_FRIENDS_LIST_CHANGED);
        }
    }
}


