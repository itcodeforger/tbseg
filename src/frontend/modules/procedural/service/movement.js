(() => {
  'use strict';
  
  const app = angular.module('myApp.procedural');
  
  app.service('mapMovement', ['config', 'mathOperations', (config, mathOperations) => {
    const mo = mathOperations;
    const service = {
      getStartingPosition: getStartingPosition,
      enterGate: enterGate,
      checkTileForGate: checkTileForGate
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
    
    function checkTileForGate(initialSetup) {
      for (let i = 1; i < initialSetup.length; i++) {
        if (JSON.stringify(initialSetup[i]) === JSON.stringify(initialSetup[0])) {
          return true;
        }
      }
      return false;
    }
    
    function enterGate (initialSetup) {
      console.log(initialSetup);
    }
  }])
})();
