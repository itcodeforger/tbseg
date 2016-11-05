(() => {
  'use strict';

  const app = angular.module('myApp.procedural',[]);

  app.constant('config', {
    boardSize: 20,
    boardResolution: 25,
    fillDegree: 2
  });

  app.controller('proceduralCtrl', ['$scope', 'config', 'graphService', 'mapTransformations', 'localStorageOperations',
    ($scope, config, graphService, mapTransformations, localStorageOperations) => {
      const lso = localStorageOperations;
      const mt = mapTransformations;
      const graph = graphService;
      let board = mt.createMap();

      $scope.$on('$viewContentLoaded', () => {
        graph.drawGrid();
        graph.drawMap(board);
      });

      $scope.checkBoard = () => {
        for ( let i = 1; i < config.boardSize - 1; i++ ) {
          for ( let j = 1; j < config.boardSize - 1; j++ ) {
            mt.checkVicinity(i,j,board);
          }
        }
        graph.clearMap();
        graph.drawGrid();
        graph.drawMap(board);
      };

      $scope.saveBoard = () => {
        lso.saveData('board',board);
      };

      $scope.loadBoard = () => {
        graph.clearMap();
        board = lso.getData('board');
        graph.drawGrid();
        graph.drawMap(board);
      };

      $scope.newBoard = () => {
        graph.clearMap();
        board = mt.createMap();
        graph.drawGrid();
        graph.drawMap(board);
      };
      
    }]);
})();