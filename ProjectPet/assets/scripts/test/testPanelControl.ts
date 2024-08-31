import { Node } from "cc";
import ControlBase from "../core/mvc/ControlBase";

export class testPanelControl extends ControlBase {
    public static get Instance(): testPanelControl {
        return this.getInstance<testPanelControl>();
    }

    protected prefabPath = "prefab/testPanel"
}

