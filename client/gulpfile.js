const { series, parallel, src, dest } = require('gulp');
const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const path = require('path');
const connect = require('gulp-connect');
var log = require('fancy-log');

const inputOptions = {
    input: path.resolve(__dirname, 'src/main.ts'),
    plugins: [
        typescript(),
    ],
};

const outputOptions = {
    format: 'es',
    file: path.resolve(__dirname, 'dist/game.js')
};

async function ts() {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    // generate code
    const { output } = await bundle.generate(outputOptions);

    // write the bundle to disk
    await bundle.write(outputOptions);
}

async function tsWatch() {
    const watchOptions = {
        ...inputOptions,
        output: outputOptions,
    };

    const watcher = rollup.watch(watchOptions);

    let lastBuild = new Date();
    watcher.on('event', event => {
        if (event.code == "ERROR") {
            log(event.error.Error);
        }
        if (event.code == "FATAL") {
            log(event);
        }
        if (event.code == "END") {
            const now = new Date()

            log.info('TypeScript built time: %dms', now - lastBuild)
            lastBuild = now;
        }
    });
}


function public() {
    return src('public/**/**.*')
        .pipe(dest('dist/'))
        .pipe(connect.reload());
}


async function server() {
    connect.server({
        root: 'dist',
        port: 4200,
        livereload: true
    });
}

exports.build = series(ts, public);
exports.default = series(tsWatch, public, server);