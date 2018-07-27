export class Object {
    public x: number;
    public y: number;

    constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }

    public step(delta: number) {}

    public draw(ctx: CanvasRenderingContext2D, delta: number) {}
}
