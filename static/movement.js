// create list of Nodes
let tiles = document.querySelectorAll('[data-tile-number]');

// create array which holds the number of all tiles. This is the "map".
let tileArray = [];
for (tile of tiles){
    tileArray.push(tile.dataset.tileNumber)
}

// player text
let playerText = `<i id="player" class="fab fa-accessible-icon"></i>`;

// player placement functions
function placePlayer(tile){
    let placement = document.querySelector(`[data-tile-number="${tile}"]`);
    placement.insertAdjacentHTML("beforeend", playerText);
}

function removePlayer(){
    let player = document.querySelector("#player");
    player.remove();
}

let replacePlayer = function(tile){
    removePlayer();
    placePlayer(tile)
};

function getTileNum(){
    return parseInt(document.querySelector("#player").parentElement.dataset.tileNumber)
}



document.addEventListener("keyup", onkeyup);

function onkeyup(event) {
    let keyCode = event.keyCode;
    switch (keyCode) {
        case 87:        // W button, Up player movement
            moveUp(getTileNum());
            console.log('W');
            break;
        case 83:        // S button, Down
            moveDown(getTileNum());
            console.log('S');
            break;
        case 65:        // A button, Left
            moveLeft(getTileNum());
            console.log('A');
            break;
        case 68:        // D button, Right
            moveRight(getTileNum());
            console.log('D');
            break;
    }
}

function moveUp(tile) {
    if (tile > 12) {
        tile -= 12;
        replacePlayer(tile);
    }
}

function moveDown(tile) {
    if (tile < 84) {
        tile += 12;
        replacePlayer(tile);
    }
}
function moveLeft(tile) {
    if (tile % 12 !== 0) {
        tile -= 1;
         replacePlayer(tile)
    }
}

function moveRight(tile) {
    if (tile % 12 !== 11) {
        tile += 1;
        replacePlayer(tile);
    }
}

placePlayer(1);