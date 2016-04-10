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

  $scope.$on('$viewContentLoaded', function () {
    createBoard(boardSize, boardSize, 0);
    draw(canvasSize, boardResolution);
  });

  function createBoard(rows, cols, defaultValue) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr.push([]);
      arr[i].push(new Array(cols));
      for (var j = 0; j < cols; j++) {
        arr[i][j] = defaultValue;
      }
    }
    return arr;
  };

  function draw(size, resolution) {
    var canvas = document.getElementById('tutorial');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.canvas.width = canvasSize;
      ctx.canvas.height = canvasSize;

      for (var i = 0; i <= size; i = i + resolution) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, size);
        ctx.moveTo(0, i);
        ctx.lineTo(size, i);
      }
      ctx.stroke();
    }
  };
}]);

//# sourceMappingURL=procedural-compiled.js.map