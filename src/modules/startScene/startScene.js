import Config from './config.js';

export default class StartScene extends Phaser.Group {
  constructor(game) {
    super(game);
    this.game = game;
    this._initialize();
  }

  _initialize() {
    // this.game.music.play('menu');

    this._initializeConfig();
    this._initializeBackground();
    this._initializeText();
    this._initializeButton();
  }

  _initializeConfig() {
    this.config = Object.assign({}, new Config());
    return this;
  }

  _initializeBackground() {
    this.background = this.add(new Phaser.Sprite(this.game, 0, 0,  this.config.background));
    return this;
  }

  _initializeText() {
    this.textInfo = this.add(new Phaser.Text(this.game, this.game.world.centerX, this.config.textInfoY, this.config.textInfo, this.config.style));
    this.textInfo.anchor.setTo(0.5, 0.5);
    return this;
  }

  _initializeButton() {
    this.buttonPlay = this.add(new Phaser.Button(this.game, this.game.world.centerX, 600, 'buttonPlay'));
    this.buttonPlay.scale.setTo(2, 2);
    this.buttonPlay.anchor.setTo(0.5, 0.5);
    this.buttonText = this.add(new Phaser.Text(this.game, this.game.world.centerX, 600, this.config.textButton, this.config.textButtonStyle));
    this.buttonText.anchor.setTo(0.5, 0.5);
    return this;

  }





}
