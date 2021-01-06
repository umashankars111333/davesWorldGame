export default class Door {
  constructor(game, position) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.name = "door";
    this.image = document.getElementById("door");
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
