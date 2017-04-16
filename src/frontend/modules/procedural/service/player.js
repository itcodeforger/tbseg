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
      const end = (tileList.length) - 1;
      const selectedIndex = mo.randomIntFromInterval(0, end);
      const player = {
        mapId: mapId,
        location: tileList[selectedIndex],
        movement: 3
      };
      return player;
    }
    
  }])
})();
