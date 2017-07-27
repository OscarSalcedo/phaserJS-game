import 'pixi';
import 'p2';
import Phaser from 'phaser';
// import StartScene from './modules/startScene/startScene.js';
// import GameLoader from './common/states/gameLoader.js';
// import AssetLoader from './common/states/assetLoader.js';
// import SceneLoader from './common/states/sceneLoader.js';

var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
var robot, box, woman, player, groupPlatform, platform, coins, plataforma1, plataforma2, plataforma3, roca, tree1;
var platforms, scoreText, score = 0, laser, mushroom1, mushroom2, jumpButton, cursors, bush1, bush2, bush3, bush4, plataforma4, plataforma5, plataforma6;
function preload() {
  game.load.spritesheet('robot', 'src/assets/shared/robot.png', 80, 111);
  game.load.image('background', 'src/assets/shared/background-BG.jpg');
  game.load.image('box', 'src/assets/shared/box.png');
  game.load.spritesheet('woman', 'src/assets/shared/player_animation.png', 19, 35);
  game.load.image('ground', 'src/assets/shared/ground.png');
  game.load.spritesheet('dude', 'src/assets/shared/dude.png', 32, 48);
  game.load.spritesheet('coins', 'src/assets/shared/coins.png', 40, 43);
  game.load.image('platform1', 'src/assets/shared/13.png');
  game.load.image('platform2', 'src/assets/shared/14.png');
  game.load.image('platform3', 'src/assets/shared/15.png');
  game.load.image('platform4', 'src/assets/shared/1.png');
  game.load.image('platform5', 'src/assets/shared/2.png');
  game.load.image('platform6', 'src/assets/shared/3.png');
  game.load.image('laser', 'src/assets/shared/laser.png');
  game.load.image('bg', 'src/assets/shared/BG.png');
  game.load.image('roca', 'src/assets/shared/Stone.png');
  game.load.image('tree1', 'src/assets/shared/Tree_1.png');
  game.load.image('mushroom1', 'src/assets/shared/Mushroom_1.png');
  game.load.image('mushroom2', 'src/assets/shared/Mushroom_2.png');
  game.load.image('bush1', 'src/assets/shared/Bush_1.png');
  game.load.image('bush2', 'src/assets/shared/Bush_2.png');
  game.load.image('bush3', 'src/assets/shared/Bush_3.png');
  game.load.image('bush4', 'src/assets/shared/Bush_4.png');
}

function create() {

  game.world.setBounds(0, 0, 3000, 600);

  //*** BACKGROUND
  var bg = game.add.tileSprite(0, 0, 3000, 600, 'bg');
  game.add.sprite(3000, 600, 'bg');

  //*** ENABLE P2 PHYSICS
  //game.physics.startSystem(Phaser.Physics.P2JS);
  //game.physics.p2.setImpactEvents(true);
  //game.physics.p2.defaultRestitution = 0.8;
  //game.physics.p2.gravity.y = 800;
  //game.physics.p2.restitution = 0.8; // Que l'objecte reboti

  //*** ENABLE PHYSICS
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //*** PLATAFORMAS */
  platforms = game.add.group();
  platforms.enableBody = true;

  var ground = platforms.create(0, game.world.height - 50, 'ground');
  var ground1 = platforms.create(600, game.world.height - 50, 'ground');
  var ground2 = platforms.create(1000, game.world.height - 50, 'ground');

  ground.body.immovable = true;
  ground1.body.immovable = true;
  ground2.body.immovable = true;


  // var plataforma = platforms.create(280, 250, 'ground');
  // plataforma.body.immovable = true;

  plataforma1 = platforms.create(555, 200, "platform1");
  plataforma2 = platforms.create(680, 200, "platform2");
  plataforma3 = platforms.create(800, 200, "platform3");

  plataforma1.body.immovable = true;
  plataforma2.body.immovable = true;
  plataforma3.body.immovable = true;



  game.physics.arcade.enable(plataforma1, plataforma2, plataforma3);






  //*** MONEDAS
  coins = game.add.group();
  coins.enableBody = true;

  for (var i = 0; i < 12; i++) {
    var coin = coins.create(i * 70, 0, 'coins');
    coin.body.gravity.y = 300;
    coin.body.bounce.y = 0.7 + Math.random() * 0.2;
    coin.animations.add('coinsStart', [0, 1, 2, 3], 8, true);
    coin.animations.play("coinsStart");
  }
  //** BOX
  //platform = game.add.sprite(1000, 538, "platform")
  //game.physics.p2.enable([platform], true);
  box = game.add.group();
  box.enableBody = true;

  for (var i = 1; i < 10; i++) {
    var b = box.create(game.rnd.between(100, 770), game.rnd.between(0, 570), 'box', game.rnd.between(0, 35));
    b.body.gravity.y = 300;
    b.body.bounce.y = 0.7;
    b.body.collideWorldBounds = true;
    // //game.physics.p2.enable([box], false);
  }

  //*** ROCA */
  roca = game.add.sprite(200, 497, "roca");

  //* TREE

  tree1 = game.add.sprite(600, 508, "tree1");

  //** Mushroom
  mushroom1 = game.add.sprite(750, 512, "mushroom1");
  mushroom2 = game.add.sprite(620, 160, "mushroom2");

  // *** Bush
  bush1 = game.add.sprite(1200, 488, "bush1");



  //ROBOT
  robot = game.add.sprite(100, game.world.height - 180, "robot");
  game.physics.arcade.enable(robot);

  robot.body.bounce.y = 0.2;
  robot.body.gravity.y = 300;
  robot.body.collideWorldBounds = true;

  //Moviment de la camara
  game.camera.follow(robot);

  //Animació del robot
  robot.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
  robot.animations.add('run', [10, 11, 12, 13, 14, 15, 16, 17], 17, true);
  robot.animations.add('jump', [18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 10, true);


  //game.physics.p2.enable([robot], false);//Habilitar les fisiques del robot
  //robot.body.setRectangle(80, 110); //Per fer més gran la fisica del objecte

  //*** TEXT */
  scoreText = game.add.text(16, 16, 'Puntos: 0', { fontSize: '32px', fill: '#000' });


  // cursors = game.input.keyboard.createCursorKeys();
  // jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);




}

function update() {
  game.physics.arcade.collide(robot, platforms);
  game.physics.arcade.collide(coins, platforms);
  game.physics.arcade.collide(box, platforms);
  game.physics.arcade.collide(box, robot);
  game.physics.arcade.collide(plataforma1, coins);
  game.physics.arcade.collide(plataforma2, coins);
  game.physics.arcade.collide(plataforma3, coins);
  game.physics.arcade.overlap(robot, coins, collectCoins, null, this);

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    robot.body.velocity.x = -300;
    robot.animations.play("run");
    robot.scale.x = -1;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    robot.body.velocity.x = 300;;
    robot.animations.play("run");
    robot.scale.x = 1;
    game.input.keyboard.i
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    robot.body.velocity.y = 300;
    robot.animations.play("run");
  } else {
    robot.play("idle");
    robot.body.velocity.x = 0;
  }
  if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && robot.body.touching.down) {
    robot.animations.play("jump");
    robot.body.velocity.y = -300;
  }
}


function collectCoins(robot, coin) {

  coin.kill();
  score += 10;
  scoreText.text = 'Puntos: ' + score;

}
