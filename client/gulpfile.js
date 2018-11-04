const gulp = require("gulp");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
const rollup = require("gulp-better-rollup");

gulp.task("public", () => {
    gulp.src("public/**/*")
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
});

gulp.task("connect", () => {
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true
    });
});

gulp.task("rollup", function() {
    gulp.src("src/main.js")
        .pipe(sourcemaps.init())
        .pipe(
            rollup(
                {},
                {
                    format: "iife"
                }
            )
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
});

gulp.task("watch", () => {
    gulp.watch("src/**/*.*", ["rollup"]);
    gulp.watch("public/**/*.*", ["public"]);
});

gulp.task("build", ["public", "watch", "rollup"]);
gulp.task("default", ["build", "connect"]);
