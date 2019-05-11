const { src, dest, series, watch } = require('gulp');
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');

function js() {
    return src('src/main.js')
        .pipe(sourcemaps.init())
        .pipe(
            rollup(
                {
                    plugins: [babel()]
                },
                {
                    format: 'umd',
                },
            ),
        )
        .pipe(sourcemaps.write())
        .pipe(dest('dist'))
        .pipe(connect.reload());
}

function publicFile() {
    return src('public/**/**.*')
        .pipe(dest('dist/'))
        .pipe(connect.reload());
}

function modelsFile() {
    return src('models/**/**.*')
        .pipe(dest('dist/models'))
        .pipe(connect.reload());
}

function livereload() {
    watch('src/**/*.*', series(js));
    watch('public/**/*.*', series(publicFile));
    watch('models/**/*.*', series(modelsFile));

    connect.server({
        root: 'dist',
        port: 4200,
        livereload: true
    });
}

exports.build = series(js, publicFile,modelsFile);
exports.default = series(js, publicFile,modelsFile, livereload);