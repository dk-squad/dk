import Phaser from 'phaser'
import PhaserIso from 'phaserIso'
import Player from '../sprites/Player'
import {generateMapGroup} from '../utils'

export default class extends Phaser.State {
  init () {
    this.game.time.advancedTiming = true;
    this.game.plugins.add(new Phaser.Plugin.Isometric(this.game));
    this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    this.game.stage.disableVisibilityChange = true;
    this.game.iso.anchor.setTo(0.5, 0.1);
    this.game.water = [];

    game.cursorPos = new Phaser.Plugin.Isometric.Point3();
  }

  create () {
    // instantiate player to game
    this.player = new Player({ game: this.game });

    // generate and instantiate tiles
    this.map = generateMapGroup(this.game, this.player);

    // position player above the level tiles
    game.world.bringToTop(this.player.group);
  }

  update () {
    // this.player.update();
    game.iso.unproject(game.input.activePointer.position, game.cursorPos);
    
    // handles water movement
    this.game.water.forEach(function (w) {
      w.tile.isoZ = (-2 * Math.sin((game.time.now + (w.tile.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.tile.isoY * 8)) * 0.005));
      w.tile.alpha = Phaser.Math.clamp(1 + (w.tile.isoZ * 0.1), 0.2, 1);
    });

    // captures whatever tile the mouse is hovered over
    this.map.forEach((tile) => {
      let inBounds = tile.isoBounds.containsXY(game.cursorPos.x, game.cursorPos.y);
      if (!tile.selected && inBounds) {
        tile.selected = true;
        tile.tint = 0xBFDA86;
        // game.add.tween(tile).to({ isoZ: 7 }, 200, Phaser.Easing.Quadratic.InOut, true);
      } else if (tile.selected && !inBounds) {
        tile.selected = false;
        tile.tint = 0xffffff;
        // game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
      }
    });
  }

  render () {
    // this.map.forEach(function (tile) {
    //   game.debug.body(tile, 'rgba(0, 0, 0, 0.2)', false);
    // });

    this.player.group.forEach(function (tile) {
      game.debug.body(tile, 'rgba(0, 0, 0, 0.4)', false);
    });

    game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
  }
}
