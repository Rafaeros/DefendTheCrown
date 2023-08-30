

class Piece extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, allowedMoves) {
    super(scene, x, y, key);
    this.allowedMoves = allowedMoves;
  }
}

let direction = 2;

export class Crown extends Piece {
  constructor(scene, x, y, direction) {
    

    super(scene, x, y, 'crown', [
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

export class Lance extends Piece {
  constructor(scene, x, y, turn) {
    if (turn == 0) {
      direction = [
        { row: 1, col: 0 }, 
        { row: 2, col: 0 }, 
        { row: 0, col: -1 },
        { row: 0, col: 1 }
      ]
    } else if (turn == 1) {
      direction = [
        { row: -1, col: 0 }, 
        { row: -2, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 }
      ]
    }
    super(scene, x, y, 'lance', direction);
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
    } else if (turn == 1) {
      direction =[
        { row: -1, col: 0 }, 
        { row: 0, col: -1 },
        { row: 0, col: 1 },
      ]
    }
    super(scene, x, y, 'sword', direction);
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
