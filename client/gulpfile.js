var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var connect = require('gulp-connect');


gulp.task("public", function () {
    return gulp.src('public/**/*')
        .pipe(gulp.dest("dist"));
});

gulp.task('connect', function() {
    connect.server({
      root: 'dist',
      livereload: true
    });
  });

gulp.task("default", ["public", 'connect'], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist"));
});
