import GameConfig from "../../GameConfig";
import KeyCode from "../../protocol/KeyCode";
import Logger from "../utils/Logger";
import { ByteArray } from "./ByteArray";
import { IProtocol } from "./IProtocol";

export class MessageObject {
    public cmd: number;
    public succFunc: Function;
    public failFunc: Function;
    public target: any;
}

enum ESocketState {
    None = 0,
    Connecting = 1,
    Connected = 2
}

/**
 * @deprecated 宠物项目用不到
 */
export default class SocketManager {
    private _socket: WebSocket = null;
    private _url: string;//socket地址
    private orderLen: number = 2; //协议头
    private _cmdList: Map<string, number>;
    private _cmdFilter: Map<string, number> = null; //过滤的命令
    private _callBackList: Map<string, MessageObject>;
    public connectTimes: number = 0;
    private _maxConnectTime: number = 3;//断线重连最大次数

    private _protocol: IProtocol = null;

    private _sendBytes = new ByteArray();
    private _recvBytes = new ByteArray();
    private _recvTmpBytes = new ByteArray();
    private _decodeBytes = new ByteArray();

    //状态
    private state: number = ESocketState.None;
    //连接已建立回调
    public onOpen: () => void = null;
    //链接已关闭回调
    public onClose: (ev: CloseEvent) => void = null;
    //接收到数据回调
    public onMessage: (data: string | Uint8Array) => void = null;
    //WebSocket错误回调
    public onError: (ev: Event) => void = null;

    public init(url: string, protocol: IProtocol): void {
        this._url = url;
        this._protocol = protocol;
        if (this._cmdFilter == null) {
            this._cmdFilter = new Map<string, number>();
            this._cmdList = new Map<string, number>();
            this._callBackList = new Map<string, MessageObject>();
        }
        this.reset();
    }

    private reset(): void {
        if (this._cmdList) {
            this._cmdList.clear();
        }

        if (this._cmdFilter) {
            this._cmdFilter.clear();
        }

        this.initRepeteCmd();
        //MessageLoadingControler.Instance.close();消息加载转圈
    }

    private initRepeteCmd(): void {
        this.setRepeated(KeyCode.CALL_SOCKET_HEARBEAT);
    }

    /**不需要相应的cmd 可以多次发送 */
    private setRepeated(cmd: number): void {
        this._cmdFilter.set(cmd.toString(), cmd);
    }

    /**
     * 已连接
     * @returns 
     */
    public isConnected(): Boolean {
        if (!this._socket) return false;
        return this._socket.readyState === WebSocket.OPEN;
    }

    private listener(): void {
        if (this._socket) {
            this._socket.onopen = (event) => {
                this.connectTimes = 0;
                this._protocol && this._protocol.onConnected();
                this.state = ESocketState.Connected;
                this.onOpen && this.onOpen();
            };
            this._socket.onclose = (event) => {
                Logger.log('onSocketClose close alert');
                this._protocol && this._protocol.onClose();
                this.state = ESocketState.None;
                this.onClose && this.onClose(event);
            };
            this._socket.onerror = (event) => {
                Logger.log('onSocketError error alert', event);
                this.state = ESocketState.None;
                this._protocol && this._protocol.onError();
            };
            this._socket.onmessage = (event) => {
                try {
                    this.onReceiveMessage(event.data);

                    this.onMessage && this.onMessage(event.data);
                } catch (e) {
                    Logger.error("onReceiveMessage error:", e);
                }
            };
        }
    }

    public connect() {
        if (this._url.length === 0 && (!this._url.includes('wss://') || this._url.includes('ws://'))) {
            Logger.error("socket url 错误");
            return;
        }
        this.reset();
        this.connectTimes++;
        //重连超过次数
        if (this.connectTimes > this._maxConnectTime) {
            this._protocol && this._protocol.onServerClose();
            return;
        }

        if (this._socket) {
            this._socket.close();
            this._socket = null;
        }
        
        Logger.log("this._url2", this._url)
        this._socket = new WebSocket(this._url);
        // this._socket.binaryType = 'arraybuffer';
        this.listener();
    }

    public reconnect(): void {
        if (GameConfig.onPause) return;
        if (this._socket && this._socket.readyState === WebSocket.OPEN) {
            Logger.warn("againConect break");
            // EventManager.Instance.emit(EventName.E_HIDE_MSG_LOADING_VIEW);
            // EventManager.Instance.emit(EventName.CLOSE_RECONNECT_VIEW);
            return;
        }
        this.connect();
        Logger.log('socket 重连');
    }

    public close(): void {
        this.connectTimes = 0;
        if (this._socket) {
            Logger.log("client close the _socket");
            this._socket.close();
            this._socket = null;
        }
    }

