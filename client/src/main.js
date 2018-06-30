import { debounce } from "./util";

const ctx = document.querySelector("#game").getContext("2d");

function render(time) {
    time *= 0.001;

    ctx.fillStyle = "#DDE";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();

    const spacing = 64;
    const size = 48;
    const across = ctx.canvas.width / spacing + 1;
    const down = ctx.canvas.height / spacing + 1;
    const s = Math.sin(time);
    const c = Math.cos(time);
    for (let y = 0; y < down; ++y) {
        for (let x = 0; x < across; ++x) {
            ctx.setTransform(c, -s, s, c, x * spacing, y * spacing);
            ctx.strokeRect(-size / 2, -size / 2, size, size);
        }
    }

    ctx.restore();

    requestAnimationFrame(render);
}

resizeCanvasToDisplaySize();
window.onresize = debounce(resizeCanvasToDisplaySize, 100);

function resizeCanvasToDisplaySize() {
    console.log("resize canvas");

    const width = ctx.canvas.clientWidth;
    const height = ctx.canvas.clientHeight;

    if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        return true;
    }

    return false;
}

requestAnimationFrame(render);
