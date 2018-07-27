import { Object } from "./object";

export class Scene {
    public ctx: CanvasRenderingContext2D;
    private objList: Object[];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.objList = [];
    }

    /**
     * step
     */
    public step(delta: number) {
        for (const obj of this.objList) {
            obj.step(delta);
        }
    }

    /**
     * resize
     */
    public resize() {
        const width = this.ctx.canvas.clientWidth;
        const height = this.ctx.canvas.clientHeight;

        if (this.ctx.canvas.width !== width || this.ctx.canvas.height !== height) {
            this.ctx.canvas.width = width;
            this.ctx.canvas.height = height;
        }
    }

    /**
     * draw
     */
    public draw(delta: number) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (const obj of this.objList) {
            obj.draw(this.ctx, delta);
        }
    }

    /**
     * instance_create
     */
    public instance_create(obj: Object) {
        this.objList.push(obj);
    }
}
