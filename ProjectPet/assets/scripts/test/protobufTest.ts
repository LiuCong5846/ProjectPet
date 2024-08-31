import { _decorator, Component, Node } from 'cc';
import Logger from '../core/utils/Logger';
const { ccclass, property } = _decorator;
import { Base64 } from 'js-base64';

@ccclass('protobufTest')
export class protobufTest extends Component {
    start() {
        const encodedData = Base64.encode('Hello, World!');

        Logger.log("encodedData", encodedData)

        const decodedData = Base64.decode(encodedData);

        Logger.log("decodedData", decodedData)
    }

    update(deltaTime: number) {
        
    }
}


