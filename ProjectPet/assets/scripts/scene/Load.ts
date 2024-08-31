import { _decorator, Component, director, Label, Node, ProgressBar, sys, view, Widget, JsonAsset } from 'cc';
import GameConfig from '../GameConfig';
import GameManager from '../manager/GameManager';
import { JSB, NATIVE, WECHAT } from 'cc/env';
import ResLoadManager from '../core/res/ResLoadManager';
import ResManager from '../manager/ResManager';
import Logger from '../core/utils/Logger';
import { PetActorController } from '../ui/actor/PetActorController';
import ConfigManager from '../core/config/ConfigManager';
const { ccclass, property } = _decorator;

@ccclass('Load')
export class Load extends Component {
    @property(ProgressBar)
    private progressBar: ProgressBar = null;
    @property(Label)
    private progressLab: Label = null;
    @property(Label)
    private tipLab: Label = null;

    start() {
        this.initSize();
        GameConfig.init();
        this.init();
    }

    private initSize() {
        let widget = this.node.getComponent(Widget);
        let winSize = view.getVisibleSize();
        let screenRatio = winSize.width / winSize.height;
        let designRatio = GameConfig.GAME_WIDTH / GameConfig.GAME_HEIGHT;
        let isLongScreen = screenRatio <= designRatio;
        if (!isLongScreen) {
            widget.isAlignTop = widget.isAlignBottom = true;
            widget.left = widget.right = widget.top = widget.bottom = 0;
            widget.isAlignLeft = widget.isAlignRight = sys.isMobile;//电脑防止背景拉伸全屏
        }
    }

    private async init() {
        // let data = GameManager.Instance.getCurrentLanguageData();
        // this._tipData = this.loadingLanguages[data.id];
        if (!NATIVE || !JSB || !GameConfig.isHotUpdate || WECHAT) {
            await this.startLoading();
        } else {
            // let updateBundle = await resLoader.loadBundle('update');
            // updateBundle.load('project', Asset, (err, asset) => {
            //     if (err == null) {
            //         this.manifest = asset;
            //         //检查更新
            //         this._hotUpdate = new HotUpdate(this.manifest);
            //         this._hotUpdate.init((kb: string) => {
            //             //console.log('文件大小1'+kb)
            //             this.hot.active = true;
            //             this.hotTxt.string = this._tipData.tip11 + kb + ',' + this._tipData.tip12;
            //         }, async (err: any) => {
            //             if (err == null) {
            //                 await this.startLoading();
            //             } else {
            //                 this.txtTip.string = this._tipData[err];
            //             }
            //         }, (finished: number, total: number) => {
            //             this.updateProgress(finished, total, 1, 0);
            //         });
            //         this.txtTip.string = this._tipData.tip10;
            //         this._hotUpdate.checkUpdate();
            //     }
            // })
        }
    }

    private async startLoading() {
        this.tipLab.string = "加载资源";
        this.progressLab.string = "0%";

        const stepNum = 15;
        Logger.log(`startLoading_stepNum: ${stepNum}`);
        let percent = 1 / stepNum;
        let step = 0;

         /**
         * 加载
         * resources
         * 1.font
         * 2.shader
         * 3.sounds
         * 4.config
         * 5.common
         * 6.actor
         * 7.login
         * 8.home
         * // 其余游戏内用到时加载
         * 
         * prefabs
         * 1.login
         * 2.home
         * // 其余游戏内用到时加载
         */
        await this.loadResourcesBundle(percent, step);
        
        await this.preloadRes("font", percent, step ++, ResManager.Instance.RESOURCES);
        await this.loadFont(percent, step ++);

        await this.preloadRes("shader", percent, step ++, ResManager.Instance.RESOURCES);
        await this.preloadRes("sounds", percent, step ++, ResManager.Instance.RESOURCES);
        
        await this.loadConfigBundle(percent, step ++);

        await this.preloadRes("common", percent, step ++, ResManager.Instance.RESOURCES);
        await this.preloadRes("actor", percent, step ++, ResManager.Instance.RESOURCES);
        await this.preloadRes("login", percent, step ++, ResManager.Instance.RESOURCES);
        await this.preloadRes("home", percent, step ++, ResManager.Instance.RESOURCES);
        
        await ResLoadManager.Instance.loadBundle("prefabs");
        await this.preloadRes("component", percent, step ++, "prefabs");
        await this.preloadRes("common", percent, step ++, "prefabs");
        await this.preloadRes("login", percent, step ++, "prefabs");
        await this.preloadRes("home", percent, step ++, "prefabs");

        await this.loadPetActorsSkels(percent, step ++);

        this.tipLab.string = "加载完毕";
        director.loadScene('game');
    }

    private async loadResourcesBundle(percent: number, step: number) {
        Logger.log(`loadResourcesBundle_step: ${step}`);
        await ResLoadManager.Instance.loadBundle(ResManager.Instance.RESOURCES);
        this.updateProgress(1, 1, percent, step);
    }

    private async loadConfigBundle(percent: number, step: number) {
        Logger.log(`loadConfigBundle_step: ${step}`);
        let bundle = await ResLoadManager.Instance.loadBundle("configs");
        bundle.loadDir(
            "json",
            JsonAsset,
            (finished: number, total: number, item: any) => {
                this.updateProgress(finished, total, percent, step);
                //Logger.log("item", item)
            },
            (err: any, items: any) => {
                if (err) {
                    Logger.error(err);
                    return;
                }
                //Logger.log("items", items);
                items.forEach(item => {
                    ConfigManager.Instance.addConfig(item._name, item.json);
                });

                Logger.log(ConfigManager.Instance.configMap);
            }
        )
    }

    private async loadFont(percent: number, step: number) {
        Logger.log(`loadFont_step: ${step}`);
        await ResManager.Instance.getFont("HYNNTS", ResManager.Instance.RESOURCES, "font");
        this.updateProgress(1, 1, percent, step);
    }

    private async loadPetActorsSkels(percent: number, step: number) {
        Logger.log(`loadPetActorsSkels_step: ${step}`);
        const petCfg = ConfigManager.Instance.getConfigByName("pet");
        let funcArr = [];
        for (let key in petCfg) {
            funcArr.push(PetActorController.Instance.getPetSkels(key));
        }
       
        await Promise.allSettled(funcArr);
        this.updateProgress(1, 1, percent, step);

        Logger.log("loadPetActorsSkels", PetActorController.Instance.petSkelDataMap);
    }

    private async preloadRes(dir: string, percent: number, step: number, bundleName: string) {
        Logger.log(`preloadRes_step: ${step}`);
        await new Promise((resolve, reject) => {
            ResLoadManager.Instance.preloadDir(bundleName, dir, (finished: number, total: number) => {
                this.updateProgress(finished, total, percent, step);
            }, (err) => {
                if (err) {
                    Logger.error(err);
                    reject(0);
                    return;
                }
                Logger.log(`preload ${dir} ... ok `);
                resolve(1);
            })
        });
    }

    private updateProgress(finished: number, total: number, precent: number, index: number) {
        let num = ((finished / total) * precent) + (precent * index);
        this.progressLab.string = Math.ceil(num * 100) + '%';
        this.progressBar.progress = num;
    }
}


