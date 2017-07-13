import Phaser from 'phaser';

export default class Player extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.isAlive = true;
  }
}
