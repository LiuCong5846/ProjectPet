import { math, Vec2, Vec3 } from "cc";

export default class IsoUtil {
    public static Y_CORRECT: number = Math.cos(-Math.PI / 6) * Math.SQRT2;

    public static isoToScreen(pos: Vec3, tileSize: number = 18): Vec2 {
        let screenX: number = pos.x - pos.y;
        let screenY: number = pos.z * IsoUtil.Y_CORRECT + (pos.x + pos.y) * 0.5;
        return new Vec2(screenX * tileSize, -screenY * tileSize);
    }

    public static screenToIso(point: Vec2, tileSize: number = 18): Vec3 {
        let xpos: number = point.y - point.x * 0.5;
        let ypos: number = point.y + point.x * 0.5;
        let zpos: number = 0.1;
        xpos = -Math.ceil(xpos/tileSize);
        ypos = -Math.ceil(ypos/tileSize);
        return new Vec3(xpos, ypos, zpos);
    }
}