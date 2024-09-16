import { Prefab, Node, Tween, tween, UITransform, v3 } from "cc";
import ControlBase from "../../core/mvc/ControlBase";
import ResManager from "../../manager/ResManager";
import { PetActorController } from "../actor/PetActorController";
import TimerManager from "../../core/timer/TimerManager";
import Logger from "../../core/utils/Logger";
import { PetActor } from "../actor/PetActor";
import MathUtil from "../../core/utils/MathUtil";
import { EGameLayers, EPetActorSpineAnimName, EPetStatus, EPlayerPropety } from "../../common/Types";
import { HomeView } from "./HomeView";
import EventManager from "../../core/event/EventManager";
import { EventName } from "../../common/EventName";
import GameManager from "../../manager/GameManager";
import { TutelageModel } from "../tutelage/TutelageModel";
import { HomeModel } from "./HomeModel";
import LocalUtils from "../../tools/LocalUtils";

export class HomeControl extends ControlBase {
    public static get Instance(): HomeControl {
        return this.getInstance<HomeControl>();
    }

    protected viewBase: HomeView;

    protected prefabPath: string = "home/Home";

    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.HOME_LAYER);

    public homeUtilPrefabMap: Map<string, Prefab> = new Map();

    private petCtrl: PetActorController;

    //#region 宠物状态
    private _petActivteTweenMap: Map<PetActor, Tween<Node>> = new Map();
    //#endregion

    protected init() {
        this.homeUtilPrefabMap.clear();
        this.petCtrl = PetActorController.Instance;
        this._petActivteTweenMap.clear();
    }

    public async openPanel() {
        await super.openPanel();
        //TimerManager.Instance.doLoopTimer(0, 1000, 0, this.homeTimerHandle, this);
    }

    public async closePanel() {
        //TimerManager.Instance.remove(this.homeTimerHandle, this);
        await super.closePanel();
    }

    private homeTimerHandle(dt: number) {
        // Logger.log("homeTimerHandle", dt);
        // this.viewBase.setTuteLeftTime();
        //if (GameManager.Instance.tutelage) {
            const cfg = HomeModel.Instance.getPetGrowthConfig(GameManager.Instance.age);
            if (GameManager.Instance.exp >= cfg.exp) {
                GameManager.Instance.age += 1;
            } else {
                const dis = (dt || 0) * GameManager.Instance.growthRate * (1 / 3600);
                GameManager.Instance.resetPetProp(EPlayerPropety.GROWTH, dis);
                // Logger.log("GameManager.Instance.exp", GameManager.Instance.exp);
            }
        //}
    }


    // 界面打开之前的相关加载
    protected async preloadComps() {
        await this.petCtrl.loadPetPrefab();
    }
 
    // 界面关闭后释放相关加载
    protected releaseComps() {
        this.homeUtilPrefabMap.forEach((prefab, path) => {
            ResManager.Instance.releasePrefab(path);
        });

        this.petCtrl.releasePetPrefab();
    }

    public getPetPrefab() {
        return this.petCtrl.petPrefab;
    }

    //#region 宠物活动
    public clearAllPetActive() {
        this._petActivteTweenMap.forEach((tw, pet) => tw.stop());
        this._petActivteTweenMap.clear();
    }

    public randomPetActive(pet: PetActor, finishCallBack: Function) {
        let tw = null;
        if (pet.petStaues !== EPetStatus.HEALTH) {
            const petStaues = PetActorController.Instance.getPetStatus();
            if (petStaues !== EPetStatus.HEALTH) {
                return;
            }
        }
        const rdm1 = MathUtil.random(0, 10);
        if (rdm1 >= 5) { // 不走
            let rdm2 = 0;// MathUtil.random(0, 10);
            if (rdm2 >= 5) { // 做动作
                tw = tween(pet.node)
                    .call(() => {
                        pet.playPetActorSpine(EPetActorSpineAnimName.JUMP, (() => {
                            pet.playPetActorSpine(EPetActorSpineAnimName.IDLE);
                        }).bind(this), false);
                    })
                    .delay(1)
                    .call(() => finishCallBack())
            } else { // 不做动作
                tw = tween(pet.node)
                    .call(() => pet.playPetActorSpine(EPetActorSpineAnimName.IDLE))
                    .delay(2)
                    .call(() => finishCallBack())
            }
        } else { // 走
            const targetPos = v3(this.getPetStageRandomPosX(pet), this.getPetStageRandomPosY(pet), 0);
            const curPos = pet.node.position.clone();
            const distance = Math.sqrt(Math.pow(targetPos.x - curPos.x, 2) + Math.pow(targetPos.y - curPos.y, 2));
            const speed = 65; // TODO
            const dur = Math.max(1, distance / speed);
            
            tw = tween(pet.node)
                .call(() => {
                    pet.dirNode.setScale(v3(targetPos.x < curPos.x ? 1 : -1, 1, 1));
                    pet.playPetActorSpine(EPetActorSpineAnimName.JUMP);
                })
                .to(dur, {position: targetPos})
                .call(() => pet.playPetActorSpine(EPetActorSpineAnimName.IDLE))
                .delay(1)
                .call(() => finishCallBack())
        }
        return tw;
    }

    public offPetActivte(pet: PetActor) {
        if (this._petActivteTweenMap.has(pet)) {
            this._petActivteTweenMap.get(pet).stop();
        }
        this._petActivteTweenMap.delete(pet);
    }

    public onPetActivte(pet: PetActor) {
        const petStaues = PetActorController.Instance.getPetStatus();
        if (pet.petStaues !== EPetStatus.HEALTH){
            if (petStaues !== EPetStatus.HEALTH) {
                return;
            }
        }
        this.offPetActivte(pet);
        if (pet.petStaues !== petStaues) {
            pet.resetPetStatus();
        }
        if (pet.petStaues !== EPetStatus.HEALTH) {
            pet.playPetActorSpine(EPetActorSpineAnimName.DOWN, null, false);
            return;
        }
        const tw = this.randomPetActive(pet, () => this.onPetActivte(pet));
        this._petActivteTweenMap.set(pet, tw);
        tw.start();
    }

    public resetPetActive(pet: PetActor) {
        const petStaues = PetActorController.Instance.getPetStatus();
        if (pet.petStaues === petStaues) return;
        this.offPetActivte(pet);
        this.onPetActivte(pet);
    }

    public pickUpPet(pet: PetActor) {
        this.offPetActivte(pet);
    }

    public getPetStage() {
        return this.viewBase.petStage
    }
    //#endregion

    public getPetStageRandomPosX(pet: PetActor) {
        const wth = this.viewBase.petStage.getComponent(UITransform).width;
        let utilPosX = 0;
        const curPosX = pet.node.position.x;
        if (curPosX >= 0) {
            utilPosX = curPosX + wth / 2;
            return MathUtil.random(0, utilPosX) - utilPosX / 2;
        } else {
            const distance = wth /2 - curPosX;
            utilPosX = wth / 2 + curPosX;
            return MathUtil.random(utilPosX, wth) - distance / 2;
        }
    }

    public getPetStageRandomPosY(pet: PetActor) {
        const hht = this.viewBase.petStage.getComponent(UITransform).height;
        let utilPosY = 0;
        const curPosY = pet.node.position.y;
        if (curPosY >= 0) {
            utilPosY = curPosY + hht / 2;
            return MathUtil.random(0, curPosY) - utilPosY / 2;
        } else {
            const distance = hht / 2 - curPosY;
            utilPosY = hht / 2 + curPosY;
            return MathUtil.random(utilPosY, hht) - distance / 2;
        }
    }

    protected registEvents(): void {
        EventManager.Instance.on(EventName.E_PROPERTY_VALUE_CHANGED, this.evtPropValueChanged, this);
        EventManager.Instance.on(EventName.GAME_HEART_BEAT_ONE_MINUTE, this.evtHeartBeat, this);
        EventManager.Instance.on(EventName.E_AGE_CHANGED, this.evtAgeValueChanged, this);
        EventManager.Instance.on(EventName.E_TUTELAGE_SWITCH_CHANGED, this.evtTutelageSwitchChanged, this);
        EventManager.Instance.on(EventName.E_GROWTH_RATE_CHANGED, this.evtGrowthRateChanged, this);
        EventManager.Instance.on(EventName.E_ACTION_CHANGED, this.evtActionChanged, this);
        EventManager.Instance.on(EventName.E_ACTOR_LISTEN_STATUS, this.evtListenActorStatus, this);
    }

    protected releaseEvents(): void {
        EventManager.Instance.off(EventName.E_PROPERTY_VALUE_CHANGED, this.evtPropValueChanged, this);
        EventManager.Instance.off(EventName.GAME_HEART_BEAT_ONE_MINUTE, this.evtHeartBeat, this);
        EventManager.Instance.off(EventName.E_AGE_CHANGED, this.evtAgeValueChanged, this);
        EventManager.Instance.off(EventName.E_TUTELAGE_SWITCH_CHANGED, this.evtTutelageSwitchChanged, this);
        EventManager.Instance.off(EventName.E_GROWTH_RATE_CHANGED, this.evtGrowthRateChanged, this);
        EventManager.Instance.off(EventName.E_ACTION_CHANGED, this.evtActionChanged, this);
        EventManager.Instance.off(EventName.E_ACTOR_LISTEN_STATUS, this.evtListenActorStatus, this);
    }

    private evtActionChanged() {
        this.viewBase.setPetActionLab();
    }

    private evtGrowthRateChanged() {
        this.viewBase.resetPetsGrowthRateShow();
    }

    private evtTutelageSwitchChanged() {
        this.viewBase.tutoSwitch.setSwichStatus(GameManager.Instance.tutelage); // TODO
        this.viewBase.setTuteLeftTime();
        this.viewBase.setPetActionLab();
        this.viewBase.resetPetsGrowthRateShow();
    }

    private evtListenActorStatus() {
        this.viewBase.resetPetsActive();
    }

    private evtPropValueChanged(p: EPlayerPropety) {
        this.viewBase.resetProgressBarsShow(p);
    }



    private evtHeartBeat() {
        
    }

    private evtAgeValueChanged() {
        this.viewBase.resetProgressBarsShow(0);
    }
    
}


