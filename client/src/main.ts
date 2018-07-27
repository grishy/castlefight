import { Scene } from "./types/scene";
import { Main } from "./scenes/main";

import { debounce } from "./utils";

class App {
    private scene: Scene;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("game");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
    }

    public setup(): void {
        this.scene = new Main(this.ctx);

        window.onresize = debounce(this.scene.resize.bind(this), 100);

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private gameLoop(delta: number): void {
        this.scene.step(delta);
        this.scene.draw(delta);

        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

window.onload = function() {
    let app = new App();

    app.setup();
};
