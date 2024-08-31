import { Singleton } from "../common/Singleton";
import AlgorithmUtil from "../utils/AlgorithmUtil";
import Logger from "../utils/Logger";
import ObjectPool from "../utils/ObjectPool";


export class TimerHandler {
	/**执行间隔*/
	public delay: number = 0;
	/**是否重复执行*/
	public forever: boolean = false;
	/**重复执行次数*/
	public repeatCount: number = 0;
	/**执行时间*/
	public exeTime: number = 0;
	/**处理函数*/
	public method: Function;
	/**处理函数所属对象*/
	public methodObj: any;
	/**完成处理函数*/
	public onFinish: Function;
	/**完成处理函数所属对象*/
	public finishObj: any;

	/**清理*/
	public clear(): void {
		this.method = null;
		this.methodObj = null;
		this.onFinish = null;
		this.finishObj = null;
		this.forever = false;
	}
}

export default class TimerManager extends Singleton {
	private _handlers: Array<TimerHandler>;
	private _currTime: number;
	private _currFrame: number;
	private currHandler: TimerHandler = null;
	private nexthandles: Array<TimerHandler>;


	public static get Instance(): TimerManager {
		return this.getInstance<TimerManager>();
	}

	protected init(): void {
		this._handlers = [];
		this.nexthandles = null;

		this._currTime = Date.now();
		this._currFrame = 0;

		this.update(0);
	}

	public getFrameId(): number {
		return this._currFrame;
	}

	/** 本地时间,倒计时等逻辑不要用这个接口, 用 GameMonitor.Instance.serverTime */
	public getCurrTime(): number {
		return this._currTime;
	}

	// 从大到小排序
	public static binFunc(b1: TimerHandler, b2: TimerHandler): number {
		if (b1.exeTime > b2.exeTime) return -1;
		else if (b1.exeTime < b2.exeTime) return 1;
		else return 0;
	}

	private static DeleteHandle(handler: TimerHandler) {
		handler.clear();
		ObjectPool.push(handler);
	}

	/**
	 * 每帧执行函数
	 * @param frameTime
	 */
	public update(_dt: number): boolean {
		const dt = _dt || 0;
		this._currFrame++;
		this._currTime = Date.now();
		let currTime: number = 0;

		// process the nextlist first
		let nexthandles = this.nexthandles;
		this.nexthandles = null;
		if (nexthandles && nexthandles.length > 0) {
			for (let handler of nexthandles) {
				handler.method.call(handler.methodObj, dt);
				TimerManager.DeleteHandle(handler);
			}

			nexthandles = null;
		}

		if (this._handlers.length <= 0) return false;

		let handler = this._handlers[this._handlers.length - 1];
		while (handler.exeTime <= this._currTime) {
			this.currHandler = handler = this._handlers.pop();
			handler.method.call(handler.methodObj, dt);
			currTime = Date.now();
			handler.exeTime = currTime + handler.delay;

			let repeat: boolean = handler.forever;
			if (!repeat) {
				if (handler.repeatCount > 1) {
					handler.repeatCount--;
					repeat = true;
				} else {
					if (handler.onFinish) {
						handler.onFinish.apply(handler.finishObj);
					}
				}
			}

			if (repeat) {
				let index = AlgorithmUtil.binSearch(this._handlers, handler, TimerManager.binFunc);
				this._handlers.splice(index, 0, handler);
			} else {
				TimerManager.DeleteHandle(handler);
			}

			if (currTime - this._currTime > 5) break;

			if (this._handlers.length <= 0) break;
			else handler = this._handlers[this._handlers.length - 1];
		}
		this.currHandler = null;

		return false;
	}

	private create(
		startTime: number,
		delay: number,
		repeat: number,
		method: Function,
		methodObj: any,
		onFinish: Function,
		fobj: any
	): void {
		if (delay < 0 || method == null) {
			return;
		}

		let handler: TimerHandler = ObjectPool.pop('TimerHandler', TimerHandler);
		/**
		if (handler == null) {
			handler = ObjectPool.create('TimerHandler', new TimerHandler())
		} */
		handler.forever = repeat == 0;
		handler.repeatCount = repeat;
		handler.delay = delay;
		handler.method = method;
		handler.methodObj = methodObj;
		handler.onFinish = onFinish;
		handler.finishObj = fobj;
		handler.exeTime = startTime + this._currTime;
		// this._handlers.push(handler);

		let index = AlgorithmUtil.binSearch(this._handlers, handler, TimerManager.binFunc);
		this._handlers.splice(index, 0, handler);
	}

	public doLoopTimer(
		startTime: number,
		delay: number,
		repeat: number,
		method: Function,
		methodObj: any,
		isRemove: boolean = false
	): void {
		isRemove && this.remove(method, methodObj);
		this.create(startTime, delay, repeat, method, methodObj, null, null);
		method.call(methodObj);
	}

	/**
	 *
	 * 定时执行
	 * @param startTime 延迟多久第一次执行
	 * @param delay 执行间隔:毫秒
	 * @param repeat 执行次数, 0为无限次
	 * @param method 执行函数
	 * @param methodObj 执行函数所属对象
	 * @param onFinish 完成执行函数
	 * @param fobj 完成执行函数所属对象
	 * @param remove 是否删除已经存在的
	 *
	 */
	public doTimerDelay(
		startTime: number,
		delay: number,
		repeat: number,
		method: Function,
		methodObj: any,
		onFinish: Function = null,
		fobj: any = null
	): void {
		this.create(startTime, delay, repeat, method, methodObj, onFinish, fobj);
	}

	// 下一帧执行，且只执行一次
	public doNext(method: Function, methodObj: any) {
		Logger.log("here_doNext");
		let handler: TimerHandler = ObjectPool.pop('TimerHandler', TimerHandler);
		/**
		if (handler == null) {
			handler = ObjectPool.create('TimerHandler', new TimerHandler())
		} */
		handler.method = method;
		handler.methodObj = methodObj;

		if (!this.nexthandles) this.nexthandles = [];
		this.nexthandles.push(handler);
	}

	/**
	 * 清理
	 * @param method 要移除的函数
	 * @param methodObj 要移除的函数对应的对象
	 */
	public remove(method: Function, methodObj: any): void {
		let currHandler = this.currHandler;
		if (currHandler && currHandler.method == method && currHandler.methodObj == methodObj) {
			currHandler.forever = false;
			currHandler.repeatCount = 0;
		}

		for (let i = this._handlers.length - 1; i >= 0; i--) {
			let handler = this._handlers[i];
			if (handler.method == method && handler.methodObj == methodObj) {
				this._handlers.splice(i, 1);
				TimerManager.DeleteHandle(handler);
			}
		}
	}

	/**
	 * 清理
	 * @param methodObj 要移除的函数对应的对象
	 */
	public removeAll(methodObj: any): void {
		let currHandler = this.currHandler;
		if (currHandler && currHandler.methodObj == methodObj) {
			currHandler.forever = false;
			currHandler.repeatCount = 0;
		}

		for (let i = this._handlers.length - 1; i >= 0; i--) {
			let handler = this._handlers[i];
			if (handler.methodObj == methodObj) {
				this._handlers.splice(i, 1);
				TimerManager.DeleteHandle(handler);
			}
		}
	}

	public clearAll(): void {
		this._handlers = [];
		this.nexthandles = null;
	}

	/**
 * 检测是否已经存在
 * @param method
 * @param methodObj
 *
 */
	public isExists(method: Function, methodObj: any): boolean {
		for (let handler of this._handlers) {
			if (handler.method == method && handler.methodObj == methodObj) {
				return true;
			}
		}
		return false;
	}
}