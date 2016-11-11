(() => {
  'use strict';
  
  const app = angular.module('myApp.procedural',[]);
  
  app.constant('config', {
    boardSize: 20,
    boardResolution: 25,
    fillDegree: 2,
    startingObjects: 5
  });
  
  app.controller('proceduralCtrl', [
    '$scope',
    'config',
    'graphService',
    'mapTransformations',
    'localStorageOperations',
    'mapMovement',
    ($scope, config, graphService, mapTransformations, localStorageOperations, mapMovement) => {
      
      const lso = localStorageOperations;
      const mt = mapTransformations;
      const graph = graphService;
      const mm = mapMovement;
      
      let board = mt.createBoard();
      let mainMap = board[0];
      let tileList = mt.createTileList(mainMap);
      let initialSetup = mm.getStartingPosition(tileList);
      let playerLocation = initialSetup[0];
      $scope.atTheGate = false;
      
      $scope.$on('$viewContentLoaded', () => {
        init();
      });
      
      $scope.saveBoard = () => {
        lso.saveData('board',board);
        lso.saveData('initialSetup',initialSetup);
      };
      
      $scope.loadBoard = () => {
        board = lso.getData('board');
        mainMap = board[0];
        initialSetup = lso.getData('initialSetup');
        playerLocation = initialSetup[0];
        init();
      };
      
      $scope.newBoard = () => {
        board = mt.createBoard();
        mainMap = board[0];
        tileList = mt.createTileList(mainMap);
        initialSetup = mm.getStartingPosition(tileList);
        playerLocation = initialSetup[0];
        init();
      };
      
      //movement
      $scope.goLeft = () => {
        if (mainMap[playerLocation[0] - 1][playerLocation[1]] === 1) {
          playerLocation = [playerLocation[0] - 1, playerLocation[1]];
          initialSetup[0] = playerLocation;
          init();
        }
      };
      
      $scope.goUp = () => {
        if (mainMap[playerLocation[0]][playerLocation[1] - 1] === 1) {
          playerLocation = [playerLocation[0], playerLocation[1] - 1];
          initialSetup[0] = playerLocation;
          init();
        }
      };
      
      $scope.goDown = () => {
        if (mainMap[playerLocation[0]][playerLocation[1] + 1] === 1) {
          playerLocation = [playerLocation[0], playerLocation[1] + 1];
          initialSetup[0] = playerLocation;
          init();
        }
      };
      
      $scope.goRight = () => {
        initialSetup[0] = playerLocation;
        if (mainMap[playerLocation[0] + 1][playerLocation[1]] === 1) {
          playerLocation = [playerLocation[0] + 1, playerLocation[1]];
          initialSetup[0] = playerLocation;
          init();
        }
      };
      
      $scope.enterGate = () => {
        return mm.enterGate(initialSetup);
      };
      
      function init() {
        graph.clearMap();
        graph.drawGrid();
        graph.drawMap(mainMap);
        graph.drawObject(initialSetup);
        $scope.atTheGate = mm.checkTileForGate(initialSetup);
      }
      
    }]);
})();