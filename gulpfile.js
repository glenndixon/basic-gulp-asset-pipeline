var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon').includePaths;
var runSequence = require('run-sequence');
var del = require('del');
var uglify = require('gulp-uglify');
var isProduction = false;

gulp.task("_scripts", function() {
  return gulp.src('js/main.js')
    .pipe(browserify({
      debug: !isProduction,
      transform: ["babelify"]
    }))
    .pipe(uglify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('_styles', function() {
  return gulp.src('css/main.sass')
    .pipe(sass({
      includePaths: bourbon
    }))
    .pipe(rename('bundle.css'))
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

gulp.task('build', function(callback) {
  return runSequence('_clean', ['_scripts', '_styles'], callback);
});