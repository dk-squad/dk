import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#fff';
    this.startGame = false;
  }

  preload () {
    this.startGame = true;
    this.load.atlasJSONHash('tileset', '../assets/frames/tileset.png', '../assets/frames/tileset.json');
    this.load.atlasJSONHash('goblin', '../assets/frames/goblin_lumberjack_black.png', '../assets/frames/goblin_lumberjack_black.json');
  }

  render () {
    if (this.startGame) {
      this.state.start('Game');
    }
  }
}
