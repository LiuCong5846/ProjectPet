/*
 * 动态添加一个label设置字体，此处为统一字体
 */

import { Color, Component, Enum, Font, Label, LabelOutline, Material, _decorator, assetManager } from "cc";
import { EDITOR } from "cc/env";
import LocalUtils from "../tools/LocalUtils";
import ResManager from "../manager/ResManager";
import Logger from "../core/utils/Logger";


const { ccclass, property, requireComponent, executeInEditMode } = _decorator;
// enum ETTFItem {
//     FZCY = 0,
//     YSZYBBT,
// }
// Enum(ETTFItem);
// const ETTF_NAME_QUEUE = [
//     ETTFName.FZCY,
//     ETTFName.YSZYBBT,
// ];

enum EGradientProp {
    USE_GRADIENT = "useGradient",
    START_COLOR = "startColor",
    END_COLOR = "endColor",
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
}

enum EOutGlowProp {
    USE_OUT_GLOW = "useOutGlow",
    OUT_GLOW_COLOR = "outGlowColor",
    OUT_GLOW_COLOR_SIZE = "outGlowColorSize",
    OUT_GLOW_THRESHOLD = "outGlowThreshold",
}

enum EGrayProp {
    USE_GRAY_1 = "useGray1",
    USE_GRAY_2 = "useGray2",
}

enum EOffsetProp {
    USE_OFFSET = "useOffset",
    HORIZONTAL_OFFSET_FACTOR = "horizontalOffsetFactor",
    VERTICAL_OFFSET_FACTOR = "verticalOffsetFactor",
    OFFSET_SCALE_FACTOR = "offsetScaleFactor",
}

enum ECurvatureProp {
    USE_CURVATURE = "useCurvature",
    CURVATURE_FACTOR = "curvatureFactor",
}

const SLIDE_RANGE_2 = 2;
const SLIDE_RANGE_1 = 1;
const SLIDE_RANGE_0 = 0;
const SLIDE_RANGE_N_1 = -1;

const GLABEL_DEFAULT_MATERIAL_NAME = "game-label";
const GLABEL_DEFAULT_MATERIAL_UUID = "a1bee5b8-9524-491e-a16e-208a0ecd9b16";

@ccclass('GLabel')
@requireComponent(Label)
@executeInEditMode(true)
export class GLabel extends Component {
    @property // 加个材质预加载开关开关
    private _preloadMaterial: boolean = false;
    @property({
        tooltip: "预加载自定义材质",
    })
    get preloadMaterial() {
        return this._preloadMaterial;
    }
    set preloadMaterial(v: boolean) {
        this._preloadMaterial = v;
        if (this.preloadMaterial) {
            this.initMaterial();
        }
    }

    //#region font
    // @property
    // private _ttfLock: boolean = true;
    // @property({
    //     tooltip: "字体锁死, 默认YSZYBBT",
    // })
    // get ttfLock() {
    //     return this._ttfLock;
    // }
    // set ttfLock(b: boolean) {
    //     this._ttfLock = b;
    //     if (this.ttfLock && ETTF_NAME_QUEUE[this.useTTF] !== ETTFName.YSZYBBT) {
    //         this.forceFont();
    //         this.loadFont();
    //     }
    // }
    // @property({
    //     type: ETTFItem,
    // })
    // private _useTTF: ETTFItem = ETTFItem.YSZYBBT;
    // @property({
    //     type: ETTFItem,
    //     tooltip: "选择字体",
    //     visible() {
    //         return !this.ttfLock
    //     }
    // })
    // get useTTF() {
    //     return this._useTTF;
    // }
    // set useTTF(v) {
    //     this._useTTF = this.ttfLock ? ETTFItem.YSZYBBT : v;
    //     this.loadFont();
    // }
    // public changeTTF(ttfName: ETTFName) {
    //     const findIdx = ETTF_NAME_QUEUE.findIndex((name) => name === ttfName);
    //     if (findIdx < 0) return;
    //     this.ttfLock && (this.ttfLock = false);
    //     this.useTTF = findIdx as ETTFItem;
    // }
    //#endregion

