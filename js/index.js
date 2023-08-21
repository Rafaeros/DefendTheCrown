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
  for (var i = 0; i < boardSize; i++) {
      board[i] = [];
      for (var j = 0; j < boardSize; j++) {
          var tileColor = (i + j) % 2 === 0 ? 'black' : 'white';
          var tile = this.add.image(j * tileSize, i * tileSize, tileColor).setOrigin(0);
          board[i][j] = { tile: tile, piece: null };
      }
  }
  placePieces.call(this);

  allPieces.forEach((pieces) => {

    pieces.children.iterate((piece) => {
      piece.setInteractive();
      piece.on('pointerdown', () => {
        selectedPiece = piece;
      })
    });

  });

  let selectedPiece = null;
  
  const movePiece = (event) => {

    const cursorKeys = this.input.keyboard.createCursorKeys();
    const { x, y } = selectedPiece;

    if (cursorKeys.left.isDown) {
      selectedPiece.x = Math.max(0, x - tileSize);
    } else if (cursorKeys.right.isDown) {
      selectedPiece.x = Math.min((boardSize - 1) * tileSize, x + tileSize);
    } else if (cursorKeys.up.isDown) {
      selectedPiece.y = Math.max(0, y - tileSize);
    } else if (cursorKeys.down.isDown) {
      selectedPiece.y = Math.min((boardSize - 1) * tileSize, y + tileSize);
    }

    selectedPiece.x = Math.floor(selectedPiece.x / tileSize) * tileSize + tileSize / 2;
    selectedPiece.y = Math.floor(selectedPiece.y / tileSize) * tileSize + tileSize / 2;
  };

  this.input.keyboard.on('keydown', movePiece);

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
