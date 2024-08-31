import { _decorator, Component, Node, assetManager } from 'cc';
import { ProtobufUtil } from '../tools/ProtobufUtil';
import pb from '../Protobuf/pb.js';
import Logger from '../core/utils/Logger';
import ProtocolManager from '../core/network/ProtocolManager';
import { ResponseID } from '../protocol/ResponseID';
import { EProtocalPostName, EProtocolGetName } from '../protocol/ProtocolName';
import { IHttpMethod } from '../core/network/HttpManager';
import { WECHAT } from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('protocalTest2')
export class protocalTest2 extends Component {
    protected onLoad(): void {
        ProtobufUtil.InitAllPb();
        const mgr = this;
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.UserInfo, pb.com.wmy.pets.model.proto.Player.UserInfo, data => mgr.onUserInfoResp(data));
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.PetsInfo, pb.com.wmy.pets.model.proto.Player.PetsInfo, data => mgr.onPetsInfoResp(data));
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.NurseLog, pb.com.wmy.pets.model.proto.Player.NurseLog, data => mgr.onNurseLogResp(data));
        ProtocolManager.Instance.registerProtocolHandler(ResponseID.NurseLogList, pb.com.wmy.pets.model.proto.Player.NurseLogList, data => mgr.onNurseLogListResp(data));

        assetManager.loadBundle('scripts', {
            onFileProgress: (file: any, total: any) => {
                if (WECHAT) {
                    console.log(`WECHAT: file.progress%`);
                }
            }
        }, (err, bundle) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`WECHAT: file.progress%`);
            if (WECHAT) {
                this.scheduleOnce(() => {
                    console.log('wechat_log_success');
                })
            } 
        })
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    private onUserInfoResp(data: pb.com.wmy.pets.model.proto.Player.UserInfo) {
        Logger.log("onUserInfoResp: ", data);
    }

    private onPetsInfoResp(data: pb.com.wmy.pets.model.proto.Player.PetsInfo) {
        Logger.log("onPetsInfoResp: ", data);
    }

    private onNurseLogResp(data: pb.com.wmy.pets.model.proto.Player.NurseLog) {
        Logger.log("onNurseLogResp: ", data);
    }

    private onNurseLogListResp(data: pb.com.wmy.pets.model.proto.Player.NurseLogList) {
        Logger.log("onNurseLogListResp: ", data);
    }

    private sendLogin() {
        ProtocolManager.Instance.sendProtocolToServer(EProtocalPostName.LOGIN, IHttpMethod.POST, {
            jsCode: '0d1lyKGa1yaREG0jxqFa133CCe2lyKG9'
        });
    }

    private sendUpdate() {
        const args = {
            "nickname": "menghuanjiayuan",
            "sex": 1,
        }
        ProtocolManager.Instance.sendProtocolToServer(EProtocalPostName.USER_UPDATE, IHttpMethod.POST, args);
    }


    private sendPetInfo() {
        ProtocolManager.Instance.sendProtocolToServer(EProtocolGetName.PET_INFO, IHttpMethod.GET);
    }

    // *************************

    private sendUserInfo() {
        ProtocolManager.Instance.sendProtocolToServer(EProtocolGetName.USER_INFO, IHttpMethod.GET)
    }

    private sendPetsLog() {
        ProtocolManager.Instance.sendProtocolToServer(EProtocolGetName.PETS_LOG, IHttpMethod.GET);
    }

  
}


