import { instantiate, Node, NodePool, Prefab, tween, Tween, UIOpacity, v3, Vec3 } from "cc";
import { EGameLayers } from "../common/Types";
import { Singleton } from "../core/common/Singleton";
import LocalUtils from "../tools/LocalUtils";
import { TipTxt } from "../ui/common/TipTxt";
import GameManager from "./GameManager";
import ResManager from "./ResManager";

export default class TipManager extends Singleton {
    public static get Instance(): TipManager {
        return this.getInstance<TipManager>();
    }

    private _tipTxtPrefab: Prefab = null;
    private _tipTxtNodePool: NodePool = new NodePool();

    private _tipQueue: Array<string> = [];
    private _twMap: Map<Node, Array<Tween<any>>> = new Map();
    public clearTwMap() {
        this._twMap.forEach((tws, node) => {
            tws.forEach(tw => tw.stop());
            node.destroy();
        });
        this._twMap.clear();
    }

    protected init() {
        this._tipTxtPrefab = null;
        this._tipTxtNodePool.clear();
        this._tipQueue = [];
        this.clearTwMap();
    }

    private async getTipTxtNode() {
        let node = this._tipTxtNodePool.get();
        if (!LocalUtils.isNil(node)) return node;
        if (LocalUtils.isNil(this._tipTxtPrefab)) {
            this._tipTxtPrefab = await ResManager.Instance.getPrefab("common/TipTxt");
        }
        node = instantiate(this._tipTxtPrefab);
        return node;
    }

    private putTipTxtNode(node: Node) {
        this._tipTxtNodePool.put(node);
    }

    public addTipShow(txt: string) {
        const flag = this._tipQueue.length <= 0;
        this._tipQueue.push(txt);
        if (flag) {
            this.onTipShow();
        }
    }

    private async onTipShow() {
        while(this._tipQueue.length > 0) {
            const txt = this._tipQueue.shift();
            const tipNode = await this.getTipTxtNode();
            tipNode.setParent(GameManager.Instance.layerMap.get(EGameLayers.TIP_LAYER));
            tipNode.setPosition(Vec3.ZERO);
            tipNode.getComponent(UIOpacity).opacity = 255;
            tipNode.getComponent(TipTxt).setTxt(txt);

            const tw1 = tween(tipNode)
                        .delay(1.5)
                        .by(1, {position: v3(0, 150, 0)})
                        .call(() => {
                            this.putTipTxtNode(tipNode);
                            this._twMap.delete(tipNode);
                        })
            const tw2 = tween(tipNode.getComponent(UIOpacity))
                        .delay(1.5)
                        .to(0.9, {opacity: 0})
            this._twMap.set(tipNode, [tw1, tw2]);
            tw1.start();
            tw2.start();

            if (this._tipQueue.length > 0) {
                await LocalUtils.delayTime(500, this);
            }
        }
    }
}

