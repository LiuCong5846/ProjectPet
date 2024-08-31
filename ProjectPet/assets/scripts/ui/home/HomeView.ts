import { _decorator, Component, EventTouch, instantiate, Label, Node, ProgressBar, v3 } from 'cc';
import ViewBase from '../../core/mvc/ViewBase';
import { HomeDrawer } from './HomeDrawer';
import { SwitchComp } from '../../component/SwitchComp';
import { ButtonComp } from '../../component/ButtonComp';
import Logger from '../../core/utils/Logger';
import { UserTop } from '../common/UserTop';
import { SettingControl } from '../setting/SettingControl';
import GameManager from '../../manager/GameManager';
import { EGameLayers, EPetAction, EPetActorSpineAnimName, EPetStatus, EPlayerPropety, INoticeInfo } from '../../common/Types';
import { HomeModel } from './HomeModel';
import { HomeControl } from './HomeControl';
import LocalUtils from '../../tools/LocalUtils';
import { PetActor } from '../actor/PetActor';
import DateUtils from '../../core/utils/DateUtils';
import { ShopControl } from '../shop/ShopControl';
import { FriendsListControl } from '../friends/FriendsListControl';
import { JobControl } from '../job/JobControl';
import { SchoolListControl } from '../learn/SchoolListControl';
import { TutelageMainControl } from '../tutelage/TutelageMainControl';
import { NoticeAlertControl } from '../common/notice/NoticeAlertControl';
import TipManager from '../../manager/TipManager';
import { BagController } from '../bag/BagController';
const { ccclass, property } = _decorator;

@ccclass('HomeView')
export class HomeView extends ViewBase {
    @property(HomeDrawer)
    public drawer: HomeDrawer = null;

    @property(SwitchComp)
    public tutoSwitch: SwitchComp = null;

    @property(ButtonComp)
    public tutoSettingBtn: ButtonComp = null;

    @property([ButtonComp])
    public progressBtns: Array<ButtonComp> = [];

    @property([ProgressBar])
    public progressBars: Array<ProgressBar> = [];

    @property([Label])
    public progressLabs: Array<Label> = [];

    @property(Label)
    public tutoStatusLab: Label = null;

    @property(Label)
    public tutoLeftTimeLab: Label = null;

    @property(Label)
    public speedLab: Label = null;

    @property(Label)
    public petStatusLab: Label = null;

    @property(UserTop)
    public userTop: UserTop = null;

    @property([ButtonComp])
    public enterBtns: Array<ButtonComp> = [];

    @property(Node)
    public petStage: Node = null;

    private _petActors: Array<PetActor>= [];

    protected async _open(...param: any[]): Promise<void> {
        let petPrefab = HomeControl.Instance.getPetPrefab();
        this._petActors = [];
        for (let i = 0; i < HomeModel.Instance.petOwnNames.length; i ++) {
            const petName = HomeModel.Instance.petOwnNames[i];
            if (!LocalUtils.isNil(petName)) {
                const node = instantiate(petPrefab);
                node.setParent(this.petStage);
                node.setPosition(v3(0, 0, 0));
                const petActor = node.getComponent(PetActor);
                petActor.resetPetStatus();
                petActor.setActorSpine(petName);
                petActor.playPetActorSpine(petActor.petStaues !== EPetStatus.HEALTH ? EPetActorSpineAnimName.DOWN : EPetActorSpineAnimName.IDLE);
                
                this._petActors.push(petActor);
            }
        }

        this.petStatusLab.string = "";
    }

    protected _show(): void {
        this.resetPetsActive();

        this.drawer.setDrawerOpen(true);
        this.tutoSwitch.setSwichStatus(GameManager.Instance.tutelage);
        this.setTuteLabShow();
        this.tutoSettingBtn.setClickFunc(this.onTutoBtnClicked, this);
        this.tutoSwitch.setClickFunc(this.onTutoSwitchClicked, this);
        this.setTuteLeftTime();
        this.setPetActionLab();
        this.resetPetsGrowthRateShow();

        this.progressBtns.forEach((btn, i) => btn.setClickFunc(this.onProgressBtnClicked, this));
        this.enterBtns.forEach(btn => btn.setClickFunc(this.onEnterBtnClicked, this));

        this.resetProgressBarsShow();

        this.userTop.userHead.clickedFunc = (() => {
            SettingControl.Instance.openPanel();
        }).bind(this);
        this.userTop.setAgeLabShow(GameManager.Instance.age);
        this.userTop.setMoneyLabShow(GameManager.Instance.money);
    }

    public resetPetsActive() {
        this._petActors.forEach(petActor => HomeControl.Instance.onPetActivte(petActor));
    }

    private onTutoBtnClicked(evt, custom) {
        Logger.log("onTutoBtnClicked");
        TutelageMainControl.Instance.openPanel();
    }

