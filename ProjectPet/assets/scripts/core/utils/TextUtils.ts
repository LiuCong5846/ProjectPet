import { CacheMode, Color, HorizontalTextAlignment, Label, Node, tween, VerticalTextAlignment } from "cc";

export default class TextUtils {
    /**
     *  创建文本
     * @param size      字号
     * @param color     字体颜色
     * @param vAlign    纵向对齐方式 默认：egret.VerticalAlign.MIDDLE
     * @param hAlign    横向对齐方式 默认：egret.HorizontalAlign.CENTER
     * @param family    字体 默认:Microsoft YaHei
     */
    public static createTextfield(
        parent: Node,
        size: number,
        color: number = 0xffffff,
        vAlign: VerticalTextAlignment = VerticalTextAlignment.CENTER,
        hAlign: HorizontalTextAlignment = HorizontalTextAlignment.CENTER,
        family: string = 'Microsoft YaHei'
    ): Label {
        let textFiled: Label = parent.addComponent(Label)
        textFiled.fontSize = size;
        textFiled.color = new Color(color);
        textFiled.horizontalAlign = hAlign;
        textFiled.verticalAlign = vAlign;
        textFiled.fontFamily = family;
        //textFiled.stroke = 1;
        //textFiled.strokeColor = Color.BLACK;
        textFiled.cacheMode = CacheMode.BITMAP;
        return textFiled;
    }

    /**
     *  格式化输出 使用{0}{1}...表示参数位置，参数数组会一次替代
     * @param str       "参数替换{0}和{1}..."
     * @param args      [x,y]
     * eg: "hello {0}, welcome to {1}", ["H5", "YXG"]
     */
    public static formatString(str: string, args: any[]): string {
        if (str) {
            let reg: RegExp = /\{[0-9]+?\}/;
            while (str.match(reg)) {
                let arr: RegExpMatchArray = str.match(reg);
                let arg: RegExpMatchArray = arr[0].match(/[0-9]+?/);
                str = str.replace(reg, args[parseInt(arg[0])]);
            }
            return str;
        }
        return '';
    }

    //获取文字
    public static colorString(_str: string, _color: string = '#76c05c', size: number = 0): string {
        if (size == 0) {
            return "<color=" + _color + ">" + _str + '</color>';
        }
        return "<size=" + size + "><color=" + _color + ">" + _str + '</color></size>';
    }
    /**
     *  显示文字提示
     * @param tip
     */
    private static textTipList: Array<any> = [];
    private static textTipIsRunning: boolean = false;
    public static showTextTip(layer: Node, tip: string, color: number = 0xe45050, extension?: any): void {
        console.log("TextUtils, showTextTip , tip=" + tip);
        let newObj: any = {};
        newObj.tip = tip;
        newObj.color = color;
        newObj.extension = extension;
        this.textTipList.push(newObj);

        let self = this;
        function run() {
            if (self.textTipList.length == 0) {
                self.textTipIsRunning = false;
                return;
            }
            self.textTipIsRunning = true;
            let obj: any = self.textTipList.splice(0, 1)[0];

            //var max_W: number = layer.stage.stageWidth;
            //var max_H: number = layer.stage.stageHeight;
            let textfield: Label = TextUtils.createTextfield(layer, 30);

            textfield.string = obj.tip;
            textfield.color = new Color(obj.color);

            /**
            textfield.width = textfield.textWidth;
            textfield.height = textfield.textHeight;
            textfield.x = (max_W - textfield.width) * 0.5;

            if (obj.extension && obj.extension.y) {
                textfield.y = obj.extension.y;
                max_H = max_H - 200;
            } else {
                textfield.y = (max_H - textfield.height) * 0.5;
            }
            layer.addChild(textfield);

            tween(textfield).to({ y: max_H * 0.4, alpha: 0.1 }, 800, egret.Ease.circIn).call(() => {
                Utils.removeSelf(textfield);
            }).start();
            tween(self).wait(500).call(() => {
                run();
            }); */
        }
        if (!self.textTipIsRunning) {
            run();
        }

    }

    public static stopTxtTips(): void {
        this.textTipList = [];
        this.textTipIsRunning = false;

    }
}