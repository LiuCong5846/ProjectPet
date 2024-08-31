import { AssetManager, game, instantiate, Node } from "cc";
import ResManager from "../../manager/ResManager";
import { Singleton } from "../common/Singleton";
import ViewBase from "../mvc/ViewBase";
import ResLoadManager from "../res/ResLoadManager";
import Logger from "../utils/Logger";
import LocalUtils from "../../tools/LocalUtils";

interface IPrefabState {
    loading: boolean;
    node: Node;
    finished: Function;
}

interface IResDirState {
    loading: boolean;
}

export default class UIManager extends Singleton {
    public static get Instance(): UIManager {
        return this.getInstance<UIManager>();
    }

    private prefabState: { [path: string]: IPrefabState } = {};

    private resDirState: { [path: string]: IResDirState } = {};
    
    public async openUI(layer: Node, path: string, ...param: any[]): Promise<ViewBase> {
        let state = await this.preloadPrefabState(path);
        if (LocalUtils.isNil(state)) return null;
        let ui: ViewBase = await new Promise(async(resolve) => {
            state.finished = resolve;
            if (!state.loading) {
                let node = state.node;
                let ui = node.getComponent(ViewBase);
                if (!ui) {
                    return resolve(null);
                }
                await ui?.onOpen(...param);
                if (node.isValid) {
                    if (node.parent) {
                        node.removeFromParent();
                    }
                    node.setParent(layer);
                    state.finished(ui);
                } else {
                    state.finished(null);
                }
                state.finished = null;
            }
        });
        return ui;
    }

    public async closeUI(layer: Node, path: string) {
        // TODO 优化
        let state = this.prefabState[path];
        if (!state) {
            return;
        }
        if (!state.loading) {
            let inst = state.node;
            await inst.getComponent(ViewBase)?.onClose();
            if (inst.isChildOf(layer)) {
                inst.removeFromParent();
                inst.destroy();
            }
        }
        // TODO 优化
        ResManager.Instance.releasePrefab(path);
        delete this.prefabState[path];
    }

    public async preloadPrefabState(path: string) {
        if (!this.prefabState[path]) {
            this.prefabState[path] = { loading: true, node: null, finished: null };
            let prefab = await ResManager.Instance.getPrefab(path);
            if (!prefab) {
                return null;
            }
            this.prefabState[path].node = instantiate(prefab);
            this.prefabState[path].loading = false;
        }
        return this.prefabState[path];
    }

    public releasePrefabState(path: string) {
        if (LocalUtils.isNil(this.prefabState[path])) return;
        this.prefabState[path].node.destroy();
        ResManager.Instance.releasePrefab(path);
        delete this.prefabState[path];
    }


    public async preloadResDir(path: string) {
        const state = this.resDirState[path];
        if (!LocalUtils.isNil(state) && !state.loading) return;
        if (!this.resDirState[path]) {
            this.resDirState[path] = { loading: true };
            await new Promise((resolve, reject) => {
                ResLoadManager.Instance.preloadDir("resources", path, (finished: number, total: number, item: number | AssetManager.RequestItem) => {
                    //
                }, (err: Error, data: any) => {
                    if (err) {
                        Logger.error(`${path}_load_err: ${err}`);
                        reject(0);
                        return;
                    }
                    Logger.log(`${path}_loaded`);
                    this.resDirState[path].loading = false;
                    resolve(1);
                });
            })
        }
    }

    public releaseResDir(path: string) {
        if (LocalUtils.isNil(this.resDirState[path])) return;
        ResLoadManager.Instance.releaseDir(path, "resources");
        this.resDirState[path] = null;
    }


}


