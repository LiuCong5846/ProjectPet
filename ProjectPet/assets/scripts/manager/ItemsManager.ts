import { Sprite, SpriteFrame } from "cc";
import { EventName } from "../common/EventName";
import { EItemType, EPlayerPropety } from "../common/Types";
import { IItemsEntity } from "../config/ItemsEntity";
import { Singleton } from "../core/common/Singleton";
import ConfigManager from "../core/config/ConfigManager";
import EventManager from "../core/event/EventManager";
import Logger from "../core/utils/Logger";
import LocalUtils from "../tools/LocalUtils";
import GameManager from "./GameManager";
import ResManager from "./ResManager";

export class ItemsManager extends Singleton {
    public static get Instance(): ItemsManager {
        return this.getInstance<ItemsManager>();
    }

    private _itemsCfg: any = null;

    private _itemsTypeMap: Map<EItemType, Map<string, IItemsEntity>> = new Map();
    public getTypeItems(tp: EItemType) {
        return Array.from(this._itemsTypeMap.get(tp).entries());
    }

    private _itemSprFrameMap: Map<string, SpriteFrame> = new Map();

    private _playerItemsMap: Map<string, number> = new Map();
    get playerItemsMap() {
        return this._playerItemsMap;
    }

    protected init() {
        this._playerItemsMap.clear();
        this._itemSprFrameMap.clear();
        this._itemsTypeMap.clear();
        this._itemsCfg = ConfigManager.Instance.getConfigByName("items");
        for (let itemId in this._itemsCfg) {
            const cfg = this._itemsCfg[itemId];
            const tp = cfg.type as EItemType;
            let map = this._itemsTypeMap.get(tp);
            if (LocalUtils.isNil(map)) {
                map = new Map();
                this._itemsTypeMap.set(tp, map);
            }
            map.set(itemId, cfg);
        }
    }

    public getItemCfg(itemId: string) {
        return this._itemsCfg[itemId] as IItemsEntity;
    }

    public getPlayerItemCount(itemId: string) {
        return this._playerItemsMap.get(itemId) || 0;
    }

    public changePlayerItemCount(itemId: string, num: number) {
        let own = this._playerItemsMap.get(itemId) || 0;
        own += num;
        own = Math.max(0, own);
        this._playerItemsMap.set(itemId, own);

        EventManager.Instance.emit(EventName.E_PLAYER_ITEM_NUM_CHANGED, itemId);
    }

    public useItem(itemId: string, num: number = 1) {
        const cfg = this.getItemCfg(itemId);
        const dataJson = JSON.parse(cfg.dataType || "{}");
        Logger.log("useItem_dataJson: ", dataJson);

        for (let key in dataJson) {
            const val = dataJson[key];
            Logger.log(`datajson[${key}]: `, val);

            let prop: EPlayerPropety = null;
            switch (key) {
                case "exp":
                    prop = EPlayerPropety.GROWTH;
                    break;
                case "health":
                    prop = EPlayerPropety.HEALTH;
                    break;
                case "mood":
                    prop = EPlayerPropety.MOOD;
                    break;
                case "clean":
                    prop = EPlayerPropety.CLEAN;
                    break;
                case "hunger":
                    prop = EPlayerPropety.HUNGRY;
                    break;
            }
            GameManager.Instance.resetPetProp(prop, val * num);
        }

        EventManager.Instance.emit(EventName.E_ACTOR_LISTEN_STATUS);
    }

    public async setItemSprFrame(itemId: string, spr: Sprite) {
        if (LocalUtils.isNil(spr)) {
            return;
        }
        if (LocalUtils.isNil(itemId)) {
            !LocalUtils.isNil(spr.spriteFrame) && (spr.spriteFrame = null);
            return;
        }
        let sprFrame = this._itemSprFrameMap.get(itemId);
        if (LocalUtils.isNil(sprFrame)) {
            const cfg = this.getItemCfg(itemId);
            sprFrame = await ResManager.Instance.getSpriteFrames(cfg.resName, "common/ui/item");
            this._itemSprFrameMap.set(itemId, sprFrame);
        }
        spr.spriteFrame = sprFrame;
    }

    public getItemMaxNum(itemId: string, isShop: boolean = false) {
        if (!isShop) {
            return this.getPlayerItemCount(itemId);
        }
        const cfg = this.getItemCfg(itemId);
        const money = GameManager.Instance.money;
        return Math.floor(money * (1 / cfg.value));
    }
}