    //#region config
    // @property
    // private _useLanguageConfig: boolean = false;
    // @property({
    //     tooltip: "直接使用多语言表配置ID",
    // })
    // get useLanguageConfig() {
    //     return this._useLanguageConfig;
    // }
    // set useLanguageConfig(v: boolean) {
    //     this._useLanguageConfig = v;
    // }

    // @property
    // private _languageId: string = "";
    // @property({
    //     tooltip: "多语言表ID",
    //     visible() {
    //         return this.useLanguageConfig;
    //     },
    // })
    // get languageId() {
    //     return this._languageId;
    // }
    // set languageId(s: string) {
    //     this._languageId = s;
    // }
    //#endregion

    //#region gradient
    @property
    private _useGradient: boolean = false;
    @property({ tooltip: "文字渐变色" })
    get useGradient() {
        return this._useGradient;
    }
    set useGradient(v: boolean) {
        this._useGradient = v;

        if (!this.checkDefaultMaterial()) {
            return;
        }

        !LocalUtils.isNil(this.lbl) && this.lbl.customMaterial.setProperty(EGradientProp.USE_GRADIENT, this._useGradient ? 1.0 : 0.0);
        if (this._useGradient) {
            this.setMatGradient();
        }
    }

    @property
    private _beginColor: Color = new Color(255, 255, 255, 255);
    @property({
        tooltip: "起始色",
        visible() {
            return this.useGradient;
        },
    })
    get beginColor() {
        return this._beginColor;
    }
    set beginColor(v: Color) {
        this._beginColor = v;
        this.setGradientMatProp(EGradientProp.START_COLOR, this.beginColor);
    }

    @property
    private _endColor: Color = new Color(255, 255, 255, 255);
    @property({
        tooltip: "终止色",
        visible() {
            return this.useGradient;
        },
    })
    get endColor() {
        return this._endColor;
    }
    set endColor(v: Color) {
        this._endColor = v;
        this.setGradientMatProp(EGradientProp.END_COLOR, this.endColor);
    }

    @property
    private _horizontal: number = 0;
    @property({
        tooltip: "使用纵向阈值滑动条",
        visible() {
            return this.useGradient;
        }
    })
    private onHorizontalSlide: boolean = true;
    @property({
        tooltip: "定义纵向阈值",
        visible() {
            return this.useGradient && !this.onHorizontalSlide;
        }
    })
    get horizontailCustomize() {
        return this._horizontal;
    }
    set horizontailCustomize(v: number) {
        this._horizontal = Math.max(0, v);
        this.setGradientMatProp(EGradientProp.HORIZONTAL, this._horizontal);
    }
    @property({
        tooltip: "纵向阈值滑动条",
        range: [SLIDE_RANGE_0, SLIDE_RANGE_2, 0.1],
        slide: true,
        visible() {
            return this.useGradient && this.onHorizontalSlide;
        },
    })
    get horizontalSlide() {
        return this._horizontal;
    }
    set horizontalSlide(v: number) {
        this._horizontal = Math.max(0, Math.min(SLIDE_RANGE_2, v));
        this.setGradientMatProp(EGradientProp.HORIZONTAL, this._horizontal);
    }

    @property
    private _vertical: number = 0;
    @property({
        tooltip: "使用横向阈值滑动条",
        visible() {
            return this.useGradient;
        }
    })
    private onVerticalSlide: boolean = true;
    @property({
        tooltip: "自定义横向阈值",
        visible() {
            return this.useGradient && !this.onVerticalSlide;
        }
    })
    get verticalCustomize() {
        return this._vertical;
    }
    set verticalCustomize(v: number) {
        this._vertical = Math.max(0, v);
        this.setGradientMatProp(EGradientProp.VERTICAL, this._vertical);
    }
    @property({
        tooltip: "横向阈值滑动条",
        range: [SLIDE_RANGE_0, SLIDE_RANGE_2, 0.1],
        slide: true,
        visible() {
            return this.useGradient && this.onVerticalSlide;
        },
    })
    get verticalSlide() {
        return this._vertical;
    }
    set verticalSlide(v: number) {
        this._vertical = Math.max(0, Math.min(SLIDE_RANGE_2, v));
        this.setGradientMatProp(EGradientProp.VERTICAL, this._vertical);
    }
    //#endregion

