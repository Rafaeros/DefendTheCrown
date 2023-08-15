class Sword extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'sword');
  
      this.setInteractive();
      this.scene.input.setDraggable(this);
  
      this.on('drag', (pointer, dragX, dragY) => {
        this.x = dragX;
        this.y = dragY;
      });
    }
  }
  
  export default Sword;