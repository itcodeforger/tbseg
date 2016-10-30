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
        for ( let i = 1; i < config.boardSize - 1; i++ ) {
          for ( let j = 1; j < config.boardSize - 1; j++ ) {
            checkVicinity(i,j);
          }
        }
        graph.clearMap();
        graph.drawGrid();
        graph.drawMap(board);
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

      $scope.newBoard = () => {
        graph.clearMap();
        board = createMap(config.boardSize,config.boardSize);
        graph.drawGrid();
        graph.drawMap(board);
      };

      function createMap (rows,cols) {
        let arr = [];
        for ( let i=0; i < rows; i++ ) {
          arr.push([]);
          arr[i].push( new Array(cols) );
          for ( let j=0; j < cols; j++ ) {
            if (i === 0 || j === 0 || i === rows - 1 || j === cols - 1) {
              arr[i][j] = 0;
            }
            else {
              arr[i][j] = randomIntFromInterval(0,1);
            }
          }
        }
        return arr;
      }

      function checkVicinity (x,y) {
        let counter = 0;
        if (board[x][y] === 1) {
          if (board[x][y-1] === 1) counter++;
          if (board[x - 1][y] === 1) counter++;
          if (board[x + 1][y] === 1) counter++;
          if (board[x][y+1] === 1) counter++;
          if (counter <= 1) {
            fillGap(x,y);
          }
        }
      }

      function fillGap (x,y) {
        if (y - 2 >= 0 && board[x][y-2] === 1) {
          board[x][y-1] = 1;
        }
        if (x - 2 >= 0 && board[x - 2][y] === 1) {
          board[x - 1][y] = 1;
        }
        if (x +2 < config.boardSize && board[x + 2][y] === 1) {
          board[x + 1][y] = 1;
        }
        if (y + 2 < config.boardSize && board[x][y+2] === 1) {
          board[x][y+1] = 1;
        }
      }

      function randomIntFromInterval(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
      }
    }]);
})();