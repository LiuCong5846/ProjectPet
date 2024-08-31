import { _decorator, Component, Node, Slider, Sprite, UITransform } from 'cc';
import { ButtonComp } from './ButtonComp';
const { ccclass, property } = _decorator;

@ccclass('SliderComp')
export class SliderComp extends Component {
    @property({ type: Slider })
	public slide: Slider;
	@property({ type: ButtonComp })
	public btnAdd: ButtonComp;
	@property({ type: ButtonComp })
	public btnSub: ButtonComp;
	@property({ type: Sprite })
	public imgSlide: Sprite;

	//滑动条宽度
	private _slideWidth: number = 0;//滑动宽度
	private _imgSlideTransform: UITransform = null;//滑动条图片
	private _onValueChangeEnd: Function = null;//点击结束
	private _onValueChangeStart: Function = null;//点击开始
	private _onValueChange: Function = null;
	private _that: any = null;//当前使用的this

	//事件
	public static EVENT_CHANGE: string = 'change';

    private _sliderCompName: string = "SliderComp";

	private _min: number = 0;//最小值
	private _max: number = 0;//最大值
	public _curNum: number = 0;//当前数

	public constructor() {
		super();
	}

	public onLoad(): void {
        this.btnAdd.setClickFunc(this.onClickAdd, this);
        this.btnSub.setClickFunc(this.onClickSub, this);
		this.slide.node.on('slide', this.valueChange, this);
		this.slide.handle.node.on(Node.EventType.TOUCH_START, this.onSlideStart, this);
		this.slide.handle.node.on(Node.EventType.TOUCH_END, this.onSlideEnd, this);
		this.slide.handle.node.on(Node.EventType.TOUCH_CANCEL, this.onSlideEnd, this);

		this.slide.node.on(Node.EventType.TOUCH_START, this.onSlideStart, this);
		this.slide.node.on(Node.EventType.TOUCH_END, this.onSlideEnd, this);
		this.slide.node.on(Node.EventType.TOUCH_CANCEL, this.onSlideEnd, this);

        if (this._imgSlideTransform == null) {
			this._slideWidth = this.slide.getComponent(UITransform).width;
			this._imgSlideTransform = this.imgSlide.node.getComponent(UITransform);
		}
	}

	/**
	 * 设置拖动条参数
	 * @param minNum 最小值
	 * @param maxNum 最大值
	 */
	public Init(
        sliderComp: string,
		minNum: number,
		maxNum: number,
        curNum: number,
		onValueChange: Function = null,
		onValueChangeEnd: Function = null,
		onValueChangeStart: Function = null,
        that: any = null,
	): void {
        this._sliderCompName = sliderComp;
		this._min = minNum > maxNum ? maxNum : minNum;
		this._max = maxNum;
		this._curNum = curNum || this._min;
        this.slide.progress = maxNum == 0 ? 0 : (this._curNum / this._max);
		this._imgSlideTransform.width = this.slide.progress * this._slideWidth;
		this._onValueChange = onValueChange;
		this._onValueChangeStart = onValueChangeStart;
		this._onValueChangeEnd = onValueChangeEnd;
		this._that = that;
		this._onValueChange && this._onValueChange.call(this._that, this._curNum, this._max);

		this.emitChangeEvt();
	}

    private emitChangeEvt() {
        this.node.emit(SliderComp.EVENT_CHANGE, this._sliderCompName);
    }

	public updateMax(maxNum: number) {
		if (this._max == maxNum) return;
		this._max = maxNum < 0 ? 0 : maxNum;
		this.slide.progress = maxNum == 0 ? 0 : this._curNum / maxNum;
		this._imgSlideTransform.width = this.slide.progress * this._slideWidth;
		if (this._curNum > maxNum) {
			this._curNum = maxNum;
		}
	}

	private onClickAdd(evt: Event) {
		this.onClickAddSub(1);
	}

	private onClickSub(evt: Event) {
		this.onClickAddSub(-1);
	}

	//点击加减按钮
	private onClickAddSub(d: number): void {
		//let progress = this.slide.progress;
		//this._curNum = Math.floor(progress * this._max);
		let num: number = this._curNum + d;
		//输入数值不可超过min|max值
		num =
			num <= this._min
				? this._min
				: num >= this._max ? this._max : num;
		if (this._max <= 0) {
			this.slide.progress = 0;
		} else {
			this.slide.progress = num / this._max;
		}
		this._imgSlideTransform.width = this.slide.progress * this._slideWidth;
		this._curNum = num;
		this._onValueChange && this._onValueChange.call(this._that, this._curNum, this._max);
        this.emitChangeEvt();
		this._onValueChangeEnd && this._onValueChangeEnd.call(this._that, this._curNum, this._max);
	}

	//拖动条当前值变化后调用
	private valueChange(evt: Event): void {
		let prvNum = this._curNum;
		this._curNum = Math.floor(this.slide.progress * this._max);
		if (this._max <= 0) {
			this.slide.progress = 0;
		} else if (this._curNum < this._min) {
			this._curNum = this._min;
			this.slide.progress = this._curNum * (1 / this._max);
		}

		this._imgSlideTransform.width = this.slide.progress * this._slideWidth;
		if (prvNum != this._curNum) {
			this._onValueChange && this._onValueChange.call(this._that, this._curNum, this._max);
			this.emitChangeEvt();
		}
	}

	private onSlideStart() {
		this._onValueChangeStart && this._onValueChangeStart.call(this._that, this._curNum, this._max);
	}

	private onSlideEnd() {
		this._onValueChangeEnd && this._onValueChangeEnd.call(this._that, this._curNum, this._max);
	}

	/**
	 * 获取当前数值
	 */
	public get value(): number {
		return this._curNum;
	}

	public set value(value: number) {
		let num =
			value <= this._min
				? this._min
				: value >= this._max ? this._max : value;
		this._curNum = num;
		this.slide.progress = this._max > 0 ? (num / this._max) : 0;
		this._imgSlideTransform.width = this.slide.progress * this._slideWidth;
	}

	/**
	 * 获取最大输入值
	 */
	public get max(): number {
		return this._max;
	}

	/**
	 * 获取最大输入值
	 */
	public get min(): number {
		return this._min;
	}
}


