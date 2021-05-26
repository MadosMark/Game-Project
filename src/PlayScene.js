import Phaser from "phaser";

class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    const { height, width } = this.game.config;
    this.gameSpeed = 5;
    this.isGameRunning = false;
    this.respawnTime = 0;
    this.score = 0;
    this.rewardPoints = 0;

    this.jumpSound = this.sound.add("jump", { volume: 0.1 });
    this.hitSound = this.sound.add("hit", { volume: 0.1 });
    this.rewardSound = this.sound.add("coinCatch", { volume: 0.05 });

    this.startTrigger = this.physics.add
      .sprite(0, 10)
      .setOrigin(0, 1)
      .setImmovable();
    this.ground = this.add
      .tileSprite(0, height, 88, 26, "ground")
      .setOrigin(0, 1);
    this.trump = this.physics.add
      .sprite(0, height, "trump_idle")
      .setCollideWorldBounds(true)
      .setGravityY(5000)
      .setBodySize(44, 90)
      .setDepth(1)
      .setOrigin(0, 1);

    this.scoreText = this.add
      .text(width / 1, 5, "00000", {
        fill: "#FFDF00",
        font: "500 25px Oswald",
        resolution: 5,
      })
      .setOrigin(1, 0)
      .setAlpha(0);

    this.highScoreText = this.add
      .text(width / 25, 5, "00000", {
        fill: "#FFDF00",
        font: "500 25px Oswald",
        resolution: 5,
      })
      .setOrigin(1, 0)
      .setAlpha(0);
    // SCARR
    this.scarr = this.add
      .text(width / 5, 33, "BonusPoint: " + this.rewardPoints, {
        font: "20px Arial",
        fill: "#FFD700",
      })
      .setOrigin(1, 0)
      .setAlpha(0);

    this.gameSpeedText = this.add
      .text(width / 5, 6, "GameSpeed: " + this.gameSpeed, {
        font: "20px Arial",
        fill: "#FFD700",
      })
      .setOrigin(1, 0)
      .setAlpha(0);

    this.environment = this.add.group();
    this.environment.addMultiple([
      this.add.image(width - 110, 150, "flag"),
      this.add.image(width / 1.5, 80, "flag"),
      this.add.image(width / 3, 100, "flag"),
      this.add.image(width / 4, 120, "cloud"),
      this.add.image(width / 1, 100, "cloud"),
    ]);

    this.environment.setAlpha(0);
    this.gameOverScreen = this.add
      .container(width / 2, height / 2 - 50)
      .setAlpha(0);
    this.gameOverText = this.add.image(0, 20, "game-over");
    this.restart = this.add.image(10, 190, "restart").setInteractive();
    this.gameOverScreen.add([this.gameOverText, this.restart]);

    this.obsticles = this.physics.add.group();
    this.rewards = this.physics.add.group();

    this.initAnims();
    this.initStartTrigger();
    this.initColliders();
    this.initRewardColliders();
    this.handleInputs();
    this.handleScore();
  }

  initColliders() {
    this.physics.add.collider(
      this.trump,
      this.obsticles,
      () => {
        this.highScoreText.x = this.scoreText.x - this.scoreText.width - 20;

        const highScore = this.highScoreText.text.substr(
          this.highScoreText.text.length - 5
        );
        const newScore =
          Number(this.scoreText.text) > Number(highScore)
            ? this.scoreText.text
            : highScore;

        this.highScoreText.setText("HI " + newScore);
        this.highScoreText.setAlpha(1);
        this.physics.pause();
        this.isGameRunning = false;
        this.anims.pauseAll();
        this.trump.setTexture("trump-dead");
        this.respawnTime = 0;
        this.gameSpeed = 5;
        this.gameSpeedText.setText(
          "Current speed = " + this.gameSpeed.toFixed(0)
        );
        this.gameOverScreen.setAlpha(1);
        this.score = 0;
        this.rewardPoints = 0;
        this.scarr.setText("Current bonus = " + this.rewardPoints);
        this.hitSound.play();
      },
      null,
      this
    );
  }

  initRewardColliders() {
    this.physics.add.collider(
      this.trump,
      this.rewards,

      () => {
        this.rewardSound.play();
        this.rewardPoints++;
        this.trump.body.setGravityY(5000);
        this.rewards.setAlpha(0);

        this.gameSpeedText.setText(
          "Current speed = " + this.gameSpeed.toFixed(0)
        );
        this.scarr.setText("Current bonus = " + this.rewardPoints);

        if (this.gameSpeed > 8) {
          this.gameSpeed - 0.4;
        }

        this.isGameRunning = true;
      },
      null,
      this
    );
  }

  initStartTrigger() {
    const { width, height } = this.game.config;
    this.physics.add.overlap(
      this.startTrigger,
      this.trump,
      () => {
        if (this.startTrigger.y === 10) {
          this.startTrigger.body.reset(0, height);
          return;
        }

        this.startTrigger.disableBody(true, true);

        const startEvent = this.time.addEvent({
          delay: 1000 / 60,
          loop: true,
          callbackScope: this,
          callback: () => {
            this.trump.setVelocityX(80);
            this.trump.play("run-animation", 1);

            if (this.ground.width < width) {
              this.ground.width += 17 * 2;
            }

            if (this.ground.width >= 1000) {
              this.ground.width = width;
              this.isGameRunning = true;
              this.trump.setVelocityX(0);
              this.scoreText.setAlpha(1);
              this.scarr.setAlpha(1);
              this.gameSpeedText.setAlpha(1);
              this.environment.setAlpha(1);
              startEvent.remove();
            }
          },
        });
      },
      null,
      this
    );
  }

  initAnims() {
    this.anims.create({
      key: "run-animation",
      frames: this.anims.generateFrameNumbers("trump-run", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "dollar",
      frames: this.anims.generateFrameNumbers("dollar-bill", {
        start: 0,
        end: 1,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "coin",
      frames: this.anims.generateFrameNumbers("coin-anim", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  handleScore() {
    this.time.addEvent({
      delay: 1000 / 10,
      loop: true,
      callbackScope: this,
      callback: () => {
        if (!this.isGameRunning) {
          return;
        }

        this.score++;
        this.gameSpeed += 0.01;

        if (this.score % 100 === 0) {
          this.tweens.add({
            targets: this.scoreText,
            duration: 100,
            repeat: 3,
            alpha: 0,
            yoyo: true,
          });
        }

        const score = Array.from(String(this.score), Number);
        for (let i = 0; i < 5 - String(this.score).length; i++) {
          score.unshift(0);
        }

        this.scoreText.setText(score.join(""));
      },
    });
  }

  handleInputs() {
    this.restart.on("pointerdown", () => {
      this.trump.setVelocityY(0);
      this.trump.body.height = 92;
      this.trump.body.offset.y = 0;
      this.physics.resume();
      this.obsticles.clear(true, true);
      this.rewards.clear(true, true);
      this.isGameRunning = true;
      this.gameOverScreen.setAlpha(0);
      this.anims.resumeAll();
    });

    //CONTROLS
    // Playing with W & S for Flappy birds stuff
    this.input.keyboard.on("keydown-W", () => {
      // UP
      this.jumpSound.play();
      this.trump.body.height = 92;
      this.trump.body.offset.y = 0;
      this.trump.setVelocityY(-300);
      this.trump.setGravityY(300);
    });
    // DOWN
    this.input.keyboard.on("keydown-S", () => {
      this.trump.body.height = 92;
      this.trump.body.offset.x = 0;
      this.trump.setVelocityY(300);
    });
    // Left and right
    this.input.keyboard.on("keydown-A", () => {
      this.trump.body.height = 92;
      this.trump.body.offset.x = 0;
      this.trump.setVelocityX(-500);
    });

    this.input.keyboard.on("keydown-D", () => {
      this.trump.body.height = 92;
      this.trump.body.offset.x = 0;
      this.trump.setVelocityX(300);
    });

    // Increase / Decrease speed by 1
    this.input.keyboard.on("keydown_UP", () => {
      this.gameSpeed++;
    });

    this.input.keyboard.on("keydown_DOWN", () => {
      this.gameSpeed--;
    });

    this.input.keyboard.on("keydown_SPACE", () => {
      if (!this.trump.body.onFloor() || this.trump.body.velocity.x > 0) {
        return;
      }

      this.jumpSound.play();
      this.trump.body.height = 92;
      this.trump.body.offset.y = 0;
      this.trump.setVelocityY(-1600);
      this.trump.setGravityY(5000);
      this.trump.setTexture("trump-run", 0);
    });

    this.input.keyboard.on("keyup_DOWN", () => {
      if (this.score !== 0 && !this.isGameRunning) {
        return;
      }
      this.trump.body.height = 92;
      this.trump.body.offset.y = 0;
    });
  }

  placeObsticle() {
    const obsticleNum = Math.floor(Math.random() * 5) + 1;
    const distance = Phaser.Math.Between(600, 900);
    let obsticle;
    // 5 Nuclear
    if (obsticleNum === 5) {
      const enemyHeight = [1, 200];
      obsticle = this.obsticles
        .create(
          this.game.config.width + distance,
          this.game.config.height - enemyHeight[Math.floor(Math.random() * 2)],
          `obsticle-5`
        )
        .setOrigin(0, 1);
      obsticle.body.height = obsticle.body.height / 1.5;
    }
    // 4 Mexican
    if (obsticleNum === 4) {
      obsticle = this.obsticles
        .create(
          this.game.config.width + distance,
          this.game.config.height,
          `obsticle-4`
        )
        .setOrigin(0, 1);
      obsticle.body.height = obsticle.body.height / 1.5;
    }
    // 3 Corona
    if (obsticleNum === 3) {
      const enemyHeight = [1, 200];
      obsticle = this.obsticles
        .create(
          this.game.config.width + distance,
          this.game.config.height - enemyHeight[Math.floor(Math.random() * 2)],
          `obsticle-3`
        )
        .setOrigin(0, 1);
      obsticle.body.height = obsticle.body.height / 1.5;
    }
    // 2 Twitter
    if (obsticleNum === 2) {
      const enemyHeight = [20, 200];
      obsticle = this.obsticles
        .create(
          this.game.config.width + distance,
          this.game.config.height - enemyHeight[Math.floor(Math.random() * 2)],
          `obsticle-2`
        )
        .setOrigin(0, 1);
      obsticle.body.height = obsticle.body.height / 1.5;
    }
    // 1 Mexican
    if (obsticleNum === 1) {
      obsticle = this.obsticles
        .create(
          this.game.config.width + distance,
          this.game.config.height,
          `obsticle-1`
        )
        .setOrigin(0, 1);
      obsticle.body.height = obsticle.body.height / 1.5;
    }

    obsticle.setImmovable();
  }

  placeReward() {
    const rewardNum = Math.floor(Math.random() * 6) + 1;
    const distance = Phaser.Math.Between(600, 800);
    let reward;

    if (rewardNum === 1) {
      const rewardHeight = [75, 100];
      reward = this.rewards
        .create(
          this.game.config.width + distance,
          this.game.config.height - rewardHeight[Math.floor(Math.random() * 2)],
          `coin-anim`
        )
        .setOrigin(0, 1);
      reward.play("coin", 1);
      reward.body.height = reward.body.height / 1.5;
    }
    if (rewardNum === 2) {
      const rewardHeight = [50, 100];
      reward = this.rewards
        .create(
          this.game.config.width + distance,
          this.game.config.height - rewardHeight[Math.floor(Math.random() * 2)],
          `coin-anim`
        )
        .setOrigin(0, 1);
      reward.play("coin", 1);
      reward.body.height = reward.body.height / 1.5;
    }

    if (rewardNum === 3) {
      const rewardHeight = [25, 100];
      reward = this.rewards
        .create(
          this.game.config.width + distance,
          this.game.config.height - rewardHeight[Math.floor(Math.random() * 2)],
          `coin-anim`
        )
        .setOrigin(0, 1);
      reward.play("coin", 1);
      reward.body.height = reward.body.height / 1.5;
    }

    if (rewardNum === 4) {
      const rewardHeight = [25, 50];
      reward = this.rewards
        .create(
          this.game.config.width + distance,
          this.game.config.height - rewardHeight[Math.floor(Math.random() * 2)],
          `coin-anim`
        )
        .setOrigin(0, 1);
      reward.play("coin", 1);
      reward.body.height = reward.body.height / 1.5;
    }

    if (rewardNum === 5) {
      reward = this.rewards
        .create(
          this.game.config.width + distance,
          this.game.config.height / 2,
          `dollar-bill`
        )
        .setOrigin(0, 1);
      reward.play("dollar", 1);
      reward.body.height = reward.body.height / 1.5;
    }

    if (rewardNum === 6) {
      reward = this.rewards
        .create(
          this.game.config.width + distance,
          this.game.config.height,
          `pileofgold`
        )
        .setOrigin(0, 1);
      reward.body.height = reward.body.height / 1.5;
    }

    reward.setImmovable();
  }
  ///

  // Updates
  update(time, delta) {
    if (!this.isGameRunning) {
      return;
    }
    this.ground.tilePositionX += this.gameSpeed;
    Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed);
    Phaser.Actions.IncX(this.rewards.getChildren(), -this.gameSpeed);
    Phaser.Actions.IncX(this.environment.getChildren(), -0.5);

    this.respawnTime += delta * this.gameSpeed * 0.08;
    if (this.respawnTime >= 1500) {
      this.placeObsticle();
      this.placeReward();
      this.respawnTime = 0;
    }

    this.obsticles.getChildren().forEach((obsticle) => {
      if (obsticle.getBounds().right < 0) {
        this.obsticles.killAndHide(obsticle);
      }
    });

    this.rewards.getChildren().forEach((reward) => {
      if (reward.getBounds().right < 0) {
        this.rewards.killAndHide(reward);
      }
    });

    this.environment.getChildren().forEach((env) => {
      if (env.getBounds().right < 0) {
        env.x = this.game.config.width + 30;
      }
    });

    if (this.trump.body.deltaAbsY() > 0) {
      this.trump.anims.stop();
      this.trump.setTexture("trump-run", 0);
    } else {
      this.trump.body.height <= 58;
      this.trump.play("run-animation", true);
    }
  }
}

export default PlayScene;
