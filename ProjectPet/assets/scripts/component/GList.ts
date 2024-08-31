import { Component, Enum, Graphics, Mask, Node, NodePool, ScrollView, UITransform, Vec2, Widget, _decorator, tween, v2, v3 } from "cc";

import { GListCell } from "./GListCell";
import { GListRender } from "./GListRender";
import LocalUtils from "../tools/LocalUtils";
import Logger from "../core/utils/Logger";

const { ccclass, property, executionOrder } = _decorator;

enum Direction {
    vertical = 1,
    horizontal,
}

interface GetCellNumber {
    /**
     * 返回这个 List 中数据的总数量
     */
    (): number;
}

interface GetCellIdentifer {
    /**
     * 通过数据的下标返回这个 Cell 的表现类型的标志
     * @param dataIndex: 当前 Cell 所渲染的数据在列表中的下标
     */
    (dataIndex?: number): string;
}

interface GetCellSize {
    /**
     * 通过数据的下标返回这个 Cell 的尺寸（垂直 List 为高度，水平 List 为宽度）
     * @param dataIndex: 当前 Cell 所渲染的数据在列表中的下标
     */
    (dataIndex?: number): number;
}

interface GetCellView {
    /**
     * 获取一个 Cell 的 View 实例，记住这个控件必须已经挂在一个存在的 Node 上
     * @param dataIndex: 当前 Cell 所渲染的数据在列表中的下标
     * @param identifier: 这个 Cell 的表现类型标志
     * 
     * 这个回调函数只会出现在已经没有可以重用的 Cell 时，List 才会向这个函数请求新的 Cell 实例
     * 所有已经请求的 Cell 实例都会被重复利用。
     */
    (dataIndex?: number, identifier?: string): GListCell;
}

interface GetCellData {
    /**
     * 根据一个 Cell 的下标获取一个 Cell 的数据，这个数据会作为 Cell 的 UpdateContent 的参数
     * 这个回调是可选的，可以不提供，如果不提供的话，Cell 需要自己在 UpdateContent 中向其他模块获取更新自己内容的数据
     */
    (dataIndex?: number): any;
}

interface GetCellUtilParam {
    (dataIndex?: number): any;
}

interface GetCellOffset {
    (dataIndex?: number): Vec2;
}

interface GetCellKey {
    (dataIndex?: number): string;
}

interface GetCellNodeSiblingIndex {
    (dataIndex?: number): number;
}

interface GetCellName {
    /**
     * 获取单元名字
     */
    (dataIndex?: number): string;
}

interface OnLoadCompleted {
    /**
     *  table 加载完成，cellsOffset有数值
     */
    ()
}

interface OnScrollBegan {
    /**
     * 滚动开始，
     */
    (): void
}

interface OnScrolling {
    /**
     * 滚动中
     */
    (): void
}

interface OnScrollEnded {
    /**
     * 滚动结束，
     */
    (): void
}

interface OnScrollToBottom {
    /**
     * 滚动到底部，
     */
    (): void
}

interface OnDestroyed {
    /**
     *  table 销毁时，cellsOffset有数值
     */
    (cellIndex: number): void
}

export interface InitParam {
    getCellNumber: GetCellNumber,
    getCellSize: GetCellSize,
    getCellIdentifer: GetCellIdentifer,
    getCellView: GetCellView,
    getCellData?: GetCellData,
    onLoadCompleted?: OnLoadCompleted,
    onScrollBegan?: OnScrollBegan,
    onScrolling?: OnScrolling,
    onScrollEnded?: OnScrollEnded,
    onScrollToBottom?: OnScrollToBottom,
    onDestroyed?: OnDestroyed,
    getCellUtilParam?: GetCellUtilParam,
    getCellOffset?: GetCellOffset,
    getCellKey?: GetCellKey,
    getCellNodeSiblingIndex?: GetCellNodeSiblingIndex,
    getCellName?: GetCellName
}

interface CellPools {
    [index: string]: NodePool;
}

@ccclass
@executionOrder(-5000)
export class GList extends Component {
    @property(ScrollView)
    public scrollView: ScrollView = null;

