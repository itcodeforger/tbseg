(() => {
  'use strict';
  
  const app = angular.module('myApp.procedural',[]);
  
  app.constant('config', {
    boardSize: 20,
    boardResolution: 25,
    fillDegree: 2,
    startingObjects: 5
  });
  
  app.controller('proceduralCtrl', [
    '$scope',
    'config',
    'graphService',
    'mapTransformations',
    'localStorageOperations',
    'mapMovement',
    'playerObject',
    ($scope, config, graphService, mapTransformations, localStorageOperations, mapMovement, playerObject) => {
      
      const lso = localStorageOperations;
      const mt = mapTransformations;
      const graph = graphService;
      const mm = mapMovement;
      const po = playerObject;
      
      let board = mt.createBoard();
      let mainMap = board[0].map;
      let tileList = board[0].list;
      let mapColor = board[0].color;
      let initialSetup = board[0].initialSetup;
      let player = po.createPlayer(tileList,0);
      $scope.atTheGate = false;
      
      $scope.$on('$viewContentLoaded', () => {
        init();
      });
      
      $scope.saveBoard = () => {
        lso.saveData('board', board);
        lso.saveData('player', player);
      };
      
      $scope.loadBoard = () => {
        board = lso.getData('board');
        player = lso.getData('player');
        mainMap = board[0].map;
        mapColor = board[0].color;
        initialSetup = board[0].initialSetup;
        init();
      };
      
      $scope.newBoard = () => {
        board = mt.createBoard();
        mainMap = board[0].map;
        tileList = board[0].list;
        mapColor = board[0].color;
        initialSetup = board[0].initialSetup;
        player = po.createPlayer(tileList,0);
        console.log(player);
        init();
      };
      
      //movement
      $scope.goLeft = () => {
        if (mainMap[player.location[0] - 1][player.location[1]] === 1) {
          player.location = [player.location[0] - 1, player.location[1]];
          init();
        }
      };
      
      $scope.goUp = () => {
        if (mainMap[player.location[0]][player.location[1] - 1] === 1) {
          player.location = [player.location[0], player.location[1] - 1];
          init();
        }
      };
      
      $scope.goDown = () => {
        if (mainMap[player.location[0]][player.location[1] + 1] === 1) {
          player.location = [player.location[0], player.location[1] + 1];
          init();
        }
      };
      
      $scope.goRight = () => {
        if (mainMap[player.location[0] + 1][player.location[1]] === 1) {
          player.location = [player.location[0] + 1, player.location[1]];
          init();
        }
      };
      
      $scope.enterGate = () => {
        const newIndex = mm.checkTileForGate(initialSetup)[0];
        mainMap = board[newIndex].map;
        mapColor = board[newIndex].color;
        initialSetup = board[newIndex].initialSetup;
        player.location = initialSetup[0];
        init();
      };
      
      function init() {
        graph.clearMap();
        graph.drawGrid();
        graph.drawMap(mainMap, mapColor);
        graph.drawObject(initialSetup, 'gate');
        graph.drawObject(player.location, 'player');
        $scope.atTheGate = mm.checkTileForGate(initialSetup)[1];
      }
      
    }]);
})();