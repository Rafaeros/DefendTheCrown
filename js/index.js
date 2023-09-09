// Quando a vida da peça inimiga for 2, a peça selecionada volta para sua posição original
// Problema com movePiece, pois a peça originalPosition já está com a nova posição

import { Crown, Lance, Staff, Sword, Shield } from './PieceClasses.js'

var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 900,
  scene: {
    preload: preload,
    create: create
  }
}

var game = new Phaser.Game(config)

let tileSize = 100
let board = []
let topPieces
let downPieces
let allPieces
let player = 0
let pieces = 0
let text = ''
let button = ''

function preload() {
  this.load.image('black', './assets/black.png')
  this.load.image('white', './assets/white.png')
  this.load.image('red', './assets/background.png')

  this.load.image('top-sword', './assets/top-pieces/sword-piece.png')
  this.load.image('top-staff', './assets/top-pieces/staff-piece.png')
  this.load.image('top-shield', './assets/top-pieces/shield-piece.png')
  this.load.image('top-lance', './assets/top-pieces/lance-piece.png')
  this.load.image('top-crown', './assets/top-pieces/crown-piece.png')

  this.load.image('down-sword', './assets/down-pieces/sword-piece.png')
  this.load.image('down-staff', './assets/down-pieces/staff-piece.png')
  this.load.image('down-shield', './assets/down-pieces/shield-piece.png')
  this.load.image('down-lance', './assets/down-pieces/lance-piece.png')
  this.load.image('down-crown', './assets/down-pieces/crown-piece.png')
}

function create() {
  this.add.rectangle(0, 0, 900, 900, 0x0).setOrigin(0, 0)

  createBoard.call(this)
  placePieces.call(this)
  selectPieces.call(this)
  createText.call(this)
}

function createBoard() {
  for (var i = 0; i < 9; i++) {
    board[i] = []
    for (var j = 0; j < 9; j++) {
      var tileColor

      if (i < 1 || i >= 8 || j < 1 || j >= 8) {
        tileColor = 'red'
        this.add.rectangle(100, 800, 900, 900, 0x0).setOrigin(0, 0)
        this.add.rectangle(800, 100, 900, 900, 0x0).setOrigin(0, 0)
      } else {
        tileColor = (i - 1 + (j - 1)) % 2 === 0 ? 'black' : 'white'
      }

      var tile = this.add
        .image(j * tileSize, i * tileSize, tileColor)
        .setOrigin(0, 0)
      board[i][j] = { tile: tile, piece: null, occupied: false }
    }
  }
}

function selectPieces() {
  if (isPlaying()) {
    allPieces.forEach(pieces => {
      pieces.children.iterate(piece => {
        piece.removeAllListeners('dragstart')
        piece.removeAllListeners('drag')
        piece.removeAllListeners('dragend')
      })
    })

    pieces = player === 0 ? topPieces : downPieces
    pieces.children.iterate(piece => {
      piece.setInteractive({ draggable: true })

      piece.on('dragstart', () => {
        piece.setTint(0x808080)
        showMoves(piece)
        showInteractions(piece)
      })

      piece.on('drag', (pointer, dragX, dragY) => {
        piece.x = dragX
        piece.y = dragY
      })

      piece.on('dragend', () => {
        piece.clearTint()
        const newX = piece.x
        const newY = piece.y
        const newPosition = getPosition(newX, newY)

        if (isValidMove(piece, newPosition)) {
          hideInteractions(piece)
          movePiece(piece, newPosition)
          board[piece.originalPosition.row][
            piece.originalPosition.col
          ].occupied = false
          player = 1 - player
          selectPieces()
        } else {
          movePiece(piece, piece.originalPosition)
        }
        hideMoves()
      })
      piece.originalPosition = {
        row: Math.floor(piece.y / tileSize),
        col: Math.floor(piece.x / tileSize)
      }
    })
  } else {
    button.setVisible(true)
    allPieces.forEach(pieces => {
      pieces.children.iterate(piece => {
        piece.removeAllListeners('dragstart')
        piece.removeAllListeners('drag')
        piece.removeAllListeners('dragend')
      })
    })
    if (thereIsCrown(topPieces) === false) {
      text.setText('O JOGADOR ROXO GANHOU!')
    } else if (thereIsCrown(downPieces) === false) {
      text.setText('O JOGADOR AZUL GANHOU!')
    }
    button.setVisible(true)
  }
}

