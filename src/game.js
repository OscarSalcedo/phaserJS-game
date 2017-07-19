import 'pixi';
import 'p2';
import Phaser from 'phaser';
// import StartScene from './modules/startScene/startScene.js';
// import GameLoader from './common/states/gameLoader.js';
// import AssetLoader from './common/states/assetLoader.js';
// import SceneLoader from './common/states/sceneLoader.js';

var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
var robot, box, woman, player;
function preload() {
  game.load.spritesheet('robot', 'src/assets/shared/robot.png', 80, 111);
  game.load.image('background', 'src/assets/shared/background-BG.jpg');
  game.load.image('box', 'src/assets/shared/box.png');
  game.load.spritesheet('woman', 'src/assets/shared/player_animation.png', 19, 35);
  game.load.image('player', 'src/assets/shared/player.png');
}

function create() {
  //*** BACKGROUND
  var bg = game.add.sprite(0, 0, 'background');

  //ENABLE P2 PHYSICS
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.defaultRestitution = 10;

  game.physics.p2.gravity.y = 800;
  //game.physics.p2.restitution = 0.8; // Que l'objecte reboti

  // //PLAYER
  // player = game.add.sprite(100, 300, 'player');
  // player.width = 50;
  // player.height = 50;

  //BOX

  for (var i = 1; i < 10; i++) {
    box = game.add.sprite(300, 545, "box")
    game.physics.p2.enable([box], false);
  }

  //ROBOT
  robot = game.add.sprite(500, 380, "robot");
  //Animació del robot
  robot.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
  robot.animations.add('run', [10, 11, 12, 13, 14, 15, 16, 17], 17, true);
  robot.animations.add('jump', [18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 10, true);

  game.physics.p2.enable([robot], false);//Habilitar les fisiques del robot
  robot.body.setRectangle(80, 110); //Per fer més gran la fisica del objecte

  //*** TEXT */
  //var text = game.add.text(500,100,'Hola :)',{fill: '#ffffff'});

}

function update() {
  //Moviments del robot
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    robot.body.velocity.x = -300;
    robot.animations.play("run");
    robot.scale.x = -1;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    robot.body.velocity.x = 300;;
    robot.animations.play("run");
    robot.scale.x = 1;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    robot.body.velocity.y = -300;
    robot.animations.play("jump");

  } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    robot.body.velocity.y = 300;
    robot.animations.play("run");
  } else {
    robot.play("idle");
  }
}