    @property({
        type: Enum(Direction),
        tooltip: "List 滚动的方向，可以选择垂直或者水平"
    })
    public direction = Direction.vertical;

    @property({
        tooltip: "cell 之间的像素间隔，最开始和最后面不会添加"
    })
    public spacing = 0;

    @property({ tooltip: "List 顶部（水平滚动则是最左边）的间隔空间" })
    public headPadding = 0;

    @property({ tooltip: "List 底部（水平滚动则是最右边）的间隔空间" })
    public bottomPadding = 0;

    @property({ tooltip: "侧边的间距，垂直滚动就是左右边的间距，水平滚动就是上下边的间距" })
    public sidePadding: Vec2 = new Vec2(0, 0);

    @property({ tooltip: "是否开启重渲染用来降低dc 子节点需要GListRenderCell" })
    public isRender: boolean = false;

    private _contentTransform: UITransform = null;
    private _nodeTransform: UITransform = null;

    //是否开启回弹
    private _isElastic: boolean = true;

    //组件所属的this
    private _thisArg: any = null;

    /**无特殊需求clearPool默认即可 isElastic是否回弹*/
    public Init(thisArg: any, p: InitParam, clearPoool: boolean = false, isElastic: boolean = true, callback: Function = null) {
        this._thisArg = thisArg;
        this._isElastic = isElastic;
        this._init(p, clearPoool);
        callback && callback();
    }


    public InitWithInitIdx(thisArg: any, p: InitParam, initIdx?: number, allClean?: boolean) {
        if (LocalUtils.isNil(initIdx) || initIdx <= 0) {
            this.Init(thisArg, p);
        } else {
            this._thisArg = thisArg;
            this._initWithInitIdx(p, initIdx, allClean);
        }
    }


    /**
     * 数据缓存记得提前更改
     * @param addNums 添加子项的数量
     */
    public pushListCells(addNums: number = 1) {
        if (addNums < 0) {
            this.popListCells(-addNums);
            return;
        }
        if (addNums === 0) {
            return;
        }
        let oriCellNums = this._totalCellNums;
        this._totalCellNums += addNums;
        let offset = this._totalTransformLength - (this.bottomPadding || 0);
        for (let i = 0; i < addNums; i++) {
            const idx = oriCellNums + i;
            let s = this._delegate.getCellSize.call(this._thisArg, idx) || 0;
            this._cellsSize.push(s);
            offset += s + (this.spacing || 0);
            this._cellsOffset.push(offset);
        }
        offset += this.bottomPadding || 0;
        this._totalTransformLength = offset;
        this._updateContentTransformSize();
    }

    /**
     * 数据缓存记得提前更改
     * @param subNums 减少子项的数量
     */
    public popListCells(subNums: number = 1) {
        if (subNums < 0) {
            this.pushListCells(-subNums);
            return;
        }
        if (subNums === 0) {
            return;
        }
        this._totalCellNums -= subNums;
        let offset = this._totalTransformLength - (this.bottomPadding || 0);
        for (let i = 0; i < subNums; i++) {
            let s = this._cellsSize.pop();
            offset -= s + (this.spacing || 0);
            this._cellsOffset.pop();
        }
        offset += this.bottomPadding || 0;
        this._totalTransformLength = offset;
        this._updateContentTransformSize();
    }

    /**
     * 数据缓存记得提前更改
     * 根据索引删除某一项
     * @param idx 
     * @returns 
     */
    public spliceListCellByIndex(idx: number) {
        if (idx < 0 || idx >= this._totalCellNums) {
            return;
        }

        let offset = this._totalTransformLength - (this.bottomPadding || 0);
        let s = this._cellsSize[idx];
        const oriOffset = s + (this.spacing || 0);
        offset -= oriOffset;
        this._cellsSize.splice(idx, 1);
        offset += this.bottomPadding || 0;
        this._totalTransformLength = offset;

        this._cellsOffset.splice(idx, 1);
        for (let i = idx; i < this._totalCellNums; i++) {
            this._cellsOffset[i] -= oriOffset;
        }
        this._totalCellNums = Math.max(0, this._totalCellNums - 1);

        this._updateContentTransformSize();

        if (this._totalCellNums <= 0) {
            this.clearAndStop();
        } else {
            this._refreshActiveCellsOnManual();
        }
    }

