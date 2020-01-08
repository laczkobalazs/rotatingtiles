// create list of Nodes
let tiles = document.querySelectorAll('[data-tile-number]');

// create array which holds the number of all tiles. This is the "map".
let tileArray = [];
for (tile of tiles){
    tileArray.push(tile.dataset.tileNumber)
}

// create object holder array

let mapLayout = {
    "0" : "rotater",
    "4": "exit",
    "5": "trigger",
    "25": "forwardtile",
    "26": "forwardtile"
};

let mapObjects = {
    "exit": {"value": false, "imgcls": "fa-door-closed"},
    "trigger": {"value": false, "imgcls": "fa-grip-lines"},
    "forwardtile": {"value": "up", "imgcls": "fa-chevron-up"},
    "rotater": {"value": true, "imgcls": "fa-redo-alt"}
};


let objBehavior = {
    "exit": function (value){console.log(value ? "door status true" : "door is false")},
    "trigger": function(value){
        mapObjects.trigger.value = (!value);
        mapObjects.exit.value = mapObjects.trigger.value;
        // solution 1: modifying DOM (working fine)
            // document.querySelector(".fa-door-closed").classList.add("fa-door-open");
        // solution 2: toggle class of DOM object in JS code
            let doorObj = document.querySelector(".fa-door-closed");
            doorObj.classList.toggle("fa-door-open");

        console.log("door is open now");
    },
    "forwardtile": function(direction){
        let tile = getTileNum();
        switch(direction){
            case "right":
                tile += 1;
                break;
            case "left":
                tile -= 1;
                break;
            case "down":
                tile += 12;
                break;
            case "up":
                tile -= 12;
        }
        setTimeout(function(){
            replacePlayer(tile);
            checkObjectBehavior()
        }, 200)
    },
    "rotater": function(value){
        console.log("rotater activated");
        let newDirection = {"right": "down", "down": "left", "left": "up", "up": "right"};
        let rotaTiles = document.querySelectorAll(`.${mapObjects.forwardtile.imgcls}`);
        for (nodes of rotaTiles){
            nodes.classList.remove(mapObjects.forwardtile.imgcls);
            nodes.classList.add(`fa-chevron-${newDirection[mapObjects.forwardtile.value]}`);
            //console.log(nodes)
        }
        mapObjects.forwardtile.imgcls = `fa-chevron-${newDirection[mapObjects.forwardtile.value]}`;
        mapObjects.forwardtile.value = newDirection[mapObjects.forwardtile.value]
    }
};
// place objects
function placeObjects(objClass, tileNum){
    let tagtxt = `<i class="fas ${objClass}"></i>`;
    let placement = document.querySelector(`[data-tile-number="${tileNum}"]`);
    placement.insertAdjacentHTML("beforeend", tagtxt);
}
for (tile in mapLayout){
    placeObjects(mapObjects[mapLayout[tile]].imgcls, tile)
}

// player text
let playerText = `<i id="player" class="fab fa-accessible-icon" style="font-size: 25px"></i>`;

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
    checkObjectBehavior()
}

function checkObjectBehavior(){
    try{
        let objName = mapLayout[getTileNum()];
        let value = mapObjects[objName].value;
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