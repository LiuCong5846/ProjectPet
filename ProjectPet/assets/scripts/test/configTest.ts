import { _decorator, Component, Label, Node } from 'cc';
import ResManager from '../manager/ResManager';
import ConfigManager from '../core/config/ConfigManager';
import Logger from '../core/utils/Logger';

const { ccclass, property } = _decorator;

@ccclass('configTest')
export class configTest extends Component {
    @property(Label)
    private lab: Label = null;

    start() {
        this.loadConfigs();
    }

    update(deltaTime: number) {
        
    }

    private async loadConfigs() {
        await ResManager.Instance.preloadConfig((finished: number, total: number, json: any) => {
            Logger.log("finished: ", finished);
            Logger.log("total: ", total);
            Logger.log("json: ", json);

            const percent = Math.ceil((finished * total) * 100) * (1 / 100);
            Logger.log("percent: ", percent);

            this.lab.string = `${percent}%`;
        });

       
    }
}