    public playMove(cellIndex: number, moveLength: number, bShow: boolean, bClear: boolean = false) {
        let actionTime = 0.1;
        let realThis = this;
        if (bShow) {
            realThis.Reload(true, bClear);
        } else {
            realThis.node.pauseSystemEvents(true);
            this.scheduleOnce(() => {
                realThis.Reload(true, bClear);
                realThis.node.resumeSystemEvents(true);
            }, actionTime);
        }
        let arTemp = new Array<GListCell>();
        arTemp = arTemp.concat(this._activeCellViews);
        arTemp.sort((cell1: GListCell, cell2: GListCell): number => {
            if (cell1.node.position.y > cell2.node.position.y) {
                return -1;
            } else if (cell1.node.position.y < cell2.node.position.y) {
                return 1;
            }
            return 0;
        });
        for (let [index, data] of Array.from(arTemp.entries())) {
            if (index + arTemp[0].dataIndex > cellIndex) {
                if (bShow) {
                    let x = data.node.position.x + data.node.position.x;
                    let y = data.node.position.y + moveLength;
                    data.node.setPosition(x, y);
                    tween(data.node).by(actionTime, { position: v3(0, -moveLength) });
                    //data.node.runAction(cc.moveBy(actionTime, new Vec2(0, -moveLength)));
                } else {
                    tween(data.node).by(actionTime, { position: v3(0, moveLength) });
                    //data.node.runAction(cc.moveBy(actionTime, new Vec2(0, moveLength)));
                }
            }
        }
    }

    /**
     * Reload 整个 List，这时获取数据的回调函数会重新触发一遍，所有的 cell 也会更新一遍内容
     */
    public Reload(keepPos: boolean = false, allclean: boolean = false) {
        this.clearAndStop(keepPos, allclean);
        this._initDatas();
        this._load(false);
    }

    /**
     * 重新刷新当前显示 cell 的内容，不会重新载入整个列表
     * 所以如果列表的数据数量发生了变化，或是想要修改 Cell 的尺寸，调用 Refresh 是没有用处的，请调用 Reload
     */
    public Refresh() {
        this._updateActiveCellContent();
    }

    /**
     * 返回相对于 ScrollView 的这个 Cell 的滚动坐标
     * @param idx Cell 的索引下标
     */
    public GetScrollPosOfCell(idx: number): Vec2 {
        let sp = this._getCellPosOfIndex(idx);
        if (this.direction == Direction.vertical) {
            return new Vec2(0, sp);
        } else {
            return new Vec2(sp, 0);
        }
    }

    /**
     * 在规定的时间里滚动到指定的 Cell
     * @param idx 目标的 Cell 的下标
     */
    public ScrollToCell(idx: number, timeInSecond: number = 1, attenuated: boolean = true) {
        let pos = this.GetScrollPosOfCell(idx);
        this.scrollView.scrollToOffset(pos, timeInSecond, attenuated);
        if (timeInSecond == 0) {
            this._onScrolling();
        }
        // this._scrollView.scrollTo(pos, timeInSecond, attenuated);
    }
    public scrollToOffset(offset: Vec2, timeInSecond?: number, attenuated?: boolean) {
        this.scrollView.scrollToOffset(offset, timeInSecond, attenuated);
    }
    /**
     * 查看一个 Cell 是否当前可见
     * @param idx Cell 的下标
     */
    public IsCellVisible(idx: number): boolean {
        if (idx >= this._activeCellIndexRange.x && idx <= this._activeCellIndexRange.y) return true;
        else return false;
    }

    ////////////////////////////////////////////////////////////
    // Implenmentions
    ////////////////////////////////////////////////////////////

    private _debug = false;
    
    private _content: Node;
    get content() {
        return this._content;
    }
    private _delegate: InitParam;
    private _inited = false;