    //#region out-glow
    @property
    private _useOutGlow: boolean = false;
    @property({ tooltip: "文字外发光" })
    get useOutGlow() {
        return this._useOutGlow;
    }
    set useOutGlow(v: boolean) {
        this._useOutGlow = v;

        if (!this.checkDefaultMaterial()) {
            return;
        }

        !LocalUtils.isNil(this.lbl) && this.lbl.customMaterial.setProperty(EOutGlowProp.USE_OUT_GLOW, this._useOutGlow ? 1.0 : 0.0);
        if (this._useOutGlow) {
            this.setMatOutGlow();
        }
    }

    @property
    private _outGlowColor: Color = new Color(255, 255, 255, 255);
    @property({
        tooltip: "文字外发光颜色",
        visible() {
            return this.useOutGlow;
        }
    })
    get outGlowColor() {
        return this._outGlowColor;
    }
    set outGlowColor(v: Color) {
        this._outGlowColor = v;
        this.setOutGlowMatProp(EOutGlowProp.OUT_GLOW_COLOR, this.outGlowColor);
    }
    @property
    private _outGlowSize: number = 0;
    @property({
        tooltip: "文字外发光尺寸",
        range: [SLIDE_RANGE_0, SLIDE_RANGE_2, 0.1],
        slide: true,
        visible() {
            return this.useOutGlow;
        }
    })
    get outGlowSizeSlide() {
        return this._outGlowSize;
    }
    set outGlowSizeSlide(v: number) {
        this._outGlowSize = Math.max(0, Math.min(SLIDE_RANGE_2, v));
        this.setOutGlowMatProp(EOutGlowProp.OUT_GLOW_COLOR_SIZE, this._outGlowSize);
    }

    @property
    private _outGlowThreshold: number = SLIDE_RANGE_1;
    @property({
        tooltip: "文字外发光阈值",
        range: [SLIDE_RANGE_0, SLIDE_RANGE_2, 0.1],
        slide: true,
        visible() {
            return this.useOutGlow;
        }
    })
    get outGlowThresholdSlide() {
        return this._outGlowThreshold;
    }
    set outGlowThresholdSlide(v: number) {
        this._outGlowThreshold = v;
        this.setOutGlowMatProp(EOutGlowProp.OUT_GLOW_THRESHOLD, this._outGlowThreshold);
    }
    //#endregion

    private _isGray: boolean = false;
    get isGray() {
        return this._isGray;
    }
    set isGray(flag: boolean) {
        this._isGray = flag;
        // if (this.useGradient && this.useOutGlow) {
        //     this.setGrayMatProp();
        // } else if (flag) {
        //     let outline = this.node.getComponent(LabelOutline);
        //     outline.enabled = false;
        //     this.lbl.color = Color.GRAY;
        // }
        if (LocalUtils.isNil(this.lbl)) return;
        if (LocalUtils.isNil(this.lbl.customMaterial)) {
            this.loadMaterial();
        } else if (this.checkDefaultMaterial()) {
            this.setGrayMatProp();
        }
    }
    private setGrayMatProp() {
        if (!LocalUtils.isNil(this.lbl) && this.lbl.customMaterial) {
            if (!this._isGray) {
                this.lbl.customMaterial.setProperty(EGrayProp.USE_GRAY_1, 0.0);
                this.lbl.customMaterial.setProperty(EGrayProp.USE_GRAY_2, 0.0);
            } else {
                if (this.useGradient) {
                    this.lbl.customMaterial.setProperty(EGrayProp.USE_GRAY_1, 0.0);
                    this.lbl.customMaterial.setProperty(EGrayProp.USE_GRAY_2, 1.0);
                } else {
                    this.lbl.customMaterial.setProperty(EGrayProp.USE_GRAY_1, 1.0);
                    this.lbl.customMaterial.setProperty(EGrayProp.USE_GRAY_2, 0.0);
                }
                // if (this.lbl.color.equals(Color.WHITE)) {
                //     this.lbl.customMaterial.setProperty(EGrayProp.USE_GRAY_1, 1.0);
                //     this.lbl.customMaterial.setProperty(EGrayProp.USE_GRAY_2, 0.0);
                // } else {
                //     this.lbl.customMaterial.setProperty(EGrayProp.USE_GRAY_1, 0.0);
                //     this.lbl.customMaterial.setProperty(EGrayProp.USE_GRAY_2, 1.0);
                // }
            }
        }
    }

