var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon').includePaths;
var runSequence = require('run-sequence');
var del = require('del');
var isProduction = false;

gulp.task("_scripts", function() {
  return gulp.src('js/main.js')
    .pipe(browserify({
      debug: !isProduction,
      transform: ["babelify"]
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('_styles', function() {
  return gulp.src('css/main.sass')
    .pipe(sass({
      includePaths: bourbon
    }))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('_clean', function() {
  return del(['dist/*']);
});

gulp.task('watch', function(callback) {
  return runSequence('_clean', ['_scripts', '_styles'], function() {
    gulp.watch('js/**/*.js', ['_scripts']);
    gulp.watch('css/**/*.sass', ['_styles']);
    callback();
  });
});
