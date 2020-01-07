let tiles = document.querySelectorAll('[data-tile-number]');

let tileArray = [];
for (tile of tiles){
    tileArray.push(tile.dataset.tileNumber)
}

# let myGame;

function player(position, ) {
    this.position =

}

function moveUp() {
    if (player.position > 12) {
        player.position -= 12;
    }
}

function moveDown() {
    if (player.position < 84) {
        player.position += 12;
    }
}
function moveLeft() {
    if (player.position % 12 !== 0) {
        player.position -= 1;
    }
}