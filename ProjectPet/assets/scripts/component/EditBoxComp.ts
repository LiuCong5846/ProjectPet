import { _decorator, Component, EditBox, Node } from 'cc';
import Logger from '../core/utils/Logger';
import LocalUtils from '../tools/LocalUtils';
const { ccclass, property } = _decorator;

@ccclass('EditBoxComp')
export class EditBoxComp extends Component {
    @property(EditBox)
    private editBox: EditBox = null;

    private _editStr: string = "";
    get editStr() {
        return this._editStr;
    }

    private _thisArg: any = null;
    private _editingDidBeginFunc: (editStr: string, customData?: any, editEvt?: any) => void = null;
    private _editingDidEndFunc: (editStr: string, customData?: any, editEvt?: any) => void = null;
    private _textChangedFunc: (editStr: string, customData?: any, editEvt?: any) => void = null;
    private _editingReturnFunc: (editStr: string, customData?: any, editEvt?: any) => void = null;

    public Init(
        thisArg: any,
        editingDidEndFunc?: (editStr: string, customData?: any, editEvt?: any) => void,
        textChangedFunc?: (editStr: string, customData?: any, editEvt?: any) => void,
        editingDidBeginFunc?: (editStr: string, customData?: any, editEvt?: any) => void,
        editingReturnFunc?: (editStr: string, customData?: any, editEvt?: any) => void,
    ) {
        this._thisArg = thisArg;
        this._editingDidBeginFunc = editingDidBeginFunc;
        this._editingDidEndFunc = editingDidEndFunc;
        this._textChangedFunc = textChangedFunc;
        this._editingReturnFunc = editingReturnFunc;
    }

    private onEditingDidBegin(evt: any, customData: any) {
        this._editStr = this.editBox.string;

        !LocalUtils.isNil(this._editingDidBeginFunc) && this._editingDidBeginFunc.call(this._thisArg, this._editStr, customData, evt);
    }

    private onEditingDidEnd(evt: any, customData: any) {
        this._editStr = this.editBox.string;

        !LocalUtils.isNil(this._editingDidEndFunc) && this._editingDidEndFunc.call(this._thisArg, this._editStr, customData, evt);
    }

    private onTextChaged(evt: any, customData: any) {
        this._editStr = this.editBox.string;

        !LocalUtils.isNil(this._textChangedFunc) && this._textChangedFunc.call(this._thisArg, this._editStr, customData, evt);
    }

    private onEditingReturn(evt: any, customData: any) {
        this._editStr = this.editBox.string;

        !LocalUtils.isNil(this._editingReturnFunc) && this._editingReturnFunc.call(this._thisArg, this._editStr, customData, evt);
    }
}