    @property
    private _useOffset: boolean = false;
    @property({ tooltip: "文字偏转" })
    get useOffset() {
        return this._useOffset;
    }
    set useOffset(v: boolean) {
        this._useOffset = v;
        
        if (!this.checkDefaultMaterial()) {
            return;
        }

        !LocalUtils.isNil(this.lbl) && this.lbl.customMaterial.setProperty(EOffsetProp.USE_OFFSET, this._useOffset ? 1.0 : 0.0);
        if (this._useOffset) {
            this.setOffsetMatProp();
        }
    }
    @property
    private _horizontalOffsetFactor: number = 0;
    @property({
        tooltip: "横向偏移因子",
        visible() {
            return this.useOffset;
        },
        range: [SLIDE_RANGE_0, SLIDE_RANGE_1, 0.1],
        slide: true,
    })
    get horizontalOffsetFactor() {
        return this._horizontalOffsetFactor;
    }
    set horizontalOffsetFactor(v: number) {
        this._horizontalOffsetFactor = v;
        this.setMatProp(EOffsetProp.HORIZONTAL_OFFSET_FACTOR, this.horizontalOffsetFactor);
    }
    @property
    private _verticalOffsetFactor: number = 0;
    @property({
        tooltip: "纵向偏移因子",
        visible() {
            return this.useOffset; 
        },
        range: [SLIDE_RANGE_0, SLIDE_RANGE_1, 0.1],
        slide: true,
    })
    get verticalOffsetFactor() {
        return this._verticalOffsetFactor;
    }
    set verticalOffsetFactor(v: number) {
        this._verticalOffsetFactor = v;
        this.setMatProp(EOffsetProp.VERTICAL_OFFSET_FACTOR, this.verticalOffsetFactor);
    }
    @property
    private _offsetScaleFactor: number = 0;
    @property({
        tooltip: "偏移缩放因子",
        visible() {
            return this.useOffset; 
        },
        range: [SLIDE_RANGE_N_1, SLIDE_RANGE_1, 0.01],
        slide: true,
    })
    get offsetScaleFactor() {
        return this._offsetScaleFactor;
    }
    set offsetScaleFactor(v: number) {
        this._offsetScaleFactor = v;
        this.setMatProp(EOffsetProp.OFFSET_SCALE_FACTOR, this.offsetScaleFactor);
    }

    @property
    private _useCurvature: boolean = false;
    @property({ tooltip: "文字弯曲" })
    get useCurvature() {
        return this._useCurvature;
    }
    set useCurvature(v: boolean) {
        this._useCurvature = v;
        if (!this.checkDefaultMaterial()) {
            return;
        }
        !LocalUtils.isNil(this.lbl) && this.lbl.customMaterial.setProperty(ECurvatureProp.USE_CURVATURE, this._useCurvature ? 1.0 : 0.0);
        if (this._useCurvature) {
            this.setMatProp(ECurvatureProp.CURVATURE_FACTOR, this.curvatureFactor);
        }
    }
    @property
    private _curvatureFactor: number = 0;
    @property({
        tooltip: "弯曲因子",
        visible() {
            return this.useCurvature;
        },
        range: [SLIDE_RANGE_N_1, SLIDE_RANGE_1, 0.01],
        slide: true,
    })
    get curvatureFactor() {
        return this._curvatureFactor;
    }
    set curvatureFactor(v: number) {
        this._curvatureFactor = v;
        this.setMatProp(ECurvatureProp.CURVATURE_FACTOR, this.curvatureFactor);
    }


