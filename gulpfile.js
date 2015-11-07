var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('sass', function() {
  return sass('./assets/scss/style.scss', {
    style: 'nested',
    compass: true
  })
  .on('error', sass.logError)
  .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('watch', function() {
  gulp.watch('./assets/scss/' + '**/*', ['sass']);
});

gulp.task('default', ['sass']);