    private _scrollPosition = 0;
    private _activeCellIndexRange: Vec2;
    private _cellPools: CellPools = {};

    private _cellsOffset: Array<number>;	// bottom side of cell position
    private _cellsSize: Array<number>;
    private _activeCellViews = new Array<GListCell>();
    private _activeCellViewMap: Map<string, GListCell> = new Map();

    private _totalCellNums: number = 0;
    private _totalTransformLength: number = 0;

    public onLoad() {
        let widget = this.node.getComponent(Widget);
        if (widget) {
            widget.updateAlignment();
        }

        this._nodeTransform = this.node.getComponent(UITransform);

        // setup content node(which is root of every cell)
        this._content = this.scrollView.content;
        this._contentTransform = this._content.getComponent(UITransform);

        //开启重渲染 子节点需要添加GListRenderCell
        if (this.isRender) {
            this._content.addComponent(GListRender);
        }
        if (this._debug) {
            // set background color to content for debug use
            this._content.addComponent(Graphics);
        }

        // Everything OK, let's start
        this._inited = true;
    }

    /**
    public update() {
        if (this._debug) {
            let g = this._content.getComponent(Graphics);
            g.clear();
            g.fillColor = Color.YELLOW;
            g.fillRect(0, 0, this._contentTransform.width, this._contentTransform.height);
        }
    } */

    public onEnable() {
        // bind event to scrollview
        this.scrollView.node.on("scroll-began", this._onScrollBegan, this);
        this.scrollView.node.on("scrolling", this._onScrolling, this);
        this.scrollView.node.on("scroll-ended", this._onScrollEnded, this);
        this.scrollView.node.on("scroll-to-bottom", this._onScrollToBottom, this);
    }

    public onDisable() {
        this.scrollView.node.targetOff(this);
    }

    /**
    public setContentPos(slPos: number, x: number, y: number) {
        this._scrollPosition = slPos;
        this._content.setPosition(x, y);
        this._scrollView.stopAutoScroll();
        this._onScrolling();
    } */

    public onScrolling() {
        if (this.scrollView == null) return;
        this._onScrolling();
    }
    private _onScrolling() {
        if (!this._delegate) return;
        if (this._delegate.onScrolling) {
            this._delegate.onScrolling.call(this._thisArg);
        }
        const offset = this.scrollView.getScrollOffset();

        if (this.direction == Direction.vertical) {
            this._scrollPosition = offset.y;
        } else {
            this._scrollPosition = offset.x * -1;
        }

        // refresh active cell with new scroll position
        let cellCount: number = this._totalCellNums || 0;
        if (cellCount > 0) {
            this._refreshActiveCellsOnScrolling();
        }
    }

    private _onScrollBegan() {
        if (this._delegate && this._delegate.onScrollBegan) {
            this._delegate.onScrollBegan.call(this._thisArg);
        }
    }

    private _onScrollEnded() {
        if (this._delegate && this._delegate.onScrollEnded) {
            this._delegate.onScrollEnded.call(this._thisArg);
        }
    }

    private _onScrollToBottom() {
        if (this._delegate && this._delegate.onScrollToBottom) {
            this._delegate.onScrollToBottom.call(this._thisArg);
        }
    }

    private _init(p: InitParam, allclean?: boolean) {
        let needClear = false;
        if (this._delegate) needClear = true;
        this._delegate = p;
        if (this._inited) {
            if (needClear) this.clearAndStop(false, allclean);
            this._initDatas();
            this._load(true);
        }
    }

    private _initWithInitIdx(p: InitParam, initIdx?: number, allclean?: boolean) {
        let _allClean = !LocalUtils.isNil(allclean) ? allclean : true;
        let needClear = false;
        if (this._delegate) needClear = true;
        this._delegate = p;
        if (this._inited) {
            if (needClear) this.clearAndStop(false, _allClean);
            this._initDatas();
            this.scrollView.stopAutoScroll();
            let pos = this.GetScrollPosOfCell(initIdx || 0);
            let slPos = 0;
            if (this.direction == Direction.vertical) {
                slPos = Math.min(Math.max(0, this._totalTransformLength - this._nodeTransform.height), pos.y);
            } else {
                slPos = Math.min(Math.max(0, this._totalTransformLength - this._nodeTransform.width), pos.x);
            }
            this._scrollPosition = slPos;
            this._content.setPosition(
                this.direction == Direction.horizontal ? slPos : pos.x,
                this.direction == Direction.vertical ? slPos : pos.y
            );
            this._load(true);
        }
    }