    private onProgressBtnClicked(evt: EventTouch, custom: string) {
        // TipManager.Instance.addTipShow(custom);
        switch (custom) {
            case "hungry":
                BagController.Instance.openPanel(0);
                break;
            case "clean":
                BagController.Instance.openPanel(1);
                break;
            case "health":
                BagController.Instance.openPanel(3);
                break;
            case "mood":
                BagController.Instance.openPanel(2);
                break;
        }
    }

    private onEnterBtnClicked(evt: EventTouch, custom: any) {
        switch (custom) {
            case "family":
                Logger.log("family");
                this.testNotice();
                break;
            case "bag":
                Logger.log("bag");
                BagController.Instance.openPanel();
                break;
            case "friends":
                Logger.log("friends");
                FriendsListControl.Instance.openPanel();
                break;
            case "towen":
                Logger.log("towen");
                this.testNotice();
                break;
            case "work":
                Logger.log("work");
                JobControl.Instance.openPanel();
                break;
            case "learn":
                Logger.log("learn");
                SchoolListControl.Instance.openPanel();
                break;
            case "shop":
                Logger.log("shop");
                ShopControl.Instance.openPanel();
                break;
            case "travel":
                Logger.log("travel");
                this.testNotice();
                break;
        }
    }

    private testNotice() {
        NoticeAlertControl.Instance.openPanel(<INoticeInfo>{
            contentTxt: "敬请期待",
            thisArg: this,
            sureCallBack: () => {
                NoticeAlertControl.Instance.closePanel();
            }
        });
    }

    // 0-成长 1-饥饿 2-清洁 3-治疗 4-讨好
    public resetProgressBarsShow(p?: number) {
        if (LocalUtils.isNil(p)) {
            for (let i = 0; i < 5; i ++) {
                this.resetProgressBarShow(i);
            }
        } else {
            this.resetProgressBarShow(p);
        }
    }

    private resetProgressBarShow(p: number) {
        let cVal = 0;
        let tVal = 1;
        const cfg = HomeModel.Instance.getPetGrowthConfig(GameManager.Instance.age);
        if (LocalUtils.isNil(cfg)) {
            Logger.error(`PetGrowthCfg get cfg fail, age : ${GameManager.Instance.age}`);
        }
         // 0-成长 1-饥饿 2-清洁 3-治疗 4-讨好
        switch (p) {
            case 0:
                cVal = GameManager.Instance.petInfo.exp;
                tVal = cfg.exp;
                break;
            case 1:
                cVal = GameManager.Instance.petInfo.valHunger;
                tVal = cfg.hungry;
                break;
            case 2:
                cVal = GameManager.Instance.petInfo.valClean;
                tVal = cfg.clean;
                break;
            case 3:
                cVal = GameManager.Instance.petInfo.valHealth;
                tVal = cfg.health;
                break;
            case 4:
                cVal = GameManager.Instance.petInfo.valMood;
                tVal = cfg.mood;
                break;
        }
        

        this.setProgresShow(this.progressBars[p], this.progressLabs[p], cVal, tVal);
    }

    private setProgresShow(progressBar: ProgressBar, progressLab: Label, cnt: number, total: number) {
        progressBar.progress = Math.max(0, Math.min(1, cnt * (1 / total)));
        progressLab.string = `${Math.round(cnt)}/${total}`;
    }

    public resetPetsGrowthRateShow() {
        // if (!GameManager.Instance.tutelage) {
        //     this.speedLab.string = "";
        //     return;
        // }
        this.speedLab.string = `成长速度 ${GameManager.Instance.growthRate}/小时`;
    }

    private onTutoSwitchClicked(status: boolean) {
        Logger.log("switch_status: ", status);
        const flag = GameManager.Instance.tutelage;
        GameManager.Instance.tutelage = !flag;

        this.setTuteLabShow();
        this.setTuteLeftTime();
        this.setPetActionLab();
        this.resetPetsGrowthRateShow();
    }

    private setTuteLabShow() {
        this.tutoStatusLab.string = GameManager.Instance.tutelage ? "托管中" : "未托管";
    }

    public setTuteLeftTime() {
        if (!GameManager.Instance.tutelage) {
            this.tutoLeftTimeLab.string = "";
            return;
        }
        let left = GameManager.Instance.petInfo.nurseTime;
        this.tutoLeftTimeLab.string = `剩余: ${DateUtils.getFormatBySecond(left, 1)}`;
    }

    public setPetActionLab() {
        let actionTxt = "";
        switch (GameManager.Instance.petInfo.action) {
            case EPetAction.IDLE:
                actionTxt = "待机中";
                break;
            case EPetAction.WORKING:
                actionTxt = "工作中";
                break;
            case EPetAction.STUDYING:
                actionTxt = "学习中";
                break;
            case EPetAction.TRAVELING:
                actionTxt = "旅游中";
                break;
        }
        let timeTxt = "";
        if (GameManager.Instance.tutelage) {
            timeTxt = ` ${DateUtils.getFormatBySecond(GameManager.Instance.petInfo.nurseQueueTime, 1)}`;
        }

        this.petStatusLab.string = `状态 ${actionTxt}${timeTxt}`
    }
}


