(() => {
  'use strict';
  
  const app = angular.module('myApp.procedural',[]);
  
  app.constant('config', {
    boardSize: 20,
    boardResolution: 25,
    fillDegree: 2
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
      let start = mm.getStartingPosition(tileList);
      
      $scope.$on('$viewContentLoaded', () => {
        init();
      });
      
      $scope.saveBoard = () => {
        lso.saveData('board',board);
        lso.saveData('start',start);
      };
      
      $scope.loadBoard = () => {
        board = lso.getData('board');
        start = lso.getData('start');
        init();
      };
      
      $scope.newBoard = () => {
        board = mt.createMap();
        tileList = mt.createTileList(board);
        start = mm.getStartingPosition(tileList);
        init();
      };
      
      //movement
      $scope.goLeft = () => {
        if (board[start[0] - 1][start[1]] === 1) {
          start = [start[0] - 1, start[1]];
          init();
        }
      };
      
      $scope.goUp = () => {
        if (board[start[0]][start[1] - 1] === 1) {
          start = [start[0], start[1] - 1];
          init();
        }
      };
      
      $scope.goDown = () => {
        if (board[start[0]][start[1] + 1] === 1) {
          start = [start[0], start[1] + 1];
          init();
        }
      };
      
      $scope.goRight = () => {
        if (board[start[0] + 1][start[1]] === 1) {
          start = [start[0] + 1, start[1]];
          init();
        }
      };
      
      function init() {
        graph.clearMap();
        graph.drawGrid();
        graph.drawMap(board);
        graph.drawObject(start);
      }
      
    }]);
})();