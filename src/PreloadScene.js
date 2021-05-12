import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.audio("jump", "assets/trump/your-fired.m4a");
    this.load.audio("hit", "assets/trump/10-feet-taller.m4a");
    this.load.audio("reach", "assets/reach.m4a");
    this.load.image("ground", "assets/figma/ground.png");
    this.load.image("dino-hurt", "assets/trump/trump_dead.png");
    this.load.image("restart", "assets/restart.png");
    this.load.image("game-over", "assets/trump/fired.png");
    this.load.image("flag", "assets/trump/usa_flag.png");
    this.load.image("cloud", "assets/trump/ballot.png");
    this.load.image("sun", "assets/trump/donald-sun.png");
    this.load.image("trump_idle", "assets/trump/trump_idle.png");

    this.load.spritesheet("star", "assets/stars.png", {
      frameWidth: 9,
      frameHeight: 9,
    });

    this.load.spritesheet("moon", "assets/moon.png", {
      frameWidth: 20,
      frameHeight: 40,
    });

    this.load.spritesheet("dino", "assets/trump/trump_run.png", {
      frameWidth: 88,
      frameHeight: 94,
    });

    this.load.spritesheet("dino-down", "assets/figma/dino-down-ds.png", {
      frameWidth: 118,
      frameHeight: 94,
    });

    this.load.spritesheet("enemy-bird", "assets/trump/dolla.png", {
      frameWidth: 92,
      frameHeight: 77,
    });

    this.load.image("obsticle-1", "assets/trump/mexican.png");
    this.load.image("obsticle-2", "assets/trump/twitter.png");
    this.load.image("obsticle-3", "assets/trump/corona.png");
    this.load.image("obsticle-4", "assets/trump/mexican_big.png");
    this.load.image("obsticle-5", "assets/trump/nuclear.png");
    this.load.image("obsticle-6", "assets/trump/money.png");
  }

  create() {
    this.scene.start("PlayScene");
  }
}

export default PreloadScene;
