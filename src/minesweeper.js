const generatePlayerBoard = (numberOfRows,numberOfColumns) => {
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

const generateBombBoard = (numberOfRows,numberOfColumns,numberOfBombs) => {
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
    board[randomRowIndex][randomColunmIndex] = 'B';
    numberOfBombsPlaced++;
  }
    return board;
}
const printBoard = board => {
  console.log(board.map( row => row.join(' | ')).join('\n'));
};

let playerBorad = generatePlayerBoard(3,3);
let bombBorad = generateBombBoard(3,3,3);
console.log('Player Borad: ');
printBoard(playerBorad);
console.log('Bomb Borad: ');
printBoard(bombBorad);
