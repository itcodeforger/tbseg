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
  'gulp-install',
  'clear-all',
  'copy-html',
  'copy-bower-components',
  'copy-modules',
  'copy-css',
  'copy-js'
));

gulp.task('build-dev-sequence', (callback) => {
  plugins.sequence(
    'clear-all',
    'copy-html',
    'copy-bower-components',
    'copy-modules',
    'copy-css',
    'copy-js'
  )(callback)
});

gulp.task('build-dev', plugins.sequence(
  'gulp-install',
  'build-dev-sequence'
));

gulp.task('watch', () => {
  gulp.watch('./app/assets/js/**/*', ['build-dev-sequence']);
  gulp.watch('./app/assets/sass/**/*', ['build-dev-sequence']);
});

gulp.task('default', () => {
  gulp.start('build');
});