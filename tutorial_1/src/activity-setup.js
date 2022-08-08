import DevLaunchers from "./classes/dev-launchers";

// Load specific game stuff here that will be used in
// this file, or in 'modify.mjs'

export function setupActivity(scene) {
  // Monitor this activity's success conditions
  new DevLaunchers.Activities.ProgressMonitor(scene, function() {});

  scene.activityText = new DevLaunchers.Activities.Info.Text(
    scene,
    Math.floor(scene.game.config.width / 2),
    Math.floor(scene.game.config.height - 25),
    "Set the variable:\n'chestContents'"
  );
  loadModifyCode(scene, () => {
    if (scene.chestContents == "NOTHING") {
      new DevLaunchers.Activities.Info.InstructionSequence(scene, [
        new DevLaunchers.Activities.Info.Instruction(
          scene,
          "Put something in\nthe chest!",
          2000
        )
      ]);
    } else {
      scene.activityText.setText("Click to open\nyour chest");
    }

    scene.chest.on("pointerdown", () => {
      scene.activityText.setText("");
      new DevLaunchers.Activities.Info.Text(
        scene,
        Math.floor(scene.game.config.width / 2),
        Math.floor(scene.game.config.height - 30),
        "You received:\n" + scene.chestContents
      );
      if (scene.chestContents != "NOTHING") {
        new DevLaunchers.Activities.Info.Text(
          scene,
          Math.floor(scene.game.config.width / 2),
          Math.floor(scene.game.config.height / 6),
          "CONGRATULATIONS!"
        );
        new DevLaunchers.Activities.Success.Noise(scene);
      }
    });
  });
}

var evalWithinContext = function(context, code) {
  (function(code) {
    try {
      eval(code);
    } catch (error) {
      console.log(error)
    }
  }.apply(context, [code]));
};


function loadModifyCode(scene, callback) {
  loadScriptWithinContext("../modify.mjs", scene, callback);
}

function loadScriptWithinContext(path, context, callback) {
  /* eslint-disable */
  fetch(path)
    .then(function(response) {
      return response.text();
    })
    .then(function(textString) {
      let modifiedActivityCode = injectIntoModifiedActivityCode(textString);
      evalWithinContext(context, modifiedActivityCode);
      callback();
    })
  /* eslint-enable */
}

function injectIntoModifiedActivityCode(modifiedActivityCode) {
  return modifiedActivityCode;
}
