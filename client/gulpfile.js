const gulp = require("gulp");
const rollup = require("gulp-better-rollup");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
const watch = require("gulp-watch");
const jsdoc = require("gulp-jsdoc3");

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
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
});

gulp.task("doc", function(cb) {
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
    gulp.watch("src/**/*.*", ["js", "doc"]);
    gulp.watch("public/**/*.*", ["public", "js", "doc"]);
});

gulp.task("default", ["public", "js", "doc", "connect", "watch"]);
