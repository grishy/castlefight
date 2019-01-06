const {
  src, dest, parallel, watch,
} = require('gulp');

const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('gulp-better-rollup');

function publicFile() {
  return src('public/**/*')
    .pipe(dest('dist'))
    .pipe(connect.reload());
}

function vendor() {
  return src('vendor/**/*')
    .pipe(dest('dist/vendor'))
    .pipe(connect.reload());
}

function js() {
  return src('src/main.js')
    .pipe(sourcemaps.init())
    .pipe(
      rollup(
        {},
        {
          format: 'umd',
        },
      ),
    )
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(connect.reload());
}

function localServer() {
  return connect.server({
    root: 'dist',
    port: 8888,
    livereload: true,
  });
}

function livereload() {
  watch('src/**/*.*', parallel(js));
  watch('public/**/*.*', parallel(publicFile));
  watch('vendor/**/*.*', parallel(vendor));
}

exports.build = parallel(publicFile, js, vendor);
exports.default = parallel(exports.build, livereload, localServer);
