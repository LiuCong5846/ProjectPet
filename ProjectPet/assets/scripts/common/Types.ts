
/**
 * 进度加载类型
 */
export enum ProgressType {
    DATA = 1,//数据
    UI,
    COMPLETE
}

/**
 * 语言
 */
export enum LanguageType {
    ZH_CH = 'zh_CN',
    EN = 'en'
}

/**
 * 语言id
 */
export enum LanguageId {
    ZH_CN = 1,
    ENGLISH = 2
}

export enum EAdVideoType {
    NONE = 0,
}

/**
 * 语言数据
 */
export interface ILanguageData {
    id: number;
    name: string;
    type: string;
}

export interface IAdAwardVisitInfo {
    type: EAdVideoType;
}

export enum EGameLayers {
    HOME_LAYER = 0,
    PANEL_LAYER,
    POP_LAYER,
    TIP_LAYER,
    LOGIN_LAYER,
    BLOCK_LAYER,
}

export enum EPetActorSpineAnimName {
    JUMP = "jump",
    IDLE = "animation", // 待机
    DOWN = "down",
}

//#region 宠物相关配置，暂时写在这里，到时候要移放到配置表
export enum EPetActorPart {
    HEAD = "head",
    BODY = "body",
    ARM1 = "arm1",
    ARM2 = "arm2",
}

export const PET_CONFIG = {
    ["dog_2"]: {
        ["spines"]: {
            ["body"]: "actor/spine/dog_2",
        }
    }
}
//#endregion

export enum EPlayerPropety {
    GROWTH = 0,
    HUNGRY,
    CLEAN,
    HEALTH,
    MOOD,
}

export enum EFriendCellType {
    MY_FRIEND = 0,
    APPLY,
    SEARCH,
}

export interface INoticeInfo {
    titleTxt?: string;
    contentTxt?: string;
    btnTxt?: string;
    sureCallBack?: Function;
    thisArg?: any;
}

//#region 
export enum EPetStatus {
    HEALTH = 0,
    HUNGRY,
    DIRTY,
    EMO,
    SICK,
    DEATH,
    PREGNANT,
}

export enum EPetAction {
    IDLE = 0,
    WORKING,
    STUDYING,
    TRAVELING,
}

export enum EItemType {
    FOOD = 1,
    CLEAN,
    TOY,
    MEDICINE,
    OTHER,
}

export enum EItemDataType {
    HUNGER = "hunger",
    CLEAN = "clean",
    MOOD = "mood",
    HEALTH = "health",
    EXP = "exp",    
}

export enum EPetJob {
    /*搬砖*/
    WORKER = 0,
    /*保安*/
    SECURTY,
    /*文案*/
    SECRETARY,
    /*翻译*/
    TRANSLATOR,
    /*作者*/
    AUTHOR,
    /*程序员*/
    PROGRAMMER,
    /*大学教授*/
    PROFESSOR,
}

export enum EPetJobType {
    JOB_TYPE_0 = 0,
    JOB_TYPE_1,
    JOB_TYPE_2,
    JOB_TYPE_3,
    JOB_TYPE_4,
}

export enum EPetSchoolType {
    PRIMARY = 0,
    MIDDLE,
    UNIVERSITY,
}
//#endregion