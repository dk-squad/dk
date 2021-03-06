import 'pixi';
import 'p2';
import Phaser from 'phaser';
import BootState from './states/Boot';
import GameState from './states/Game';

class Game extends Phaser.Game {

  constructor () {
    let width = document.documentElement.clientWidth > 768 ? 768 : document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight > 1024 ? 1024 : document.documentElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'dk', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Game', GameState, false);
    this.state.start('Boot');
  }
}

window.game = new Game();
