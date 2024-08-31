import { NodePool, Prefab, instantiate, sp } from "cc";
import { Singleton } from "../../core/common/Singleton";
import { PetActor } from "./PetActor";
import ResManager from "../../manager/ResManager";
import LocalUtils from "../../tools/LocalUtils";
import { EPetActorPart, EPetStatus, EPlayerPropety, PET_CONFIG } from "../../common/Types";
import GameManager from "../../manager/GameManager";

export class PetActorController extends Singleton {
    public static get Instance(): PetActorController {
        return this.getInstance<PetActorController>();
    }

    public petArray: Array<PetActor> = [];

    public petSkelDataMap: Map<string, Map<string, sp.SkeletonData>> = new Map();

    public petNodePool: NodePool = new NodePool();

    public petPrefab: Prefab = null;

    protected init() {
        this.petArray = [];
        this.petSkelDataMap.clear();
        this.petNodePool.clear();
    }

    public async loadPetPrefab() {
        const petActorPath = "actor/PetActor";
        this.petPrefab = await this.getPetActorPrefab(petActorPath);
    }

    public async getPetActorPrefab(path: string) {
        return await ResManager.Instance.getPrefab(path);
    }

    public releasePetPrefab() {
        ResManager.Instance.releasePrefab("actor/PetActor");
    }

    public getPetNode() {
        let node = this.petNodePool.get();
        if (!LocalUtils.isNil(node)) {
            return node;
        }
        return instantiate(this.petPrefab);
    }

    public async getPetSkels(petName: string) {
        const skelMap = this.petSkelDataMap.get(petName);
        if (!LocalUtils.isNil(skelMap))  return skelMap;
        const newSkelMap = new Map();
        await Promise.allSettled([
            (async() => {
                const bodySkel = await ResManager.Instance.getSpine(PET_CONFIG[petName]["spines"][EPetActorPart.BODY]);
                newSkelMap.set(EPetActorPart.BODY, bodySkel);
            })(),
        ]);
        this.petSkelDataMap.set(petName, newSkelMap);
        return newSkelMap;
    }

    public getPetStatus() {
        // TODO DEMO
        if (GameManager.Instance.petInfo.valHunger <= 300) {
            return EPetStatus.HUNGRY;
        }
        if (GameManager.Instance.petInfo.valClean <= 300) {
            return EPetStatus.DIRTY;
        }
        if (GameManager.Instance.petInfo.valHealth <= 300) {
            return EPetStatus.SICK;
        }
        if (GameManager.Instance.petInfo.valMood <= 300) {
            return EPetStatus.EMO;
        }
        return EPetStatus.HEALTH;
    }

}


