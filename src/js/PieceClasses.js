class Piece extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, allowedMoves, allowedInteractions, instance, player, life) {
    super(scene, x, y, key);
    this.allowedMoves = allowedMoves;
    this.allowedInteractions = allowedInteractions;
    this.player = player;
    this.life = life;
    this.instance = instance;

  }
}

let allowedMoves = 0;
let allowedInteractions = 0;
let sprite = '';
let instance = '';

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
    
    if (turn == 0) {
      sprite = 'top-crown';
    } else if (turn == 1) {
      sprite = 'down-crown';
    }

    instance = 'crown';
    super(scene, x, y, sprite, allowedMoves, allowedInteractions, instance);
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
      ];
      allowedInteractions = [
        { rowA: 1, colA: 0},
        { rowA: 2, colA: 0}
      ];
      sprite = 'top-lance';
    } else if (turn == 1) {
      allowedMoves = [
        { row: -1, col: 0 }, 
        { row: -2, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 }
      ];
      allowedInteractions = [
        { rowA: -1, colA: 0},
        { rowA: -2, colA: 0}
      ];
      sprite = 'down-lance';
    }
    instance = 'lance';
    super(scene, x, y, sprite, allowedMoves, allowedInteractions, instance);
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
      ];
      allowedInteractions = [
        { rowA: 1, colA: 0 }
      ];
      sprite = 'top-sword';
    } else if (turn == 1) {
      allowedMoves =[
        { row: -1, col: 0 }, 
        { row: 0, col: -1 },
        { row: 0, col: 1 },
      ];
      allowedInteractions = [
        { rowA: -1, colA: 0 }
      ];
      sprite = 'down-sword'
    }

    instance = 'sword';
    super(scene, x, y, sprite, allowedMoves, allowedInteractions, instance);
    scene.add.existing(this);
  }
}

export class Staff extends Piece {
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
      sprite = 'top-staff';
    } else if (turn == 1) {
      sprite = 'down-staff';
    }

    instance = 'staff';
    super(scene, x, y, sprite, allowedMoves, allowedInteractions, instance);
    scene.add.existing(this);
  }
}

export class Shield extends Piece {
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
    allowedInteractions = [ { rowA: 1, colA: 0 }, 
      { rowA: 0, colA: 1 },
      { rowA: 1, colA: 1 },
      { rowA: 1, colA: -1 },
      { rowA: -1, colA: 1 },
      { rowA: -1, colA: -1 },
      { rowA: -1, colA: 0 },
      { rowA: 0, colA: -1 }];

    if (turn == 0) {
      sprite = 'top-shield';
    } else if (turn == 1) {
      sprite = 'down-shield';
    }

    instance = 'shield';
    super(scene, x, y, sprite, allowedMoves, allowedInteractions, instance);
    scene.add.existing(this);
  }
}
