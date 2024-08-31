import { Asset, Component, _decorator } from "cc";
import ResManager from "../../manager/ResManager";



const { ccclass } = _decorator;

/**
 * 资源引用类
 * 1. 提供加载功能，并记录加载过的资源
 * 2. 在node释放时自动清理加载过的资源
 * 3. 支持手动添加记录
 */

@ccclass
export class ResRef extends Component {
    //缓存资源
    private resCache = new Set<Asset>();

    /**
    * 缓存资源
    * @param asset 资源
    */
    public cacheAsset(asset: Asset) {
        if (!this.resCache.has(asset)) {
            asset.addRef();
            this.resCache.add(asset);
        }
    }

    /**
      * 组件销毁时自动释放所有keep的资源
      */
    public onDestroy() {
        this.releaseAssets();
    }

    /**
     * 释放资源，组件销毁时自动调用
     */
    public releaseAssets() {
        this.resCache.forEach(asset => {
            ResManager.Instance.removeCache(asset);
        });
        this.resCache.clear();
    }

    /**
     * 释放多余资源
     */
    public releaseExcessAssets(spriteFrameName:string) {
        let len = this.resCache.size;
        if (len > 1) {
            for (let asset of this.resCache) {
                if (asset && (asset.name != spriteFrameName)) {
                    ResManager.Instance.removeCache(asset);
                    this.resCache.delete(asset);
                }
            }
        }
    }
}