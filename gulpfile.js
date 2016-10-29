'use strict';

const gulp = require('gulp');
const options = require("./gulp/gulp.config");
const plugins = require('gulp-load-plugins') (options.gulpLoadPlugins);
const Server = require('karma').Server;

require('load-gulp-tasks')(gulp, options, plugins);

gulp.task('test', (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('build', plugins.sequence(
  'clear-all',
  'copy-html',
  'copy-css',
  'compile-library',
  'compile-scripts'
));

gulp.task('build-dev-sequence', (callback) => {
  plugins.sequence(
    'clear-all',
    'copy-html',
    'copy-css',
    'compile-library',
    'compile-scripts'
  )(callback)
});

gulp.task('build-dev', plugins.sequence(
  'build-dev-sequence'
));

gulp.task('watch', () => {
  gulp.watch('./app/assets/js/**/*', ['build-dev-sequence']);
  gulp.watch('./app/assets/sass/**/*', ['build-dev-sequence']);
});

gulp.task('default', () => {
  gulp.start('build');
});