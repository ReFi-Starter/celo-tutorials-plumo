import Phaser from "phaser";
import Chest from "/src/classes/Chest.js";

(function() {
  window.Animal = Chest;
})();

export default class PlayScene extends Phaser.Scene {
  preload() {
    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );

    this.load.image("background", require("../assets/background.png"));

    this.load.spritesheet(
      "chest",
      require("../assets/treasure-chest-spritesheet.png"),
      {
        frameWidth: 26,
        frameHeight: 20,
        margin: 0,
        spacing: 0
      }
    );
  }

  create() {
    let halfGameWidth = this.game.config.width / 2;
    let halfGameHeight = this.game.config.height / 2;

    // Create sky
    this.background = this.add.sprite(
      halfGameWidth,
      halfGameHeight,
      "background"
    );

    // Create pet
    this.chest = new Chest(this, halfGameWidth, halfGameHeight - 5);

    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);
  }

  update(time, delta) {}

  addPhysicalRectangle(x, y, width, height, color, alphaIThinkMaybe) {
    let rect = this.add.rectangle(x, y, width, height, color, alphaIThinkMaybe);
    rect = this.physics.add.existing(rect, true);

    return rect;
  }

}
