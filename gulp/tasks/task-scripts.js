'use strict';

module.exports = (gulp, options, plugins) => {

  gulp.task('compile-scripts', () => {
    return gulp.src(options.jsScripts)
      .pipe(plugins.babel({
        compact: false,
        presets: ['es2015']
      }))
      .pipe(plugins.concat('scripts.js'))
      .pipe(gulp.dest('./app/public_html/js/'));
  });

  gulp.task('compile-library', () => {
    return gulp.src(options.jsLibrary)
      .pipe(plugins.concat('library.js'))
      .pipe(gulp.dest('./app/public_html/js/'));
  });

};