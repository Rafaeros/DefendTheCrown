import { Crown, Lance, Staff, Sword, Shield } from './PieceClasses.js';

var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 900,
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
  this.load.image('red', 'assets/background.png');
  this.load.image('sword', 'assets/sword-piece.png')
  this.load.image('staff', 'assets/staff-piece.png')
  this.load.image('shield', 'assets/shield-piece.png')
  this.load.image('lance', 'assets/lance-piece.png')
  this.load.image('crown', 'assets/crown-piece.png')
}

function create() {
  this.add.rectangle(0, 0, 900, 900, 0x0).setOrigin(0, 0);
  
  createBoard.call(this);
  placePieces.call(this);
  selectPieces.call(this);
}

function createBoard() {
  for (var i = 0; i < 9; i++) { 
    board[i] = [];
    for (var j = 0; j < 9; j++) {
      var tileColor;

      if (i < 1 || i >= 8 || j < 1 || j >= 8) {
        tileColor = 'red'; 
        this.add.rectangle(100, 800, 900, 900, 0x0).setOrigin(0, 0);
        this.add.rectangle(800, 100, 900, 900, 0x0).setOrigin(0, 0);
        
      } else {
        tileColor = ((i - 1) + (j - 1)) % 2 === 0 ? 'black' : 'white';
      }

      var tile = this.add.image(j * tileSize, i * tileSize, tileColor).setOrigin(0, 0);
        board[i][j] = { tile: tile, piece: null, occupied: false };
    }
  }
}

function selectPieces() {
  
  if (isPlaying()) {
    allPieces.forEach((pieces) => {
      pieces.children.iterate((piece) => {
        piece.removeAllListeners("dragstart");
        piece.removeAllListeners("drag");
        piece.removeAllListeners("dragend");
      });
    });

    pieces = player === 0 ? topPieces : downPieces;
    pieces.children.iterate((piece) => {
      piece.setInteractive({ draggable: true });

      piece.on("dragstart", () => {
        piece.setTint(0xffd700);
        showMoves(piece);
        showInteractions(piece);
      });

      piece.on("drag", (pointer, dragX, dragY) => {
        piece.x = dragX;
        piece.y = dragY;
      });

      piece.on("dragend", () => {
        piece.clearTint();
        const newX = piece.x;
        const newY = piece.y;
        const newPosition = getPosition(newX, newY);

        if (isValidMove(piece, newPosition)) {
          hideInteractions(piece);
          movePiece(piece, newPosition);

          board[piece.originalPosition.row][
            piece.originalPosition.col
          ].occupied = false;
          player = 1 - player;
          selectPieces();
        } else {
          movePiece(piece, piece.originalPosition);
        }

        hideMoves();
      });
      piece.originalPosition = {
        row: Math.floor(piece.y / tileSize),
        col: Math.floor(piece.x / tileSize),
      };
    });
  } else {

    
  }
}

function isPlaying() {
  const currentPlayerPieces = player === 0 ? topPieces.children.entries : downPieces.children.entries;
  
  // Verifica se a coroa do jogador atual está presente no tabuleiro
  const crownExists = currentPlayerPieces.some((piece) => piece.texture.key === "crown");

  return crownExists;
}


