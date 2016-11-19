(() => {
  'use strict';
  
  angular
    .module('myApp.procedural',[])
    .controller('proceduralCtrl', proceduralCtrl)
    .constant('config', {
    boardSize: 20,
    boardResolution: 25,
    fillDegree: 2,
    startingObjects: 5
  });
  
  proceduralCtrl.$inject = [
    '$scope',
    'graphService',
    'mapTransformations',
    'localStorageOperations',
    'mapMovement',
    'playerObject'
  ];
  
  function proceduralCtrl($scope, graphService, mapTransformations, localStorageOperations,
      mapMovement, playerObject){
      
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
      
      $scope.$on('$viewContentLoaded', () => init());
      $scope.atTheGate = false;
      $scope.mapId = 0;
      $scope.gateNo = 0;
      $scope.saveBoard = saveBoard;
      $scope.loadBoard = loadBoard;
      $scope.newBoard = newBoard;
      $scope.goLeft = goLeft;
      $scope.goUp = goUp;
      $scope.goDown = goDown;
      $scope.goRight = goRight;
      $scope.enterGate = enterGate;
      
      function newBoard() {
        board = mt.createBoard();
        mainMap = board[0].map;
        tileList = board[0].list;
        mapColor = board[0].color;
        initialSetup = board[0].initialSetup;
        player = po.createPlayer(tileList,0);
        init();
      }
      
      function saveBoard() {
        lso.saveData('board', board);
        lso.saveData('player', player);
      }
      
      function loadBoard() {
        board = lso.getData('board');
        player = lso.getData('player');
        tileList = board[player.mapId].list;
        mainMap = board[player.mapId].map;
        mapColor = board[player.mapId].color;
        initialSetup = board[player.mapId].initialSetup;
        init();
      }
      
      function goLeft() {
        if (mainMap[player.location[0] - 1][player.location[1]] === 1) {
          player.location = [player.location[0] - 1, player.location[1]];
          init();
        }
      }
      
      function goUp() {
        if (mainMap[player.location[0]][player.location[1] - 1] === 1) {
          player.location = [player.location[0], player.location[1] - 1];
          init();
        }
      }
      
      function goDown() {
        if (mainMap[player.location[0]][player.location[1] + 1] === 1) {
          player.location = [player.location[0], player.location[1] + 1];
          init();
        }
      }
      
      function goRight() {
        if (mainMap[player.location[0] + 1][player.location[1]] === 1) {
          player.location = [player.location[0] + 1, player.location[1]];
          init();
        }
      }
      
      function enterGate() {
        const gateId = (mm.checkTileForGate(initialSetup, player.location)[0]);
        const newIndex = player.mapId === 0 ? gateId : 0;
        mainMap = board[newIndex].map;
        mapColor = board[newIndex].color;
        initialSetup = board[newIndex].initialSetup;
        player.location = player.mapId === 0 ? initialSetup[0] : board[0].initialSetup[player.mapId];
        player.mapId = newIndex;
        init();
      }
      
      function init() {
        $scope.mapId = player.mapId;
        graph.clearMap();
        graph.drawGrid();
        graph.drawMap(mainMap, mapColor);
        graph.drawObject(initialSetup, 'gate');
        graph.drawObject(player.location, 'player');
        $scope.atTheGate = mm.checkTileForGate(initialSetup, player.location)[1];
        $scope.gateNo = mm.checkTileForGate(initialSetup, player.location)[0];
      }
      
    }
})();