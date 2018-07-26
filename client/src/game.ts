export default class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private height: number = window.innerHeight;
    private width: number = window.innerWidth;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("game");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
    }

    public render(): void {
        var time = +new Date() * 0.001;

        this.ctx.fillStyle = "#DDE";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.save();

        const spacing = 64;
        const size = 48;
        const across = this.ctx.canvas.width / spacing + 1;
        const down = this.ctx.canvas.height / spacing + 1;
        const s = Math.sin(time);
        const c = Math.cos(time);
        for (let y = 0; y < down; ++y) {
            for (let x = 0; x < across; ++x) {
                this.ctx.setTransform(c, -s, s, c, x * spacing, y * spacing);
                this.ctx.strokeRect(-size / 2, -size / 2, size, size);
            }
        }

        this.ctx.restore();
    }
}
