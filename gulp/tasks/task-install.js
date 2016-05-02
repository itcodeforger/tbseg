'use strict';

module.exports = (gulp, options, plugins) => {

  gulp.task('gulp-install', () => {
    return gulp.src(options.bowerDefault)
      .pipe(plugins.install())
  });

};