import GameConfig from "../../GameConfig";
import ConfigManager from "../config/ConfigManager";
import LocalStringManager from "../config/LocalStringManager";
import { CompleteCallback, ProgressCallback } from "../res/ResLoadManager";


/**
 * 解压顺序 一个一个解压 
 * TODO 如果有正在解压的 可放入队列中
 */
export default class JSZipUtil {
    private static _fileNames: string[] = [];
    private static _fileNameLen: number = 0;
    private static _zip: JSZip = null;

    /**
     * 读取文本类（txt和json）压缩文件
     * @param data 
     * @param onProgress 
     */
    public static readTextZip(data: ArrayBuffer, onProgress?: ProgressCallback, onComplete?: CompleteCallback) {
        this._fileNames.length = 0;
        JSZip.loadAsync(data).then((zip: JSZip) => {
            const files = zip.files;
            for (const name in files) {
                if (name.indexOf('.txt') > -1 || name.indexOf('.json') > -1) {
                    this._fileNames.push(name);
                }
            }
            this._zip = zip;
            this._fileNameLen = this._fileNames.length;
            this.loadTextFile(onProgress, onComplete);
        });
    }

    //加载文件
    private static loadTextFile(onProgress?: ProgressCallback, onComplete?: CompleteCallback) {
        let jsonName: string = this._fileNames.shift();
        let curIndex = this._fileNameLen - this._fileNames.length;
        onProgress && onProgress(curIndex, this._fileNameLen, 1);
        if (this._zip) {
            this._zip.file(jsonName).async("text").then((content: string) => {
                let data = null;
                let extIndex = jsonName.indexOf('.json');
                if (extIndex > -1) {
                    try {
                        data = JSON.parse(content);
                    } catch (error) {
                        console.error('parse ' + jsonName + ' error');
                    }
                } else {
                    data = content;
                }
                if (data) {
                    let fileName = jsonName.substring(0, extIndex);
                    //多语言文件
                    if (fileName.indexOf('languages') > -1) {
                        LocalStringManager.Instance.addLanguage(GameConfig.language + '_msg', data);
                    } else if (fileName.indexOf('local_string') > -1) {
                        let langObj = Object.assign(data[0], data[1]);
                        LocalStringManager.Instance.addLanguage(GameConfig.language + '_tip', langObj);
                    } else {//配置文件
                        ConfigManager.Instance.addConfig(fileName, data);
                    }
                }

                if (this._fileNames.length == 0) {
                    onComplete && onComplete(null, null);
                    this._zip = null;
                } else {
                    this.loadTextFile(onProgress, onComplete);
                }
            });
        }
    }
}