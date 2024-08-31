import { _decorator, Component, EventKeyboard, KeyCode, Node } from 'cc';
import LocalUtils from '../tools/LocalUtils';
import GameManager from '../manager/GameManager';
import TimerManager from '../core/timer/TimerManager';
import { EGameLayers } from '../common/Types';
import ResLoadManager from '../core/res/ResLoadManager';
import ResManager from '../manager/ResManager';
import { HomeControl } from '../ui/home/HomeControl';
import EventManager from '../core/event/EventManager';
import { EventName } from '../common/EventName';
import Logger from '../core/utils/Logger';
import { HomeView } from '../ui/home/HomeView';
import { LoginControl } from '../ui/login/LoginControl';
import GameProtocolManager from '../manager/GameProtocolManager';
const { ccclass, property } = _decorator;

@ccclass('Game')
export default class Game extends Component {
    @property(Node)
    public homeLayer: Node = null;

    @property(Node)
    public panelLayer: Node = null;

    @property(Node)
    public popLayer: Node = null;

    @property(Node)
    public tipLayer: Node = null;

    @property(Node)
    public loginLayer: Node = null;

    @property(Node)
    public blockLayer: Node = null;

    protected onLoad() {
        LocalUtils.onInputKeyDown(this.onKeyDown, this);
    }

    start() {
        GameManager.Instance.layerMap.set(EGameLayers.HOME_LAYER, this.homeLayer);
        GameManager.Instance.layerMap.set(EGameLayers.PANEL_LAYER, this.panelLayer);
        GameManager.Instance.layerMap.set(EGameLayers.POP_LAYER, this.popLayer);
        GameManager.Instance.layerMap.set(EGameLayers.TIP_LAYER, this.tipLayer);
        GameManager.Instance.layerMap.set(EGameLayers.LOGIN_LAYER, this.loginLayer);
        GameManager.Instance.layerMap.set(EGameLayers.BLOCK_LAYER, this.blockLayer);
        GameManager.Instance.setBlockInputLayerVisible();

        GameProtocolManager.Instance.registerProtocolHandlers();

        LoginControl.Instance.openPanel();
    }



    protected update(dt: number) {
        TimerManager.Instance.update(dt);
    }

    private onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.MOBILE_BACK:
                GameManager.Instance.exitGame();
                break;
        }
    }
}


