var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon').includePaths;
var runSequence = require('run-sequence');
var del = require('del');
var webserver = require('gulp-webserver');

gulp.task('_styles', function() {
  return gulp.src('css/main.scss')
    .pipe(sass({
      includePaths: bourbon
    }).on('error', function(error){
      sass.logError(error);
      this.emit('end');
    }))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('_clean', function() {
  return del(['dist/*.css']);
});

gulp.task('_public', function(){ 
  return gulp.src('public/**')
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback) {
  runSequence('_clean', ['_styles', '_public'], function(){ 
    callback();
  });
});

gulp.task('serve', function() {
  return gulp.src('dist')
    .pipe(webserver());
});

gulp.task('watch', function(callback) {
  runSequence('build', 'serve', function() {
    gulp.watch('css/**/*.scss', ['_styles']);
    gulp.watch('public/**', ['_public']);
    callback();
  });
});
