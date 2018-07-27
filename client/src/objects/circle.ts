import { Object } from "../types/object";

export class Circle extends Object {
    private rStart: number;
    private r: number;

    constructor(_x: number, _y: number, _r: number) {
        super(_x, _y);
        this.rStart = _r;
    }

    public draw(ctx: CanvasRenderingContext2D, delta: number) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.stroke();
    }

    public step(delta: number) {
        this.r = 10 * Math.cos(delta * 0.01) + this.rStart;
        this.x = 600 + Math.sin(delta * 0.003) * 500;
        this.y = 500 + Math.sin(delta * 0.001) * 50;
    }
}