    // LIFE-CYCLE CALLBACKS:
    private m_isOk = false;
    private _lbl: Label = null;
    get lbl() {
        if (LocalUtils.isNil(this)) return null;
        LocalUtils.isNil(this._lbl) && (this._lbl = this.getComponent(Label));
        return this._lbl;
    }

    get string() {
        return !LocalUtils.isNil(this.lbl) ? this.lbl.string : "";
    }
    set string(str: string) {
        !LocalUtils.isNil(this.lbl) && (this.lbl.string = str);
    }

    private _labelDefaultColor = Color.WHITE;

    onLoad() {
        // console.log("GLabel_onLoad");
        this._lbl = this.getComponent(Label);
        this._labelDefaultColor = this.getComponent(Label).color;

        this.initFont();
        this.initMaterial();
    }
    onEnable() {
        // if (this._useLanguageConfig) {
        //     if (EDITOR) {
        //         //
        //     } else {
        //         !LocalUtils.isNil(this.lbl) && (this.lbl.string = LocalUtils.getMsgLocalString(this._languageId));
        //     }
        // }
    }

    private checkDefaultMaterial() {
        return !LocalUtils.isNil(this.lbl) && this.lbl.customMaterial && this.lbl.customMaterial.effectName.search(GLABEL_DEFAULT_MATERIAL_NAME) != -1;
    }

    private async initMaterial() {
        if (LocalUtils.isNil(this.lbl)) return;
        if (!this.preloadMaterial && !this.useGradient && !this.useOutGlow) return;
        if (this.checkDefaultMaterial()) return;
       
        await this.loadMaterial();
    }

    private async loadMaterial() {
        let materialCopy: Material = new Material();
        let result: boolean = await new Promise(async (resolve) => {
            if (EDITOR) {
                assetManager.loadAny({ 'uuid': GLABEL_DEFAULT_MATERIAL_UUID, type: Material, bundle: 'res' }, (err, material) => {
                    if (err) {
                        console.error(err);
                        resolve(false);
                    } else {
                        materialCopy.copy(material);
                        resolve(true);
                    }
                });
            } else {
                let matOriginal = await ResManager.Instance.getMaterial(GLABEL_DEFAULT_MATERIAL_NAME, "resources", "shader/material");
                if (LocalUtils.isNil(matOriginal)) {
                    Logger.error(`getMaterial ${GLABEL_DEFAULT_MATERIAL_NAME} failed!`);
                    resolve(false);
                } else {
                    materialCopy.copy(matOriginal);
                    resolve(true);
                }
            }
        });

        if (!(result as boolean)) {
            return;
        }
        this.lbl.customMaterial = materialCopy as Material;
        this.lbl.customMaterial.setProperty(EGradientProp.USE_GRADIENT, this.useGradient ? 1.0 : 0.0);
        this.lbl.customMaterial.setProperty(EOutGlowProp.USE_OUT_GLOW, this.useOutGlow ? 1.0 : 0.0);
        this.lbl.customMaterial.setProperty(EOffsetProp.USE_OFFSET, this.useOffset ? 1.0 : 0.0);
        this.lbl.customMaterial.setProperty(ECurvatureProp.USE_CURVATURE, this.useCurvature ? 1.0 : 0.0);
        this.setGrayMatProp();

        if (this.useGradient) {
            this.setMatGradient();
        }
        if (this.useOutGlow) {
            this.setMatOutGlow();
        }
        if (this.useOffset) {
            this.setOffsetMatProp();
        }
        if (this.useCurvature) {
            this.setMatProp(ECurvatureProp.CURVATURE_FACTOR, this.curvatureFactor);
        }

        // Logger.log(this.lbl.customMaterial.passes[0]);
        // Logger.log(this.lbl.customMaterial.passes[0].defines);
        
    }

