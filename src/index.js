
var config = {
  type: Phaser.AUTO,
  width: 805,
  height: 835,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var board;
var pieces;
var topPieces;
var player = true;
let allPieces;


function preload() {
  this.load.image('background', 'assets/background.png');

  this.load.image('sword-top-1', 'assets/sword-piece.png')
  this.load.image('sword-top-2', 'assets/sword-piece.png')
  this.load.image('sword-top-3', 'assets/sword-piece.png')
  this.load.image('staff-top-1', 'assets/staff-piece.png')
  this.load.image('staff-top-2', 'assets/staff-piece.png')
  this.load.image('shield-top', 'assets/shield-piece.png')
  this.load.image('lance-top-1', 'assets/lance-piece.png')
  this.load.image('lance-top-2', 'assets/lance-piece.png')
  this.load.image('crown-top', 'assets/crown-piece.png')

  this.load.image('sword-down-1', 'assets/sword-piece.png')
  this.load.image('sword-down-2', 'assets/sword-piece.png')
  this.load.image('sword-down-3', 'assets/sword-piece.png')
  this.load.image('staff-down-1', 'assets/staff-piece.png')
  this.load.image('staff-down-2', 'assets/staff-piece.png')
  this.load.image('shield-down', 'assets/shield-piece.png')
  this.load.image('lance-down-1', 'assets/lance-piece.png')
  this.load.image('lance-down-2', 'assets/lance-piece.png')
  this.load.image('crown-down', 'assets/crown-piece.png')

}

function create() {
  board = this.add.image(390, 360, 'background');
  const boardWidth = board.width;
  const boardHeight = board.height;

  topPieces = this.add.group([
    this.add.sprite(210, 85, 'sword-top-1'),
    this.add.sprite(570, 85, 'sword-top-2'),
    this.add.sprite(390, 270, 'sword-top-3'),
    this.add.sprite(300, 85, 'staff-top-1'),
    this.add.sprite(480, 85, 'staff-top-2'),
    this.add.sprite(390, 180, 'shield-top'),
    this.add.sprite(300, 180, 'lance-top-1'),
    this.add.sprite(480, 180, 'lance-top-2'),
    this.add.sprite(390, 85, 'crown-top')
  ])

  downPieces = this.add.group([
    this.add.sprite(210, 635, 'sword-down-1'),
    this.add.sprite(575, 635, 'sword-down-2'),
    this.add.sprite(390, 450, 'sword-down-3'),
    this.add.sprite(300, 635, 'staff-down-1'),
    this.add.sprite(480, 635, 'staff-down-2'),
    this.add.sprite(390, 540, 'shield-down'),
    this.add.sprite(300, 540, 'lance-top-1'),
    this.add.sprite(480, 540, 'lance-top-2'),
    this.add.sprite(390, 635, 'crown-down')
  ])

  allPieces = [topPieces, downPieces];

  // Habilitar interações com o mouse
  allPieces.forEach((pieces) => {

    pieces.children.iterate((piece) => {
      piece.setInteractive();
      piece.on('pointerdown', () => {
        selectedPiece = piece;
      })
    });

  });


  // Habilitar interações com o teclado
  this.input.keyboard.on('keydown', movePiece);
}


function movePiece(event) {

  if (selectedPiece) {

    switch (event.code) {
      case 'ArrowUp':
        selectedPiece.y -= 92;
        break;

      case 'ArrowDown':
        selectedPiece.y += 92;
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

function update() {
  // Lógica dos inimigos
}