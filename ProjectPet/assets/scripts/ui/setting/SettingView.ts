import { _decorator, Component, Node } from 'cc';
import ViewBase from '../../core/mvc/ViewBase';
import { ButtonComp } from '../../component/ButtonComp';
import { SettingControl } from './SettingControl';
import { SliderComp } from '../../component/SliderComp';
import Logger from '../../core/utils/Logger';
import GameManager from '../../manager/GameManager';
import { SwitchComp } from '../../component/SwitchComp';
const { ccclass, property } = _decorator;

@ccclass('SettingView')
export class SettingView extends ViewBase {
    @property(ButtonComp)
    public btnClose: ButtonComp = null;

    @property(Node)
    public rectMaskNode: Node = null;

    @property(SliderComp)
    public sliderComp: SliderComp = null;

    @property(SwitchComp)
    public switchMusicSwitch: SwitchComp = null;

    @property(SwitchComp)
    public switchVibratePhone: SwitchComp = null;

    @property(ButtonComp)
    public btnSignIn: ButtonComp = null;

    @property(ButtonComp)
    public btnWechat: ButtonComp = null;

    @property(ButtonComp)
    public btnNoAD: ButtonComp = null;

    @property(ButtonComp)
    public btnPollcy: ButtonComp = null;

    protected _show() {
        this.btnClose.setClickFunc(this.onBtnCloseClicked, this);
        this.rectMaskNode.on(Node.EventType.TOUCH_END, this.onBtnCloseClicked, this);
        this.sliderComp.Init(
            "SETTING_SUOND_VOLUE",
            0,
            10,
            GameManager.Instance.musicVolume * 10,
            this.onSliderValueChange,
            this.onSliderValueChange,
            this.onSliderValueChange,
            this,
        );
        this.switchMusicSwitch.setSwichStatus(GameManager.Instance.musicSwitch);
        this.switchMusicSwitch.setClickFunc(this.onMusicSwitchClicked, this);
        this.switchVibratePhone.setSwichStatus(GameManager.Instance.vibratePhoneSwitch);
        this.switchVibratePhone.setClickFunc(this.onVibratePhoneClicked, this);
        this.btnSignIn.setClickFunc(this.onBtnSignInClicked, this);
        this.btnWechat.setClickFunc(this.onBtnWechatClicked, this);
        this.btnNoAD.setClickFunc(this.onBtnNoADClicked, this);
        this.btnPollcy.setClickFunc(this.onBtnPollcyClicked, this);
    }

    protected _close() {
        this.rectMaskNode.off(Node.EventType.TOUCH_END, this.onBtnCloseClicked, this);
    }

    private onBtnCloseClicked() {
        SettingControl.Instance.closePanel();
    }

    private onSliderValueChange(curNum: number, maxNum: number) {
        Logger.log("curNum: ", curNum);
        Logger.log("maxNum: ", maxNum);
        GameManager.Instance.musicVolume = curNum * (1 / 10);
    }

    private onMusicSwitchClicked(status: boolean) {
        GameManager.Instance.musicSwitch = status;
    }

    private onVibratePhoneClicked(status: boolean) {
        GameManager.Instance.vibratePhoneSwitch = status;
    }

    private onBtnSignInClicked() {
        Logger.log("打开签到板");
    }

    private onBtnWechatClicked() {
        Logger.log("打开微信");
    }

    private onBtnNoADClicked() {
        Logger.log("onBtnNoADClicked");
    }

    private onBtnPollcyClicked() {
        Logger.log("onBtnPollcyClicked");
    }
}