    private setMatGradient() {
        this.setGradientMatProp(EGradientProp.START_COLOR, this.beginColor);
        this.setGradientMatProp(EGradientProp.END_COLOR, this.endColor);
        if (this._horizontal || this._vertical) {
            this.setGradientMatProp(EGradientProp.HORIZONTAL, this._horizontal);
            this.setGradientMatProp(EGradientProp.VERTICAL, this._vertical);
        }
    }

    private setMatProp(prop: string, arg: any) {
        if (!LocalUtils.isNil(this.lbl) && this.lbl.customMaterial) {
            let param = arg;
            if (prop === EOutGlowProp.OUT_GLOW_COLOR_SIZE as string && arg > 0) {
                param = arg / 10;
            }
            this.lbl.customMaterial.setProperty(prop, param);
        }
    }

    private setGradientMatProp(prop: EGradientProp, arg: any) {
        this.setMatProp(prop as string, arg);
    }

    private setMatOutGlow() {
        this.setOutGlowMatProp(EOutGlowProp.OUT_GLOW_COLOR, this.outGlowColor);
        this.setOutGlowMatProp(EOutGlowProp.OUT_GLOW_COLOR_SIZE, this._outGlowSize);
        this.setOutGlowMatProp(EOutGlowProp.OUT_GLOW_THRESHOLD, this._outGlowThreshold);
    }

    private setOutGlowMatProp(prop: EOutGlowProp, arg: any) {
        this.setMatProp(prop as string, arg);
    }

    private setOffsetMatProp() {
        this.setMatProp(EOffsetProp.HORIZONTAL_OFFSET_FACTOR, this.horizontalOffsetFactor);
        this.setMatProp(EOffsetProp.VERTICAL_OFFSET_FACTOR, this.verticalOffsetFactor);
        this.setMatProp(EOffsetProp.OFFSET_SCALE_FACTOR, this.offsetScaleFactor);
    }

    private async initFont() {
        if (this.m_isOk) { return }
        // if (this.ttfLock && ETTF_NAME_QUEUE[this.useTTF] !== ETTFName.YSZYBBT) {
        //     this.forceFont();
        // }
        // this.loadFont();
        this.m_isOk = true;
    }

    // private async forceFont() {
    //     this.useTTF = ETTFItem.YSZYBBT;
    //     !Utils.isNil(this.lbl) && (this.lbl.font = null);
    // }

    // private async loadFont() {
    //     if (Utils.isNil(this.lbl)) return;
    //     this.lbl.useSystemFont = false;
    //     if (EDITOR) {
    //         const theUrl = `db://assets/resources/fonts/${ETTF_NAME_QUEUE[this.useTTF]}.TTF`;
    //         let uuid: string = await Editor.Message.request("asset-db", 'query-uuid', theUrl);
    //         if (!uuid || uuid === "") {
    //             console.error("uuid get fail!");
    //             !this.lbl.useSystemFont && (this.lbl.useSystemFont = true);
    //             return;
    //         }
    //         assetManager.loadAny({ 'uuid': uuid, type: Font, bundle: 'resources' }, (err, font) => {
    //             if (err) {
    //                 console.error(err);
    //                 return;
    //             }
    //             this.lbl.font = font;
    //         });
    //     } else {
    //         this.lbl.font = await ResLoadManager.Instance.getFont(ETTF_NAME_QUEUE[this.useTTF]);
    //     }
    //     // console.log("字体设置完毕:", this.lbl.font);
    // }

    public changeLabelColor(flag: boolean, color: Color) {
        if (LocalUtils.isNil(this.lbl)) return;
        this.lbl.color = flag ? color : this._labelDefaultColor;
        if (this.isGray) {
            this.setGrayMatProp();
            this.lbl.customMaterial && this.lbl.customMaterial.passes[0].tryCompile();
        }
    }
}