function showMoves(piece) {
  piece.allowedMoves.forEach((move) => {
    const newRow = piece.originalPosition.row + move.row;
    const newCol = piece.originalPosition.col + move.col;
    if (newRow > 1 || newRow < 7 ||  newCol > 1 ||  newCol < 7) {
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

function showInteractions(piece) {
  const enemyPieces = player === 0 ? downPieces : topPieces;
  const allyPieces = player === 0 ? topPieces : downPieces;

  if (piece.texture.key !== "shield") {
    enemyPieces.children.iterate((enemyPiece) => {
      if (enemyPiece.player !== piece.player) {
        if (interactionRange(piece, enemyPiece)) {
          enemyPiece.setTint(0xff0000);
        }
      }
    });
  } else if (piece.texture.key === "shield") {
    allyPieces.children.iterate((allyPiece) => {
      if (allyPiece.player === piece.player) {
        if (interactionRange(piece, allyPiece)) {
          allyPiece.setTint(0x3232ff);
        }
      }
    });
  }
}

function interactionRange(piece, targetPiece) {
  const { row, col } = getPosition(targetPiece.x, targetPiece.y);

  return piece.allowedInteractions.some(
    (interaction) =>
      row === piece.originalPosition.row + interaction.rowA &&
      col === piece.originalPosition.col + interaction.colA
  );
}

function isValidMove(piece, newPosition) {
  const { row, col } = newPosition;
  const targetPiece = board[row][col].piece;

  if (row < 1 || row > 7 || col < 1 || col > 7) {
    return false;
  }

  if (board[row][col].occupied) {
    if (piece.texture.key !== "shield" && targetPiece.player !== piece.player) {
      return piece.allowedInteractions.some((move) =>
        row === piece.originalPosition.row + move.rowA && col === piece.originalPosition.col + move.colA
      );
    } else if (piece.texture.key === "shield" && targetPiece.player === piece.player) {
      return piece.allowedInteractions.some((move) =>
        row === piece.originalPosition.row + move.rowA && col === piece.originalPosition.col + move.colA
      );
    }
    return false;
  } else {
    return piece.allowedMoves.some((move) =>
      row === piece.originalPosition.row + move.row && col === piece.originalPosition.col + move.col
    );
  }
}

function movePiece(piece, newPosition) {
  const { row, col } = newPosition;
  let targetPiece = board[row][col].piece;

  if (board[row][col].occupied) {
    interact(piece, targetPiece);
  }

  piece.x = col * tileSize + tileSize / 2;
  piece.y = row * tileSize + tileSize / 2;
  board[row][col].piece = piece;
  board[row][col].occupied = true;
}

function getPosition(x, y) {
  const row = Math.floor(y / tileSize);
  const col = Math.floor(x / tileSize);
  return { row, col };
}

function interact(piece, targetPiece) {
  if (piece.texture.key !== "shield") {
    if (targetPiece.player !== piece.player) {
      if (interactionRange(piece, targetPiece)) {
        targetPiece.life -= 1;
        if (targetPiece.life == 0) {
          targetPiece.destroy();

        }
      }
    }
  } else if (piece.texture.key === "shield") {
    if (targetPiece.player === piece.player) {
      if (interactionRange(piece, targetPiece)) {
        targetPiece.life += 1;
        piece.destroy();
      }
    }
  }
}

function hideInteractions(piece) {
  if (piece.texture.key !== 'shield') {
    const targetPieces = player === 0 ? downPieces : topPieces;
    targetPieces.children.iterate((target) => target.clearTint());
    
  } else if (piece.texture.key == 'shield') {
    const targetPieces = player === 0 ? topPieces : downPieces;
    targetPieces.children.iterate((target) => target.clearTint());
  }
}

function hideMoves() {
  board.forEach((row) => {
    row.forEach((cell) => {
      cell.tile.clearTint();
    });
  });
}

function placePieces() {
  topPieces = this.add.group([
    new Sword(this, 2 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2, 0),
    new Sword(this, 6 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2, 0),
    new Sword(this, 4 * tileSize + tileSize / 2, 3 * tileSize + tileSize / 2, 0),
    new Staff(this, 3 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2, 0),
    new Staff(this, 5 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2, 0),
    new Shield(this,4 * tileSize + tileSize / 2, 2 * tileSize + tileSize / 2, 0),
    new Lance(this, 3 * tileSize + tileSize / 2, 2 * tileSize + tileSize / 2, 0),
    new Lance(this, 5 * tileSize + tileSize / 2, 2 * tileSize + tileSize / 2, 0),
    new Crown(this, 4 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2, 0)
  ])

  downPieces = this.add.group([
    new Sword(this, 2 * tileSize + tileSize / 2, 7 * tileSize + tileSize / 2, 1),
    new Sword(this, 6 * tileSize + tileSize / 2, 7 * tileSize + tileSize / 2, 1),
    new Sword(this, 4 * tileSize + tileSize / 2, 5 * tileSize + tileSize / 2, 1),
    new Staff(this, 3 * tileSize + tileSize / 2, 7 * tileSize + tileSize / 2, 1),
    new Staff(this, 5 * tileSize + tileSize / 2, 7 * tileSize + tileSize / 2, 1),
    new Shield(this,4 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2, 1),
    new Lance(this, 3 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2, 1),
    new Lance(this, 5 * tileSize + tileSize / 2, 6 * tileSize + tileSize / 2, 1),
    new Crown(this, 4 * tileSize + tileSize / 2, 7 * tileSize + tileSize / 2, 1)
  ])

  topPieces.children.iterate((piece) => {
    movePiece(piece, getPosition(piece.x, piece.y));
    piece.player = 0;
    piece.life = 1;
  });

  downPieces.children.iterate((piece) => {
    movePiece(piece, getPosition(piece.x, piece.y));
    piece.player = 1;
    piece.life = 1;
  });

  allPieces = [topPieces, downPieces];

}
