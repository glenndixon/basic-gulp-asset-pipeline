var gulp = require('gulp');
var browserify = require('browserify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon').includePaths;
var runSequence = require('run-sequence');
var del = require('del');
var reactify = require('reactify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


var isProduction = false;

gulp.task("_scripts", function() {
  return browserify({
      entries: 'js/main.js',
      debug: !isProduction,
      transform: [babelify, reactify]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('_styles', function() {
  return gulp.src('styles/main.sass')
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
    gulp.watch('styles/**/*.sass', ['_styles']);
    callback();
  });
});
