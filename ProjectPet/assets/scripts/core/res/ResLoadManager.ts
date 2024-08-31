import { Asset, AssetManager, AudioClip, BufferAsset, Constructor, JsonAsset, Prefab, TextAsset, __private, assetManager, error, js, resources } from "cc";
import { Singleton } from "../common/Singleton";
import Logger from "../utils/Logger";

export type ProgressCallback = (finished: number, total: number, item: AssetManager.RequestItem | number) => void;
export type CompleteCallback<T = any> = (err: Error | null, data: any) => void;//(err: Error | null, data: T[]) => void

export type IRemoteOptions = {
    [k: string]: any;
    ext?: string;
};
export type AssetType<T = Asset> = Constructor<T>;

interface ILoadResArgs<T extends Asset> {
    bundle?: string;
    dir?: string;
    paths: string | string[];
    type: AssetType<T> | null;
    onProgress: ProgressCallback | null;
    onComplete: CompleteCallback<T> | null;
}

interface IPreloadResArgs {
    bundle?: string;
    dir?: string;
    paths: string | string[];
    type: AssetType | null;
    onProgress: ProgressCallback | null;
    onComplete: CompleteCallback | null;
}

export default class ResLoadManager extends Singleton {
    public static get Instance(): ResLoadManager {
        return this.getInstance<ResLoadManager>();
    }

     /**
     * 加载资源包
     * @param url       资源地址
     * @param complete  完成事件
     * @param v         资源MD5版本号
     */
    public loadBundle(url: string, v?: string) {
        return new Promise<AssetManager.Bundle>((resolve, reject) => {
            assetManager.loadBundle(url, { version: v }, (err, bundle: AssetManager.Bundle) => {
                if (err) {
                    return error(err);
                }
                resolve(bundle);
            });
        });
    }

    public parseLoadResArgs<T extends Asset>(
        paths: string | string[],
        type?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onProgress?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onComplete?: ProgressCallback | CompleteCallback | null
    ) {
        let pathsOut: any = paths;
        let typeOut: any = type;
        let onProgressOut: any = onProgress;
        let onCompleteOut: any = onComplete;
        if (onComplete === undefined) {
            const isValidType = js.isChildClassOf(type as AssetType, Asset);
            if (onProgress) {
                onCompleteOut = onProgress as CompleteCallback;
                if (isValidType) {
                    onProgressOut = null;
                }
            } else if (onProgress === undefined && !isValidType) {
                onCompleteOut = type as CompleteCallback;
                onProgressOut = null;
                typeOut = null;
            }
            if (onProgress !== undefined && !isValidType) {
                onProgressOut = type as ProgressCallback;
                typeOut = null;
            }
        }
        return { paths: pathsOut, type: typeOut, onProgress: onProgressOut, onComplete: onCompleteOut };
    }

    /**
     * 预加载资源
     * @param bundleName 
     * @param paths 
     * @param type 
     * @param onProgress 
     * @param onComplete 
     */
    public preload(bundleName: string, paths: string | string[], type: AssetType | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<any[]> | null): void;
    public preload(bundleName: string, paths: string | string[], onProgress: ProgressCallback | null, onComplete: CompleteCallback<any[]> | null): void;
    public preload(bundleName: string, paths: string | string[], onComplete?: CompleteCallback<any[]> | null): void;
    public preload(bundleName: string, paths: string | string[], type: AssetType | null, onComplete?: CompleteCallback<any[]> | null): void;
    public preload(bundleName: string,
        paths: string | string[],
        type?: AssetType | ProgressCallback | CompleteCallback | null,
        onProgress?: ProgressCallback | CompleteCallback | null,
        onComplete?: CompleteCallback | null): void {
        let args: IPreloadResArgs = this.parseLoadResArgs(paths, type, onProgress, onComplete);
        args.bundle = bundleName;
        if (assetManager.bundles.has(bundleName)) {
            let bundle = assetManager.bundles.get(args.bundle);
            bundle.preload(args.paths, args.type, args.onProgress, args.onComplete);
        } else {
            // 自动加载bundle
            assetManager.loadBundle(bundleName, (err, bundle) => {
                if (!err) {
                    bundle.preload(args.paths, args.type, args.onProgress, args.onComplete);
                }
            })
        }
    }

