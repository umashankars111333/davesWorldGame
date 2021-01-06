export default class ScoreManagement {
  constructor(game) {
    this.name = "score";
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.width = game.gameWidth;
    this.height = 50;

    this.score = {
      src: document.getElementById("score"),
      numberImage: {
        src: document.getElementById("0"),
        position: {
          x: 200,
          y: 13,
        },
        size: {
          width: 20,
          height: 60,
        },
      },
      position: {
        x: 30,
        y: 20,
      },
      size: {
        width: 150,
        height: 50,
      },
      value: 0,
    };

    this.lives = {
      src: document.getElementById("daves"),
      position: {
        x: 750,
        y: 20,
      },
      size: {
        width: 150,
        height: 50,
      },
      face: {
        src: document.getElementById("life"),
        position: {
          x: 920,
          y: 20,
        },
        size: {
          width: 50,
          height: 50,
        },
      },
      value: 3,
    };
    this.level = {
      src: document.getElementById("level"),
      numberImage: {
        position: {
          x: 600,
          y: 13,
        },
        size: {
          width: 20,
          height: 60,
        },
      },
      position: {
        x: 400,
        y: 20,
      },
      size: {
        width: 150,
        height: 50,
      },
      value: 1,
    };
  }

  getImage(id) {
    return document.getElementById(id);
  }
  reset() {
    this.score.value = 0;
    this.lives.value = 3;
  }

  updateScore(score) {
    this.score.value += score;
  }

  update(deltaTime) {}

  draw(context) {
    context.drawImage(
      this.score.src,
      this.score.position.x,
      this.score.position.y,
      this.score.size.width,
      this.score.size.height
    );

    let scoreNumberPosition = this.score.numberImage.position.x;
    let scoreString = String(this.score.value);
    scoreString = scoreString.padStart(5, "0");

    for (let i = 0; i < scoreString.length; i++) {
      context.drawImage(
        this.getImage(scoreString[i]),
        scoreNumberPosition,
        this.score.numberImage.position.y,
        this.score.numberImage.size.width,
        this.score.numberImage.size.height
      );
      scoreNumberPosition += 20;
    }

    context.drawImage(
      this.level.src,
      this.level.position.x,
      this.level.position.y,
      this.level.size.width,
      this.level.size.height
    );
    let levelNumberPosition = this.level.numberImage.position.x;
    for (let i = 0; i < 2; i++) {
      context.drawImage(
        this.getImage(String(i)),
        levelNumberPosition,
        this.level.numberImage.position.y,
        this.level.numberImage.size.width,
        this.level.numberImage.size.height
      );
      levelNumberPosition += 20;
    }

    context.drawImage(
      this.lives.src,
      this.lives.position.x,
      this.lives.position.y,
      this.lives.size.width,
      this.lives.size.height
    );

    let facePositionX = this.lives.face.position.x;
    for (let i = 0; i < this.lives.value; i++) {
      context.drawImage(
        this.lives.face.src,
        facePositionX,
        this.lives.face.position.y,
        this.lives.face.size.width,
        this.lives.face.size.height
      );
      facePositionX += 50;
    }
  }
}
