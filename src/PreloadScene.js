import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.audio("coinCatch", "/trump/coin_sound.m4a");
    this.load.audio("jump", "/trump/jump.m4a");
    this.load.audio("hit", "/trump/10-feet-taller.m4a");
    this.load.image("ground", "/figma/ground.png");
    this.load.image("trump-dead", "/trump/trump_dead.png");
    this.load.image("restart", "/trump/restart.png");
    this.load.image("game-over", "/trump/fired.png");
    // this.load.image("flag", "assets/trump/usa_flag.png");
    // this.load.image("ballot", "assets/trump/ballot.png");
    // this.load.image("sun", "assets/trump/donald-sun.png");
    this.load.image("trump_idle", "/trump/trump_idle.png");

    this.load.spritesheet("trump-run", "/trump/trump_run.png", {
      frameWidth: 88,
      frameHeight: 94,
    });

    // Rewards
    this.load.spritesheet("dollar-bill", "/trump/dolla.png", {
      frameWidth: 92,
      frameHeight: 77,
    });

    this.load.spritesheet("coin-anim", "/figma/coins.png", {
      frameWidth: 22,
      frameHeight: 22,
    });
    // Obsticles
    this.load.image("obsticle-1", "/trump/mexican.png");
    this.load.image("obsticle-2", "/trump/twitter.png");
    this.load.image("obsticle-3", "/trump/corona.png");
    this.load.image("obsticle-4", "/trump/mexican_big.png");
    this.load.image("obsticle-5", "/trump/nuclear.png");
    this.load.image("pileofgold", "/trump/money.png");
  }

  create() {
    this.scene.start("PlayScene");
  }
}

export default PreloadScene;
