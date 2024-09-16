import { Graphics, Input, Mask, UITransform, input } from "cc";
import TimerManager from "../core/timer/TimerManager";
import ObjectUtil from "../core/utils/ObjectUtil";

export default class LocalUtils {
    public static isNil(obj: Object) {
		return obj === null || obj === undefined;
	}

	public static deepClone(arg: any) {
		return ObjectUtil.deepCopy(arg);
	}
    
    //#region 键盘输入
	public static onInputKeyDown(fun: Function, target: any) {
		input.on(Input.EventType.KEY_DOWN, fun.bind(target), target);
	}

	public static offInputKeyDown(fun: Function, target: any) {
		input.off(Input.EventType.KEY_DOWN, fun.bind(target), target);
	}

	public static onInputKeyPress(fun: Function, target: any) {
		input.on(Input.EventType.KEY_PRESSING, fun.bind(target), target);
	}

	public static offInputKeyPress(fun: Function, target: any) {
		input.off(Input.EventType.KEY_PRESSING, fun.bind(target), target);
	}

	public static onInputKeyUp(fun: Function, target: any) {
		input.on(Input.EventType.KEY_UP, fun.bind(target), target);
	}

	public static offInputKeyUp(fun: Function, target: any) {
		input.off(Input.EventType.KEY_UP, fun.bind(target), target);
	}
	//#endregion

	/**
	 * 受限于cocos的渲染机制 mask组件加载后，晚1帧调用该接口
	 * @param mask 
	 * @param radius 
	 */
	public static drawMastFilletedConner(radius: number, mask: Mask, uiTrfm: UITransform) {
		if (this.isNil(mask) || this.isNil(uiTrfm)) return;

		mask.type = Mask.Type.GRAPHICS_RECT;

		const { width, height, anchorX, anchorY } = uiTrfm;

		const graphics = mask.subComp as Graphics;
		graphics.clear();
		const x = - width * anchorX;
		const y = - height * anchorY;
		graphics.roundRect(x, y, width, height, radius);
		graphics.fill();
	}

	/** 尽量不要用在 Promise.race 中，返回resolveAfterPromiseResolved报错*/
	public static async delayTime(ms: number, target: Object) {
		await (async () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(null);
				}, ms);
			});
		}).bind(target)();
	}
}


