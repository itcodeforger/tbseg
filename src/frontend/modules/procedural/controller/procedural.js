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

      $scope.$on('$viewContentLoaded', () => {
        init();
      });
      
      $scope.saveBoard = () => {
        lso.saveData('board',board);
      };

      $scope.loadBoard = () => {
        board = lso.getData('board');
        tileList = mt.createTileList(board);
        init();
      };

      $scope.newBoard = () => {
        board = mt.createMap();
        tileList = mt.createTileList(board);
        init();
      };
      
      function init() {
        graph.clearMap();
        graph.drawGrid();
        graph.drawMap(board);
        console.log(mm.getStartingPosition(tileList));
      }
      
    }]);
})();