import { AnimationClip, Asset, EffectAsset, Material, Node, ParticleAsset, Prefab, SpriteAtlas, SpriteFrame, TTFFont, assetManager, instantiate, sp } from "cc";
import GameConfig from "../GameConfig";
import { Singleton } from "../core/common/Singleton";
import ConfigManager from "../core/config/ConfigManager";
import ResLoadManager, { AssetType, ProgressCallback } from "../core/res/ResLoadManager";
import Logger from "../core/utils/Logger";
import { WECHAT } from "cc/env";

/** 资源缓存基础数据结构 */
interface CacheData {
    asset: Asset,
    /** 资源是否需要释放 */
    release: boolean,
    /** 资源最后一次被加载的时间点（秒） */
    lastLoadTime: number,
}

/** 预制体资源缓存数据 */
interface PrefabCacheData extends CacheData {
    /** 此prefab关联的实例节点 */
    nodes?: Node[],
}

/** asset bundle路径校验 */
const BUNDLE_CHECK = "ab:";

export const MATERIAL_EFFECT_NAME_PREFIX = `../resources/`; // TODO

export default class ResManager extends Singleton {
    public static get Instance(): ResManager {
        return this.getInstance<ResManager>();
    }

    /** 节点与其关联的prefab路径 */
    private static _nodePath: Map<Node, string> = new Map();
    /** prefab资源与路径 */
    private static _prefabPath: Map<Prefab, string> = new Map();
    private static _prefabCache: Map<string, PrefabCacheData> = new Map();
    /** 资源释放的间隔时间（秒），资源超过此间隔未被load才可释放 */
    public static releaseSec: number = 0;
    private static _spriteFrameCache: Map<string, CacheData> = new Map();
    private static _spriteAtlasCache: Map<string, CacheData> = new Map();
    private static _skeletonDataCache: Map<string, CacheData> = new Map();
    private static _otherCache: Map<string, Asset> = new Map();

    private resLoader: ResLoadManager = null;

    private _RESOURCES: string;
    get RESOURCES() {
        return this._RESOURCES;
    }

    //返回一个实例化的node对象
    private m_prefabMap: Map<string, Prefab> = new Map<string, Prefab>();
    private _gameFont: Map<string, TTFFont> = new Map();//游戏字体
    private m_materialMap: Map<string, Material> = new Map();
    private m_effectAssetMap: Map<string, EffectAsset> = new Map();
    private m_particleMap: Map<string, ParticleAsset> = new Map();

    protected init(): void {
        this.resLoader = ResLoadManager.Instance;
        this._RESOURCES = 'resources';
    }

    /**
     * 加载文件
     */
    private get<T extends Asset>(path: string, type: AssetType<T>, bundleName: string = this._RESOURCES) {
        return new Promise<any>((resolve, reject) => {
            let asset = this.resLoader.get(path, type, bundleName);
            if (!asset) {
                this.resLoader.load(bundleName, path, type, (err: Error | null, data) => {
                    if (err) {
                        Logger.error(err);
                        return resolve(null);
                    }
                    return resolve(data);
                });
            } else {
                return resolve(asset);
            }
        });
    }

    public async getSpriteFrames(resName: string, path: string, bundleName: string = this._RESOURCES) {
        return await this.get(`${path}/${resName}/spriteFrame`, SpriteFrame, bundleName);
    }

     /**
     * 返回一个实例化的node对象
     * @param path prefabs需要放在prefabs文件夹下
     * @param isInstantiate 是否实例化 
     * @returns 
     */
    public async getPrefab(path: string, bundleName: string = "prefabs", isInstantiate: boolean = true) {
        let prefab = this.m_prefabMap.get(path);
        if (prefab == null || (prefab && prefab.isValid == false)) {
            return new Promise<any>((resolve, reject) => {
                this.resLoader.load(bundleName, path, Prefab, (err: Error | null, prefab: Prefab) => {
                    if (err) {
                        Logger.error(err);
                        return resolve(null);
                    }

                    let isRelease = this.isReleaseAsset(prefab._uuid);
                    if (isRelease) {
                        Logger.error('prefab资源被释放', prefab._uuid)
                        return resolve(null);
                    }
                    if (prefab && prefab.isValid) {
                        prefab['_path'] = path;
                        this.m_prefabMap.set(path, prefab);
                        if (isInstantiate) {
                            let prefabNode = instantiate(prefab);
                            return resolve(prefabNode);
                        } else {
                            return resolve(prefab);
                        }
                    } else {
                        return resolve(null);
                    }
                });
            });
        }
        if (isInstantiate) {
            let prefabNode = instantiate(prefab);
            return prefabNode;
        }
        return prefab;
    }

