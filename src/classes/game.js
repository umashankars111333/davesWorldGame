import { buildLevel } from "../../utils/builder.js";
import InputHandler from "./input.js";
import Player from "./player.js";
import ScoreManagement from "./scoreManagement.js";
import Audio from "./audio.js";

const GAMESTATE = {
  beforeGameStart: 0,
  paused: 1,
  running: 2,
  gameOver: 3,
  congratulations: 4,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.leftBorder = 50;
    this.rightBorder = gameWidth - 50;
    this.topBorder = 150;
    this.baseBorder = gameHeight - 150;

    this.finalScore = 0;
    this.pipe = {
      src: document.getElementById("pipe"),
      size: {
        width: 50,
        height: 50,
      },
      position: {
        x: 0,
        y: 50 * 10,
      },
    };
    this.goBoard = {
      src: document.getElementById("goBoard"),
      size: {
        width: this.gameWidth / 2,
        height: 50,
      },
      position: {
        x: this.gameWidth / 2 - this.gameWidth / 2 / 2,
        y: this.gameHeight - 50,
      },
    };
    this.gameOverScreen = {
      src: document.getElementById("gameOverImage"),
      size: {
        width: this.gameWidth / 3,
        height: this.gameHeight / 3,
      },
      position: {
        x: this.gameWidth / 2 - this.gameWidth / 3 / 2,
        y: this.gameHeight / 2 - this.gameHeight / 3 / 2,
      },
    };
    this.beforeGameStart = {
      src: document.getElementById("beforeGameStart"),
      size: {
        width: this.gameWidth,
        height: this.gameHeight,
      },
      position: {
        x: 0,
        y: 0,
      },
    };
    this.congratulationScreen = {
      src: document.getElementById("congratulationScreen"),
      size: {
        width: this.gameWidth / 1.8,
        height: this.gameHeight,
      },
      position: {
        x: this.gameWidth / 2 - this.gameWidth / 1.8 / 2,
        y: this.gameHeight / 2 - this.gameHeight / 2,
      },
    };
  }

  init() {
    this.gameState = GAMESTATE.beforeGameStart;
    let scoreManagement = new ScoreManagement(this);
    let gameObjects = buildLevel(this);
    let player = new Player(this);
    this.inputHandler = new InputHandler(player, this);
    gameObjects.players = [player];
    gameObjects.scoreManagement = [scoreManagement];
    this.gameObjects = gameObjects;
    this.bgmAudio = document.getElementById("bgm");
    this.audio = new Audio();
  }

  reset() {
    let gameObjects = buildLevel(this);
    let player = new Player(this);
    let scoreManagement = new ScoreManagement(this);
    this.inputHandler = new InputHandler(player, this);
    gameObjects.players = [player];
    gameObjects.scoreManagement = [scoreManagement];
    this.gameObjects = gameObjects;
    Object.keys(this.gameObjects).forEach((objectList) => {
      this.gameObjects[objectList].forEach((gameObject) => {
        if (
          gameObject.name == "player" ||
          gameObject.name == "rewardObject" ||
          gameObject.name == "score"
        ) {
          gameObject.reset();
        }
      });
    });
  }

  togglePause() {
    if (this.gameState == GAMESTATE.paused) {
      this.gameState = GAMESTATE.running;
      this.bgmAudio.play();
      this.bgmAudio.volume = 0.2;
    } else if (this.gameState == GAMESTATE.running) {
      this.gameState = GAMESTATE.paused;
      this.bgmAudio.pause();
    }
  }

  spaceKeyEvent() {
    if (
      this.gameState == GAMESTATE.beforeGameStart ||
      this.gameState == GAMESTATE.gameOver ||
      this.gameState == GAMESTATE.congratulations
    ) {
      this.gameState = GAMESTATE.running;
      this.bgmAudio.currentTime = 0;
      this.bgmAudio.play();
      this.bgmAudio.volume = 0.2;
      this.bgmAudio.loop = true;
    }
  }

  update(deltaTime) {
    if (this.gameState == GAMESTATE.paused) {
      return;
    }

    if (this.gameState == GAMESTATE.gameOver) {
      this.reset();
    }

    if (this.gameState == GAMESTATE.congratulations) {
      this.reset();
    }

    Object.keys(this.gameObjects).forEach((objectList) => {
      this.gameObjects[objectList].forEach((gameObject) =>
        gameObject.update(deltaTime)
      );
      this.gameObjects.players = this.gameObjects.players.filter(
        (gameObject) => !gameObject.markForDeletion
      );
      this.gameObjects.rewardObjects = this.gameObjects.rewardObjects.filter(
        (gameObject) => !gameObject.markForDeletion
      );
    });
  }

  draw(context) {
    Object.keys(this.gameObjects).forEach((objectList) => {
      this.gameObjects[objectList].forEach((gameObject) => gameObject.draw(context));
    });
    context.drawImage(
      this.pipe.src,
      this.pipe.position.x,
      this.pipe.position.y,
      this.pipe.size.width,
      this.pipe.size.height
    );

    context.drawImage(
      this.goBoard.src,
      this.goBoard.position.x,
      this.goBoard.position.y,
      this.goBoard.size.width,
      this.goBoard.size.height
    );
    context.textAlign = "center";

    if (this.gameState == GAMESTATE.beforeGameStart) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = "rgba(0,0,0)";
      context.fill();
      context.drawImage(
        this.beforeGameStart.src,
        this.beforeGameStart.position.x,
        this.beforeGameStart.position.y,
        this.beforeGameStart.size.width,
        this.beforeGameStart.size.height
      );
    } else if (this.gameState == GAMESTATE.paused) {
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "rgba(0,0,0,0.3)";
        context.fill();

        context.font = "30px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    } else if (this.gameState == GAMESTATE.gameOver) {
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "rgba(0,0,0)";
        context.fill();
        context.drawImage(
          this.gameOverScreen.src,
          this.gameOverScreen.position.x,
          this.gameOverScreen.position.y,
          this.gameOverScreen.size.width,
          this.gameOverScreen.size.height
      );
    } else if (this.gameState == GAMESTATE.congratulations) {
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "rgb(32, 5, 14)";
        context.fill();
        context.drawImage(
          this.congratulationScreen.src,
          this.congratulationScreen.position.x,
          this.congratulationScreen.position.y,
          this.congratulationScreen.size.width,
          this.congratulationScreen.size.height
        );
        let congratulationsPageText = "Your Score : " + this.finalScore;
        context.font = "30px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText(
          congratulationsPageText,
          this.gameWidth / 2,
          this.gameHeight / 1.15
        );
    }
  }
}
