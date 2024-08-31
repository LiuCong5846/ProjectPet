import { SETTING_TYPE } from "../../GameSetting";

import { Singleton } from "../common/Singleton";
import { AudioEffect } from "../component/AudioEffect";
import { AudioMusic } from "../component/AudioMusic";
import StorageManager from "../storage/StorageManager";

export default class AudioManager extends Singleton {
    public static get Instance(): AudioManager {
        return this.getInstance<AudioManager>();
    }

    private music: AudioMusic;
    private effect: AudioEffect;

    private _volumeMusic: number = 0.5;
    private _volumeEffect: number = 1;
    private _switchMusic: boolean = true;//音乐开关
    private _switchEffect: boolean = true;//音效开关

    protected init() {
        this.music = new AudioMusic();
        this.effect = new AudioEffect();

        //设置音乐/音效声音
        this.music.volume = this._volumeMusic;
        this.effect.volume = this._volumeEffect;
    }

    /**
     * 设置本地声音保存项
     */
     public initLocalSetting() {
        //初始化音效音量
        let data = StorageManager.Instance.get(SETTING_TYPE.SET_MUSIC, 1);
        this._switchMusic = data == 1;

        data = StorageManager.Instance.get(SETTING_TYPE.SET_SOUND, 1);
        this._switchEffect = data == 1;
    }

    /**
     *  播放背景音乐
     * @param path        资源地址
     * @param callback   音乐播放完成事件
     */
    public playMusic(path: string, callback: Function | null = null) {
        this.music.loadPath(path);
        if (this._switchMusic) {
            this.music.playMusic();
            this.music.onComplete = callback;
        }
    }

    /**
     * 播放音效
     * @param path        资源地址
     */
    public playEffect(path: string) {
        if (this._switchEffect) {
            this.effect.load(path);
        }
    }

    /** 背景音乐音量 */
    public get musicVolume(): number {
        return this._volumeMusic;
    }

    public set musicVolume(value: number) {
        this._volumeMusic = value;
        this.music.volume = value;
    }

    /** 音效音量 */
    public get effectVolume(): number {
        return this._volumeEffect;
    }

    public set effectVolume(value: number) {
        this._volumeEffect = value;
        this.effect.volume = value;
    }

    /** 音乐开关 */
    public getSwitchMusic(): boolean {
        return this._switchMusic;
    }

    public setSwitchMusic(value: boolean) {
        if (this._switchMusic != value) {
            this._switchMusic = value;

            if (value) {
                this.music.playMusic();
            } else {
                this.music.stopMusic();
            }
        }
    }

    /** 音效开关 */
    public getSwitchEffect(): boolean {
        return this._switchEffect;
    }
    public setSwitchEffect(value: boolean) {
        if (this._switchEffect != value) {
            this._switchEffect = value;

            if (value == false) {
                this.effect.stop();
            }
        }
    }

    public resumeMusic() {
        if (this.music && !this.music.playing) {
            this.music.play();
        }
    }

    public pauseMusic() {
        if (this.music && this.music.playing) {
            this.music.pause();
        }
    }

    public resumeAll() {
        if (this.music) {
            this.music.play();
        }
        if (this.effect) {
            this.effect.play();
        }
    }

    public pauseAll() {
        if (this.music) {
            this.music.pause();
            this.effect.pause();
        }
    }

    public stopAll() {
        if (this.music) {
            this.music.stop();
            this.effect.stop();
        }
    }
}