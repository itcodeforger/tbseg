/**
 * Created by vincent on 11.04.16.
 */
'use strict';

angular.module('myApp.procedural', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/procedural', {
    templateUrl: 'modules/procedural/partial/procedural.html',
    controller: 'proceduralCtrl'
  });
}]).controller('proceduralCtrl', ['$scope', function ($scope) {
  var boardSize = 20;
  var boardResolution = 20;
  var canvasSize = boardSize * boardResolution;
  var canvas = document.getElementById('tutorial');
  var ctx = canvas.getContext('2d');

  ctx.canvas.width = canvasSize;
  ctx.canvas.height = canvasSize;

  $scope.$on('$viewContentLoaded', function () {
    drawGrid(canvasSize, boardResolution);
    drawMap(createMap(boardSize, boardSize));
  });

  function createMap(rows, cols) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr.push([]);
      arr[i].push(new Array(cols));
      for (var j = 0; j < cols; j++) {
        arr[i][j] = randomIntFromInterval(0, 1);
      }
    }
    return arr;
  };

  function drawGrid(size, resolution) {
    for (var i = 0; i <= size; i = i + resolution) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
    }
    ctx.stroke();
  };

  function drawArea(x, y) {
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(x, y, boardResolution, boardResolution);
  }

  function drawMap(mapArray) {
    for (var i in mapArray) {
      for (var j in mapArray[i]) {
        if (mapArray[i][j] === 1) {
          drawArea(i * 20, j * 20);
        };
      }
    }
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}]);

//# sourceMappingURL=procedural-compiled.js.map