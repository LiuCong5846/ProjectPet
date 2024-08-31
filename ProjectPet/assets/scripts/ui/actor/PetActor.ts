import { _decorator, Component, Node, sp, EventTouch, v3, UITransform, Vec2, Vec3, v2, Tween, tween, Label } from 'cc';
import { PetActorController } from './PetActorController';
import { EPetActorPart, EPetActorSpineAnimName, EPetStatus, EPlayerPropety } from '../../common/Types';
import LocalUtils from '../../tools/LocalUtils';
import { HomeControl } from '../home/HomeControl';
import TimerManager from '../../core/timer/TimerManager';
import Logger from '../../core/utils/Logger';
import GameManager from '../../manager/GameManager';
import MathUtil from '../../core/utils/MathUtil';
const { ccclass, property } = _decorator;

@ccclass('PetActor')
export class PetActor extends Component {
    @property([sp.Skeleton])
    public skelArray: Array<sp.Skeleton> = [];

    @property([Node])
    public partNodeArray: Array<Node> = [];

    @property(Node)
    public dirNode: Node  = null;

    @property(Node)
    public scaleNode: Node =  null;

    @property(Label)
    public talkLab: Label = null;

    private petTouchMovePosyRange = [-100, 300];
    private petTouchMovePosxRange = [-400, 400];

    private _touchStartLocCache: Vec2 = null;
    private _isPickUp: boolean = false;
    private _isFalldown: boolean = false;
    private _sensitivity: number = 10;

    private _touchMoveTw: Tween<Node> = null;
    private _fallTw: Tween<Node> = null;
    private clearTouchMoveTw() {
        if (!LocalUtils.isNil(this._touchMoveTw)) {
            this._touchMoveTw.stop();
            // this._isFalldown && (this._isFalldown = false);
        }
        this._touchMoveTw = null;
    }
    private clearFallTw() {
        if (!LocalUtils.isNil(this._fallTw)) {
            this._fallTw.stop();
        }
        this._fallTw = null;
    }

    private _talkTw: Tween<Node> = null;
    private stopTalkTw() {
        if (!LocalUtils.isNil(this._talkTw)) {
            this._talkTw.stop();
            this._talkTw = null;
        }
        this.talkLab.node.scale = v3(0, 0, 0);
        this.talkLab.node.position = v3(0, 200, 0);
        this.talkLab.string = "";
    }
    private playTalkTw(talkTxt: string) {
        if (LocalUtils.isNil(talkTxt) || talkTxt === "") return;
        // this.stopTalkTw();
        if (!LocalUtils.isNil(this._talkTw)) return;
        this.talkLab.string = talkTxt;
        this._talkTw = tween(this.talkLab.node)
                        .to(0.3, {position: v3(0, 230, 0), scale: v3(1, 1, 1)})
                        .delay(2.5)
                        .to(0.1, {position: v3(0, 200, 0), scale: v3(0, 0, 0)})
                        .call(() => this.stopTalkTw())
                        .start();
    }

    public petStaues: EPetStatus = null;
    public resetPetStatus() {
        this.petStaues = PetActorController.Instance.getPetStatus();
    }

