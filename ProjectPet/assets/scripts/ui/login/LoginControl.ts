import { Node } from "cc";
import ControlBase from "../../core/mvc/ControlBase";
import { LoginView } from "./LoginView";
import GameManager from "../../manager/GameManager";
import { EGameLayers } from "../../common/Types";

export class LoginControl extends ControlBase {
    public static get Instance(): LoginControl {
        return this.getInstance<LoginControl>();
    }

    protected viewBase: LoginView;
    protected prefabPath: string = "login/Login";
    protected parentNode: Node = GameManager.Instance.layerMap.get(EGameLayers.LOGIN_LAYER);
}