    public load<T extends Asset>(bundleName: string, paths: string | string[], type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends Asset>(bundleName: string, paths: string | string[], onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends Asset>(bundleName: string, paths: string | string[], onComplete?: CompleteCallback<T> | null): void;
    public load<T extends Asset>(bundleName: string, paths: string | string[], type: AssetType<T> | null, onComplete?: CompleteCallback<T> | null): void;
    public load<T extends Asset>(paths: string | string[], type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends Asset>(paths: string | string[], onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends Asset>(paths: string | string[], onComplete?: CompleteCallback<T> | null): void;
    public load<T extends Asset>(paths: string | string[], type: AssetType<T> | null, onComplete?: CompleteCallback<T> | null): void;
    public load<T extends Asset>(
        bundleName: string,
        paths?: string | string[] | AssetType<T> | ProgressCallback | CompleteCallback | null,
        type?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onProgress?: ProgressCallback | CompleteCallback | null,
        onComplete?: CompleteCallback | null,
    ) {
        let args: ILoadResArgs<T> | null = null;
        if (typeof paths === "string" || paths instanceof Array) {
            args = this.parseLoadResArgs(paths, type, onProgress, onComplete);
            args.bundle = bundleName;
        } else {
            args = this.parseLoadResArgs(bundleName, paths, type, onProgress);
        }
        this.loadByArgs(args);
    }

    public preloadDir(bundleName: string, dir: string, type: AssetType | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<any[]> | null): void;
    public preloadDir(bundleName: string, dir: string, onProgress: ProgressCallback | null, onComplete: CompleteCallback<any[]> | null): void;
    public preloadDir(bundleName: string, dir: string, onComplete?: CompleteCallback<any[]> | null): void;
    public preloadDir(bundleName: string, dir: string, type: AssetType | null, onComplete?: CompleteCallback<any[]> | null): void;
    public preloadDir(
        bundleName: string,
        dir?: string | AssetType | ProgressCallback | CompleteCallback | null,
        type?: AssetType | ProgressCallback | CompleteCallback | null,
        onProgress?: ProgressCallback | CompleteCallback | null,
        onComplete?: CompleteCallback | null,
    ) {
        let args: IPreloadResArgs = this.parseLoadResArgs(dir as string, type, onProgress, onComplete);
        args.bundle = bundleName;
        args.dir = args.paths as string;
        if (assetManager.bundles.has(bundleName)) {
            let bundle = assetManager.bundles.get(args.bundle);
            bundle.preloadDir(args.dir, args.type, args.onProgress, args.onComplete);
        } else {
            // 自动加载bundle
            assetManager.loadBundle(bundleName, (err, bundle) => {
                if (!err) {
                    bundle.preloadDir(args.dir, args.type, args.onProgress, args.onComplete);
                }
            })
        }
    }

    public loadDir<T extends Asset>(bundleName: string, dir: string, type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(bundleName: string, dir: string, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(bundleName: string, dir: string, onComplete?: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(bundleName: string, dir: string, type: AssetType<T> | null, onComplete?: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(dir: string, type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(dir: string, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(dir: string, onComplete?: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(dir: string, type: AssetType<T> | null, onComplete?: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(
        bundleName: string,
        dir?: string | AssetType<T> | ProgressCallback | CompleteCallback | null,
        type?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onProgress?: ProgressCallback | CompleteCallback | null,
        onComplete?: CompleteCallback | null,
    ) {
        let args: ILoadResArgs<T> | null = null;
        if (typeof dir === "string") {
            args = this.parseLoadResArgs(dir, type, onProgress, onComplete);
            args.bundle = bundleName;
        }
        else {
            args = this.parseLoadResArgs(bundleName, dir, type, onProgress);
        }
        args.dir = args.paths as string;
        this.loadByArgs(args);
    }

    public loadRemote<T extends Asset>(url: string, options: IRemoteOptions | null, onComplete?: CompleteCallback<T> | null): void;
    public loadRemote<T extends Asset>(url: string, onComplete?: CompleteCallback<T> | null): void;
    public loadRemote<T extends Asset>(url: string, ...args: any): void {
        let options: IRemoteOptions | null = null;
        let onComplete: CompleteCallback<T> | null = null;
        if (args.length == 2) {
            options = args[0];
            onComplete = args[1];
        }
        else {
            onComplete = args[0];
        }
        assetManager.loadRemote<T>(url, options, onComplete);
    }

    /** 通过资源相对路径释放资源 */
    public release(path: string, bundleName: string = "resources") {
        let bundle = assetManager.getBundle(bundleName);
        if (bundle) {
            let asset = bundle.get(path);
            if (asset) {
                assetManager.releaseAsset(asset);
                Logger.log('释放资源：'+asset['_name'])
                //this.releasePrefabtDepsRecursively(asset._uuid);
            }
        }
    }

    /** 通过相对文件夹路径删除所有文件夹中资源 */
    public releaseDir(path: string, bundleName: string = "resources") {
        let bundle: AssetManager.Bundle | null = assetManager.getBundle(bundleName);
        let infos = bundle?.getDirWithPath(path);
        infos?.map((info) => {
            this.releasePrefabtDepsRecursively(info.uuid);
        });

        if (path == "" && bundleName != "resources" && bundle) {
            assetManager.removeBundle(bundle);
        }
    }

    /** 释放预制依赖资源 */
    private releasePrefabtDepsRecursively(uuid: string) {
        let asset = assetManager.assets.get(uuid)!;
        if (asset instanceof Prefab) {
            let uuids: string[] = assetManager.dependUtil.getDepsRecursively(uuid)!;
            uuids.forEach(uuid => {
                assetManager.assets.get(uuid)!.decRef();
            });
        }
        assetManager.releaseAsset(asset);
        Logger.log('释放资源：', uuid)
    }

    /** 获取资源 */
    public get<T extends Asset>(path: string, type?: __private._types_globals__Constructor<T> | null, bundleName: string = "resources"): T | null {
        let bundle: AssetManager.Bundle | null = assetManager.getBundle(bundleName);
        if (bundle) {
            return bundle.get(path, type);
        }
        return null;
    }

    public dump() {
        assetManager.assets.forEach((value: Asset, key: string) => {
            Logger.log(value);
        })
        Logger.log(`当前资源总数:${assetManager.assets.count}`);
    }

    private loadByBundleAndArgs<T extends Asset>(bundle: AssetManager.Bundle, args: ILoadResArgs<T>): void {
        if (args.dir) {
            bundle.loadDir(args.paths as string, args.type, args.onProgress, args.onComplete);
        } else {
            if (typeof args.paths == 'string') {
                bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            } else {
                bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            }
        }
    }

    private loadByArgs<T extends Asset>(args: ILoadResArgs<T>) {
        if (args.bundle) {
            if (assetManager.bundles.has(args.bundle)) {
                let bundle = assetManager.bundles.get(args.bundle);
                this.loadByBundleAndArgs(bundle!, args);
            } else {
                // 自动加载bundle
                assetManager.loadBundle(args.bundle, (err, bundle) => {
                    if (!err) {
                        this.loadByBundleAndArgs(bundle, args);
                    }
                })
            }
        } else {
            this.loadByBundleAndArgs(resources, args);
        }
    }

    /**
     * 加载二进制文件 只能是bin结束的
     */
    public loadBinaryFile(path: string, bundleName: string, onProgress?: ProgressCallback) {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            this.load(bundleName, path, BufferAsset, onProgress, (err, res) => {
                if (err) {
                    Logger.error(err);
                    reject(null);
                    return;
                }
                Logger.log("loadBinaryFile ... ok ");

                let buffer: ArrayBuffer = res.buffer();
                this.release(path, bundleName);
                //assetManager.releaseAsset(res);
                resolve(buffer);
            });
        });
    }

    /**
     * 加载音频
     * @param path 
     * @returns 
     */
    public loadAudioClip(path: string, bundleName: string = "resources") {
        return new Promise<AudioClip>((resolve, reject) => {
            this.load(bundleName, 'sounds/' + path, AudioClip, (err: Error | null, data: AudioClip) => {
                if (err) {
                    Logger.error(err);
                    reject(null);
                }
                resolve(data);
            });
        });
    }

    /**
     * 加载json文件
     */
    public loadJson(path: string, bundleName: string = "resources") {
        return new Promise<JsonAsset>((resolve, reject) => {
            this.load(bundleName, path, JsonAsset, (err: Error | null, data: JsonAsset) => {
                if (err) {
                    Logger.error(err);
                    return reject(null);
                }
                return resolve(data);
                //this.release(path, bundleName);//赋值完成后手动释放资源
            });
        });
    }

     /**
     * 加载text文件
     */
     public loadText(path: string, bundleName: string) {
        return new Promise<TextAsset>((resolve, reject) => {
            this.load(bundleName, path, TextAsset, (err: Error | null, data: TextAsset) => {
                if (err) {
                    Logger.error(err);
                    return reject(null);
                }
                return resolve(data);
                //this.release(path, bundleName);//赋值完成后手动释放资源
            });
        });
    }

    /**
     * 加载预制体
     * @param path 
     * @param bundleName 
     * @param onProgress 
     * @param onComplete 
     * @returns 
     */
    public loadPrefab(path: string, bundleName: string, onProgress: any = null, onComplete: any = null) {
        return new Promise<number>((resolve, reject) => {
            this.load(bundleName, path, Prefab, onProgress, (err: Error | null, prefab: Prefab) => {
                if (err) {
                    Logger.error(err);
                    reject(0);
                    return;
                }
                if (prefab && prefab.isValid) {
                    prefab['_path'] = path;
                    if (onComplete) {
                        onComplete();
                    }
                }
                resolve(1);
            });
        });
    }

    public loadFont(path: string, bundleName: string, onProgress: any = null, onComplete: any = null) {
        return new Promise((resolve, reject) => {
            this.load(bundleName, )
        })
    }
}


