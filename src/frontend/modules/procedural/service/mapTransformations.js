(() => {
  'use strict';
  
  const app = angular.module('myApp.procedural');
  
  app.service('mapTransformations', ['config', 'mathOperations', (config, mathOperations) => {
    const mo = mathOperations;
    const service = {
      createMap: createMap,
      checkVicinity: checkVicinity,
      fillGap: fillGap
    };
    return service;
    
    function createMap () {
      const rows = config.boardSize;
      const cols = config.boardSize;
      let arr = [];
      for ( let i=0; i < rows; i++ ) {
        arr.push([]);
        arr[i].push( new Array(cols) );
        for ( let j=0; j < cols; j++ ) {
          if (i === 0 || j === 0 || i === rows - 1 || j === cols - 1) {
            arr[i][j] = 0;
          }
          else {
            arr[i][j] = mo.randomIntFromInterval(0,1);
          }
        }
      }
      return arr;
    }
    
    function checkVicinity (x,y,board) {
      let counter = 0;
      if (board[x][y] === 1) {
        if (board[x][y-1] === 1) counter++;
        if (board[x - 1][y] === 1) counter++;
        if (board[x + 1][y] === 1) counter++;
        if (board[x][y+1] === 1) counter++;
        if (counter <= 1) {
          fillGap(x,y,board);
        }
      }
    }
    
    function fillGap (x,y,board) {
      if (config.fillDegree === 1) {
        // 1 tile radius
        if (y - 2 >= 0 && board[x][y - 2] === 1) {
          board[x][y - 1] = 1;
        }
        if (x - 2 >= 0 && board[x - 2][y] === 1) {
          board[x - 1][y] = 1;
        }
        if (x +2 < config.boardSize && board[x + 2][y] === 1) {
          board[x + 1][y] = 1;
        }
        if (y + 2 < config.boardSize && board[x][y + 2] === 1) {
          board[x][y + 1] = 1;
        }
      }
      else if (config.fillDegree === 2) {
        // 2 tile radius
        if (y - 3 >= 0 && board[x][y - 3] === 1) {
          board[x][y - 1] = 1;
          board[x][y - 2] = 1;
        }
        else if (x - 3 >= 0 && board[x - 3][y] === 1) {
          board[x - 1][y] = 1;
          board[x - 2][y] = 1;
        }
        else if (x + 3 < config.boardSize && board[x + 3][y] === 1) {
          board[x + 1][y] = 1;
          board[x + 2][y] = 1;
        }
        else if (y + 3 < config.boardSize && board[x][y + 3] === 1) {
          board[x][y + 1] = 1;
          board[x][y + 2] = 1;
        }
        else {
          board[x][y] = 0;
        }
      }
    }
    
  }])
  
})();
