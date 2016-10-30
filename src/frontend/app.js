(() => {
  'use strict';

  const app = angular.module('myApp', [
    'ngRoute',
    'myApp.procedural'
  ]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/procedural'});
    $routeProvider.when('/procedural', {
      templateUrl: 'modules/procedural/partial/procedural.html',
      controller: 'proceduralCtrl'
    });
  }]);

})();
