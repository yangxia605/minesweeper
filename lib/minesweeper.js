'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs); //an instance of Board;
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board.playerBoard[(rowIndex, columnIndex)] === 'B') {
        console.log('Game Over!');
        this._board.printBoard();
      }
      if (this._board[(rowIndex, columnIndex)] !== this._board.hasSafeTiles()) {
        console.log('You Win!');
      } else {
        console.log('Current Board:');
        this._board.printBoard();
      }
    }
  }]);

  return Game;
}();

var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        return 'This tile has already been flipped!';
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      return this._numberOfTitles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [1, 1], [0, 1], [1, -1], [1, 0]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  }, {
    key: 'printBoard',
    value: function printBoard(board) {
      console.log(board.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        var row = [];
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        var row = [];
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          row.push(null);
        }
        board.push(row);
      }
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColunmIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColunmIndex] !== 'B') {
          board[randomRowIndex][randomColunmIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();

var g = new Game(10, 10, 10);
g.playMove(1, 1);
// const generatePlayerBoard = (numberOfRows,numberOfColumns) => {
//   let board = [];
//   for(let rowIndex = 0;rowIndex<numberOfRows;rowIndex++){
//     let row = [];
//     for(let columnIndex = 0;columnIndex<numberOfColumns;columnIndex++){
//       row.push(' ');
//     }
//     board.push(row);
//   }
//     return board;
// }
//
// const generateBombBoard = (numberOfRows,numberOfColumns,numberOfBombs) => {
//   let board = [];
//   for(let rowIndex = 0;rowIndex<numberOfRows;rowIndex++){
//     let row = [];
//     for(let columnIndex = 0;columnIndex<numberOfColumns;columnIndex++){
//       row.push(null);
//     }
//     board.push(row);
//   }
//   let numberOfBombsPlaced = 0;
//   while (numberOfBombsPlaced < numberOfBombs) {
//     let randomRowIndex  = Math.floor(Math.random() * numberOfRows);
//     let randomColunmIndex  = Math.floor(Math.random() * numberOfColumns);
//     if(board[randomRowIndex][randomColunmIndex] !== 'B'){
//       board[randomRowIndex][randomColunmIndex] = 'B';
//       numberOfBombsPlaced++;
//     }
//   }
//     return board;
// }
//
// const getNumberOfNeighborBombs = (bombBorad, rowIndex, columnIndex) => {
//   const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[1,1],[0,1],[1,-1],[1,0]];
//   const numberOfRows = bombBorad.length;
//   const numberOfColumns = bombBorad[0].length;
//   let numberOfBombs = 0;
//   neighborOffsets.forEach(offset => {
//     const neighborRowIndex = rowIndex+offset[0];
//     const neighborColumnIndex = columnIndex+offset[1];
//     if(neighborRowIndex >=0 && neighborRowIndex <= numberOfRows
//       && neighborColumnIndex >=0 && neighborColumnIndex <= numberOfColumns){
//       if(bombBorad[neighborRowIndex][neighborColumnIndex] === 'B'){
//         numberOfBombs++;
//       }
//     }
//   })
//   return numberOfBombs;
// }
// const flipTile = (playerBorad, bombBorad, rowIndex, columnIndex) => {
//   if(playerBorad[rowIndex][columnIndex] !== ' '){
//     return 'This tile has already been flipped!';
//   } else if(bombBorad[rowIndex][columnIndex] === 'B'){
//     playerBorad[rowIndex][columnIndex] = 'B';
//   }else {
//     playerBorad[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBorad, rowIndex, columnIndex)
//   }
// }
// const printBoard = board => {
//   console.log(board.map( row => row.join(' | ')).join('\n'));
// };
//
// let playerBorad = generatePlayerBoard(3,3);
// let bombBorad = generateBombBoard(3,3,3);
// console.log('Player Borad: ');
// printBoard(playerBorad);
// console.log('Bomb Borad: ');
// printBoard(bombBorad);
// flipTile(playerBorad, bombBorad, 0, 1);
// console.log('Update Player Borad:');
// printBoard(playerBorad);