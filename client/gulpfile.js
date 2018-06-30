const gulp = require("gulp");
const rollup = require("gulp-better-rollup");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
const watch = require("gulp-watch");
const jsdoc = require("gulp-jsdoc3");
const eslint = require("gulp-eslint");

gulp.task("public", () => {
    gulp.src("public/**/*")
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
});

gulp.task("connect", () => {
    connect.server({
        root: "dist",
        livereload: true
    });
});

gulp.task("js", () => {
    gulp.src("src/main.js")
        .pipe(sourcemaps.init())
        .pipe(rollup({}, "umd"))
        .pipe(eslint())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
});

gulp.task("lint", () => {
    gulp.src("src/**/*.js")
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format());
        // .pipe(eslint.failAfterError());
});

gulp.task("doc", cb => {
    gulp.src(["README.md", "./src/**/*.js"]).pipe(
        jsdoc(
            {
                opts: {
                    template: "node_modules/docdash"
                }
            },
            cb
        )
    );
});

gulp.task("watch", () => {
    gulp.watch("src/**/*.*", ["js", "lint", "doc"]);
    gulp.watch("public/**/*.*", ["public", "js", "lint", "doc"]);
});

gulp.task("default", ["public", "js", "doc", "lint", "connect", "watch"]);