    // 统一放在 res/shader下维护
    public async getMaterial(matResName: string, bundleName: string, path: string): Promise<Material | null> {
        let mat: Material = this.m_materialMap.get(matResName);
        if (mat === null || mat === undefined) {
            return new Promise<Material>((resolve) => {
                this.resLoader.load(bundleName, `${path}/${matResName}`, Material, (err: Error | null, material: Material) => {
                    if (err) {
                        Logger.log(`load material [${matResName}] fail!`);
                        return resolve(null);
                    }

                    const effectName = material.effectName;
                    if (effectName.search(MATERIAL_EFFECT_NAME_PREFIX) != -1) {
                        if (!this.m_effectAssetMap.has(effectName)) {
                            this.m_effectAssetMap.set(effectName, material.effectAsset);
                        }
                    }

                    this.m_materialMap.set(matResName, material);
                    return resolve(material);
                })
            })
        }
        return mat;
    }

    // 统一放在 resources/particle 下维护
    public async getParticleAsset(particleResName: string, bundleName: string, path: string): Promise<ParticleAsset | null> {
        let par: ParticleAsset = this.m_particleMap.get(particleResName);
        if (par === null || par === undefined) {
            return new Promise<ParticleAsset>((resolve) => {
                this.resLoader.load(bundleName, `${path}/${particleResName}`, ParticleAsset, (err: Error | null, par: ParticleAsset) => {
                    if (err) {
                        Logger.log(`load particle_asset [${particleResName}] failed!`);
                        return resolve(null);
                    }

                    this.m_particleMap.set(particleResName, par);
                    return resolve(par);
                });
            });
        }
        return par;
    }

    //获得TTFFont字体
    public getFont(name: string, bundleName: string = this._RESOURCES, path: string = "font") {
        if (this._gameFont.get(name)) {
            return this._gameFont.get(name);
        }
        return new Promise<TTFFont>((resolve, reject) => {
            this.resLoader.load(bundleName, `${path}/${name}`, TTFFont, (err: any, result: TTFFont) => {
                if (err) {
                    Logger.log("getFont_ERROR", err);
                    return reject(null);
                }
                if (result) {
                    //Logger.log("getFont:" + name + " ok!");
                    if (!this._gameFont.get(name)) {
                        this._gameFont.set(name, result);
                        result.addRef();
                        Logger.log("getFontResult:" + result);
                    }
                    return resolve(this._gameFont.get(name));
                } else {
                    Logger.error("getFont ", name, " is null!");
                    return reject(null);
                }
            });
        })
    }

    // 加载 SpriteAtlas（图集），并且获取其中的一个 SpriteFrame
    // 注意 atlas 资源文件（plist）通常会和一个同名的图片文件（png）放在一个目录下, 所以需要在第二个参数指定资源类型
    public getSpriteAtlas(name: string, bundleName: string = this._RESOURCES, path: string) {
        return new Promise<SpriteAtlas>((resolve, reject) => {
            this.resLoader.load(bundleName, `${path}/` + name, SpriteAtlas, (err: any, result: SpriteAtlas) => {
                if (result) {
                    return resolve(result);
                } else {
                    Logger.error("getSpriteAtlas ", name, " is null!");
                    return reject(null);
                }
            });
        });
    }

    //返回一个AnimationClicp
    public getAnimationClicp(name: string, bundleName: string = this._RESOURCES) {
        return new Promise<AnimationClip>((resolve, reject) => {
            this.resLoader.load(bundleName, "ui/anim/" + name, AnimationClip, (err: any, result: AnimationClip) => {
                if (result) {
                    return resolve(result);
                } else {
                    Logger.error("getAnimationClicp ", name, " is null!");
                    return reject(null);
                }
            });
        });
    }

