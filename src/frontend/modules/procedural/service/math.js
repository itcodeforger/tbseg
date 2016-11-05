(() => {
  'use strict';
  
  const app = angular.module('myApp.procedural');
  
  app.service('mathOperations', ['config', (config) => {
    const service = {
      randomIntFromInterval: randomIntFromInterval
    };
    return service;
    
    function randomIntFromInterval(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    }
    
  }]);
  
})();
