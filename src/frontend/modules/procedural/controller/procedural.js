(() => {
  'use strict';
  
  angular
    .module('myApp.procedural',[])
    .controller('proceduralCtrl', proceduralCtrl)
    .constant('config', {
      boardSize: 10,
      boardResolution: 50,
      fillDegree: 1,
      startingObjects: 10
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
    let movesLeft = player.movement;
    
    $scope.$on('$viewContentLoaded', () => init());
    $scope.atTheGate = false;
    $scope.endTurnButton = false;
    $scope.turn = 0;
    $scope.mapId = 0;
    $scope.gateNo = 0;
    $scope.level = 0;
    $scope.saveBoard = saveBoard;
    $scope.loadBoard = loadBoard;
    $scope.newBoard = newBoard;
    $scope.goLeft = goLeft;
    $scope.goUp = goUp;
    $scope.goDown = goDown;
    $scope.goRight = goRight;
    $scope.checkSurroundings = checkSurroundings;
    $scope.endTurn = endTurn;
    $scope.staySober = staySober;
    $scope.showText = showText;
    $scope.text = '';
    $scope.textVisible = false;
    
    function newBoard() {
      board = mt.createBoard();
      mainMap = board[0].map;
      tileList = board[0].list;
      mapColor = board[0].color;
      initialSetup = board[0].initialSetup;
      player = po.createPlayer(tileList,0);
      movesLeft = player.movement;
      $scope.turn = 0;
      init();
    }
    
    function saveBoard() {
      lso.saveData('board', board);
      lso.saveData('player', player);
      lso.saveData('turn', $scope.turn);
      lso.saveData('movesLeft', movesLeft);
    }
    
    function loadBoard() {
      board = lso.getData('board');
      player = lso.getData('player');
      tileList = board[player.mapId].list;
      mainMap = board[player.mapId].map;
      mapColor = board[player.mapId].color;
      initialSetup = board[player.mapId].initialSetup;
      movesLeft = lso.getData('movesLeft');
      $scope.turn = lso.getData('turn');
      init();
    }
    
    function goLeft() {
      if (mainMap[player.location[0] - 1][player.location[1]] === 1) {
        player.location = [player.location[0] - 1, player.location[1]];
        movesLeft = movesLeft - 1;
        init();
      }
    }
    
    function goUp() {
      if (mainMap[player.location[0]][player.location[1] - 1] === 1) {
        player.location = [player.location[0], player.location[1] - 1];
        movesLeft = movesLeft - 1;
        init();
      }
    }
    
    function goDown() {
      if (mainMap[player.location[0]][player.location[1] + 1] === 1) {
        player.location = [player.location[0], player.location[1] + 1];
        movesLeft = movesLeft - 1;
        init();
      }
    }
    
    function goRight() {
      if (mainMap[player.location[0] + 1][player.location[1]] === 1) {
        player.location = [player.location[0] + 1, player.location[1]];
        movesLeft = movesLeft - 1;
        init();
      }
    }

    function staySober() {
      $scope.level += 1;
      player.movement += 2;
      movesLeft = player.movement;
      init();
    }
    
    function showText() {
      $scope.textVisible = true;
      switch($scope.level){
        case 0:
          $scope.text = 'Zostawcie mnie w spokoju, liczę się tylko Ja';
          break;
        case 1:
          $scope.text = 'Boje się prawdy o sobie, ale wiem że potrzebuje pomocy';
          break;
        case 2:
          $scope.text = 'Moi bliscy nie chcą mojej krzywdy, to nie oni byli problemem, tylko ja';
          break;
        case 3:
          $scope.text = 'Otwierając się na ludzi widzę w nich dobro, przyjaźń, miłość';
          break;
        case 4:
          $scope.text = 'Ja też potrafię kochać innych';
          break;
      }
    }

    function checkSurroundings() {
      console.log(player.location);
    }
    
    function endTurn() {
      movesLeft = player.movement;
      $scope.endTurnButton = false;
      $scope.turn  = $scope.turn + 1;
    }
    
    function init() {
      $scope.mapId = player.mapId;
      graph.clearMap();
      graph.drawGrid();
      graph.drawMap(mainMap, mapColor, $scope.level);
      graph.drawObject(initialSetup, player.mapId, 'gate', $scope.level);
      graph.drawObject(player.location, player.mapId, 'player', $scope.level);
      $scope.atTheGate = mm.checkTileForGate(initialSetup, player.location)[1];
      $scope.gateNo = mm.checkTileForGate(initialSetup, player.location)[0];
      $scope.endTurnButton = movesLeft === 0;
    }
    
  }
})();