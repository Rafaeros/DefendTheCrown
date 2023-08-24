import {Crown, Lance, Staff, Sword, Shield} from './PieceClasses.js';

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
    // Remova os eventos de arrastar de todas as peças.
    allPieces.forEach((pieces) => {
      pieces.children.iterate((piece) => {
        piece.removeAllListeners('dragstart');
        piece.removeAllListeners('drag');
        piece.removeAllListeners('dragend');
      });
    });
  
    // Ative os eventos de arrastar apenas para as peças do jogador atual.
    pieces = player === 0 ? topPieces : downPieces;
    pieces.children.iterate((piece) => {
      piece.setInteractive({ draggable: true });
  
      piece.on('dragstart', () => {
        piece.setTint(0xffd700);
      });
  
      piece.on('drag', (pointer, dragX, dragY) => {
        piece.x = dragX;
        piece.y = dragY;
      });
  
      piece.on('dragend', () => {
        
        piece.clearTint();
        const newX = piece.x;
        const newY = piece.Y;
        const newPosition = getBoardPosition(newX, newY);
        movePieceToPosition(piece, newPosition);
        player = 1 - player;
        selectPieces();
          

       
      });
    });
  }

function getBoardPosition(x, y) {
  const row = Math.floor(y / tileSize);
  const col = Math.floor(x / tileSize);
  return { row, col };
}

function movePieceToPosition(piece, newPosition) {
  const { row, col } = newPosition;
  const newX = col * tileSize + tileSize / 2;
  const newY = row * tileSize + tileSize / 2;
  piece.x = newX;
  piece.y = newY;
}

function placePieces() {
  topPieces = this.add.group([
    new Sword(this, 1 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2),
    new Sword(this, 5 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2),
    new Sword(this, 3 * tileSize + tileSize / 2, 2 * tileSize + tileSize / 2),
    new Staff(this, 2 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2),
    new Staff(this, 4 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2),
    new Shield(this, 3 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2),
    new Lance(this, 2 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2),
    new Lance(this, 4 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2),
    new Crown(this, 3 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2)
  ])

  downPieces = this.add.group([
    new Sword(this, 1 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2),
    new Sword(this, 5 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2),
    new Sword(this, 3 * tileSize + tileSize / 2, 4 * tileSize + tileSize / 2),
    new Staff(this, 2 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2),
    new Staff(this, 4 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2),
    new Shield(this,3 * tileSize + tileSize / 2, 5 * tileSize + tileSize / 2),
    new Lance(this, 2 * tileSize + tileSize / 2, 5 * tileSize + tileSize / 2),
    new Lance(this, 4 * tileSize + tileSize / 2, 5 * tileSize + tileSize / 2),
    new Crown(this, 3 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2)
  ])  
  
  allPieces = [topPieces, downPieces];

  
}
