import { _decorator, Component, Node } from 'cc';
import LocalUtils from '../../tools/LocalUtils';
const { ccclass, property } = _decorator;

@ccclass('ViewBase')
export default class ViewBase extends Component {
    private visible: boolean = false;

    public getParentNodeCache() {
        if (!LocalUtils.isNil(this.node)) {
            return this.node.parent;
        }
        return null;
    }

    public async onOpen(...param: any[]): Promise<void> {
        this.node.active = true;
        await this._open(...param);
    }

    protected async _open(...param: any[]): Promise<void> {

    }

    public async onClose(): Promise<void> {
        this.node.active = false;
        this._close();
    }

    protected _close(): void {

    }

    public onShow(): void {
        if (this.visible) return;
        this.visible = this.node.active = true;
        this._show();
    }

    protected _show(): void {

    }

    public onHide(): void {
        if (!this.visible) return;
        this.visible = this.node.active = false;
        this._hide();
    }

    protected _hide(): void {

    }
}

