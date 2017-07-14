import 'pixi';
import 'p2';
import Phaser from 'phaser';
// import StartScene from './modules/startScene/startScene.js';
// import GameLoader from './common/states/gameLoader.js';
// import AssetLoader from './common/states/assetLoader.js';
// import SceneLoader from './common/states/sceneLoader.js';

var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.stage.backgroundColor = '#007236';
  _loadSprites();
}

var bg;
var platform1, platform2;
var cursors;
var player;
var point;
var dec = false;


function create() {
  bg = game.add.tileSprite(0, 0, 1200, 600, 'background');
  _loadComponents();
  cursors = game.input.keyboard.createCursorKeys();
}

function initialSplashScreen() {
  let startScene = new StartScene(this.game);
}

function update() {

  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  //game.physics.arcade.collide(sprite1, player);

  _moveWithCursos();

}

function render() {
}


// ##### LOAD SPRITES
function _loadSprites() {
  game.load.image('background', 'src/assets/shared/background-BG.jpg');
  game.load.image('platform1', 'src/assets/shared/platform-1.png');
  game.load.image('platform2', 'src/assets/shared/platform-1.png');
  game.load.image('player', 'src/assets/shared/player.png');
}
// ##### END LOAD SPRITES


// ##### LOAD VISUAL COMPONENTS
function _loadComponents() {
  _loadPlatform();
  _loadPlayer();
}

function _loadPlayer() {
  point = new Phaser.Point(50, 480);
  player = game.add.sprite(point.x, point.y, 'player');
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.height = 100;
  player.width = 100;

  game.physics.enable([player], Phaser.Physics.ARCADE);
  player.body.collideWorldBounds = true;
  player.body.checkCollision.down = true;
  player.body.bounce.y = 0.8;
  player.body.gravity.y = 8000;
}

function _loadPlatform() {
  var platformX = 0;
  var platformY = 550;
  var platform = game.add.sprite(platformX, platformY, 'platform2');
  platform.width = 150;
  var platformSpriteX = platformX + platform.width;
  for (var i = 0; i < 10; i++) {
    var sprite = game.add.sprite(platformSpriteX, platformY, 'platform2');
    sprite.width = 150;
    platformSpriteX = platformSpriteX + sprite.width;
  }
}
// #### END LOAD VISUAL COMPONENTS

// ##### MOVE PLAYER WITH ARROWS
function _moveWithCursos() {
  if (cursors.left.isDown) {
    player.body.velocity.x = -300;
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = 300;
  }
  else if (cursors.up.isDown) {
    player.body.velocity.y = -300;
  }
  else if (cursors.down.isDown) {
    player.body.velocity.y = 300;
  }
};

// ##### END MOVE PLAYER WITH ARROWS
