(() => {
  'use strict';

  const app = angular.module('myApp.procedural');

  app.service('graphService',['config', (config) => {
    const canvasSize = config.boardSize * config.boardResolution;
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = canvasSize;
    ctx.canvas.height = canvasSize;
    const service = {
      drawGrid: drawGrid,
      drawArea: drawArea,
      drawMap: drawMap,
      clearMap: clearMap,
      drawObject: drawObject
    };
    return service;

    function drawGrid() {
      for (let i = 0; i <= canvasSize; i = i + config.boardResolution){
        ctx.moveTo(i,0);
        ctx.lineTo(i,canvasSize);
        ctx.moveTo(0,i);
        ctx.lineTo(canvasSize,i);
      }
      ctx.stroke();
    }

    function drawArea(x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect (x, y, config.boardResolution, config.boardResolution);
    }

    function drawMap(mapArray, mapColor, level) {
      let color = '';
      switch(level){
        case 0:
          color = 'rgba(85, 86, 86, 1)';
          break;
        case 1:
          color = 'rgba(140, 165, 141, 1)';
          break;
        case 2:
          color = 'rgba(142, 219, 145, 1)';
          break;
        case 3:
          color = 'rgba(142, 219, 145, 1)';
          break;
        case 4:
          color = 'rgba(29, 229, 11, 1)';
          break;
      }
      for (let i in mapArray) {
        for(let j in mapArray[i]) {
          if (mapArray[i][j] === 1) {
            drawArea(i * config.boardResolution, j * config.boardResolution, color);
          }
        }
      }
    }

    function drawObject(position, mapId, key, level) {
      const start = mapId === 0 ? 1 : 0;
      let color = '';
      let me = "";
      let encounter = '';
      switch(level){
        case 0:
          color = 'rgba(0, 0, 0, 1)';
          me = "\u2639";
          encounter = '!';
          break;
        case 1:
          color = 'rgba(0, 0, 0, 1)';
          me = "\u2639";
          encounter = '?';
          break;
        case 2:
          color = 'rgba(0, 0, 0, 1)';
          me = "\u262F";
          encounter = "\u263A";
          break;
        case 3:
          color = 'rgba(0, 0, 0, 1)';
          me = "\u263A";
          encounter = "\u2665";
          break;
        case 4:
          color = 'rgba(0, 0, 0, 1)';
          me = "\u2661";
          encounter = "\u2665";
          break;
      }
      if (key === 'gate') {
        ctx.fillStyle = color;
        ctx.font = "bold 40px Arial";
        for (let i = start; i < position.length; i++) {
          ctx.fillText( encounter, position[i][0] * config.boardResolution + 12 , position[i][1] * config.boardResolution + 40);
        }
      }

      if (key === 'player') {
        ctx.fillStyle = color;
        ctx.font = "bold 40px Arial";
        ctx.fillText( me, position[0] * config.boardResolution + 8 , position[1] * config.boardResolution + 40);
      }

    }

    function clearMap() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }]);
})();
