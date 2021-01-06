import Game from "./classes/game.js";

const gameScreen = document.getElementById("gameScreen");
const context = gameScreen.getContext("2d");
const GAME_WIDTH = 1100;
const GAME_HEIGHT = 700;
let lastTime = 0;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

game.init();

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  
  lastTime = timeStamp;
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime, context);
  game.draw(context);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
