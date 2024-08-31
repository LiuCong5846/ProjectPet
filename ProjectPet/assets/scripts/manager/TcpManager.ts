import { isValid } from "cc";
import GameConfig from "../GameConfig";
import { Singleton } from "../core/common/Singleton";
import { ByteArray } from "../core/network/ByteArray";
import { IProtocol } from "../core/network/IProtocol";
import SocketManager from "../core/network/SocketManager";
import KeyCode from "../protocol/KeyCode";
import LocalUtils from "../tools/LocalUtils";
import Logger from "../core/utils/Logger";

/**
 * @deprecated 宠物项目用不到
 */
export class TcpManager extends Singleton implements IProtocol {
    public static get Instance(): TcpManager {
        return this.getInstance<TcpManager>();
    }

    private _url = '';
    private _gameSocket: SocketManager = null;
    get gameSocket() {
        return this._gameSocket;
    }

    //socket是否初始化
    public isInit() {
        return this._url != '' && this._gameSocket != null;
    }

    public connect() {
        // let index = GameConfig.socketIp.indexOf('/');
        // let url = '';
        // const socketIpHead = GameConfig.socketIpHead;

        // url = socketIpHead + GameConfig.socketIp + ':' + GameConfig.port;

        // if (index != -1) {
        //     let list = GameConfig.socketIp.split('/');
        //     let ip = list[0];
        //     let dir = list[1];
        //     url = socketIpHead + ip + ':' + GameConfig.port + '/' + dir + '/';
        // } else {
        //     url = socketIpHead + GameConfig.socketIp + ':' + GameConfig.port;
        // }

        // let isPublish = GameConfigtManager.Instance.isPublish();
        // if (!isPublish) {
        //     url = 'ws://' + GameConfig.socketIp + ':' + GameConfig.port;
        // }

        this._url = "ws://pets.2048d.cn:3000" //url;

        Logger.log("this._url", this._url);

        if (!LocalUtils.isNil(this._gameSocket) && isValid(this._gameSocket)) {
            this._gameSocket.close();
        }
        this._gameSocket = new SocketManager();
        this._gameSocket.init(this._url, this);
        this._gameSocket.connect();
    }

    public reconnect() {
        this._gameSocket && this._gameSocket.reconnect();
    }


    /**
     * 连接成功
     */
    onConnected(): void {
        Logger.log("连接成功");
    }
    /**
     * 连接失败
     */
    onError(): void {
        Logger.log("连接错误");
    }
    /**
     * 断开连接
     */
    onClose(): void {
        Logger.log("连接关闭");
    }
    /**
     *  心跳处理
     * */
    onHearbeat(): void {
        Logger.log("心跳");
        if (!LocalUtils.isNil(this._gameSocket)) {
            var b: ByteArray = new ByteArray();
            b.writeShort(KeyCode.CALL_SOCKET_HEARBEAT);
            b.writeUTFBytes('1');
            // this._gameSocket.sendData(b, KeyCode.CALL_SOCKET_HEARBEAT);
        }
    }
    /**
     * 消息错误
     * @param data 
     */
    onMsgError(data: any): void {
        Logger.log("消息错误");
    }
    /**
     * 消息推送
     * @param data 
     */
    onMsgPush(data: any): void {
        Logger.log("消息推进");
    }
    /**
     * 消息成功
     * @param cmd 
     * @param data 
     */
    onMsgSuccess(cmd: string, data: any): void {
        Logger.log("消息成功");
    }
    onServerClose(): void {
        Logger.log("服务器中断");
    }

    /**
     * 发送不带参数参数的数据
     * @param cmd 命名号
     */
    public send(cmd: number, succFunc?: Function, failFunc?: Function, target?: any): void {
        if (this._gameSocket) {
            // var b: ByteArray = new ByteArray();
            // b.writeShort(cmd);
            // this._gameSocket.sendData(b, cmd);
            this._gameSocket.sendData("", cmd);
            this._gameSocket.saveCallBack(cmd, succFunc, failFunc, target);
            Logger.log('send cmd = ' + cmd);
        }
    }

    /**
     * 发送含有参数的数据
     * @param cmd 命名号
     * @param data {key:value,key:value...}该格式的报文
     */
    public sendWitArgs(cmd: number, data: any, succFunc?: Function, failFunc?: Function, target?: any): void {
        if (this._gameSocket) {
            // var b: ByteArray = new ByteArray();
            // b.writeShort(cmd);
            var s: string = JSON.stringify(data);
            // b.writeUTFBytes(s);
            // this._gameSocket.sendData(b, cmd);
            this._gameSocket.sendData(s, cmd);
            this._gameSocket.saveCallBack(cmd, succFunc, failFunc, target);
            Logger.log('send cmd = ' + cmd, data);
        }
    }
    
    public close() {
        if (this._gameSocket) {
            this._url = '';
            this._gameSocket.connectTimes = 0;
            this._gameSocket.close();
            this._gameSocket = null;
        }
    }
}


