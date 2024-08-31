import { AudioClip, AudioSource } from "cc";
import ResLoadManager from "../res/ResLoadManager";


/** 背景音乐 */
export class AudioMusic extends AudioSource {
    public onComplete: Function | null = null;

    private _progress: number = 0;
    private _path: string | null = null;
    private _isPlay: boolean = false;
    private _isloop: boolean = false;

    /**
     * 设置音乐当前播放进度
     */
    public get progress() {
        this._progress = this.currentTime / this.duration;
        return this._progress;
    }

    public set progress(value: number) {
        this._progress = value;
        this.currentTime = value * this.duration;
    }

    public loadPath(path: string, isloop: boolean = true) {
        this._path = path;
        this._isloop = isloop;
        this.stopMusic();
    }

    public loadAndPlay() {
        ResLoadManager.Instance.loadAudioClip(this._path).then((data: AudioClip) => {
            if (this.playing) {
                this._isPlay = false;
                this.stop();
            }

            this.clip = data;
            this.currentTime = 0;
            this.loop = this._isloop;
            this.play();
        });
    }

    public playMusic() {
        // TODO
        return;
        if (this.clip == null) {
            this.loadAndPlay();
        } else {
            this.play();
        }
    }

    public stopMusic() {
        this.stop();
        this.clip = null;
        this.currentTime = 0;
        this.loop = false;
    }

    release() {
        if (this._path) {
            ResLoadManager.Instance.release(this._path);
            this._path = null;
        }
    }
}
