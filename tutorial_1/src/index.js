import Phaser from "phaser";
import { config } from "./settings/config.js";

const game = new Phaser.Game(config);


/*
 * Import and set up the specific dev launchers activity code
 * to be injected into this game (Helps keep our games and lessons
 * separate)
 */
function setupActivity() {
  var activity = require("./activity-setup.js");
  activity.setupActivity(game.scene.scenes[0]);
}

game.events.on("ready", function() {
  var playScene = game.scene.scenes[0];
  window.sceneUpdateEventListener = playScene.events.on(
    "create",
    setupActivity
  );
});
