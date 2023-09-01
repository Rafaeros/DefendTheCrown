import { Crown, Lance, Staff, Sword, Shield } from './PieceClasses.js';

var config = {
  type: Phaser.AUTO,
  width: 700,
  height: 700,
  scene: {
    preload: preload,
    create: create
  }
};

var game = new Phaser.Game(config);

let boardSize = 7;
let tileSize = 100;
let board = [];
let topPieces;
let downPieces;
let allPieces;
let player = 0;
let pieces = 0;
let enemyPieces = 0;


function preload() {
  this.load.image('black', 'assets/black.png');
  this.load.image('white', 'assets/white.png');

  this.load.image('sword', 'assets/sword-piece.png')
  this.load.image('staff', 'assets/staff-piece.png')
  this.load.image('shield', 'assets/shield-piece.png')
  this.load.image('lance', 'assets/lance-piece.png')
  this.load.image('crown', 'assets/crown-piece.png')
}

function create() {

  createBoard.call(this);
  placePieces.call(this);
  selectPieces.call(this);

}

function createBoard() {
  for (var i = 0; i < boardSize; i++) {
    board[i] = [];
    for (var j = 0; j < boardSize; j++) {
      var tileColor = (i + j) % 2 === 0 ? 'black' : 'white';
      var tile = this.add.image(j * tileSize, i * tileSize, tileColor).setOrigin(0);
      board[i][j] = { tile: tile, piece: null };
    }
  }
}

function selectPieces() {
  allPieces.forEach((pieces) => {
    pieces.children.iterate((piece) => {
      piece.removeAllListeners('dragstart');
      piece.removeAllListeners('drag');
      piece.removeAllListeners('dragend');
    });
  });

  pieces = player === 0 ? topPieces : downPieces;
  enemyPieces = player === 0 ? downPieces : topPieces;

  pieces.children.iterate((piece) => {
    piece.setInteractive({ draggable: true });

    piece.on('dragstart', () => {
      piece.setTint(0xffd700);
      showValidMoves(piece);
    });

    piece.on('drag', (pointer, dragX, dragY) => {
      piece.x = dragX;
      piece.y = dragY;
    });

    piece.on('dragend', () => {
      piece.clearTint();
      const newX = piece.x;
      const newY = piece.y;
      const newPosition = getBoardPosition(newX, newY);
      if (isValidMove(piece, newPosition)) {
        movePieceToPosition(piece, newPosition);
        attack(); 
        player = 1 - player;
        selectPieces();
      } else {
        movePieceToPosition(piece, piece.originalPosition);
      }
      hideValidMoves();
    });
    piece.originalPosition = { row: Math.floor(piece.y / tileSize), col: Math.floor(piece.x / tileSize) };
  });
}

function showValidMoves(piece) {
  piece.
  piece.allowedMoves.forEach((move) => {
    const newRow = piece.originalPosition.row + move.row;
    const newCol = piece.originalPosition.col + move.col;
    if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
      const tile = board[newRow][newCol].tile;
      const tileColor = tile.texture.key;

      if (tileColor === 'black') {
        tile.setTint(0x3ee500); 
      } else if (tileColor === 'white') {
        tile.setTint(0x04b700);  
      }
    }
  });
}


function attack(piece, enemyPieces) {
  piece.possibleAttacks.forEach((attack) => {
    const newRow = piece.originalPosition.row + attack.row;
    const newCol = piece.originalPosition.col + attack.col;  
    
    
  })
}


function hideValidMoves() {
  board.forEach((row) => {
    row.forEach((cell) => {
      cell.tile.clearTint();
    });
  });
}

function isValidMove(piece, newPosition) {
  return piece.allowedMoves.some(
    (move) =>
      newPosition.row === piece.originalPosition.row + move.row &&
      newPosition.col === piece.originalPosition.col + move.col
  );
}

function getBoardPosition(x, y) {
  const row = Math.floor(y / tileSize);
  const col = Math.floor(x / tileSize);
  return { row, col };
}

function movePieceToPosition(piece, newPosition) {
  const { row, col } = newPosition;
  piece.x = col * tileSize + tileSize / 2;
  piece.y = row * tileSize + tileSize / 2;
}

function placePieces() {
  topPieces = this.add.group([
    new Sword(this, 1 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2, 0),
    new Sword(this, 5 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2, 0),
    new Sword(this, 3 * tileSize + tileSize / 2, 2 * tileSize + tileSize / 2, 0),
    new Staff(this, 2 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2, 0),
    new Staff(this, 4 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2, 0),
    new Shield(this,3 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2, 0),
    new Lance(this, 2 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2, 0),
    new Lance(this, 4 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2, 0),
    new Crown(this, 3 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2, 0)
  ])

  downPieces = this.add.group([
    new Sword(this, 1 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2, 1),
    new Sword(this, 5 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2, 1),
    new Sword(this, 3 * tileSize + tileSize / 2, 4 * tileSize + tileSize / 2, 1),
    new Staff(this, 2 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2, 1),
    new Staff(this, 4 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2, 1),
    new Shield(this,3 * tileSize + tileSize / 2, 5 * tileSize + tileSize / 2, 1),
    new Lance(this, 2 * tileSize + tileSize / 2, 5 * tileSize + tileSize / 2, 1),
    new Lance(this, 4 * tileSize + tileSize / 2, 5 * tileSize + tileSize / 2, 1),
    new Crown(this, 3 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2, 1)
  ])

  allPieces = [topPieces, downPieces];

}
