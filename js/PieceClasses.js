class Piece extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, allowedMoves, allowedInteractions, player, life) {
    super(scene, x, y, key);
    this.allowedMoves = allowedMoves;
    this.allowedInteractions = allowedInteractions;
    this.player = player;
    this.life = life;
  }
}

let allowedMoves = 0;
let allowedInteractions = 0;

let matrizM = 0;
let matrizA = 0;

export class Crown extends Piece {
  constructor(scene, x, y, turn) {
    allowedMoves = [
      { row: 1, col: 0 }, 
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: -1 },
      { row: -1, col: 1 },
      { row: -1, col: -1 },
      { row: -1, col: 0 },
      { row: 0, col: -1 }
    ];
    allowedInteractions = [
      { rowA: 1, colA: 0 }, 
      { rowA: 0, colA: 1 },
      { rowA: 1, colA: 1 },
      { rowA: 1, colA: -1 },
      { rowA: -1, colA: 1 },
      { rowA: -1, colA: -1 },
      { rowA: -1, colA: 0 },
      { rowA: 0, colA: -1 }
    ];
    
    super(scene, x, y, 'crown', allowedMoves, allowedInteractions);
    scene.add.existing(this);
  }
}

export class Lance extends Piece {
  constructor(scene, x, y, turn) {
    if (turn == 0) {
      allowedMoves = [
        { row: 1, col: 0 }, 
        { row: 2, col: 0 }, 
        { row: 0, col: -1 },
        { row: 0, col: 1 }
      ]
      allowedInteractions = [
        { rowA: 1, colA: 0},
        { rowA: 2, colA: 0}
      ]

    } else if (turn == 1) {
      allowedMoves = [
        { row: -1, col: 0 }, 
        { row: -2, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 }
      ]
      allowedInteractions = [
        { rowA: -1, colA: 0},
        { rowA: -2, colA: 0}
      ]
    }
    super(scene, x, y, 'lance', allowedMoves, allowedInteractions);
    scene.add.existing(this);
  }
}

export class Sword extends Piece {
  constructor(scene, x, y, turn) {
    if (turn == 0) {
      allowedMoves =[
        { row: 1, col: 0 }, 
        { row: 0, col: -1 },
        { row: 0, col: 1 },
      ]
      allowedInteractions = [
        { rowA: 1, colA: 0 }
      ]
      turn = 0
    } else if (turn == 1) {
      allowedMoves =[
        { row: -1, col: 0 }, 
        { row: 0, col: -1 },
        { row: 0, col: 1 },
      ]
      allowedInteractions = [
        { rowA: -1, colA: 0 }
      ]
    }
    super(scene, x, y, 'sword', allowedMoves, allowedInteractions);
    scene.add.existing(this);
  }
}

export class Staff extends Piece {
  constructor(scene, x, y, turn) {
    matrizM = [
      { row: 1, col: 0 }, 
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: -1 },
      { row: -1, col: 1 },
      { row: -1, col: -1 },
      { row: -1, col: 0 },
      { row: 0, col: -1 }
    ];
    matrizA = [
      { rowA: 1, colA: 0 }, 
      { rowA: 0, colA: 1 },
      { rowA: 1, colA: 1 },
      { rowA: 1, colA: -1 },
      { rowA: -1, colA: 1 },
      { rowA: -1, colA: -1 },
      { rowA: -1, colA: 0 },
      { rowA: 0, colA: -1 },
      { rowA: 0, colA: 2},
      { rowA: 1, colA: 2},
      { rowA: -1, colA: 2},
      { rowA: 0, colA: -2},
      { rowA: 1, colA: -2},
      { rowA: -1, colA: -2},
      { rowA: 2, colA: 0},
      { rowA: 2, colA: 1},
      { rowA: 2, colA: -1},
      { rowA: -2, colA: 0},
      { rowA: -2, colA: 1},
      { rowA: -2, colA: -1},
    ];

    if (turn == 0) {
      allowedMoves = matrizM;
      allowedInteractions = matrizA;
    } else if (turn == 1) {
      allowedMoves = matrizM;
      allowedInteractions = matrizA;
    }
    super(scene, x, y, 'staff', allowedMoves, allowedInteractions);
    scene.add.existing(this);
  }
}

export class Shield extends Piece {
  constructor(scene, x, y) {
    super(scene, x, y, 'shield', [
      { row: 1, col: 0 }, 
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: -1 },
      { row: -1, col: 1 },
      { row: -1, col: -1 },
      { row: -1, col: 0 },
      { row: 0, col: -1 }
    ], [ { rowA: 1, colA: 0 }, 
      { rowA: 0, colA: 1 },
      { rowA: 1, colA: 1 },
      { rowA: 1, colA: -1 },
      { rowA: -1, colA: 1 },
      { rowA: -1, colA: -1 },
      { rowA: -1, colA: 0 },
      { rowA: 0, colA: -1 }]);
    scene.add.existing(this);
  }
}
