const gulp = require("gulp");
const rollup = require("gulp-better-rollup");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
const watch = require("gulp-watch");

gulp.task("public", () => {
    gulp.src("public/**/*").pipe(gulp.dest("dist"));
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
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"));
});

gulp.task("watch", () => {
    gulp.watch("src/**/*.*", ["js"]);
    gulp.watch("public/**/*.*", ["public", "js"]);
});

gulp.task("default", ["public", "js", "connect", "watch"]);