    /**
     * 返回一个spine的骨骼动画数据,如果不传入加载类型，webdesktop平台获取不到SkeletonData数据类型
     */
    public getSpine(spineName: string, path: string = "", isRef: boolean = true, bundleName: string = this._RESOURCES) {
        return new Promise<sp.SkeletonData>((resolve, reject) => {
            this.resLoader.load(bundleName, `${path}/${spineName}`, sp.SkeletonData, (err: Error | null, result: sp.SkeletonData) => {
                if (err) {
                    Logger.error(err);
                    resolve(null);
                }
                if (result instanceof sp.SkeletonData) {
                    //Logger.log("getSpine:" + spinePath + " ok!");
                    if (isRef) {
                        result.addRef();
                    }
                    result.name = spineName;
                    resolve(result);
                } else {
                    Logger.error("getSpine ", spineName, " is null!");
                    reject(null);
                }
            });
        })
    }

    /**
     * 获取prefab缓存
     * @param path 
     */
    public getPrefabCache(path: string) {
        return this.m_prefabMap.get(path);
    }

    /**
     * @deprecated
     * 加载并初始化json配置文件
     */
    public preloadConfig(onProgress?: ProgressCallback) {
        return new Promise<ArrayBuffer | number>((resolve, reject) => {
            if (WECHAT) {
                // TODO
                this.resLoader.loadBinaryFile('configs', this._RESOURCES, onProgress).then(buffer => {
                    resolve(buffer);
                    Logger.log("loadConfig ... ok ");
                })
            } else {
                this.resLoader.loadDir('configs', "json", (finished: number, total: number, item: any) => {
                    let file = item.file;
                    ConfigManager.Instance.addConfig(file._name, file.json)
                    onProgress(finished, total, item);
                }, (err, res) => {
                    if (err) {
                        Logger.error(err);
                        reject(0);
                        return;
                    }
                    Logger.log("loadConfig ... ok ");
                    resolve(1);
                });
            }
        });
    }

    /**
     * 释放资源
     * @param path 
     * @param bundleName 
     */
    public release(path: string, bundleName: string = this._RESOURCES) {
        if (path) {
            this.resLoader.release(path, bundleName);
        }
    }

    /**
     * 释放spine动画
     * @param sk 
     * @returns 
     */
    public releaseSpine(sk: sp.SkeletonData) {
        if (!sk) { return }
        sk.decRef();
        sk = null;
        /**
        if (sk.refCount <= 0) {
            assetManager.releaseAsset(sk);
            sk = null;
        } */
    }

    public releasePrefab(path: string) {
        // path = 'prefabs/' + path;
        let prefab = this.m_prefabMap.get(path);
        /**
        if (prefab) {
            prefab.decRef();
            assetManager.releaseAsset(prefab);
            prefab = null;
            this.m_prefabMap.delete(path);
        } */

        if (prefab) {
            prefab.decRef();
            if (prefab.refCount <= 0) {
                this.m_prefabMap.delete(path);
            }
            prefab = null;
        }
    }

    /**
     * 删除缓存
     * @param asset 
     */
    public removeCache(asset: Asset) {
        if (asset) {
            if (asset instanceof Prefab && (asset['_path'] == null || asset['_path'] == '')) {
                Logger.log('removePrefabCache错误' + asset._uuid);
                return;
            }
            asset.decRef();
            if (asset.refCount <= 0) {
                if (asset instanceof Prefab) {
                    this.removePrefabCache(asset['_path']);
                }
            }
            asset = null;
        }
    }

    /**
     * 删除prefab缓存
     * @param path 
     */
    public removePrefabCache(path: string) {
        if (path == null || path == '') {
            Logger.log('removePrefabCache错误' + path);
            return;
        }
        if (this.m_prefabMap.has(path)) {
            this.m_prefabMap.delete(path);
        }
    }

    /**
     * 资源是否被释放
     * @param path 
     * @param bundleName 
     */
    public isReleaseAsset(uuid: string) {
        let asset = assetManager.assets.get(uuid);
        if (asset == null) {
            return true;
        }
        return false;
    }

