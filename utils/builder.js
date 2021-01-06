import Brick from "../src/classes/brick.js";
import RewardObject from "../src/classes/RewardObject.js";
import Fire from "../src/classes/fire.js";
import Door from "../src/classes/door.js";

import { layoutData } from "./retrieveData.js";

const objectType = {
  borderBrick: 1,
  mainBrick: 2,
  redCrystal: 3,
  blueCrystal: 4,
  trophy: 5,
  fire: 6,
  door: 7,
};

export function buildLevel(game) {
  let gameObjects = {
    borderBricks: [],
    mainBricks: [],
    rewardObjects: [],
    door: [],
    fire: [],
  };
  layoutData.forEach((level, rowIndex) => {
    level.forEach((gameObject, objectIndex) => {
      if (gameObject === objectType.borderBrick) {
        let position = {
          x: 50 * objectIndex,
          y: 50 + 50 * rowIndex,
        };

        gameObjects.borderBricks.push(new Brick(game, position));
      }
      if (gameObject === objectType.mainBrick) {
        let position = {
          x: 50 * objectIndex,
          y: 50 + 50 * rowIndex,
        };

        gameObjects.mainBricks.push(new Brick(game, position));
      }
      if (gameObject === objectType.blueCrystal) {
        let position = {
          x: 50 * objectIndex,
          y: 50 + 50 * rowIndex,
        };
        let type = "blueCrystal";
        let points = 100;
        gameObjects.rewardObjects.push(
          new RewardObject(game, position, type, points)
        );
      }
      if (gameObject === objectType.redCrystal) {
        let position = {
          x: 50 * objectIndex,
          y: 50 + 50 * rowIndex,
        };
        let type = "redCrystal";
        let points = 200;
        gameObjects.rewardObjects.push(
          new RewardObject(game, position, type, points)
        );
      }
      if (gameObject === objectType.trophy) {
        let position = {
          x: 50 * objectIndex,
          y: 50 + 50 * rowIndex,
        };
        let type = "trophy";
        let points = 500;
        gameObjects.rewardObjects.push(
          new RewardObject(game, position, type, points)
        );
      }
      if (gameObject === objectType.door) {
        let position = {
          x: 50 * objectIndex,
          y: 50 + 50 * rowIndex,
        };
        gameObjects.door.push(new Door(game, position));
      }
      if (gameObject === objectType.fire) {
        let position = {
          x: 50 * objectIndex,
          y: 50 + 50 * rowIndex,
        };
        gameObjects.fire.push(new Fire(game, position));
      }
    });
  });

  return gameObjects;
}
