import ResLoadManager from "../res/ResLoadManager";


/** JSON数据表工具 */
export default class JsonUtil {
    /** 数据缓存 */
    public static dataMap: Map<string, any> = new Map();

    public static get(name: string): any {
        if (this.dataMap.has(name)) {
            return this.dataMap.get(name);
        }
        return null;
    }

    public static load(path: string, callback: Function): void {
        if (this.dataMap.has(path)) {
            callback(this.dataMap.get(path));
        } else {
            ResLoadManager.Instance.loadJson(path).then((data) => {
                this.dataMap.set(path, data.json);
                callback(data.json)
            })
        }
    }

    public static loadAsync(path: string) {
        return new Promise((resolve, reject) => {
            if (this.dataMap.has(path)) {
                resolve(this.dataMap.get(path))
            }
            else {
                ResLoadManager.Instance.loadJson(path).then((data) => {
                    this.dataMap.set(path, data.json);
                    resolve(data.json)
                })
            }
        });
    }

    public static release(path: string) {
        this.dataMap.delete(path);
        ResLoadManager.Instance.release(path);
    }
}