function isPlaying() {
  if (thereIsCrown(topPieces) && thereIsCrown(downPieces)) {
    return true
  }
  return false
}

function thereIsCrown(groupPiece) {
  const crownExists = groupPiece.children.entries.some(
    piece => piece.instance === 'crown'
  )
  return crownExists
}

function showMoves(piece) {
  piece.allowedMoves.forEach(move => {
    const newRow = piece.originalPosition.row + move.row
    const newCol = piece.originalPosition.col + move.col
    if (newRow > 1 || newRow < 7 || newCol > 1 || newCol < 7) {
      const tile = board[newRow][newCol].tile
      const tileColor = tile.texture.key
      if (tileColor === 'black') {
        tile.setTint(0x2cfa02)
      } else if (tileColor === 'white') {
        tile.setTint(0x1fa105)
      }
    }
  })
}

function showInteractions(piece) {
  const enemyPieces = player === 0 ? downPieces : topPieces
  const allyPieces = player === 0 ? topPieces : downPieces
  if (piece.instance !== 'shield') {
    enemyPieces.children.iterate(enemyPiece => {
      if (enemyPiece.player !== piece.player) {
        if (interactionRange(piece, enemyPiece)) {
          enemyPiece.setTint(0xff0000)
        }
      }
    })
  } else if (piece.instance === 'shield') {
    allyPieces.children.iterate(allyPiece => {
      if (allyPiece.player === piece.player) {
        if (interactionRange(piece, allyPiece)) {
          allyPiece.setTint(0x3232ff)
        }
      }
    })
  }
}

function interactionRange(piece, targetPiece) {
  const { row, col } = getPosition(targetPiece.x, targetPiece.y)
  return piece.allowedInteractions.some(
    interaction =>
      row === piece.originalPosition.row + interaction.rowA &&
      col === piece.originalPosition.col + interaction.colA
  )
}

function isValidMove(piece, newPosition) {
  const { row, col } = newPosition
  const targetPiece = board[row][col].piece

  if (row < 1 || row > 7 || col < 1 || col > 7) {
    return false
  }

  if (board[row][col].occupied) {
    hideInteractions(piece)
    interact(piece, targetPiece)
    if (piece.instance !== 'shield' && targetPiece.player !== piece.player) {
      if (targetPiece.life === 0) {
        return piece.allowedInteractions.some(
          move =>
            row === piece.originalPosition.row + move.rowA &&
            col === piece.originalPosition.col + move.colA
        )
      } else if (targetPiece.life === 1) {
        player = 1 - player
        selectPieces()
        return false
      }
    } else if (
      piece.instance === 'shield' &&
      targetPiece.player === piece.player
    ) {
      hideInteractions(piece)
      return piece.allowedInteractions.some(
        move =>
          row === piece.originalPosition.row + move.rowA &&
          col === piece.originalPosition.col + move.colA
      )
    }
    return false
  } else {
    return piece.allowedMoves.some(
      move =>
        row === piece.originalPosition.row + move.row &&
        col === piece.originalPosition.col + move.col
    )
  }
}

function movePiece(piece, newPosition) {
  const { row, col } = newPosition
  piece.x = col * tileSize + tileSize / 2
  piece.y = row * tileSize + tileSize / 2
  board[row][col].piece = piece
  board[row][col].occupied = true
}

function getPosition(x, y) {
  const row = Math.floor(y / tileSize)
  const col = Math.floor(x / tileSize)
  return { row, col }
}

function interact(piece, targetPiece) {
  if (piece.instance !== 'shield') {
    if (targetPiece.player !== piece.player) {
      if (interactionRange(piece, targetPiece)) {
        targetPiece.life -= 1
        if (targetPiece.life === 0) {
          targetPiece.destroy()
        }
      }
    }
  } else if (piece.instance === 'shield') {
    if (targetPiece.player === piece.player) {
      if (interactionRange(piece, targetPiece)) {
        piece.destroy()
        targetPiece.life += 1
        piece.destroy()
      }
    }
  }
}

