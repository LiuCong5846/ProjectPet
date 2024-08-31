import { _decorator, Component, Label, Node } from 'cc';
import HttpManager, { IHttpMethod } from '../core/network/HttpManager';
import Logger from '../core/utils/Logger';
const { ccclass, property } = _decorator;

@ccclass('httpTest')
export class httpTest extends Component {
    @property(Label)
    private lab: Label = null;

    start() {
        // HttpManager.Instance.GET("http://192.168.0.133/hello.txt", null, (data: any) => {
        //     Logger.log("here data: ", data);
        //     this.lab.string = data;
        // }, this, null);

        const requestData = {
            jsCode: '0d1lyKGa1yaREG0jxqFa133CCe2lyKG9'
        };
        // HttpManager.Instance.POST("http://pets.2048d.cn//auth/login", JSON.stringify(requestData), (res) => {
        //     Logger.log("res: ", res)
        // }, this);

        // HttpManager.Instance.onHttp(IHttpMethod.POST, "http://pets.2048d.cn//auth/login", JSON.stringify(requestData), (xhr) => {
        //     Logger.log(xhr);
        // }, () => {
        //     Logger.log("here 1")
        // }, this, () => {
        //     Logger.log("here 2")
        // });

    }

    update(deltaTime: number) {
        
    }
}