    public cleanCache() {
        assetManager.cacheManager.clearCache();
        //TODO 重启微信小程序
    }

// **********************************************************************

     /**
     * 尝试释放所有缓存资源
     * - 只要遵守本文件的规则注释，此接口不会导致正在被使用的资源被引擎释放，可放心使用
     */
    public static releaseAll(): void {
        let nowSec = Date.now() / 1000;
        // prefab
        this._prefabCache.forEach((cacheData, url) => {
            if (!cacheData.release || nowSec - cacheData.lastLoadTime < this.releaseSec) {
                return;
            }

            if (Array.isArray(cacheData.nodes)) {
                for (let i = cacheData.nodes.length - 1; i >= 0; i--) {
                    let node = cacheData.nodes[i];
                    if (node.isValid) {
                        continue;
                    }
                    this._nodePath.delete(node);
                    cacheData.nodes.splice(i, 1);
                }
                if (cacheData.nodes.length === 0) {
                    delete cacheData.nodes;
                }
            }

            if (!Array.isArray(cacheData.nodes)) {
                cacheData.asset.decRef();
                this._prefabPath.delete(cacheData.asset as Prefab);
                this._prefabCache.delete(url);
            }
        });
        // spriteFrame、spriteAtlas、skeletonData
        let arr = [this._spriteFrameCache, this._spriteAtlasCache, this._skeletonDataCache];
        arr.forEach((map) => {
            map.forEach((cacheData, url) => {
                if (!cacheData.release || nowSec - cacheData.lastLoadTime < this.releaseSec) {
                    return;
                }
                cacheData.asset.decRef();
                map.delete(url);
            });
        });
        // other
    }

    /**
     * 通过节点或预制查找已缓存prefab路径
     * @param target 
     */
    private static getCachePrefabUrl(target: Node | Prefab): string {
        let url = "";
        if (target instanceof Node) {
            let cur = target;
            while (cur) {
                if (cur["_prefab"] && cur["_prefab"]["root"]) {
                    url = this._nodePath.get(cur["_prefab"]["root"]) || "";
                    if (url) {
                        break;
                    }
                }
                cur = cur.parent;
            }
        } else if (target instanceof Prefab) {
            url = this._prefabPath.get(target) || "";
        }
        return url;
    }

     /**
     * 获取节点实例，并建立新节点与prefab资源的联系
     * @param original 用于实例化节点的prefab或node
     * @param related 如果original不是动态加载的prefab，则需传入与original相关联的动态加载的prefab或node，以便资源释放的管理
     * @example 
     * // 1.original为动态加载的prefab，无需传related参数
     * Res.instantiate(original)
     * 
     * // 2.aPrefab为动态加载的prefab，aNode为aPrefab的实例节点（aNode = Res.instantiate(aPrefab)），original为被aPrefab静态引用的prefab，则调用时需要用如下方式才能保证引用关系正确
     * Res.instantiate(original, aPrefab)
     * Res.instantiate(original, aNode)
     * 
     * // 3.aPrefab为动态加载的prefab，aNode为aPrefab的实例节点（aNode = Res.instantiate(aPrefab)），original为aNode的某个子节点，则如下方式均可保证引用关系正确
     * Res.instantiate(original)
     * Res.instantiate(original, aPrefab)
     * Res.instantiate(original, aNode)
     */
    public static instantiate(original: Node | Prefab, related?: Node | Prefab): Node {
        if (!original) {
            Logger.error("[Res.instantiate] original is null");
            return null;
        }

        let node = instantiate(original) as Node;
        let url = this.getCachePrefabUrl(related) || this.getCachePrefabUrl(original);
        if (url) {
            let cacheData: PrefabCacheData = this._prefabCache.get(url);
            // release为true才缓存关联节点
            if (cacheData && cacheData.release) {
                if (!Array.isArray(cacheData.nodes)) {
                    cacheData.nodes = [];
                }
                cacheData.nodes.push(node);
                this._nodePath.set(node, url);
            }
        }
        return node;
    }
    
}


