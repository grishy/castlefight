export class Scene {
    public ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    /**
     * step
     */
    public step() {}

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
    public draw(delta: number) {}
}
