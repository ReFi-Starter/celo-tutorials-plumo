import Phaser from "phaser";

export default class Chest extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "chest", 0);
    this.scene = scene;

    scene.add
      .existing(this)
      .setInteractive()
      .setOrigin() // fixes interactive offset issue
      .on("pointerdown", function(pointer, localX, localY, event) {
        // When this chest is clicked, let's do something!
        this.anims.play("chest-open", true);
      });

    // Create the animations we need from the pet spritesheet
    const anims = scene.anims;
    anims.create({
      key: "chest-closed",
      frames: anims.generateFrameNumbers("chest", { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });
    anims.create({
      key: "chest-open",
      frames: anims.generateFrameNumbers("chest", { start: 1, end: 1 }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.play("chest-closed", true);

    // Slight bounce animation, start tween
    setInterval(() => {
      scene.tweens.add({
        targets: this,
        y: y - 3,
        duration: 200,
        ease: "Power2",
        yoyo: true,
        repeat: false,
        delay: 1
      });
    }, 2000);

    // Make sure the scene calls this object's update function every frame
    this.updateListener = scene.events.on("update", (time, delta) => {
      this.update(time, delta);
    });
  }

  update(time, delta) {}

  destroy() {
    // Remove this object's update listener from the scene
    this.scene.events.removeListener("update", this.updateListener);

    // Call this object's parent class destroy method
    super.destroy();
  }
}
