import { _decorator, Component, Label, Node } from 'cc';
import StorageManager from '../core/storage/StorageManager';
const { ccclass, property } = _decorator;

const STORAGE_TEST_KEY = "STORAGE_TEST_KEY";
const STORAGE_TEST_KEY_2 = "STORAGE_TEST_KEY_2";

@ccclass('storageTest')
export class storageTest extends Component {
    @property(Label)
    private lab: Label = null;
    @property(Label)
    private lab2: Label = null;

    start() {
        StorageManager.Instance.setById(STORAGE_TEST_KEY, "HERE_IS_STORAGE_TEST_KEY");
        StorageManager.Instance.setById(STORAGE_TEST_KEY_2, 69);

        this.lab.string = StorageManager.Instance.getById(STORAGE_TEST_KEY, "unknow");
        this.lab2.string = StorageManager.Instance.getById(STORAGE_TEST_KEY_2, 0);
      
    }

    update(deltaTime: number) {
        
    }
}


