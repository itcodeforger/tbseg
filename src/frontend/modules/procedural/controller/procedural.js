(() => {
  'use strict';

  const app = angular.module('myApp.procedural',[]);

  app.constant('config', {
    boardSize: 10,
    boardResolution: 20
  });

  app.controller('proceduralCtrl', ['$scope', 'config', 'graphService', ($scope, config, graphService) => {
      const graph = graphService;
      let board = createMap(config.boardSize,config.boardSize);

      $scope.$on('$viewContentLoaded', () => {
        graph.drawGrid();
        graph.drawMap(board);
      });

      $scope.checkBoard = () => {
        for ( let i = 0; i < config.boardSize; i++ ) {
          for ( let j = 0; j < config.boardSize; j++ ) {
            checkVicinity(i,j);
          }
        }
      };

      $scope.saveBoard = () => {
        localStorage.setItem("board", JSON.stringify(board));
      };

      $scope.loadBoard = () => {
        graph.clearMap();
        board = JSON.parse(localStorage.getItem("board"));
        graph.drawGrid();
        graph.drawMap(board);
      };

      function createMap (rows,cols) {
        let arr = [];
        for ( let i=0; i < rows; i++ ) {
          arr.push([]);
          arr[i].push( new Array(cols) );
          for ( let j=0; j < cols; j++ ) {
            arr[i][j] = randomIntFromInterval(0,1);
          }
        }
        return arr;
      };

      function checkVicinity (x,y) {
        let counter = 0;
        for (let i = x - 1; i <= x + 1; i++) {
          for (let j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && i < config.boardSize && j >= 0 && j < config.boardSize) {
              if (board[i][j] === 1) {
                counter++;
              }
              searchForSeparatedTile(x,y);
            }
          }
        }
      }

      function searchForSeparatedTile (x,y) {
        let closestTile = [];
        if (y - 1 >= 0) {
          if (board[x][y-1] === 0) {
            closestTile.push([x,y-1]);
          }
        }
        if (x - 1 >= 0) {
          if (board[x-1][y] === 0) {
            closestTile.push([x-1,y]);
          }
        }
        if (x + 1 < config.boardSize) {
          if (board[x+1][y] === 0) {
            closestTile.push([x+1,y]);
          }
        }
        if (y + 1 < config.boardSize) {
          if (board[x][y+1] === 0) {
            closestTile.push([x,y+1]);
          }
        }
        if (closestTile.length > 2) {
          let selectedIndex = randomIntFromInterval(0,closestTile.length -1);
          let i = closestTile[selectedIndex][0];
          let j = closestTile[selectedIndex][1];
          board[i][j] = 1;
          graph.drawArea(i * 20, j * 20)
        }
      }

      function randomIntFromInterval(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
      }
    }]);
})();