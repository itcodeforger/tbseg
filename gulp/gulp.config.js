/**
 * Created by rafal on 02.05.16.
 */
module.exports = {
  pattern: ['./gulp/tasks/**/*.js'],
  bowerDefault: [
    'bower.json',
    'package.json'
  ],
  jsLibrary: [
    'src/frontend/bower_components/angular/angular.js',
    'src/frontend/bower_components/angular-route/angular-route.js',
    'src/frontend/bower_components/angular-local-storage/dist/angular-local-storage.js',
    'src/frontend/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js'
  ],
  jsScripts: [
    'src/frontend/app.js',
    'src/frontend/modules/procedural/controller/procedural.js'
  ],
  gulpLoadPlugins: {
    DEBUG: false,
    pattern: ['gulp-*', 'gulp.*', 'del', 'babel-preset-es2015', 'karma*', 'jasmine-core', 'browserify', 'watchify', 'compass*'],
    rename: {'gulp-install': 'install', 'gulp-util': 'gutil'}
  }
};
