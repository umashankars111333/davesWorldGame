export default class Brick {
  constructor(game, position) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.name = "brick";
    this.image = document.getElementById("brick");
    this.width = 50;
    this.height = 50;
    this.position = position;
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
