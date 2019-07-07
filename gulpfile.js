const {src, dest, watch, series, parallel} = require("gulp"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync").create(),
  concat = require("gulp-concat"),
  cleanCss = require('gulp-clean-css'),
  postcss = require("gulp-postcss"),
  replace = require("gulp-replace"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  terser = require("gulp-terser");

const files = {
  sassPath: "./scss/**/*.scss",
  jsPath: "./js/**/*.js"
};

function scssTask() {
  return src(files.sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat('style.min.css'))
    .pipe(cleanCss())
    .pipe(dest("css"))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}


function jsTask() {
  return src(files.jsPath)
    .pipe(concat("script.js"))
    .pipe(terser())
    .pipe(dest("./dist"))
    .pipe(browserSync.stream());
}

const cbString = new Date().getTime();
function cacheBustTask() {
  return src(["index.html"])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'));
}

function watchTask() {
  browserSync.init({ server: { baseDir: "./" }});
  watch([files.sassPath, files.jsPath],
    parallel(scssTask, jsTask));
  watch('./*.html').on('change', browserSync.reload);
}

exports.default = series(
  parallel(scssTask, jsTask),
  cacheBustTask,
  watchTask
);

