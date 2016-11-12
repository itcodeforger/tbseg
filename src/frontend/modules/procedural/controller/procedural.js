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
      let mainMap = board[0].map;
      let tileList =board[0].list;
      let initialSetup = board[0].initialSetup;
      let playerLocation = initialSetup[0];
      $scope.atTheGate = false;
      
      $scope.$on('$viewContentLoaded', () => {
        init();
      });
      
      $scope.saveBoard = () => {
        lso.saveData('board',board);
      };
      
      $scope.loadBoard = () => {
        board = lso.getData('board');
        mainMap = board[0].map;
        initialSetup = board[0].initialSetup;
        playerLocation = initialSetup[0];
        init();
      };
      
      $scope.newBoard = () => {
        board = mt.createBoard();
        mainMap = board[0].map;
        tileList = board[0].list;
        initialSetup = board[0].initialSetup;
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
        const newIndex = mm.checkTileForGate(initialSetup)[0];
        mainMap = board[newIndex].map;
        init();
      };
      
      function init() {
        graph.clearMap();
        graph.drawGrid();
        graph.drawMap(mainMap);
        graph.drawObject(initialSetup);
        $scope.atTheGate = mm.checkTileForGate(initialSetup)[1];
      }
      
    }]);
})();