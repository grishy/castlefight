import { Scene } from "./types/scene";
import { Main } from "./scenes/main";

import { debounce } from "./utils";

class App {
    private scene: Scene;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private socket: WebSocket;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("game");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");

        // Create WebSocket connection.
        this.socket = new WebSocket("ws://localhost:9999");

        this.socket.onopen = function() {
            console.log("Соединение установлено.");
        };

        this.socket.onclose = function(event) {
            if (event.wasClean) {
                console.log("Соединение закрыто чисто");
            } else {
                console.log("Обрыв соединения"); // например, "убит" процесс сервера
            }
            console.log("Код: " + event.code + " причина: " + event.reason);
        };

        this.socket.onmessage = event => {
            console.log("Получены данные " + event.data);
            this.socket.send("Hello Server!");
        };

        this.socket.onerror = function(error) {
            console.log("Ошибка " + error);
        };
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
    const app = new App();

    app.setup();
};
