import 'pixi';
import 'p2';
import Phaser from 'phaser';
// import StartScene from './modules/startScene/startScene.js';
// import GameLoader from './common/states/gameLoader.js';
// import AssetLoader from './common/states/assetLoader.js';
// import SceneLoader from './common/states/sceneLoader.js';

var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
var robot, box, woman;

function preload() {

  game.load.spritesheet('robot', 'src/assets/shared/robot.png', 80, 111);
  game.load.image('background', 'src/assets/shared/background-BG.jpg');
  game.load.image('box', 'src/assets/shared/box.png');
  game.load.spritesheet('woman', 'src/assets/shared/player_animation.png',19,35);


}

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.P2JS);


  //Beetle
  this.woman = game.add.sprite(400, 450, "woman");
   this.woman.animations.add('down', [0, 1, 2, 3, 4, 5, 6], 10, true);
   this.woman.animations.play("down");



  //PHYSICS

  // game.physics.p2.gravity.y = 350;
  // game.physics.p2.world.defaultContactMaterial.friction = 0.3;
  // game.physics.p2.world.setGlobalStiffness(1e5);

  //**SPEED */x
  this.speed = 4;

  //*** BACKGROUND
  //var bg = game.add.sprite(0, 0, 'background');

  //*** ROBOT
  this.robot = game.add.sprite(150, 450, "robot");

  // this.robot.anchor.set(0.5,0.5);
  //*** ANIMACIONS
  this.robot.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
  this.robot.animations.add('run', [10, 11, 12, 13, 14, 15, 16, 17], 17, true);
  this.robot.animations.add('jump', [18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 10, true);

  //this.robot.animations.play("idle");
  //this.robot.animations.play("run");
  //this.robot.animations.play("jump");
  //------------ Phynsics player
  // game.physics.p2.enable(robot);

  // robot.body.fixedRotation = true;
  // robot.body.damping = 0.5;

  // var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', robot.body);

  // var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
  // var boxMaterial = game.physics.p2.createMaterial('worldMaterial');

  //  game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

  //-------------------------


  //*** BOX */
  box = game.add.sprite(300, 500, "box");





}

function update() {

  game.physics.arcade.collide(box, robot);

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    this.robot.x -= this.speed;
    this.robot.animations.play("run");
    this.robot.scale.x = -1;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    this.robot.x += this.speed;
    this.robot.animations.play("run");
    this.robot.scale.x = 1;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    this.robot.y -= this.speed;
    this.robot.animations.play("jump");

  } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    this.robot.y += this.speed;
    this.robot.animations.play("run");
  } else {
    this.robot.play("idle");
  }



}