    public clearAndStop(keepPos: boolean = false, allclean: boolean = false) {
        this.unscheduleAllCallbacks();
        if (this._activeCellViews) {
            while (this._activeCellViews.length > 0) {
                this._recycleCell(this._activeCellViews.length - 1, allclean);
            }
            if (allclean) {
                //清空pool
                for (const key in this._cellPools) {
                    let pool = this._cellPools[key];
                    let len = pool.size();
                    for (let i = 0; i < len; i++) {
                        let node = pool.get();
                        if (node) {
                            node.destroy();
                            node = null;
                        }
                    }
                    pool.clear();
                }
                this._cellPools = {};
                (this._content && this._content.children.length > 0) && this._content.destroyAllChildren();
            }
        }

        this._activeCellIndexRange = new Vec2(-1, -1);
        if (!keepPos) {
            this._scrollPosition = 0;
            if (this._content) {
                this._content.setPosition(0, 0);
            }
        }
    }

    private _initDatas() {
        this._totalCellNums = !LocalUtils.isNil(this._delegate) ? this._delegate.getCellNumber.call(this._thisArg) : 0;
        this._totalTransformLength = 0;

        if (this._totalCellNums <= 0) return;

        this._cellsOffset = new Array<number>(this._totalCellNums);
        this._cellsSize = new Array<number>(this._totalCellNums);

        let offset = this.headPadding;
        for (let i = 0; i < this._totalCellNums; i++) {
            let s = this._delegate.getCellSize.call(this._thisArg, i) || 0;
            this._cellsSize[i] = s;
            offset += s + (i == 0 ? 0 : this.spacing);
            this._cellsOffset[i] = offset;
        }
        offset += (this.bottomPadding || 0);
        this._totalTransformLength = offset;

        this._updateContentTransformSize();
    }

    private _updateContentTransformSize() {
        if (this.direction == Direction.vertical) {
            this._contentTransform.setContentSize(this._nodeTransform.width, this._totalTransformLength);
        } else {
            this._contentTransform.setContentSize(this._totalTransformLength, this._nodeTransform.height);
        }
    }

    public isStandInBottom() {
        if (this.direction == Direction.vertical) {
            if (this._totalTransformLength < this._nodeTransform.height) {
                return true;
            } else {
                return this._content.position.y >= Math.floor(this._totalTransformLength - this._nodeTransform.height - (this.bottomPadding || 0));
            }
        } else {
            if (this._totalTransformLength < this._nodeTransform.width) {
                return true;
            } else {
                return this._content.position.x >= Math.floor(this._totalTransformLength - this._nodeTransform.width - (this.bottomPadding || 0));
            }
        }
    }

    public isStandInTop() {
        if (this.direction == Direction.vertical) {
            if (this._totalTransformLength < this._nodeTransform.height) {
                return true;
            } else {
                return this._content.position.y <= Math.floor(this.headPadding || 0);
            }
        } else {
            if (this._totalTransformLength < this._nodeTransform.width) {
                return true;
            } else {
                return this._content.position.x <= Math.floor(this.bottomPadding || 0);
            }
        }
    }

    private _execute(generator: Generator, duration: number){
		return new Promise<void>(resolve =>{
			let gen = generator;
			//创建执行函数
			let func = ()=>{
                let iter=gen.next()
                if(null === iter || iter.done){
                    resolve();
                    return;
                }

                this.scheduleOnce(()=>{
                    func();
                });
				 
				 
			};
 
			//运行执行函数
			func();
		});
	}

    private* _generatorCell(range: Vec2){
		for (let i = range.x; i <= range.y; i++) {
			yield this._addCellView(i);
		}
	}

