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
  // this.initialSplashScreen();

}

var bg;
var platform1, platform2;

function create() {

  bg = game.add.tileSprite(0, 0, 1200, 600, 'background');


  var platformX = 0;
  var platformY = 550;
  var sprite1 = game.add.sprite(platformX, platformY, 'platform2');
  sprite1.width = 150;
  var platformSpriteX = platformX+sprite1.width;
  for(var i=0; i<10;i++){
    var sprite = game.add.sprite(platformSpriteX, platformY, 'platform2');
    sprite.width= 150;
    platformSpriteX = platformSpriteX+sprite.width;
  }




}

function initialSplashScreen() {
  let startScene = new StartScene(this.game);
}

function update() {
  // box.rotation += 0.04;
}

function render() {

}
