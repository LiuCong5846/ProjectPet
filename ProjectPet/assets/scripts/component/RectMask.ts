import { BlockInputEvents, color, Color, Component, director, Graphics, view, _decorator } from 'cc';
import GameConfig from '../GameConfig';
const { ccclass, executeInEditMode, requireComponent } = _decorator;

@ccclass('RectMask')
@executeInEditMode(true)
@requireComponent([Graphics, BlockInputEvents])
export class RectMask extends Component {
    public clearGraphics: boolean = false;
    start() {
        let g = this.getComponent(Graphics);
        g.clear();
        if (!this.clearGraphics) {
            g.strokeColor = Color.BLACK;
            g.lineWidth = 0;
            g.fillColor = color(0, 0, 0, 200);
            g.fillRect(-GameConfig.SCENE_WIDTH / 2, -GameConfig.SCENE_HEIGHT / 2, GameConfig.SCENE_WIDTH, GameConfig.SCENE_HEIGHT+100);
        }
    }
}