    private async _load(isFrame:boolean) {
        // get all cell offset with spacing and padding
        if (!this._delegate) return;

        if (this._totalCellNums <= 0) return;

        // create visible cells
        const range = this._getActiveCellIndexRange();
        this._activeCellIndexRange = range;

        this.scrollView.enabled = false;
        //分帧加载创建cell
        let isPool = Object.keys(this._cellPools).length > 0;
        if (isFrame && !isPool) {
            await this._execute(this._generatorCell(range), 1);
        } else {
            for (let i = range.x; i <= range.y; i++) {
                this._addCellView(i);
            }
        }
        
        if (this._delegate && this._delegate.onLoadCompleted) {
            this._delegate.onLoadCompleted.call(this._thisArg);
        }

        this.autoSetElasticState();

        this.scrollView.enabled = true;
    }

    private _refreshActiveCellsOnScrolling() {
        // update current active cells with new scroll position
        const range = this._getActiveCellIndexRange();
        // check if any cell need update
        if (range.equals(this._activeCellIndexRange)) return;

        // recycle all out of range cell
        let i = 0;
        while (i < this._activeCellViews.length) {
            let cell = this._activeCellViews[i];
            if (cell.dataIndex < range.x || cell.dataIndex > range.y) {
                this._recycleCell(i);
            } else {
                i++;
            }
        }

        // add any not exist cell
        // !TODO: boost this part effecient
        for (let i = range.x; i <= range.y; i++) {
            let needadd = true;
            for (let j = 0; j < this._activeCellViews.length; j++) {
                if (this._activeCellViews[j].dataIndex == i) {
                    needadd = false;
                    break;
                }
            }

            if (needadd) this._addCellView(i);
        }

        // update current active cell range
        this._activeCellIndexRange = range;
    }

    private _refreshActiveCellsOnManual() {
        const range = this._getActiveCellIndexRange();
        this._activeCellIndexRange = range;
        const keyArr: Array<{
            dataIndex: number;
            key: string;
        }> = [];
        for (let i = range.x; i <= range.y; i++) {
            keyArr.push({
                dataIndex: i,
                key: this.getCellMapKey(i),
            });
        }

        // recycle all out of range cell
        const activeKeys = Array.from(this._activeCellViewMap.keys());
        activeKeys.forEach((k1) => {
            const cell = this._activeCellViewMap.get(k1);
            if (LocalUtils.isNil(cell)) {
                return;
            };
            if (keyArr.findIndex((o) => o.key === k1) < 0) {
                this._recycleCell(cell.dataIndex);
            } else {
                this._updateCellContent(cell);
                let cellTransform: UITransform = cell.node.getComponent(UITransform);
                if (this.direction == Direction.vertical) {
                    cellTransform.setContentSize(this._nodeTransform.width - this.sidePadding.x - this.sidePadding.y, this._cellsSize[cell.dataIndex]);
                } else {
                    cellTransform.setContentSize(this._cellsSize[cell.dataIndex], this._nodeTransform.height - this.sidePadding.x - this.sidePadding.y);
                }
                cell.node.setPosition(this._caluCellPos(cell));
            }
        });

        // add any not exist cell
        keyArr.forEach((o) => {
            if (!this._activeCellViewMap.has(o.key)) {
                this._addCellView(o.dataIndex);
            }
        });
    }

    /**
     * remove one active cell from _activeCellViews array
     * @param cellIndex index of active cell views array
     */
    private _recycleCell(cellIndex: number, allclean: boolean = false) {
        // !TODO: need store this cell in node pool
        let cell = this._activeCellViews[cellIndex];
        if (LocalUtils.isNil(cell)) return;
        this._activeCellViews.splice(cellIndex, 1);
        cell.node.removeFromParent();
        const key = this.getCellMapKey(cellIndex);
        this._activeCellViewMap.has(key) && this._activeCellViewMap.delete(key);
        if (allclean) {
            cell.node.destroy();
            if (cell) {
                cell.node.destroy();
            }
            return;
        }
        cell.dataIndex = -1;
        if (!this._cellPools[cell.cellIdentifier]) {
            this._cellPools[cell.cellIdentifier] = new NodePool();
        }
        let pool = this._cellPools[cell.cellIdentifier];
        pool.put(cell.node);
    }

