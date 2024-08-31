import { _decorator, Component, Node } from 'cc';
import { TabButton } from './TabButton';
import LocalUtils from '../tools/LocalUtils';
const { ccclass, property } = _decorator;

@ccclass('TabView')
export class TabView extends Component {
    @property([TabButton])
    private tabs: Array<TabButton> = [];

    @property([Node])
    private pages: Array<Node> = [];

    private thisArg: any;
    private changeFunc: (idx: number) => void = null;
    private clearFunc: (idx: number) => void = null;
    private checkFunc: (idx: number) => boolean = null;

    public Init(thisArg: any,
        changeFunc: (idx: number) => void,
        clearFunc: (idx: number) => void,
        checkFunc: (idx: number) => boolean,
        initIdx: number = -1,
    ) {
        this.thisArg = thisArg,
        this.changeFunc = changeFunc;
        this.clearFunc = clearFunc;
        this.checkFunc = checkFunc;

        this.tabs.forEach((tab, idx) => {
            tab.check = idx === initIdx;
            tab.idx = idx;
            tab.setClickFunc(this.setTabBtnClicked, this);
        });

        this.pages.forEach((n, i) => n.active = i === initIdx);
    }

    private setTabBtnClicked(idx: number) {
        if (!this.onTabCheck(idx)) {
            return;
        }
        const findIdx = this.tabs.findIndex(tab => tab.check);
        if (findIdx >= 0) {
            this.onTabClear(findIdx);
        }
        this.onTabChange(idx);
    }

    private onTabChange(idx: number) {
        this.tabs[idx].check = true;
        this.pages[idx].active = true;
        this.changeFunc.call(this.thisArg, idx);
    }

    private onTabClear(idx: number) {
        this.tabs[idx].check = false;
        this.pages[idx].active = false;
        this.clearFunc.call(this.thisArg, idx);
    }

    private onTabCheck(idx: number) {
        return this.checkFunc.call(this.thisArg, idx);
    }
}


