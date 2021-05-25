import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.audio("coinCatch", "assets/trump/coin_sound.m4a");
    this.load.audio("jump", "assets/trump/jump.m4a");
    this.load.audio("hit", "assets/trump/10-feet-taller.m4a");
    this.load.image("ground", "assets/figma/ground.png");
    this.load.image("trump-dead", "assets/trump/trump_dead.png");
    this.load.image("restart", "assets/trump/restart.png");
    this.load.image("game-over", "assets/trump/fired.png");
    // this.load.image("flag", "assets/trump/usa_flag.png");
    // this.load.image("ballot", "assets/trump/ballot.png");
    // this.load.image("sun", "assets/trump/donald-sun.png");
    this.load.image("trump_idle", "assets/trump/trump_idle.png");

    this.load.spritesheet("trump-run", "assets/trump/trump_run.png", {
      frameWidth: 88,
      frameHeight: 94,
    });

    // Rewards
    this.load.spritesheet("dollar-bill", "assets/trump/dolla.png", {
      frameWidth: 92,
      frameHeight: 77,
    });

    this.load.spritesheet("coin-anim", "assets/figma/coins.png", {
      frameWidth: 22,
      frameHeight: 22,
    });
    // Obsticles
    this.load.image("obsticle-1", "assets/trump/mexican.png");
    this.load.image("obsticle-2", "assets/trump/twitter.png");
    this.load.image("obsticle-3", "assets/trump/corona.png");
    this.load.image("obsticle-4", "assets/trump/mexican_big.png");
    this.load.image("obsticle-5", "assets/trump/nuclear.png");
    this.load.image("pileofgold", "assets/trump/money.png");
  }

  create() {
    this.scene.start("PlayScene");
  }
}

export default PreloadScene;