    protected onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.onNodeTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onNodeTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onNodeTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onNodeTouchCancel, this);

        this.clearTouchMoveTw();
        this.stopTalkTw();
    }

    protected onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onNodeTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onNodeTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.onNodeTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onNodeTouchCancel, this);
    }

    public setActorSpine(petName: string) {
        const skelMap = PetActorController.Instance.petSkelDataMap.get(petName);
        if (LocalUtils.isNil(skelMap)) {
            Logger.error(`setActorSpine_${petName}_error`);
            return;
        }
        this.skelArray[0].skeletonData = skelMap.get(EPetActorPart.BODY);
    }

    public playPetActorSpine(animNme: EPetActorSpineAnimName, callback: Function = null, isLoop: boolean = true) {
        this.skelArray.forEach(skel => {
            skel.clearTracks();
            skel.setToSetupPose();
            // skel.setSkin("pifu0"); // TODO 做到换肤系统这里要改
            skel.setAnimation(0, animNme, isLoop);
            skel.setCompleteListener(() => {
                skel.setCompleteListener(null);
                (!isLoop && !LocalUtils.isNil(callback)) && callback();
            });
        })
    }

    public onNodeTouchStart(evt: EventTouch) {
        if (this._isFalldown) return;
        HomeControl.Instance.pickUpPet(this);
        this._touchStartLocCache = evt.getUILocation();
        this._isPickUp = false;
    }

    public onNodeTouchMove(evt: EventTouch) {
        if (this._isFalldown) return;
        if (LocalUtils.isNil(this._touchStartLocCache)) return;
        this.clearTouchMoveTw();
        if (!this._isPickUp) {
            let touchPos = evt.getUILocation();
            if (Vec2.distance(touchPos, this._touchStartLocCache) > this._sensitivity) {
                this._isPickUp = true;
                HomeControl.Instance.offPetActivte(this);
                this.playPetActorSpine(EPetActorSpineAnimName.DOWN);
            }
        }
        if (this._isPickUp) {
            const dir = evt.getDelta();
            const tmpPos = this.node.position.clone();

            let nextPos = tmpPos.add(v3(dir.x, dir.y, 0));

            const stage = this.node.parent;
            if (!LocalUtils.isNil(stage)) {
                let touchPos = evt.getUILocation();
                nextPos = stage.getComponent(UITransform).convertToNodeSpaceAR(v3(touchPos.x, touchPos.y, 0));
            }

            // nextPos.x = Math.max(this.petTouchMovePosxRange[0], Math.min(this.petTouchMovePosxRange[1], nextPos.x));
            // nextPos.y = Math.max(this.petTouchMovePosyRange[0], Math.min(this.petTouchMovePosyRange[1], nextPos.y));
            nextPos = nextPos.add(v3(0, -225, 0));

            // this._touchMoveTw = tween(this.node)
            //                     .to(0.1, {position: nextPos})
            //                     .call(() => {
            //                         this.node.setPosition(nextPos);
            //                         this.clearTouchMoveTw();
            //                     })
            //                     .start();
            this.node.setPosition(nextPos);
        }
       
    }

    public onNodeTouchEnd(evt: EventTouch) {
        if (this._isFalldown) return;
        this.endNodeTouch(evt);
    }

    public onNodeTouchCancel(evt: EventTouch) {
        if (this._isFalldown) return;
        this.endNodeTouch(evt);
    }

    private endNodeTouch(evt: EventTouch) {
        if (this._isPickUp) {
            this._isFalldown = true;
            this.clearFallTw();
            HomeControl.Instance.offPetActivte(this);
            let pos = this.node.position.clone();
            pos.x = Math.max(this.petTouchMovePosxRange[0], Math.min(this.petTouchMovePosxRange[1], pos.x));
            this.clearTouchMoveTw();

            const isOut = pos.y < this.petTouchMovePosyRange[0];
            isOut && (pos.y = Math.min(this.petTouchMovePosyRange[1], Math.max(this.petTouchMovePosyRange[0], pos.y)));
            
            const curPetY = this.node.position.y;
            const canFall = curPetY >= 0;
            if (canFall) {
                const stage = HomeControl.Instance.getPetStage();
                const hht = stage.getComponent(UITransform).height;
                let putDownY = canFall ? MathUtil.random(0, curPetY) - hht / 2 : - hht / 2;

                this._fallTw = tween(this.node)
                                .to(1, {position: v3(this.node.position.x, putDownY, 0)}, {easing: 'cubicIn'});
            }

            this._touchMoveTw = tween(this.node)
                    .to(isOut ? 0.1 : 0, {position: pos})
                    .call(() => {
                        isOut && this.node.setPosition(pos);
                        !LocalUtils.isNil(this._fallTw) && this._fallTw.start();
                    })
                    .delay(canFall ? 1 : 0)
                    .call(() => {
                        this._isFalldown = false;
                        this.clearTouchMoveTw();
                        this.clearFallTw();
                        HomeControl.Instance.onPetActivte(this);
                    })
                    .start();
        } else {
            let pos1 = evt.getUILocation();
            let pos2 = this.node.getComponent(UITransform).convertToNodeSpaceAR(v3(pos1.x, pos1.y, 0));
            // Logger.log("pos1: ", pos1);
            // Logger.log("pos2: ", pos2);
            this.partNodeArray.forEach((n, i) => {
                const boundingBox = n.getComponent(UITransform).getBoundingBox();
                if (boundingBox.contains(v2(pos2.x, pos2.y))) {
                    Logger.log(`Touching child node:${n.name}`);
                    this.onPartNodeTouched(i);
                    return;
                }
            });
            // this.playPetActorSpine(EPetActorSpineAnimName.BEHIT, () => {
            //     this.playPetActorSpine(EPetActorSpineAnimName.IDLE);
            //     HomeControl.Instance.onPetActivte(this);
            // }, false);
        }
        this._touchStartLocCache = null;
        this._isPickUp = false;
    }

    private onPartNodeTouched(idx: number) {
        // TODO DEMO
        const isHealth = this.petStaues === EPetStatus.HEALTH;
        let talkTxt = ""
        switch (idx) {
            case 0: // head
                talkTxt = isHealth ? "摸摸头,吓不着~" : "你干嘛~";
                break;
            case 1: // body
                talkTxt = isHealth ? "好舒服~" : "别碰我~";
                break;
            case 2: // hands
            case 3:
                talkTxt = isHealth ? "你好呀~我的朋友~" : "哼~不想理你~";
                break;
            case 4: // feet
            case 5:
                talkTxt = isHealth ? "啦啦啦啦~" : "讨厌~别烦我~";
                break;
        }
        this.playTalkTw(talkTxt);
    }
    
}


