/**
 * @author Sebastian Romero
 * @plugin This plugin creates a tiles to a given container
 */
;(function($){
	
	$.fn.tiles = function(options) {
		
		var settings = $.extend({
			"tileWidth" : 100,
			"tileHeight" : 100,
			"tileInterval" : 10,
			"onTileCreated" : null
		}, options);
		
		
		/**
		 * @private
		 * This method creates the tile and return its reference.
		 * return jQuery Object
		 */
		var createTile = function(){
			var tile = $(document.createElement("div"));
			tile.addClass("js-tile").css({
				"width" : settings.tileWidth,
				"height" : settings.tileHeight,
				"position": "absolute"
			});
			return tile;
		};
		
		
		/**
		 * @private
		 * @param [jQuery Object] where the tiles will be placed
		 * This method creates all the tiles on the given container
		 */
		var createTiles = function(parent){
			if(parent){
				var numOfTilesHorizontal = Math.ceil(parent.width()/settings.tileWidth),
				numOfTilesVertical = Math.ceil(parent.height()/settings.tileHeight),
				i=0,
				u = 0,
				tile;
				parent.css({
					"display" : "block",
					"overflow": "hidden"
				});
				if(numOfTilesVertical > 0){
					parent.data("tiles", {
						"columns" : numOfTilesVertical,
						"rows" : numOfTilesHorizontal
					});
					for(;u<numOfTilesVertical; u++)
						for (i=0; i<numOfTilesHorizontal;i++)
							setTileOnParent(parent, u, i);
					createMapTimeout(parent);
				}
			}
		};
		
		
		/**
		 * @private 
		 * This method set the tile on the canvas
		 * @param [jQuery Object] where the tiles will be placed parent node
		 * @param [Number] column
		 * @param [Number] row
		 */
		var setTileOnParent = function(parent, u, i){
			if($("#tile_y_" + u + "_x_" + i).size()==0){
				tile = createTile();
				tile.css({
					"left" : i*settings.tileWidth,
					"top" : u*settings.tileHeight
				}).data("tile", {
					"y" : u,
					"x" : i
				}).attr({
					"id" : "tile_y_" + u + "_x_" + i
				});
				parent.append(tile);
				if(settings.onTileCreated){
					settings.onTileCreated(tile, u, i);
				}
			}
		};
		
		/**
		 * @private reference of the parent
		 * @returns Number
		 */
		var createMapTimeout = function(parent){
			return setInterval(function(){
				var numOfTilesHorizontal = Math.ceil(parent.width()/settings.tileWidth),
				numOfTilesVertical = Math.ceil(parent.height()/settings.tileHeight),
				tile, u;
				if(numOfTilesVertical > parent.data("tiles").columns){
					u = parent.data("tiles").columns;
					parent.data("tiles").columns = numOfTilesVertical;
					for(;u<numOfTilesVertical; u++)
						for (i=0; i<numOfTilesHorizontal;i++)
							setTileOnParent(parent, u, i);
				} else if(numOfTilesHorizontal > parent.data("tiles").rows) {
					u = 0;
					parent.data("tiles").rows = numOfTilesHorizontal;
					for(;u<numOfTilesVertical; u++)
						for (i=0; i<numOfTilesHorizontal;i++)
							setTileOnParent(parent, u, i);
				}
			}, settings.tileInterval);
		};
		
		return this.each(function(){
			createTiles($(this));
		});
	};

	
}(jQuery));
