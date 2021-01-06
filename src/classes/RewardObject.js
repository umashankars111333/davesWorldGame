export default class RewardObject {
  constructor(game, position, type, points) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.name = "rewardObject";
    this.type = type;
    this.image = document.getElementById(type);
    this.width = 50;
    this.height = 50;
    this.position = position;
    this.markForDeletion = false;
    this.points = points;
  }

  reset() {
    this.markForDeletion = false;
  }

  update(deltaTime) {}

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
