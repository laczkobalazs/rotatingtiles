let tiles = document.querySelectorAll('[data-tile-number]');

let tileArray = [];
for (tile of tiles){
    tileArray.push(tile.dataset.tileNumber)
}
