export default function detectCollision(player, game) {
  const playerBottomY = player.position.y + player.size.height;
  const playerCenterY = player.position.y + player.size.height / 2;
  const playerRightX = player.position.x + player.size.width;
  const playerCenterX = player.position.x + player.size.width / 2;
  const GAMESTATE = {
    beforeGameStart: 0,
    paused: 1,
    running: 2,
    gameOver: 3,
    congratulations: 4,
  };

  // If Player is over the floor bricks
  game.gameObjects.borderBricks.forEach((object) => {
    if (
      playerBottomY > object.position.y &&
      player.position.y < object.position.y &&
      playerCenterX > object.position.x &&
      playerCenterX < object.position.x + object.width
    ) {
      player.position.y = object.position.y - player.size.height;
      player.jumpingState = false;
    }

    // if Player hits top roof - falls down
    if (player.position.y < game.topBorder) {
      player.velocityY = player.maxSpeedY;
    }
  });

  game.gameObjects.mainBricks.forEach((object) => {
    // Left Collision
    if (
      playerRightX > object.position.x &&
      playerCenterX < object.position.x &&
      playerCenterY > object.position.y &&
      player.position.y < object.position.y + object.height
    ) {
      player.position.x = object.position.x - player.size.width;
    }

    // Right Collision
    if (
      player.position.x < object.position.x + object.width &&
      player.position.x > object.position.x + object.width / 2 &&
      playerCenterY > object.position.y &&
      player.position.y < object.position.y + object.height
    ) {
      player.position.x = object.position.x + object.width;
    }

    // Head Hit
    if (
      player.position.y < object.position.y + object.height &&
      player.position.y >= object.position.y &&
      playerCenterX > object.position.x &&
      player.position.x < object.position.x + object.width
    ) {
      player.velocityY = player.maxSpeedY;
      player.position.y = object.position.y + object.height;
    }

    // Finding for the base

    if (
      playerBottomY > object.position.y &&
      //Below condition indicates that the player's position is over the brick
      player.position.y < object.position.y &&
      playerCenterX > object.position.x &&
      playerCenterX < object.position.x + object.width
    ) {
      player.position.y = object.position.y - player.size.height;
      player.jumpingState = false;
      player.velocityY = player.maxSpeedY;
    }
  });

  let fireObjectColliders = game.gameObjects.fire.filter((object) => {
    if (
      // if Player is way below the object - then No Collision
      player.position.y > object.position.y + object.height ||
      //If he is on the left side of the fire?  if player's right half of the part is not over the fire
      player.position.x + player.size.width * 2/5 < object.position.x ||
      //if player is way above the object - then no collision
      playerBottomY < object.position.y ||
      //If he is on the right side of the fire?  if player's left half of the part is not over the fire
      player.position.x + player.size.width * 3/5 > object.position.x + object.width
    ) {
      //no collision
      return false;
    }
    //collision
    return true;
  });

  if (fireObjectColliders.length > 0) {
    // Should not move
    player.velocityX = 0;
    if (game.gameObjects.scoreManagement[0].lives.value > 1) {
      game.bgmAudio.currentTime = 0;
      game.bgmAudio.play();
      game.bgmAudio.volume = 0.2;
      game.audio.pauseAudio();
      game.audio.type = "fire";
      game.audio.playAudio();
    }

    //Resetting the player's position
    player.reset();

    //Reducing lives by 1
    game.gameObjects.scoreManagement[0].lives.value--;
    if (game.gameObjects.scoreManagement[0].lives.value == 0) {
      game.gameState = GAMESTATE.gameOver;
      game.bgmAudio.pause();
      game.audio.pauseAudio();
      game.audio.type = "gameOver";
      game.audio.volume = 0.3;
      game.audio.playAudio();
    }
  }

  // Reward objects collision detection
  let rewardObjectColliders = game.gameObjects.rewardObjects.filter(
    (object) => {
      if (
        player.position.y > object.position.y + object.height ||
        playerCenterX < object.position.x ||
        playerBottomY < object.position.y ||
        playerCenterX > object.position.x + object.width
      ) {
        //no collision
        return false;
      }
      //collision
      return true;
    }
  );

  if (rewardObjectColliders.length > 0) {
    rewardObjectColliders.forEach((object) => {
      //Marking the reward object to remove from the Canvas
      object.markForDeletion = true;

      //Adding reward object's value to the scoreboard
      game.gameObjects.scoreManagement[0].updateScore(object.points);

      //Playing the reward grabbing audio
      game.audio.pauseAudio();
      game.audio.type = "reward";
      game.audio.playAudio();
    });
  }

  // Door Collision detection
  let door = game.gameObjects.door[0];
  if (
    !(
      player.position.y > door.position.y + door.height ||
      playerCenterX < door.position.x ||
      playerBottomY < door.position.y ||
      playerCenterX > door.position.x + door.width
    )
  ) {
    game.gameState = GAMESTATE.congratulations;
    game.bgmAudio.pause();
    game.audio.pauseAudio();
    game.audio.type = "finish";
    game.audio.playAudio();
    game.finalScore = game.gameObjects.scoreManagement[0].score.value;
  }
}
