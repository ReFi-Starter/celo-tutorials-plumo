import DevLaunchers from "./classes/dev-launchers";
import Plumo from './Plumo';
import { ADDRESS } from './constants'; 

export function setupActivity(scene) {
  // Monitor this activity's success conditions
  new DevLaunchers.Activities.ProgressMonitor(scene, function() {});

  scene.activityText = new DevLaunchers.Activities.Info.Text(
    scene,
    Math.floor(scene.game.config.width / 2),
    Math.floor(scene.game.config.height - 25),
    "Click to reveal\n your balance"
  );

  const plumo = new Plumo()
  
  scene.chest.on("pointerdown", () => {
    if (scene.balanceTitle || scene.balance) {
      scene.balanceTitle.destroy()
      scene.balance.destroy()
    }

    let balance = 0;

    scene.activityText.setText("Fetching your\n balance...");
    plumo.fetchCeloBalance(ADDRESS).then(res => {
      const web3 = plumo.getWeb3Client();
      balance = Number(web3.utils.fromWei(res.toString())).toFixed(2)

      scene.activityText.setText("");
      scene.balance = new DevLaunchers.Activities.Info.Text(
        scene,
        Math.floor(scene.game.config.width / 2),
        Math.floor(scene.game.config.height - 30),
        `${balance} CELO`      
      );
      if (scene.chestContents != "NOTHING") {
        scene.balanceTitle = new DevLaunchers.Activities.Info.Text(
          scene,
          Math.floor(scene.game.config.width / 2),
          Math.floor(scene.game.config.height / 6),
          "Your balance is"
        )
        new DevLaunchers.Activities.Success.Noise(scene);
      }
    }).catch(err => {
      console.log(err);
    })
  });
}
