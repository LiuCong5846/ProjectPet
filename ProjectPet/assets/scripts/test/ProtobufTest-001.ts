import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { ProtobufUtil } from '../tools/ProtobufUtil';
import Long from 'long';
import protobuf from '../Protobuf/pb.js';
const { PetsInfo } = protobuf.com.wmy.pets.model.proto.Player;



@ccclass('ProtobufTest')
export class ProtobufTest extends Component {
    onLoad() {
        ProtobufUtil.InitAllPb();
    }

    start() {
        let pet = PetsInfo.create();
        pet.id = 1;
        pet.level = 10;
        pet.exp = 1000;

        let buffer = ProtobufUtil.PbEncode(pet);
        console.log('encode:', buffer);

        let decodeed = ProtobufUtil.PbDecode("PetsInfo", buffer);
        console.log("decode; ", decodeed);
        console.log(`name: ${ProtobufUtil.GetPbNameByPb(pet)}, type: ${ProtobufUtil.GetPbTypeByName("PetsInfo")} `);
        
      
    }

    private output(data: any): void {
        console.log(`pet: ${data}, long data: ${data.exp}`);
    }
}


