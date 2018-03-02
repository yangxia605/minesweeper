export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get playerBoard() {
      return this._playerBoard;
    }

    flipTile(rowIndex, columnIndex){
      if(this._playerBoard[rowIndex][columnIndex] !== ' '){
        return 'This tile has already been flipped!';
      } else if(this._bombBoard[rowIndex][columnIndex] === 'B'){
        this._playerBoard[rowIndex][columnIndex] = 'B';
      }else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex)
      }
      return this._numberOfTitles--;
    }

    getNumberOfNeighborBombs(rowIndex, columnIndex){
      const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[1,1],[0,1],[1,-1],[1,0]];
      const numberOfRows = this._bombBoard.length;
      const numberOfColumns = this._bombBoard[0].length;
      let numberOfBombs = 0;
      neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex+offset[0];
        const neighborColumnIndex = columnIndex+offset[1];
        if(neighborRowIndex >=0 && neighborRowIndex <= numberOfRows
          && neighborColumnIndex >=0 && neighborColumnIndex <= numberOfColumns){
          if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
            numberOfBombs++;
          }
        }
      })
      return numberOfBombs;
    }
    hasSafeTiles(){
      return this._numberOfTiles !== this._numberOfBombs;
    }
    printBoard(board) {
      console.log(board.map( row => row.join(' | ')).join('\n'));
    }

    static generatePlayerBoard(numberOfRows,numberOfColumns){
      let board = [];
      for(let rowIndex = 0;rowIndex<numberOfRows;rowIndex++){
        let row = [];
        for(let columnIndex = 0;columnIndex<numberOfColumns;columnIndex++){
          row.push(' ');
        }
        board.push(row);
      }
        return board;
    }

    static generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs){
      let board = [];
      for(let rowIndex = 0;rowIndex<numberOfRows;rowIndex++){
        let row = [];
        for(let columnIndex = 0;columnIndex<numberOfColumns;columnIndex++){
          row.push(null);
        }
        board.push(row);
      }
      let numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        let randomRowIndex  = Math.floor(Math.random() * numberOfRows);
        let randomColunmIndex  = Math.floor(Math.random() * numberOfColumns);
        if(board[randomRowIndex][randomColunmIndex] !== 'B'){
          board[randomRowIndex][randomColunmIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
        return board;
    }
  }