function hideInteractions(piece) {
  if (piece.instance !== 'shield') {
    const targetPieces = player === 0 ? downPieces : topPieces
    targetPieces.children.iterate(target => target.clearTint())
  } else if (piece.instance === 'shield') {
    const targetPieces = player === 0 ? topPieces : downPieces
    targetPieces.children.iterate(target => target.clearTint())
  }
}

function hideMoves() {
  board.forEach(row => {
    row.forEach(cell => {
      cell.tile.clearTint()
    })
  })
}

function placePieces() {
  topPieces = this.add.group([
    new Sword(
      this,
      2 * tileSize + tileSize / 2,
      1 * tileSize + tileSize / 2,
      0
    ),
    new Sword(
      this,
      6 * tileSize + tileSize / 2,
      1 * tileSize + tileSize / 2,
      0
    ),
    new Sword(
      this,
      4 * tileSize + tileSize / 2,
      3 * tileSize + tileSize / 2,
      0
    ),
    new Staff(
      this,
      3 * tileSize + tileSize / 2,
      1 * tileSize + tileSize / 2,
      0
    ),
    new Staff(
      this,
      5 * tileSize + tileSize / 2,
      1 * tileSize + tileSize / 2,
      0
    ),
    new Shield(
      this,
      4 * tileSize + tileSize / 2,
      2 * tileSize + tileSize / 2,
      0
    ),
    new Lance(
      this,
      3 * tileSize + tileSize / 2,
      2 * tileSize + tileSize / 2,
      0
    ),
    new Lance(
      this,
      5 * tileSize + tileSize / 2,
      2 * tileSize + tileSize / 2,
      0
    ),
    new Crown(this, 4 * tileSize + tileSize / 2, 1 * tileSize + tileSize / 2, 0)
  ])

  downPieces = this.add.group([
    new Sword(
      this,
      2 * tileSize + tileSize / 2,
      7 * tileSize + tileSize / 2,
      1
    ),
    new Sword(
      this,
      6 * tileSize + tileSize / 2,
      7 * tileSize + tileSize / 2,
      1
    ),
    new Sword(
      this,
      4 * tileSize + tileSize / 2,
      5 * tileSize + tileSize / 2,
      1
    ),
    new Staff(
      this,
      3 * tileSize + tileSize / 2,
      7 * tileSize + tileSize / 2,
      1
    ),
    new Staff(
      this,
      5 * tileSize + tileSize / 2,
      7 * tileSize + tileSize / 2,
      1
    ),
    new Shield(
      this,
      4 * tileSize + tileSize / 2,
      6 * tileSize + tileSize / 2,
      1
    ),
    new Lance(
      this,
      3 * tileSize + tileSize / 2,
      6 * tileSize + tileSize / 2,
      1
    ),
    new Lance(
      this,
      5 * tileSize + tileSize / 2,
      6 * tileSize + tileSize / 2,
      1
    ),
    new Crown(this, 4 * tileSize + tileSize / 2, 7 * tileSize + tileSize / 2, 1)
  ])

  topPieces.children.iterate(piece => {
    movePiece(piece, getPosition(piece.x, piece.y))
    piece.player = 0
    piece.life = 1
  })

  downPieces.children.iterate(piece => {
    movePiece(piece, getPosition(piece.x, piece.y))
    piece.player = 1
    piece.life = 1
  })

  allPieces = [topPieces, downPieces]
}

function createText() {
  text = this.add.text(160, 375, '', { fontSize: '45px', fontStyle: 'bold' })
  text.setStroke('#000', 5)

  button = this.add
    .text(450, 450, 'Retornar para tela inicial', {
      fontSize: '25px',
      fill: '#fff'
    })
    .setOrigin(0.5)
    .setPadding(10)
    .setStyle({ backgroundColor: '#ffa500' })
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => button.setStyle({ backgroundColor: '#6bdea5' }))
    .on('pointerout', () => button.setStyle({ backgroundColor: '#ffa500' }))
    .setVisible(false)

  button.on('pointerdown', () => {
    window.location.href = 'index.html'
  })
}
