(() => {
  'use strict';
  
  const app = angular.module('myApp.procedural');
  
  app.service('mapMovement', ['config', 'mathOperations', (config, mathOperations) => {
    const mo = mathOperations;
    const service = {
      gatePosition: gatePosition,
      checkTileForGate: checkTileForGate
    };
    return service;
    
    function gatePosition (tileList, mapId) {
      let mapObjects = [];
      let results = [];
      let i = 0;
      const numberOfGates = mapId === 0 ? config.startingObjects : 1;
      while (i < numberOfGates){
        const end = (tileList.length) - 1;
        let selectedIndex = mo.randomIntFromInterval(0, end);
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
          return [i,true];
        }
      }
      return [0,false];
    }

  }])
})();
