import { AssetManager, director, game, instantiate, Node } from 'cc';
import ResManager from '../../manager/ResManager';
import { Singleton } from '../common/Singleton';
import ViewBase from './ViewBase';
import UIManager from '../ui/UIManager';
import LocalUtils from '../../tools/LocalUtils';
import Logger from '../utils/Logger';
import GameManager from '../../manager/GameManager';
import ResLoadManager from '../res/ResLoadManager';


export default class ControlBase extends Singleton {
    protected prefabPath = "";
    protected viewBase: any;
    protected parentNode: Node;

    protected resDir: Array<string> = [];

    public async openPanel<T>(args?: any, layer?: Node) {
        if (!LocalUtils.isNil(layer)) {
            this.parentNode = layer;
        }
        GameManager.Instance.onBlockInputLayer(this.prefabPath);
        await Promise.allSettled([
            this.loadResDir(),
            this.preloadComps(),
        ]);
        this.viewBase = (await UIManager.Instance.openUI(this.parentNode, this.prefabPath, args)) as T;
        !LocalUtils.isNil(this.viewBase) && this.viewBase.onShow();
        this.registEvents();
        GameManager.Instance.offBlockInputLayer(this.prefabPath);
    }

    public async closePanel() {
        if (LocalUtils.isNil(this.viewBase)) {
            Logger.log(`${this.prefabPath} get viewbase failed`);
            return;
        }
        GameManager.Instance.onBlockInputLayer(this.prefabPath);
        this.releaseEvents();
        await UIManager.Instance.closeUI(this.parentNode, this.prefabPath);
        this.releaseComps();
        this.releaseResDir();
        GameManager.Instance.offBlockInputLayer(this.prefabPath);
    }

    protected async loadResDir() {
        if (this.resDir.length <= 0) return;
        let fn = [];
        this.resDir.forEach(path => {
            fn.push(UIManager.Instance.preloadResDir(path));
        });
        await Promise.allSettled(fn);
    }

    protected releaseResDir() {
        if (this.resDir.length <= 0) return;
        this.resDir.forEach(path => UIManager.Instance.releaseResDir(path));
    }

    // 界面打开之前的相关加载
    protected async preloadComps() {

    }

    // 界面关闭后释放相关加载
    protected releaseComps() {

    }

    // 消息注册
    protected registEvents() {

    }

    protected releaseEvents() {

    }
}

