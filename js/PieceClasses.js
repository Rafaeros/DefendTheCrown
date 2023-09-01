

class Piece extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, allowedMoves) {
    super(scene, x, y, key);
    this.allowedMoves = allowedMoves;
  }
}

let direction = 0;
let possibleAttacks = 0;

export class Crown extends Piece {
  constructor(scene, x, y) {
    direction = [
      { row: 1, col: 0 }, 
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: -1 },
      { row: -1, col: 1 },
      { row: -1, col: -1 },
      { row: -1, col: 0 },
      { row: 0, col: -1 }
    ]
    possibleAttacks = direction;
    super(scene, x, y, 'crown', direction, possibleAttacks);

    scene.add.existing(this);
  }
}

export class Lance extends Piece {
  constructor(scene, x, y, turn) {
    if (turn == 0) {
      direction = [
        { row: 1, col: 0 }, 
        { row: 2, col: 0 }, 
        { row: 0, col: -1 },
        { row: 0, col: 1 }
      ]
      possibleAttacks = [
        {row: 1, col: 0},
        {row: 2, col: 0}
      ]

    } else if (turn == 1) {
      direction = [
        { row: -1, col: 0 }, 
        { row: -2, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 }
      ]
      possibleAttacks = [
        {row: -1, col: 0},
        {row: -2, col: 0}
      ]
    }
    super(scene, x, y, 'lance', direction, possibleAttacks);
    scene.add.existing(this);
  }
}

export class Sword extends Piece {
  constructor(scene, x, y, turn) {
    if (turn == 0) {
      direction =[
        { row: 1, col: 0 }, 
        { row: 0, col: -1 },
        { row: 0, col: 1 },
      ]
      possibleAttacks = [
        {row: 1, col: 0}
      ]

    } else if (turn == 1) {
      direction =[
        { row: -1, col: 0 }, 
        { row: 0, col: -1 },
        { row: 0, col: 1 },
      ]
      possibleAttacks = [
        {row: -1, col: 0}
      ]
    }
    super(scene, x, y, 'sword', direction, possibleAttacks);
    scene.add.existing(this);
  }
}

export class Staff extends Piece {
  constructor(scene, x, y) {
    super(scene, x, y, 'staff', [
      { row: 1, col: 0 }, 
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: -1 },
      { row: -1, col: 1 },
      { row: -1, col: -1 },
      { row: -1, col: 0 },
      { row: 0, col: -1 }
    ]);
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
    ]);
    scene.add.existing(this);
  }
}
