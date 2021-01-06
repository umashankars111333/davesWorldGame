export default class InputHandler {
  constructor(player, game) {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          player.moveLeft();
          break;

        case "ArrowUp":
          player.jump();
          break;

        case "ArrowRight":
          player.moveRight();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case " ":
          game.spaceKeyEvent();
          break;

        case "ArrowLeft":
          if (player.velocityX < 0) player.stop();
          break;


        case "ArrowRight":
          if (player.velocityX > 0) player.stop();
          break;

        case "Escape":
          game.togglePause();
          player.stop();
          break;
      }
    });
  }
}
