// create list of Nodes
let tiles = document.querySelectorAll('[data-tile-number]');

// create array which holds the number of all tiles. This is the "map".
let tileArray = [];
for (tile of tiles){
    tileArray.push(tile.dataset.tileNumber)
}

// create object holder array
let mapObjects = {
    "4": {"exit": false},
    "5": {"trigger": true}
};


let objBehavior = {
    "exit": function (value){console.log(value ? "door status true" : "door is false")},
    "trigger": function(value){
        mapObjects["4"].exit = value;
        console.log("door is open now");
    }
};

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
    switch (event.keyCode) {
        case 87:        // W button, Up player movement
            moveUp(getTileNum());

            break;
        case 83:        // S button, Down
            moveDown(getTileNum());

            break;
        case 65:        // A button, Left
            moveLeft(getTileNum());

            break;
        case 68:        // D button, Right
            moveRight(getTileNum());

            break;
    }
    try{
        let objName = Object.keys(mapObjects[getTileNum()])[0];
        let value = Object.values(mapObjects[getTileNum()])[0];
        objBehavior[objName](value);
        //console.log("key, value: ");
        //console.log(objName);
        //console.log(value);
    } catch {}
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