var gulp = require('gulp');
var browserify = require('browserify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon').includePaths;
var runSequence = require('run-sequence');
var del = require('del');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var templateCache = require('gulp-angular-templatecache');
var isProduction = false;

gulp.task("_templates", function(){
  return gulp.src('templates/**/*.html')
    .pipe(templateCache({module:'helloApp'}))
    .pipe(rename('templates.bundle.js'))
    .pipe(gulp.dest('tmp'))
});

gulp.task("_app_scripts", function() {
  return browserify({
      entries: 'js/main.js',
      debug: true,
      transform: [babelify]
    })
    .bundle()
    .pipe(source('app.bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('tmp'));
});

gulp.task('_scripts', ['_templates', '_app_scripts'], function() {
  return gulp.src(['tmp/app.bundle.js', 'tmp/templates.bundle.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist'))
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