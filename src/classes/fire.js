export default class Fire {
  constructor(game, position) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.name = "fire";
    this.image = document.getElementById("fire1");
    this.getImageId = function (id) {
      return document.getElementById(`fire${id}`);
    };
    this.width = 50;
    this.height = 50;
    this.position = position;
    this.animationCounter = 0;
  }

  update(deltaTime) {
    this.animationCounter++;
    if (this.animationCounter % 20 == 0) {
      this.image = this.getImageId(2);
    }
    if (this.animationCounter % 25 == 0) {
      this.image = this.getImageId(3);
    }
    if (this.animationCounter % 30 == 0) {
      this.image = this.getImageId(4);
    }
    if (this.animationCounter % 35 == 0) {
      this.image = this.getImageId(1);
      this.animationCounter = 0;
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
