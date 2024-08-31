import { _decorator, Component, Enum, instantiate, Node, Prefab } from 'cc';
import { GList, InitParam } from './GList';
import ResManager from '../manager/ResManager';
import { GListCell } from './GListCell';
const { ccclass, property } = _decorator;

enum EListCellType {
    PREFAB = 0,
    NODE,
}

@ccclass('VirtualList')
export class VirtualList extends Component {
    @property(GList)
    public gList: GList = null;

    @property
    private _cellType: EListCellType = EListCellType.PREFAB;
    @property({
        type: Enum(EListCellType)
    })
    get cellType() {
        return this._cellType;
    }
    set cellType(tp: EListCellType) {
        this._cellType = tp;
        this.setCellSample();
    }

    @property({
        type: Prefab,
        visible() {
            return this.cellType === EListCellType.PREFAB;
        } 
    })
    private cellPrefab: Prefab = null;

    @property({
        type: Node,
        visible() {
            return this.cellType === EListCellType.NODE;
        }
    })
    private cellNode: Node = null;

    protected cellSample: Prefab | Node = null;
    private setCellSample() {
        this.cellSample = this.cellType === EListCellType.PREFAB ? this.cellPrefab : this.cellNode;
    }

    private list: Array<any> = null;

    protected onLoad(): void {
        this.setCellSample();
    }

    public Init(
        list: Array<any>,
        cellSize: number,
        identifer: string,
        params: any = null,
        clearPoool: boolean = false,
        isElastic: boolean = true,
        callback: Function = null
    ) {
        this.list = list;
        this.gList.Init(this, {
            getCellNumber: (() => this.list.length),
            getCellSize: (() => cellSize),
            getCellIdentifer: (() => identifer),
            getCellView: (() => {
                const node = ResManager.instantiate(this.cellSample);
                !node.active && (node.active = true);
                const cell = node.getComponent(GListCell);
                return cell;
            }),
            getCellData: ((idx) => this.list[idx]),
            getCellUtilParam: (() => params),
        }, clearPoool, isElastic, callback);
    }

    public Reload(newList: Array<any>, keepPos: boolean = true, allclean: boolean = false) {
        this.list = newList;
        this.gList.Reload(keepPos, allclean);
    }


}


