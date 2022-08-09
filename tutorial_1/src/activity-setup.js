import DevLaunchers from "./classes/dev-launchers";
import { PlumoVerifier } from 'plumo-verifier';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import { ADDRESS } from './constants'; 

export function setupActivity(scene) {
  // Monitor this activity's success conditions
  new DevLaunchers.Activities.ProgressMonitor(scene, function() {});

  scene.activityText = new DevLaunchers.Activities.Info.Text(
    scene,
    Math.floor(scene.game.config.width / 2),
    Math.floor(scene.game.config.height - 25),
    "Set the variable:\n'chestContents'"
  );

  const logger = {
    debug: (...args) => console.debug(...args),
    info: (...args) => console.info(...args),
    warn: (...args) => console.warn(...args),
    error: (...args) => console.error(...args),
  };

  const web3 = new Web3("https://plumo-prover-rpc.kobi.one")
  const kit = newKitFromWeb3(web3);

  const plumo = new PlumoVerifier(logger, kit.web3.eth, Buffer);

  scene.activityText.setText("Click to reveal\n your balance");

  scene.chest.on("pointerdown", () => {
    if (scene.balanceTitle || scene.balance) {
      scene.balanceTitle.destroy()
      scene.balance.destroy()
    }

    let balance = 0;

    scene.activityText.setText("Fetching your\n balance...");
    plumo.fetchCeloBalanceVerified(ADDRESS).then(res => {
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
