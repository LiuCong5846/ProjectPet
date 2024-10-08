import { _decorator, Component, Node, LabelComponent, Label, EditBox } from 'cc';
import ViewBase from '../../core/mvc/ViewBase';
import { ButtonComp } from '../../component/ButtonComp';
import { HomeControl } from '../home/HomeControl';
import TimerManager from '../../core/timer/TimerManager';
import EventManager from '../../core/event/EventManager';
import { EventName } from '../../common/EventName';
import Logger from '../../core/utils/Logger';
import { LoginControl } from './LoginControl';
import ProtocolManager from '../../core/network/ProtocolManager'
import { EProtocalPostName, EProtocolGetName } from '../../protocol/ProtocolName';
import { IHttpMethod } from '../../core/network/HttpManager';
import GameProtocolManager from '../../manager/GameProtocolManager';
import { WECHAT } from 'cc/env';
import { SdkManager } from '../../manager/SdkManager';
import GameManager from '../../manager/GameManager';
import GameConfig from '../../GameConfig';
const { ccclass, property } = _decorator;

@ccclass('LoginView')
export class LoginView extends ViewBase {
    @property(ButtonComp)
    private loginBtn: ButtonComp = null;
    @property(ButtonComp)
    private loginBtn2: ButtonComp = null;
    @property(Label)
    private loginLab: Label = null;
    @property(Node)
    private debugNode: Node = null;
    @property(EditBox)
    private editBox: EditBox = null;

    protected _show(): void {
        this.loginLab.string = "";
        
        this.loginBtn.setClickFunc(this.onLoginBtnClocked, this);
        this.loginBtn2.setClickFunc(this.onLoginBtnClockedAgain, this);

        this.loginBtn.node.active = true;
        this.loginBtn2.node.active = false;

        this.debugNode.active = false;
        if (WECHAT) {
            this.debugNode.active = false;
        }
    }

    private onLoginBtnClocked() {
        this.loginBtn.node.active = false;
        this.loginLab.string = "登入中...";
        if (WECHAT) {
            SdkManager.Instance.login(
                this.onWXLoginHangleS,
                this.onWXLoginHangleF,
                this,
            );
        } else {
            this.loginGameS();
        }
    }

    private onDebugLoginBtnClicked() {
        this.loginGameS();
    }

    private onLoginBtnClockedAgain() {
        this.loginBtn2.node.active = false;

        this.onSendLogin();
    }

    private onWXLoginHangleS() {
        this.onSendLogin();
    }

    private onSendLogin() {
        GameProtocolManager.Instance.sendLogin(
            this.loginGameS,
            this.loginGameF,
            this,
        );
    }

    private onWXLoginHangleF() {
        this.loginLab.string = "微信登入失败";
    }

    private async loginGameS() {
        const flag = await GameManager.Instance.loginGame();
        if (!flag) {
            this.loginLab.string = "获取用户信息失败";
            this.loginBtn2.node.active = true;
            return;
        }

        await HomeControl.Instance.openPanel();
        LoginControl.Instance.closePanel();
    }
    private loginGameF() {
        this.loginLab.string = "登入失败";
        this.loginBtn2.node.active = true;
    }

    private editBoxHandle() {
        GameConfig.code = this.editBox.string.trim();
        Logger.log("Update Code: ", GameConfig.code);
    }
}


