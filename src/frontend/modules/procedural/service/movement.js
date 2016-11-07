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
      let mapObjects = [];
      let results = [];
      let i = 0;
      while (i < config.startingObjects){
        let selectedIndex = mo.randomIntFromInterval(0,tileList.length);
        if (mapObjects.indexOf(selectedIndex) === -1) {
          mapObjects.push(selectedIndex);
          i++;
        }
      }
      for (let i = 0; i < mapObjects.length; i++) {
        results.push(tileList[mapObjects[i]]);
      }
      return results;
    }
  }])
})();
