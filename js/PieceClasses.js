class Piece extends Phaser.GameObjects.Sprite {
   getPossibleMoves() {
    moves = [{x: this.x, y: this.y}]
    return moves;
  }
}

export class Crown extends Piece {
  constructor(scene, x, y) {
    super(scene, x, y, 'crown');
    scene.add.existing(this);
  }
}

export class Lance extends Piece {
  constructor(scene, x, y) {
    super(scene, x, y, 'lance');
    scene.add.existing(this);
  }
}

export class Sword extends Piece {
  constructor(scene, x, y) {
    super(scene, x, y, 'sword');
    scene.add.existing(this);
  }

  getPossibleMoves(){
    moves = [
      {x: this.x, y: this.y - 1},
      {x: this.x + 1, y: this.y},
      {x: this.x - 1, y: this.y}
    ]
    return moves;
  }
}

export class Staff extends Piece {
  constructor(scene, x, y) {
    super(scene, x, y, 'staff');
    scene.add.existing(this);
  }
}

export class Shield extends Piece {
  constructor(scene, x, y) {
    super(scene, x, y, 'shield');
    scene.add.existing(this);
  }
}