    private _getCellViewFromPool(id: string): GListCell | null {
        if (!this._cellPools[id]) return null;
        let pool = this._cellPools[id];
        let cellNode: Node = pool.get();
        if (!cellNode) return null;
        let cell = cellNode.getComponent(GListCell);
        return cell;
    }

    /**
     * Return vector2 for start and end cell index of current scroll position
     */
    private _getActiveCellIndexRange(): Vec2 {
        let startPos = this._scrollPosition;
        let endPos = startPos + (this.direction == Direction.vertical ? this._nodeTransform.height : this._nodeTransform.width);
        let startIndex = this._getCellIndexOfPos(startPos);
        startIndex = startIndex - 1 < 0 ? startIndex : startIndex - 1;
        return new Vec2(startIndex, this._getCellIndexOfPos(endPos));
    }

    private _getCellIndexOfPos(pos: number): number {
        // !TODO: boost this function speed by using binary search
        if (LocalUtils.isNil(this._cellsOffset)) return 0;
        for (let i = 0; i < this._cellsOffset.length; i++) {
            if (this._cellsOffset[i] >= pos) {
                return i;
            }
        }
        return this._cellsOffset.length - 1;
    }

    /**
     * Get cell top position by its index
     * @param idx Cell index
     */
    private _getCellPosOfIndex(idx: number): number {
        if (LocalUtils.isNil(this._cellsOffset)) return 0;
        return (this._cellsOffset[idx] || 0) - (this._cellsSize[idx] || 0);
    }

    private getCellMapKey(dataIndex: number) {
        return !LocalUtils.isNil(this._delegate.getCellKey)
            ? (this._delegate.getCellKey.call(this._thisArg, dataIndex) || String(dataIndex))
            : String(dataIndex);
    }

    private _addCellView(dataIndex: number) {
        const cell = this._addCellEntity(dataIndex);
        cell.otherParam = this._delegate.getCellUtilParam ? this._delegate.getCellUtilParam.call(this._thisArg, dataIndex) : null;
        cell.dataIndex = dataIndex;
        this._activeCellViews.push(cell);
        this._updateCellContent(cell);
    }

    private _addCellEntity(dataIndex: number) {
        let id = this._delegate.getCellIdentifer.call(this._thisArg, dataIndex);
        let cell = this._getCellViewFromPool(id);

        if (!cell) {
            cell = this._delegate.getCellView.call(this._thisArg, dataIndex);
            //cellTransform.setAnchorPoint(0, 1);
            cell.cellIdentifier = id;
        }
        if (this._delegate.getCellName != null) {
            cell.node.name = this._delegate.getCellName.call(this._thisArg, dataIndex);
        } else {
            cell.node.name = id + dataIndex.toString();
        }
        cell.dataIndex !== dataIndex && (cell.dataIndex = dataIndex);
        this._activeCellViewMap.set(this.getCellMapKey(dataIndex), cell);
        let cellTransform: UITransform = cell.node.getComponent(UITransform);
        //cell.enabled = true;
        this._content.addChild(cell.node);

        if (this.direction == Direction.vertical) {
            cellTransform.setContentSize(this._nodeTransform.width - this.sidePadding.x - this.sidePadding.y, this._cellsSize[dataIndex]);
        } else {
            cellTransform.setContentSize(this._cellsSize[dataIndex], this._nodeTransform.height - this.sidePadding.x - this.sidePadding.y);
        }

        cell.node.setPosition(this._caluCellPos(cell));

        if (!LocalUtils.isNil(this._delegate.getCellNodeSiblingIndex)) {
            const zIndex = this._delegate.getCellNodeSiblingIndex.call(this._thisArg, dataIndex);
            if (!LocalUtils.isNil(zIndex)) {
                Logger.log(`cell_zIndex_${dataIndex}`, zIndex);
                cell.node.setSiblingIndex(zIndex);
            }
        }

        return cell;
    }

