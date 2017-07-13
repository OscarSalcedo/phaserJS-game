module.exports = () => {
  return {
    'platforms': {
      data: require('../../assets/atlases/platforms.json'),
      format: Phaser.Loader.TEXTURE_ATLAS_JSON_HASH,
      url: require('../../assets/shared/platform-1.png')
    }
  }
};
