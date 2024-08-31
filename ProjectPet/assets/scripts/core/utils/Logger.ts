import { debug, error, log, warn } from 'cc';
import GameConfig from '../../GameConfig';

export enum LogType {
    /** 网络层日志 */
    Net = 1,
    /** 数据结构层日志 */
    Model = 2,
    /** 业务逻辑层日志 */
    Business = 4,
    /** 视图层日志 */
    View = 8,
    /** 配置数据 */
    Config = 16,
    /** 普通日志 */
    Log = 32,
}

/** 日志管理 */
export default class Logger {
    private static tags: number = LogType.Net | LogType.Model | LogType.Business
        | LogType.View | LogType.Config | LogType.Log;

    /** 打印表格 */
    public static table(...msg: any[]): void {
        if (!this.isOpen(LogType.Log)) {
            return;
        }
        console.table(msg);
    }

    /** 无颜色日志 */
    public static log(message?: any, ...optionalParams: any[]) {
        if (!this.isOpen(LogType.Log)) return;
        this.print(0, message, ...optionalParams);
    }

    /** 网络层数据日志 */
    public static logNet(...msg: any[]) {
        this.print(0, LogType.Net, ...msg);
    }

    /** 客户端数据结构层日志 */
    public static logModel(...msg: any[]) {
        this.print(0, LogType.Model, ...msg);
    }

    /** 客户端数据结构层日志 */
    public static logBusiness(...msg: any[]) {
        this.print(0, LogType.Business, ...msg);
    }

    /** 客户端数据结构层日志 */
    public static logView(...msg: any[]) {
        this.print(0, LogType.View, ...msg);
    }

    /** 客户端配置数据 */
    public static logConfig(...msg: any[]) {
        this.print(0, LogType.Config, ...msg);
    }

    public static error(message?: any, ...optionalParams: any[]) {
        this.print(1, message, ...optionalParams, 1);
    }

    public static warn(message?: any, ...optionalParams: any[]) {
        //if (!this.isOpen(LogType.Log)) return;
        this.print(3, '[WARN]:' + message, ...optionalParams);
    }

    public static debug(message?: any, ...optionalParams: any[]) {
        if (!this.isOpen(LogType.Log)) return;
        this.print(2, '[DEBUG]:' + message, ...optionalParams);
    }

    private static isOpen(tag: LogType): boolean {
        return GameConfig.isDebug; //(this.tags & tag) != 0;
    }


    private static print(level: number, message?: any, ...optionalParams: any[]) {
        let backLog = null;
        switch (level) {
            case 0:
                backLog = console.log || log;
                break;
            case 1:
                backLog = console.error || error;
                break;
            case 2:
                backLog = console.debug || debug;
                break;
            case 3:
                backLog = console.warn || warn;
                break;
        }
        if (backLog) {
            if (optionalParams.length > 0) {
                backLog(message, ...optionalParams);
            } else {
                backLog(message);
            }
        }
    }

    /**
    public static print(tag: LogType, color: string, ...msg: any[]) {
        // 标记没有打开，不打印该日志
        if (!this.isOpen(tag)) return;
        let backLog = console.log || log;
        backLog.call(null, "%c%s%s%s:%o", color, this.getDateString(), '[' + tag + ']', this.stack(5), msg.toString());
    } */

    private static stack(index: number): string {
        var e = new Error();
        var lines = e.stack!.split("\n");
        var result: Array<any> = [];
        lines.forEach((line) => {
            line = line.substring(7);
            var lineBreak = line.split(" ");
            if (lineBreak.length < 2) {
                result.push(lineBreak[0]);
            }
            else {
                result.push({ [lineBreak[0]]: lineBreak[1] });
            }
        });

        var list: string[] = [];
        var splitList: Array<string> = [];
        if (index < result.length - 1) {
            var value: string;
            for (var a in result[index]) {
                var splitList = a.split(".");

                if (splitList.length == 2) {
                    list = splitList.concat();
                }
                else {
                    value = result[index][a];
                    var start = value!.lastIndexOf("/");
                    var end = value!.lastIndexOf(".");
                    if (start > -1 && end > -1) {
                        var r = value!.substring(start + 1, end);
                        list.push(r);
                    }
                    else {
                        list.push(value);
                    }
                }
            }
        }

        if (list.length == 1) {
            return "[" + list[0] + ".ts]";
        }
        else if (list.length == 2) {
            return "[" + list[0] + ".ts->" + list[1] + "]";
        }
        return "";
    }

    public static getDateString(): string {
        let d = new Date();
        let str = d.getHours().toString();
        let timeStr = "";
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMilliseconds().toString();
        if (str.length == 1) str = "00" + str;
        if (str.length == 2) str = "0" + str;
        timeStr += str;

        timeStr = "[" + timeStr + "]";
        return timeStr;
    }
}

