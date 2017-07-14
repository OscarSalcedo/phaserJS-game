import 'pixi';
import 'p2';
import Phaser from 'phaser';
import StartScene from './modules/startScene/startScene.js';
// import GameLoader from './common/states/gameLoader.js';
// import AssetLoader from './common/states/assetLoader.js';
// import SceneLoader from './common/states/sceneLoader.js';

var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

  game.stage.backgroundColor = '#007236';
  game.load.image('background', 'src/assets/shared/background-BG.jpg');
  game.load.image('platform1', 'src/assets/shared/platform-1.png');
  game.load.image('platform2', 'src/assets/shared/platform-1.png');
  game.load.image('player', 'src/assets/shared/player.png');
  game.load.image('bird', 'src/assets/shared/bird.png');

}

var bg;
var platform1, platform2, sprite1;

var player, bird;
var point;
var dec = false;


function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  bg = game.add.tileSprite(0, 0, 1200, 600, 'background');

  //Colisió plataforma
  platform1 = game.add.sprite(300, 200, 'platform1');
  platform1.name = 'platform1';
  game.physics.enable(platform1, Phaser.Physics.ARCADE);
  platform1.body.collideWorldBounds = true;
  platform1.body.checkCollision.up = false;
  platform1.body.checkCollision.down = false;
  //platform1.body.immovable = true;
   //platform1.body.bounce.x = 0.8;


  //Moviment + colisió de l'ocell
  bird = game.add.sprite(0, 210, 'bird', 4);
  //Mida
  bird.width = 50;
  bird.height = 40;
  game.physics.enable(bird, Phaser.Physics.ARCADE);
  bird.name = 'bird';
  bird.body.collideWorldBounds = true;
  bird.body.bounce.setTo(1, 1);
  //Velocitat
  bird.body.velocity.x = 200;





  ///-------------------------------------------
  var platformX = 0;
  var platformY = 550;
  var sprite1 = game.add.sprite(platformX, platformY, 'platform2');
  sprite1.width = 150;
  game.physics.enable([sprite1], Phaser.Physics.ARCADE);
  //sprite1.body.checkCollision.up = true;

  sprite1.body.collideWorldBounds = true;
  var platformSpriteX = platformX + sprite1.width;
  for (var i = 0; i < 10; i++) {
    var sprite = game.add.sprite(platformSpriteX, platformY, 'platform2');
    sprite.width = 150;
    //sprite.body.collideWorldBounds = true;
    platformSpriteX = platformSpriteX + sprite.width;
  }
    // platformSpriteX.body.collideWorldBounds = true;


  point = new Phaser.Point(800, 170);

  player = game.add.sprite(point.x, point.y, 'player');
  player.height = 100;
  player.width = 100;

  game.physics.enable([player], Phaser.Physics.ARCADE);
  player.body.collideWorldBounds = true;
  player.body.checkCollision.down =true;
  player.body.bounce.y = 0.8;
  player.body.gravity.y = 800;
}


function update() {

  //Colisió de la plataforma i l'ocell
  game.physics.arcade.collide(platform1, bird);

  game.physics.arcade.collide(sprite1, player);


}

function render() {

}
