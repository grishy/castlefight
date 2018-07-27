import { Scene } from "../types/scene";
import { Circle } from "../objects/circle";

export class Main extends Scene {
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);

        this.instance_create(new Circle(150, 75, 50));
    }
}