     /**
     * 发送数据
     * @param bytes 
     * @param cmd 
     * @returns 
     */
     public sendData(data: string, cmd: number = 0): void {
        if (this.state != ESocketState.Connected) {
            Logger.log(`socket not connect`);
            return;
        }
        Logger.log("发送消息：" + data);
        
        //#region 测试
        this._socket.send(data);
        //#endregion
        

        // if (!this.isConnected()) {
        //     Logger.log('sendData show alert');
        //     this.reconnect();
        //     return;
        // }
        // this._sendBytes.clear();
        // //var data: ByteArray = new ByteArray();
        // bytes.position = 0;
        // this._sendBytes.writeShort(bytes.length);
        // this._sendBytes.writeBytes(bytes, 0, bytes.length);
        // this._sendBytes.position = 0;

        // if (!this._cmdFilter.get(cmd.toString())) {
        //     let time: number = this._cmdList.get(cmd.toString());
        //     if (!time) {
        //         // EventManager.Instance.emit(EventName.E_SHOW_MSG_LOADING_VIEW);
        //         this._cmdList.set(cmd.toString(), Date.now());
        //     } else {
        //         Logger.log('send ' + cmd + '  repeated');
        //         return;
        //     }

        //     //Logger.log('send cmd = ' + cmd)
        // }

        // this._socket.send(this._sendBytes.buffer);
    }

    private onReceiveMessage(bytes: any): void {
        Logger.log("收到消息：" + bytes);
        // if (this._socket) {
        //     var byte: ByteArray = new ByteArray();
        //     this._recvTmpBytes.clear();
        //     let u8Array = new Uint8Array(bytes);
        //     byte._writeUint8Array(u8Array);
        //     let len: number = 0;
        //     this._recvTmpBytes.writeBytes(byte);
        //     this._recvTmpBytes.position = 0;

        //     if (this._recvTmpBytes.length > 0) {
        //         len = this._recvTmpBytes.readUnsignedShort();
        //         this._recvBytes.clear();
        //         this._recvBytes.writeBytes(this._recvTmpBytes, this.orderLen, len);
        //         this._recvBytes.position = 0;
        //         this.protocolDecode(this._recvBytes);
        //     }
        //     this._recvTmpBytes.clear();
        // }
    }

    private protocolDecode(data: ByteArray): void {
        var str: string = '';

        try {
            var flag = data.readByte();
            var cmd: string = data.readShort().toString();
            let time: number = this._cmdList.get(cmd.toString());
            this._cmdList.delete(cmd.toString());

            if (time > 0) {
                time = Date.now() - time;
                // EventManager.Instance.emit(EventName.E_HIDE_MSG_LOADING_VIEW);
                if (time >= 2000) {
                    Logger.warn('recevie cmd = ' + cmd + ' used ' + time / 1000 + '秒');
                }
            }

            if (flag == 1) {
                this._decodeBytes.clear();
                this._decodeBytes.writeBytes(data, 3, data.length - 3);
                this._decodeBytes.position = 0;
                var inflate = new Zlib.Inflate(this._decodeBytes.bytes);
                var msg = inflate.decompress();
                this._decodeBytes.clear();
                this._decodeBytes = new ByteArray(msg.buffer);
                this._decodeBytes.position = 0;
                str = this._decodeBytes.readUTFBytes(this._decodeBytes.length);
            } else {
                str = data.readUTFBytes(data.length - 3);
            }
        } catch (e) {
            throw e;
        }

        //心跳处理
        if (cmd == '1') {
            this._protocol && this._protocol.onHearbeat();
            return;
        }

        let serverData: any;

        try {
            if (str != '') {
                str = str.replace(/:(\-?\d{16,})/g, ':"$1"');
                serverData = JSON.parse(str);
                let errCode: number = serverData.errCode;
                if (errCode && errCode == -1) {
                    this._protocol && this._protocol.onMsgError({ errMsg: serverData.errMsg, code: cmd, errCode: errCode });
                    //回调
                    this.doFailCallBack(cmd, serverData);
                } else {
                    let num: number = parseInt(cmd);
                    if (num < 0 && num > -10000) {
                        this._protocol && this._protocol.onMsgPush(serverData);
                    } else {
                        this._protocol && this._protocol.onMsgSuccess(cmd, serverData);
                        //回调
                        this.doSuccCallBack(cmd, serverData);
                    }
                }
            } else {
                //没有返回值的请求
                this._protocol && this._protocol.onMsgSuccess(cmd, str);
                //回调
                this.doSuccCallBack(cmd, null);
            }
        } catch (e) {
            // Utils.__G__TRACKBACK__(e);
            //Logger.error(e);
            throw e;
        }
    }

    public saveCallBack(cmd, succFunc: Function, failFunc: Function, target: any) {
        let obj: MessageObject = new MessageObject();
        obj.cmd = cmd;
        obj.succFunc = succFunc;
        obj.failFunc = failFunc;
        obj.target = target;
        this._callBackList.set(cmd.toString(), obj);
    }

    private doSuccCallBack(cmd, data: any): void {
        let obj: MessageObject = this._callBackList.get(cmd.toString());
        if (obj == null) {
            return;
        }
        if (obj.succFunc != null) {
            obj.succFunc.apply(obj.target, [data]);
        }
    }

    private doFailCallBack(cmd, data: any): void {
        let obj: MessageObject = this._callBackList.get(cmd.toString());
        if (obj == null) {
            return;
        }
        if (obj.failFunc != null) {
            obj.failFunc.apply(obj.target, [data]);
        }
    }
}


