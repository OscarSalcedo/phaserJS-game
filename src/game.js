import 'pixi';
import 'p2';
import Phaser from 'phaser';
// import GameLoader from './common/states/gameLoader.js';
// import AssetLoader from './common/states/assetLoader.js';
// import SceneLoader from './common/states/sceneLoader.js';

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.stage.backgroundColor = '#007236';
    game.load.image('background','src/assets/shared/background.jpg');

}

var bg;

function create(){

  bg = game.add.tileSprite(0,0,800,600,'background');

}

function update(){

}

function render(){

}