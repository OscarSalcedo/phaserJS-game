import AssetsConfig from '../../assets/index.js';

class AssetLoader extends Phaser.State {
  /**
   * A.M: This function overrides the parent state function => preload.
   * @override
   */
  preload() {
    this._initializeAssetsConfig()
    ._loadSprites();
  }
  /**
   * A.M: This function overrides the parent state function => create.
   * @override
   */
  create() {
    this.game.state.start('Scene');
  }
  _initializeConfig() {
    this.assetsConfig = new Config();
    return this;
  }
  _loadSprites() {
    for (let spriteName in this.assetsConfig.sprites) {
      const sprite = this.config.sprites[spriteName];
      this.game.load.image(spriteName, sprite.url, sprite.overwrite);
    }
    return this;
  }
}
export default AssetLoader;
