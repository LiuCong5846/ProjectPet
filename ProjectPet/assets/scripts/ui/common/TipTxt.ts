import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TipTxt')
export class TipTxt extends Component {
    @property(Label)
    private lab: Label = null;

    public setTxt(txt: string) {
        this.lab.string = txt;
    }
}

