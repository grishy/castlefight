import { Object } from "./object";

export class Scene {
    public ctx: CanvasRenderingContext2D;
    private objList: Object[];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.objList = [];
    }

    public step(delta: number) {
        for (const obj of this.objList) {
            obj.step(delta);
        }
    }

    public resize() {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
    }

    public draw(delta: number) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (const obj of this.objList) {
            obj.draw(this.ctx, delta);
        }
    }

    public instance_create(obj: Object) {
        this.objList.push(obj);
    }
}
