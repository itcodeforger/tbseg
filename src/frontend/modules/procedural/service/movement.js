(() => {
  'use strict';
  
  const app = angular.module('myApp.procedural');
  
  app.service('mapMovement', ['config', 'mathOperations', (config, mathOperations) => {
    const mo = mathOperations;
    const service = {
      getStartingPosition: getStartingPosition
    };
    return service;
    
    function getStartingPosition (tileList) {
      const selectedIndex = mo.randomIntFromInterval(0,tileList.length);
      return tileList[selectedIndex];
    }
  }])
})();
