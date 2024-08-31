import { bezier, ITweenOption, Node, tween, TweenEasing, v3, Vec2, Vec3 } from "cc";

export default class TweenUtil {
    public static scaleShow(target: Node, duration: number = 0.3, options: ITweenOption = {}, scale: Vec3 = Vec3.ONE, easing: TweenEasing = 'sineIn') {
        if (target) {
            target.setScale(0.3, 0.3, 1);
            let tweenTarget = tween(target);
            tweenTarget.stop();
            tweenTarget.to(duration, { scale: scale }, { easing: easing, onComplete: options.onComplete });
            tweenTarget.start();
        }
    }

    public static scaleHide(target: Node, duration: number = 0.3, options: ITweenOption = {}, scale: Vec3 = Vec3.ZERO, easing: TweenEasing = 'sineOut') {
        if (target) {
            let tweenTarget = tween(target);
            tweenTarget.stop();
            tweenTarget.to(duration, { scale: scale }, { easing: easing, onComplete: options.onComplete });
            tweenTarget.start();
        }
    }

    /**
     *  二阶贝塞尔曲线 运动
     * @param target
     * @param {number} duration
     * @param {} c1 起点坐标
     * @param {} c2 控制点
     * @param {Vec3} to 终点坐标
     * @param opts
     * @returns {any}
     */
    public static bezierTo(target: any, duration: number, c1: Vec3, c2: Vec2, to: Vec3, opts: any): any {
        opts = opts || {};
        /**
         * @desc 二阶贝塞尔
         * @param {number} t 当前百分比
         * @param {} p1 起点坐标
         * @param {} cp 控制点
         * @param {} p2 终点坐标
         * @returns {any}
         */
        let twoBezier = (t: number, p1: Vec3, cp: Vec2, p2: Vec3): any => {
            let x = (1 - t) * (1 - t) * p1.x + 2 * t * (1 - t) * cp.x + t * t * p2.x;
            let y = (1 - t) * (1 - t) * p1.y + 2 * t * (1 - t) * cp.y + t * t * p2.y;
            return v3(x, y, 0);
        };
        opts.onUpdate = (arg: Vec3, ratio: number) => {
            target.position = twoBezier(ratio, c1, c2, to);
        };
        return tween(target).to(duration, {}, opts);
    }

    /**
     *  二阶贝塞尔曲线 运动
     * @param target
     * @param {number} duration
     * @param {} c1 起点坐标
     * @param {} c2 控制点
     * @param {Vec3} to 终点坐标
     * @param opts
     * @returns {any}
     */
    public static bezierTo1(target: any, duration: number, c1: Vec3, c2: Vec3, to: Vec3, callback: Function): any {
        let startPos = target.position;
        let fruitTween = tween(startPos);
        let progressX = function (start: number, end: number, current: number, t: number) {
            current = bezier(start, c1.x, c2.x, end, t);
            return current;
        };
        let progressY = function (start: number, end: number, current: number, t: number) {
            current = bezier(start, c1.y, c2.y, end, t);
            return current;
        };
        fruitTween.parallel(
            tween().to(duration, { x: to.x }, {
                progress: progressX, easing: "smooth", onUpdate: () => {
                    target.setPosition(startPos);
                }
            }),
            tween().to(duration, { y: to.y }, {
                progress: progressY, easing: "smooth", onUpdate: () => {
                    target.setPosition(startPos);
                }
            }),
        )
            .call(callback)
            .start();
    }

    /**
     *  开启缓动
     */
    public static startTween(target: any, duration: number, props: any, callBack: Function, opts: any = null): any {
        tween(target)
            .to(duration, props, opts)
            .call(callBack)
            .start();
    }
}
