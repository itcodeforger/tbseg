/**
 * Created by rafal on 02.05.16.
 */
'use strict';

module.exports = (gulp, options, plugins) => {

  gulp.task('clear-all', () => {
    return plugins.del(['./app/*']);
  });

  gulp.task('copy-html', () => {
    return gulp.src(['./src/index.html'])
      .pipe(plugins.flatten())
      .pipe(gulp.dest('./app/'));
  });

  gulp.task('copy-bower-components', () => {
    return gulp.src(['./src/bower_components/**/*'])
      .pipe(gulp.dest('./app/bower_components/'));
  });

  gulp.task('copy-components', () => {
    return gulp.src(['./src/components/**/*'])
      .pipe(gulp.dest('./app/components/'));
  });

  gulp.task('copy-modules', () => {
    return gulp.src(['./src/modules/**/*'])
      .pipe(gulp.dest('./app/modules/'));
  });

  gulp.task('copy-css', () => {
    return gulp.src(['./src/app.css'])
      .pipe(gulp.dest('./app/'));
  });

  gulp.task('copy-js', () => {
    return gulp.src(['./src/app.js'])
      .pipe(gulp.dest('./app/'));
  });

};