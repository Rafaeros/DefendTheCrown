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

  
  this.input.keyboard.on('keydown', movePiece);
}

function placePieces() {
  topPieces = this.add.group([
    this.add.sprite(1 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2,  'sword'),
    this.add.sprite(5 * tileSize + tileSize / 2,  0 * tileSize + tileSize / 2,  'sword'),
    this.add.sprite(3 * tileSize + tileSize / 2,  2 * tileSize + tileSize / 2, 'sword'),
    this.add.sprite(2 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2,  'staff'),
    this.add.sprite(4 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2,  'staff'),
    this.add.sprite(3 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2, 'shield'),
    this.add.sprite(2 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2,  'lance'),
    this.add.sprite(4 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2, 'lance'),
    this.add.sprite(3 * tileSize + tileSize / 2, 0 * tileSize + tileSize / 2, 'crown')
  ])

  downPieces = this.add.group([
    this.add.sprite(1 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2,  'sword'),
    this.add.sprite(5 * tileSize + tileSize / 2,  6 * tileSize + tileSize / 2,  'sword'),
    this.add.sprite(3 * tileSize + tileSize / 2,  4 * tileSize + tileSize / 2, 'sword'),
    this.add.sprite(2 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2,  'staff'),
    this.add.sprite(4 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2,  'staff'),
    this.add.sprite(3 * tileSize + tileSize / 2, 5 * tileSize + tileSize / 2, 'shield'),
    this.add.sprite(2 * tileSize + tileSize / 2, 5 * tileSize + tileSize / 2,  'lance'),
    this.add.sprite(4 * tileSize + tileSize / 2, 5 * tileSize + tileSize / 2, 'lance'),
    this.add.sprite(3 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2, 'crown')
  ])
  
  allPieces = [topPieces, downPieces];
}

function movePiece(event) {

  if (selectedPiece) {

    switch (event.code) {
      case 'ArrowUp':
        selectedPiece.y -= 92;
        break;

      case 'ArrowDown':
        selectedPiece.y  += 92;
        break;

      case 'ArrowLeft':
        selectedPiece.x -= 90;
        break;

      case 'ArrowRight':
        selectedPiece.x += 90;
        break;
    }
  }
}