    private _caluCellPos(cell: GListCell) {
        let x = 0, y = 0;
        if (this.direction == Direction.vertical) {
            x = this.sidePadding.x;
            y = (this._cellsOffset[cell.dataIndex] - this._cellsSize[cell.dataIndex]) * -1;
        } else {
            x = (this._cellsOffset[cell.dataIndex] - this._cellsSize[cell.dataIndex]);
            y = this.sidePadding.x * -1;
        }
        const offset = (this._delegate.getCellOffset && this._delegate.getCellOffset.call(this._thisArg)) || v2(0, 0);
        let ox = x + offset.x;
        let oy = y + offset.y;
        return v3(ox, oy);//return v3(x, y).add(v3(offset.x, offset.y, 0))
    }

    private _updateActiveCellContent() {
        this._activeCellViews.forEach(cell => {
            this._updateCellContent(cell);
        });
    }

    private _updateCellContent(cell: GListCell) {
        if (LocalUtils.isNil(cell)) {
            return;
        };
        let data = null;
        if (this._delegate.getCellData) {
            data = this._delegate.getCellData.call(this._thisArg, cell.dataIndex);
        }

        cell.UpdateContent(data, cell.dataIndex, cell.otherParam);
    }

    public stopImmediately() {
        if (this.scrollView && this.scrollView.isAutoScrolling()) {
            this.scrollView.stopAutoScroll();
        }
    }

    /**
     * 获取当前可见的第一个cell的索引
     */
    public getActiveCellIndex() {
        let index: number = 0;
        if (this._activeCellViews && this._activeCellViews.length > 0) {
            index = this._activeCellViews[0].dataIndex;
        }
        return index;
    }

    public getActiveCellsNumber() {
        return this._activeCellViews ? this._activeCellViews.length : 0;
    }

    onDestroy() {
        this.unscheduleAllCallbacks();
        if (this._delegate && this._delegate.onDestroyed) {
            let cellIndex: number = this.getActiveCellIndex();
            this._delegate.onDestroyed.call(this._thisArg, cellIndex);
        }

        //清空pool
        for (const key in this._cellPools) {
            let pool = this._cellPools[key];
            let len = pool.size();
            for (let i = 0; i < len; i++) {
                let node = pool.get();
                if (node) {
                    node.destroy();
                    node = null;
                }
            }
            pool.clear();
        }
        this._cellPools = {};

        //this._content.destroyAllChildren();
        this._activeCellViews.length = 0;
    }


    // 当内容少于tableview尺寸时，不能拉动及回弹
    public autoSetElasticState() {
        if (!this._isElastic) {
            this.scrollView.elastic = false;
            return;
        }
        let tableWidth = this._nodeTransform.width;
        let tableHeight = this._nodeTransform.height;
        let canElastic: boolean = true;
        if (this.direction == Direction.horizontal) {
            if (tableWidth > this._contentTransform.width) {
                canElastic = false;
            }
        }
        else {
            if (tableHeight > this._contentTransform.height) {
                canElastic = false;
            }
        }
        this.setElasticState(canElastic);
    }

    public setElasticState(state: boolean) {
        this.scrollView.elastic = state;
    }

    public getActiveCellIndexRange(): Array<number> {
        let cellRange: Array<number> = new Array<number>()
        let range: Vec2 = this._getActiveCellIndexRange();
        cellRange.push(range.x, range.y);
        return cellRange;
    }

    public getActiveViews(): Array<GListCell> {
        return this._activeCellViews ? this._activeCellViews : null;
    }

    public getSrollView(): ScrollView {
        return this.scrollView;
    }

    public drawMastFilletedConner(radius: number) {
        this.scheduleOnce(() => {
            LocalUtils.drawMastFilletedConner(radius, this.scrollView.content.parent.getComponent(Mask), this.node.getComponent(UITransform));
        }, 0);
    }

    public getScrollOffset() {
        if (LocalUtils.isNil(this.scrollView)) {
            return null;
        }
        return this.scrollView.getScrollOffset();
    }
}