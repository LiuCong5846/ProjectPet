import { _decorator, Component, Node } from 'cc';
import SocketManager from '../core/network/SocketManager';
import { TcpManager } from '../manager/TcpManager';
import Logger from '../core/utils/Logger';
const { ccclass, property } = _decorator;

@ccclass('socketTest')
export class socketTest extends Component {
    start() {
        const tcp = TcpManager.Instance;
        tcp.connect();
        // var sendContents = ["在吗?", "你好", "能听懂汉语吗?", "真的吗?"];
        const requestData = {
            jsCode: '0d1lyKGa1yaREG0jxqFa133CCe2lyKG9',
        }
        var index = 0;
        tcp.gameSocket.onOpen = (() => {
            Logger.log("socket_test");
            tcp.gameSocket.sendData(JSON.stringify(requestData));
        }).bind(this);
        tcp.gameSocket.onMessage = (data) => {
            // if (index < sendContents.length) {
            //     tcp.gameSocket.sendData(sendContents[index++])
            // } else {
            //     tcp.gameSocket.close();
            // }

            Logger.log("data: ", data);

            tcp.gameSocket.close();
        }
    }

    update(deltaTime: number) {
        
    }
}


