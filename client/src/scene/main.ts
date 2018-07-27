import { Scene } from "../types/scene";

export class Main extends Scene {
    /**
     * draw
     */
    public draw(delta: number) {
        delta *= 0.001;

        this.ctx.fillStyle = "#DDE";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.save();

        const spacing = 64;
        const size = 48;
        const across = this.ctx.canvas.width / spacing + 1;
        const down = this.ctx.canvas.height / spacing + 1;
        const s = Math.sin(delta);
        const c = Math.cos(delta);
        for (let y = 0; y < down; ++y) {
            for (let x = 0; x < across; ++x) {
                this.ctx.setTransform(c, -s, s, c, x * spacing, y * spacing);
                this.ctx.strokeRect(-size / 2, -size / 2, size, size);
            }
        }

        this.ctx.restore();
    }

    /**
     * resize
     */
    public resize() {
        super.resize();
    }
}
