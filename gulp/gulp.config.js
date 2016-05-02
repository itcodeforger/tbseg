/**
 * Created by rafal on 02.05.16.
 */
module.exports = {
  pattern: ['./gulp/tasks/**/*.js'],
  bowerDefault: [
    'bower.json',
    'package.json'
  ],
  gulpLoadPlugins: {
    DEBUG: true,
    pattern: ['gulp-*', 'gulp.*', 'del', 'babel-preset-es2015', 'karma*', 'jasmine-core', 'browserify', 'watchify'],
    rename: {'gulp-install': 'install', 'gulp-util': 'gutil'}
  }
};
