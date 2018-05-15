const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const postcssGapProperties = require("postcss-gap-properties");

gulp.task("default", function () {
  return gulp.src("src/style.css")
    .pipe( postcss([
      postcssGapProperties(),
      autoprefixer({
        grid: true,
        cascade: false
      })
    ]))
    .pipe(gulp.dest("dist"));
});
