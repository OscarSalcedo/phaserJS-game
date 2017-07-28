import 'pixi';
import 'p2';
import Phaser from 'phaser';
// import StartScene from './modules/startScene/startScene.js';
// import GameLoader from './common/states/gameLoader.js';
// import AssetLoader from './common/states/assetLoader.js';
// import SceneLoader from './common/states/sceneLoader.js';

var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

var robot, box, woman, player, groupPlatform, platform, coins, plataforma1, plataforma2, plataforma3, roca, tree1, tree2, tree3, sea1, sea2, enemy, fireWeapon, dinosaur;
var platforms, scoreText, score = 0, laser, mushroom1, mushroom2, jumpButton, cursors, fireButton, bush1, bush2, bush3, bush4, plataforma4, plataforma5, plataforma6;
var explosions, monstruo;

function preload() {
  _loadSprites();
}

function create() {

  game.world.setBounds(0, 0, 3000, 600);
  //*** ENABLE PHYSICS
  game.physics.startSystem(Phaser.Physics.ARCADE);

  _loadComponents();
  //Moviment de la camara
  game.camera.follow(robot);

  //*** TEXT */
  scoreText = game.add.text(16, 16, 'Puntos: 0', { fontSize: '32px', fill: '#000' });

  cursors = game.input.keyboard.createCursorKeys();

  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {
  _checkForCollisions();
  _moveWithCursos();
  _loadMoveEnemy();
  _throwFireWeapon();
}

function _loadSprites() {
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
  game.load.image('tree2', 'src/assets/shared/Tree_2.png');
  game.load.image('tree3', 'src/assets/shared/Tree_3.png');
  game.load.image('mushroom1', 'src/assets/shared/Mushroom_1.png');
  game.load.image('mushroom2', 'src/assets/shared/Mushroom_2.png');
  game.load.image('bush1', 'src/assets/shared/Bush_1.png');
  game.load.image('bush2', 'src/assets/shared/Bush_2.png');
  game.load.image('bush3', 'src/assets/shared/Bush_3.png');
  game.load.image('bush4', 'src/assets/shared/Bush_4.png');
  game.load.image('sea', 'src/assets/shared/17.png');
  game.load.image('sea1', 'src/assets/shared/18.png');
  game.load.spritesheet('enemy', 'src/assets/shared/enemic.png', 152, 450);
  game.load.spritesheet('fireWeapon', 'src/assets/shared/fireWeapon.png', 95, 300);
  game.load.spritesheet('dinosaur', 'src/assets/shared/dinosaurio.png', 99.27, 200);
  game.load.spritesheet('explosion', 'src/assets/shared/explosion.png', 95, 96);
  game.load.spritesheet('monstruo', 'src/assets/shared/monstruo.png', 152, 280);

}

function _loadComponents() {
  _loadBackgroundElements();
  _loadEnemy();

  _loadPlatforms();
  _loadRobot();
  _loadCoins();
  _loadBoxes();
  _loadFireWeapon();
  _loadExplosion();
}

function _checkForCollisions() {
  game.physics.arcade.collide(robot, platforms);
  game.physics.arcade.collide(coins, platforms);
  game.physics.arcade.collide(box, platforms);
  game.physics.arcade.collide(box, robot);
  game.physics.arcade.collide(plataforma1, coins);
  game.physics.arcade.collide(plataforma2, coins);
  game.physics.arcade.collide(plataforma3, coins);
  game.physics.arcade.collide(box, coins);
  game.physics.arcade.overlap(robot, coins, collectCoins, null, this);
  game.physics.arcade.overlap(fireWeapon.bullets, enemy, destroyEnemy, null, this);
  //  game.physics.arcade.overlap( dinosaur, fireWeapon.bullets,destroyDinosaur, null, this);


}
function _throwFireWeapon() {
  if (fireButton.isDown) {
    fireWeapon.fireAngle = 0;
    fireWeapon.bulletAngleOffSet = 180;
    fireWeapon.fire();
    //fireWeapon.animations.play('fire');
  }
  // else if (fireButton.isDown) {
  //   fireWeapon.fireAngle = 180;
  //   fireWeapon.bulletAngleOffSet = -180;
  //   fireWeapon.fire();
  // }
}

function _moveWithCursos() {
  if (cursors.left.isDown) {
    robot.body.velocity.x = -300;
    robot.animations.play("run");
    robot.scale.x = -1;
  }
  else if (cursors.right.isDown) {
    robot.body.velocity.x = 300;;
    robot.animations.play("run");
    robot.scale.x = 1;
  }
  else if (cursors.down.isDown) {
    robot.body.velocity.y = 300;
    robot.animations.play("run");
  }
  else {
    robot.play("idle");
    robot.body.velocity.x = 0;
  }

  if (cursors.up.isDown && robot.body.touching.down) {
    robot.animations.play("jump");
    robot.body.velocity.y = -300;
  }
};

function _loadFireWeapon() {
  fireWeapon = game.add.weapon(5, 'fireWeapon');
  // game.physics.arcade.enable(fireWeapon);
  fireWeapon.enableBody = true;
  //fireWeapon.physicsBodyType = Phaser.Physics.ARCADE;
  fireWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  fireWeapon.bulletSpeed = 300;
  fireWeapon.fireRate = 500;
  fireWeapon.trackSprite(robot, 100, 0);

  fireWeapon.addBulletAnimation('fire', [0, 1, 2, 3, 4], 10, true);
}


function _loadRobot() {
  //ROBOT
  robot = game.add.sprite(100, game.world.height - 180, "robot");
  game.physics.arcade.enable(robot);

  robot.body.gravity.y = 300;
  robot.body.collideWorldBounds = true;
  robot.body.checkCollision = true;

  //Animació del robot
  robot.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
  robot.animations.add('run', [10, 11, 12, 13, 14, 15, 16, 17], 17, true);
  robot.animations.add('jump', [18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 10, true);
}
function _loadPlatforms() {
  //*** PLATAFORMAS */
  platforms = game.add.group();
  platforms.enableBody = true;

  var ground = platforms.create(0, game.world.height - 50, 'ground');
  var ground1 = platforms.create(600, game.world.height - 50, 'ground');
  var ground2 = platforms.create(1000, game.world.height - 50, 'ground');
  var ground3 = platforms.create(2664, game.world.height - 50, 'ground');

  ground.body.immovable = true;
  ground1.body.immovable = true;
  ground2.body.immovable = true;
  ground3.body.immovable = true;

  plataforma1 = platforms.create(555, 200, "platform1");
  plataforma2 = platforms.create(680, 200, "platform2");
  plataforma3 = platforms.create(800, 200, "platform3");

  plataforma1.body.immovable = true;
  plataforma2.body.immovable = true;
  plataforma3.body.immovable = true;

  game.physics.arcade.enable(plataforma1, plataforma2, plataforma3);
}

function _loadCoins() {
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
}

function _loadBoxes() {
  //** BOX
  box = game.add.group();
  box.enableBody = true;
  var b = box.create(300, 440, 'box');
  b.body.checkCollision.up = true;
  b.body.checkCollision.down = true;
  b.body.checkCollision.left = true;
  b.body.checkCollision.right = true;
  b.body.immovable = true;

  var b2 = box.create(450, 300, 'box');
  b2.body.checkCollision.up = true;
  b2.body.checkCollision.down = true;
  b2.body.checkCollision.left = true;
  b2.body.checkCollision.right = true;
  b2.body.immovable = true;

  //Random boxes
  // for (var i = 1; i < 10; i++) {
  //   var b = box.create(game.rnd.between(100, 770), game.rnd.between(0, 570), 'box', game.rnd.between(0, 35));
  //   b.body.gravity.y = 300;
  //   b.body.bounce.y = 0.7;
  //   b.body.collideWorldBounds = true;
  //   // //game.physics.p2.enable([box], false);
  // }
}

function _loadBackgroundElements() {
  var bg = game.add.tileSprite(0, 0, 3000, 600, 'bg');
  game.add.sprite(3000, 600, 'bg');

  //*** ROCA */
  roca = game.add.sprite(220, 497, "roca");

  //* TREE
  tree1 = game.add.sprite(600, 508, "tree1");

  //* TREE 2
  tree2 = game.add.sprite(850, 250, 'tree2');
  tree2 = game.add.sprite(1600, 250, 'tree2');

  // * TREE 3
  tree3 = game.add.sprite(1200, 275, 'tree3');

  //** Mushroom
  mushroom1 = game.add.sprite(750, 509, "mushroom1");
  mushroom2 = game.add.sprite(620, 162, "mushroom2");

  // *** Bush
  bush1 = game.add.sprite(1200, 488, "bush1");

  //** Sea */
  sea1 = game.add.sprite(2280, game.world.height - 40, "sea");
  sea1 = game.add.sprite(2408, game.world.height - 40, "sea");
  sea1 = game.add.sprite(2536, game.world.height - 40, "sea");
}
function _loadExplosion() {
  explosions = game.add.group();

  var explosionAnimation = explosions.create(0, 0, 'explosion', [0], false);
  explosionAnimation.anchor.setTo(0.5, 0.5);
  explosionAnimation.animations.add('explosion');
}



function _loadEnemy() {
  // ENEMY
  enemy = game.add.sprite(900, 0, "enemy");
  dinosaur = game.add.sprite(700, 17, 'dinosaur');
  monstruo = game.add.sprite(2320, 410, "monstruo");

  game.physics.arcade.enable(enemy, dinosaur, monstruo);

  enemy.enableBody = true;
  dinosaur.enableBody = true;
  enemy.width = 70;
  enemy.height = 200;
  monstruo.width = 90;
  monstruo.height = 160;

  enemy.body.bounce.y = 0.5;
  enemy.body.gravity.y = 300;
  enemy.body.collideWorldBounds = true;



  enemy.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7], 35, true);
  enemy.animations.play("idle");

  dinosaur.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 20, true);
  dinosaur.animations.play("idle");

  monstruo.animations.add('idle', [0, 1], 5, true);
  monstruo.animations.play("idle");

  _loadMoveEnemy();

  enemy.x = 200;
  enemy.y = 502;

}
//Moviments
function _loadMoveEnemy() {
  if (enemy.x === 900) {
    enemy.scale.x = 0.5;
    enemy.width = 70;

    var tween = game.add.tween(enemy).to({ x: 500 }, 6000, Phaser.Easing.Linear.None, true);
  } else if (enemy.x === 500) {

    enemy.scale.x = -0.5;

    var tween = game.add.tween(enemy).to({ x: 900 }, 6000, Phaser.Easing.Linear.None, true);
  }

}

function collectCoins(robot, coin) {

  coin.kill();
  score += 10;
  scoreText.text = 'Puntos: ' + score;

}

function destroyEnemy(fireWeapon, enemy) {
  fireWeapon.kill();
  enemy.kill();
  //Animació explosió
  var explosionAnimation = explosions.getFirstExists(false);
  explosionAnimation.reset(enemy.x + (enemy.body.width / 2), enemy.y + 70);
  explosionAnimation.play('explosion', 30, false, true);

  score += 100;
}

// function destroyDinosaur(dinosaur, fireWeapon) {
//   fireWeapon.kill();
//   dinosaur.kill();

//   //Animació explosió
//   var explosionAnimation = explosions.getFirstExists(false);
//   explosionAnimation.reset(dinosaur.x + (dinosaur.body.width / 2), enemy.y + 70);
//   explosionAnimation.play('explosion', 30, false, true);

// }




