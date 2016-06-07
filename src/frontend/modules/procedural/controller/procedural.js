/**
 * Created by vincent on 11.04.16.
 */
'use strict';

angular.module('myApp.procedural', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/procedural', {
      templateUrl: 'modules/procedural/partial/procedural.html',
      controller: 'proceduralCtrl'
    });
  }])
  .controller('proceduralCtrl', ['$scope', ($scope) => {
    const boardSize = 5;
    const boardResolution = 20;
    const canvasSize = boardSize * boardResolution;
    const canvas = document.getElementById('tutorial');
    const ctx = canvas.getContext('2d');
    let board = createMap(boardSize,boardSize);
    // checkBoard();

    ctx.canvas.width = canvasSize;
    ctx.canvas.height = canvasSize;

    $scope.$on('$viewContentLoaded', function(){
      drawGrid(canvasSize,boardResolution);
      drawMap(board);
    });

    // function createMap (rows,cols) {
    //   let arr = [];
    //   for ( let i=0; i < rows; i++ ) {
    //     arr.push([]);
    //     arr[i].push( new Array(cols) );
    //     for ( let j=0; j < cols; j++ ) {
    //       arr[i][j] = randomIntFromInterval(0,1);
    //     }
    //   }
    //   return arr;
    // };
    
    // function checkBoard () {
    //   for ( let i = 0; i < boardSize; i++ ) {
    //     for ( let j = 0; j < boardSize; j++ ) {
    //       console.log(i + " " + j);
    //       checkVicinity(i,j);
    //     }
    //   }
    // }
    
    function checkVicinity (x,y) {
      let counter = 0;
      for (let i = x - 1; i = x + 1; i++) {
        for (let j = y - 1; j = y + 1; j++) {
          if (i >= 0 && i < boardSize && j >= 0 && j < boardSize) {
            if (board[i][j] == 1) {
              counter++;
            }
          }
        }
      }
      console.log("punkt: " + x + "," + y + " ma " + counter + " sąsiadów");
    }

    function drawGrid (size,resolution) {
      for (let i=0; i <= size; i = i + resolution){
        ctx.moveTo(i,0);
        ctx.lineTo(i,size);
        ctx.moveTo(0,i);
        ctx.lineTo(size,i);
      }
      ctx.stroke();
    };

    function drawArea(x, y) {
      ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      ctx.fillRect (x, y, boardResolution, boardResolution);
    }

    function drawMap(mapArray) {
      for (let i in mapArray) {
        for(let j in mapArray[i]) {
          if (mapArray[i][j] === 1) {
            drawArea(i * 20, j * 20);
          };
        }
      }
    }

    function randomIntFromInterval(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    }
  }]);