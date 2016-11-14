(() => {
  'use strict';
  
  const app = angular.module('myApp.procedural');
  
  app.service('playerObject', ['config', 'mathOperations', (config, mathOperations) => {
    const mo = mathOperations;
    const service = {
      createPlayer: createPlayer
    };
    return service;
    
    function createPlayer (tileList, mapId) {
      const selectedIndex = mo.randomIntFromInterval(0,tileList.length);
      const player = {
        mapId: mapId,
        location: tileList[selectedIndex]
      };
      return player;
    }
    
  }])
})();
