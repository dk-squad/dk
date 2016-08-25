import Phaser from 'phaser';
import PhaserIso from 'phaserIso'
import { handleMovement } from '../utils'

export default class extends Phaser.Plugin.Isometric.IsoSprite {
  constructor ({ game, player, x, y, z, tilesheet, tile, group }) {
    super(game, player, x, y, z, tilesheet, tile, group);

    // add tile to the game, being called from within utils.js
    this.tile = game.add.isoSprite(x, y, z, tilesheet, tile, group);

    // 
		this.generatePath = (sprite, pointer) => {
			// move to these positions, tiles are sized at 32 so it needs to be divided and offset to handle easystar pathfinding
			const isoX = (sprite.isoPosition.x / 32) - 1;
			const isoY = (sprite.isoPosition.y / 32) - 1;

			// calculate path based on what sprite tile was clicked
			game.easystar.findPath(player.isoX, player.isoY, isoX, isoY, function( path ) {
				if (!path) {
					console.log('Cant walk on this tile.');
				} else {
					handleMovement(path, player, game);
				}
			});

			game.easystar.setIterationsPerCalculation(1000);
			game.easystar.calculate();
		}

		// add listener on tile to capture mouse click
		this.tile.events.onInputDown.add(this.generatePath, this);
  }
}
