import { AudioClip, AudioSource } from 'cc';
import ResLoadManager from '../res/ResLoadManager';
import Logger from '../utils/Logger';



/**
 * 注：用playOneShot播放的音乐效果，在播放期间暂时没办法即时关闭音乐
 */

/** 游戏音效 */
export class AudioEffect extends AudioSource {
    private effects: Map<string, AudioClip> = new Map<string, AudioClip>();
    
    public load(path: string, callback?: Function) {
        let effect = this.effects.get(path);
        if (!effect) {
            ResLoadManager.Instance.loadAudioClip(path).then((data: AudioClip) => {
                this.effects.set(path, data);
                this.playOneShot(data);
                callback && callback();
            }).catch((err:any)=>{
                Logger.error(err);
            });
        } else {
            this.playOneShot(effect);
            callback && callback();
        }
    }

    public releaseAll() {
        for (let key in this.effects) {
            ResLoadManager.Instance.release(key);
        }
        this.effects.clear();
    }
}
