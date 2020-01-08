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


document.addEventListener("keyup", onkeyup)

function onkeyup(event) {
    let keyCode = event.keyCode;
    switch (keyCode) {
        case 87:        // W button, Up player movement
            keyW = moveUp();
            console.log('W');
            break;
        case 83:        // S button, Down
            keyS = moveDown();
            console.log('S');
            break;
        case 65:        // A button, Left
            keyA = moveLeft();
            console.log('A');
            break;
        case 68:        // D button, Right
            keyD = moveRight();
            console.log('D');
            break;
    }
}

function moveUp(tile) {
    if (tile > 12) {
        replacePlayer(tile) -= 12;
    }
}

function moveDown(tile) {
    if (tile < 84) {
          replacePlayer(tile) += 12;
    }
}
function moveLeft(tile) {
    if (tile % 12 !== 0) {
         replacePlayer(tile) -= 1;
    }
}

function moveRight(tile) {
    if (tile % 12 !== 11) {
        replacePlayer(tile) += 1;
    }
}