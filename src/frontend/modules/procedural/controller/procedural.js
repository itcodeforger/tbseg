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
      let board = mt.createMap();
      let tileList = mt.createTileList(board);
      let initialSetup = mm.getStartingPosition(tileList);
      let playerLocation = initialSetup[0];
      
      $scope.$on('$viewContentLoaded', () => {
        init();
      });
      
      $scope.saveBoard = () => {
        lso.saveData('board',board);
        lso.saveData('initialSetup',initialSetup);
      };
      
      $scope.loadBoard = () => {
        board = lso.getData('board');
        initialSetup = lso.getData('initialSetup');
        playerLocation = initialSetup[0];
        init();
      };
      
      $scope.newBoard = () => {
        board = mt.createMap();
        tileList = mt.createTileList(board);
        initialSetup = mm.getStartingPosition(tileList);
        playerLocation = initialSetup[0];
        init();
      };
      
      //movement
      $scope.goLeft = () => {
        if (board[playerLocation[0] - 1][playerLocation[1]] === 1) {
          playerLocation = [playerLocation[0] - 1, playerLocation[1]];
          initialSetup[0] = playerLocation;
          init();
        }
      };
      
      $scope.goUp = () => {
        if (board[playerLocation[0]][playerLocation[1] - 1] === 1) {
          playerLocation = [playerLocation[0], playerLocation[1] - 1];
          initialSetup[0] = playerLocation;
          init();
        }
      };
      
      $scope.goDown = () => {
        if (board[playerLocation[0]][playerLocation[1] + 1] === 1) {
          playerLocation = [playerLocation[0], playerLocation[1] + 1];
          initialSetup[0] = playerLocation;
          init();
        }
      };
      
      $scope.goRight = () => {
        initialSetup[0] = playerLocation;
        if (board[playerLocation[0] + 1][playerLocation[1]] === 1) {
          playerLocation = [playerLocation[0] + 1, playerLocation[1]];
          initialSetup[0] = playerLocation;
          init();
        }
      };
      
      function init() {
        graph.clearMap();
        graph.drawGrid();
        graph.drawMap(board);
        console.log(initialSetup);
        graph.drawObject(initialSetup);
      }
      
    }]);
})();