class Piece extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, allowedMoves, allowedAttacks, player, life) {
    super(scene, x, y, key);
    this.allowedMoves = allowedMoves;
    this.allowedAttacks = allowedAttacks;
    this.player = player;
    this.life = life;
  }
}

let allowedMoves = 0;
let allowedAttacks = 0;

let matrizM = 0;
let matrizA = 0;

export class Crown extends Piece {
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
      { rowA: 0, colA: -1 }
    ];
    if (turn == 0) {
      allowedMoves = matrizM;
      allowedAttacks = matrizA;
    } else if (turn == 1) {
      allowedMoves = matrizM;
      allowedAttacks = matrizA;
    }

    
    super(scene, x, y, 'crown', allowedMoves, allowedAttacks);
    scene.add.existing(this);
    this.life = 1;
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
      allowedAttacks = [
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
      allowedAttacks = [
        { rowA: -1, colA: 0},
        { rowA: -2, colA: 0}
      ]
    }
    super(scene, x, y, 'lance', allowedMoves, allowedAttacks);
    scene.add.existing(this);
    this.life = 1;
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
      allowedAttacks = [
        { rowA: 1, colA: 0 }
      ]
      turn = 0
    } else if (turn == 1) {
      allowedMoves =[
        { row: -1, col: 0 }, 
        { row: 0, col: -1 },
        { row: 0, col: 1 },
      ]
      allowedAttacks = [
        { rowA: -1, colA: 0 }
      ]
    }
    super(scene, x, y, 'sword', allowedMoves, allowedAttacks);
    scene.add.existing(this);
    this.life = 1;
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
      allowedAttacks = matrizA;
    } else if (turn == 1) {
      allowedMoves = matrizM;
      allowedAttacks = matrizA;
    }
    super(scene, x, y, 'staff', allowedMoves, allowedAttacks);
    scene.add.existing(this);
    this.life = 1;
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
    this.life = 1;
  }
}
