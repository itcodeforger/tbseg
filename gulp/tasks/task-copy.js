/**
 * Created by rafal on 02.05.16.
 */
'use strict';

module.exports = (gulp, options, plugins) => {

  gulp.task('clear-all', () => {
    return plugins.del(['./app/*']);
  });

  gulp.task('copy-html', () => {
    return gulp.src(['./src/frontend/**/*.html', '!./src/frontend/bower_components/**/*.html'])
      .pipe(gulp.dest('./app/public_html/'));
  });

  gulp.task('copy-css', () => {
    return gulp.src(['./src/frontend/scss/**/*.scss'])
      .pipe(plugins.concat('app.scss'))
      .pipe(plugins.sass({ importer: plugins.compassImporter }).on('error', plugins.sass.logError))
      .pipe(gulp.dest('./app/public_html/css/'));
  });
  
  gulp.task('css-library', () => {
    return gulp.src(options.cssLibrary)
      .pipe(plugins.concat('library.css'))
      .pipe(gulp.dest('./app/public_html/css/'));
  });

};