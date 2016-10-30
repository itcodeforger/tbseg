(() => {
  'use strict';

  const app = angular.module('myApp.procedural');

  app.service('graphService',[() =>{
    const boardSize = 10;
    const boardResolution = 20;
    const canvasSize = boardSize * boardResolution;
    const canvas = document.getElementById('tutorial');
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = canvasSize;
    ctx.canvas.height = canvasSize;
    const service = {
      drawGrid: drawGrid,
      drawArea: drawArea,
      drawMap: drawMap,
      clearMap: clearMap
    };
    return service;

    function drawGrid() {
      for (let i = 0; i <= canvasSize; i = i + boardResolution){
        ctx.moveTo(i,0);
        ctx.lineTo(i,canvasSize);
        ctx.moveTo(0,i);
        ctx.lineTo(canvasSize,i);
      }
      ctx.stroke();
    }

    function drawArea(x, y) {
      ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      ctx.fillRect (x, y, boardResolution, boardResolution);
    }

    function drawMap(mapArray) {
      for (let i in mapArray) {
        for(let j in mapArray[i]) {
          if (mapArray[i][j] === 1) {
            drawArea(i * 20, j * 20);
          }
        }
      }
    }

    function clearMap() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }]);
})();
