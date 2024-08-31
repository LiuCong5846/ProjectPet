import { _decorator, assetManager, Component, director, Label, Node, ProgressBar, ResolutionPolicy, sys, view, Widget } from 'cc';
import { WECHAT } from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('Init')
export class Init extends Component {
    @property(ProgressBar)
    private progressBar: ProgressBar = null;
    @property(Label)
    private tipLab: Label = null;

    onLoad()  {
        // this.resize();
    }

    start() {
        this.tipLab.string = "正在初始化,请稍后...";
        assetManager.loadBundle('scripts', {
            onFileProgress: (file: any, total: any) => {
                if (WECHAT) {
                    this.progressBar.progress = file.progress / 100;
                    this.tipLab.string = Math.floor(file.progress) + "%";
                }
            }
        }, (err, bundle) => {
            if (err) {
                console.error(err);
                return;
            }
            this.progressBar.progress = 1;
            this.tipLab.string = "100%";
            if (WECHAT) {
                this.scheduleOnce(() => {
                    this.changeScene();
                })
            } else {
                this.changeScene();
            }
        })
    }

    private changeScene() {
        console.log("转换load场景");
        director.loadScene('load');
    }

    private resize() {
        let widget = this.node.getComponent(Widget);
        let winSize = view.getVisibleSize();
        //当前屏幕分辨率比例
        let screenRatio = winSize.width / winSize.height;
        //设计稿分辨率比例
        let designRatio = 750 / 1500;
        let isLongScreen = screenRatio <= designRatio;
        if (!isLongScreen) {
            widget.isAlignTop = widget.isAlignBottom = true;
            widget.left = widget.right = widget.top = widget.bottom = 0;
            widget.isAlignLeft = widget.isAlignRight = sys.isMobile;//电脑防止背景拉伸全屏
        }

        let policy: number = ResolutionPolicy.FIXED_WIDTH;
        if (screenRatio <= 1) {
            policy = ResolutionPolicy.FIXED_WIDTH;//screenRatio <= designRatio ? ResolutionPolicy.FIXED_WIDTH : ResolutionPolicy.FIXED_HEIGHT;
        } else {
            //屏幕宽度大于高度,即横屏
            policy = ResolutionPolicy.FIXED_HEIGHT;
        }

        view.setDesignResolutionSize(750, 1500, policy);
    }
}


