import detectCollision from "../../utils/detectCollision.js";

const GAMESTATE = {
  beforeGameStart: 0,
  paused: 1,
  running: 2,
  gameOver: 3,
  congratulations: 4,
};

export default class Player {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.name = "player";
    this.game = game;

    this.src = document.getElementById("dave");
    this.size = {
      width: 50,
      height: 50,
    };
    this.position = {
      x: 50,
      y: this.gameHeight - 200,
    };
    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = 0.3;
    this.maxSpeedX = 4;
    this.maxSpeedY = 8;
    this.counter = 0;

    this.markForDeletion = false;
    this.jumpingState = false;
    this.moveLeftState = false;
    this.moveRightState = false;
  }

  getImage(direction, state) {
    return document.getElementById(`dave${direction}${state}`);
  }

  reset() {
    this.markForDeletion = false;
    this.position.x = this.game.leftBorder;
    this.position.y = this.game.baseBorder - this.size.height;
    this.src = this.getImage("", "");
  }

  moveLeft() {
    if (this.game.gameState != GAMESTATE.paused) {
      this.moveRightState = false;
      this.moveLeftState = true;
      this.velocityX = -this.maxSpeedX;
      if(!this.jumpingState){
        this.src = this.getImage("Left", "Run");
      }
      else{
        this.src = this.getImage("Left", "Jump");
      }
      
    }

    
  }

  moveRight() {
    if (this.game.gameState != GAMESTATE.paused) {
      this.moveRightState = true;
      this.moveLeftState = false;
      this.velocityX = this.maxSpeedX;
      if(!this.jumpingState)
        this.src = this.getImage("Right", "Run");
      else{
        this.src = this.getImage("Right", "Jump");
      }
        
    }
  }

  jump() {
    if (!this.jumpingState) {
      if (this.game.gameState == GAMESTATE.running) {
        this.game.audio.pauseAudio();
        this.game.audio.type = "jump";
        this.game.audio.playAudio();
      }

      if (this.moveLeftState) {
        this.src = this.getImage("Left", "Jump");
      }

      if (this.moveRightState) {
        this.src = this.getImage("Right", "Jump");
      }

      this.velocityY = -this.maxSpeedY;
      this.jumpingState = true;
    }
  }

  stop() {
    if (this.game.gameState != GAMESTATE.paused) {
      if (this.moveLeftState) {
        this.src = this.getImage("Left", "Stand");
        
      }
      if (this.moveRightState) {
        this.src = this.getImage("Right", "Stand");
      }
      this.velocityX = 0;
    }
  }

  update(deltaTime) {
    if (this.jumpingState) {
      this.gravity = 0.3;
    } else {
      this.gravity = 0;
    }

    this.position.x += this.velocityX;
    this.position.y += this.velocityY;
    this.velocityY += this.gravity;

    // No left screen crossing
    if (this.position.x < this.game.leftBorder) {
      this.position.x = this.game.leftBorder;
    }
    // No right screen crossing
    if (this.position.x + this.size.width > this.game.rightBorder) {
      this.position.x = this.game.rightBorder - this.size.width;
    }

    detectCollision(this, this.game);
  }

  draw(context) {
    context.drawImage(
      this.src,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }
}
