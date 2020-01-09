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
    "25": "uptile",
    "26": "uptile",
    "27": "righttile"
};

let mapObjects = {
    "exit": {"value": false, "imgcls": "fa-door-closed"},
    "trigger": {"value": false, "imgcls": "fa-circle"},
    "uptile": {"value": "up", "imgcls": "fa-chevron-up"},
    "rotater": {"value": true, "imgcls": "fa-redo-alt"},
    "righttile": {"value": "right", "imgcls": "fa-chevron-right"},
    "lefttile": {"value": "left", "imgcls": "fa-chevron-left"},
    "downtile": {"value": "down", "imgcls": "fa-chevron-down"},
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
            let triggerObj = document.querySelector(`[data-tile-number='${getTileNum()}'] > i`);
            triggerObj.classList.toggle("fa-check-circle");
            triggerObj.classList.toggle("fa-circle");
        console.log("door is open now");
    },
    "righttile": function(direction){placePlayerByTile(direction)},
    "lefttile": function(direction){placePlayerByTile(direction)},
    "downtile": function(direction){placePlayerByTile(direction)},
    "uptile": function(direction){placePlayerByTile(direction)},
    "rotater": function(value){
        console.log("rotater activated");
        let newDirection = {"right": "down", "down": "left", "left": "up", "up": "right"};
        let rotaTiles = [];
        for(route in newDirection){
            let selectorObj = mapObjects[`${route}tile`];
            let selectedObj = document.querySelectorAll(`.${selectorObj.imgcls}`);
            let tempDic = {};
            tempDic[route] = selectedObj;
            if (selectedObj.length > 0){
                rotaTiles.push(tempDic)
            }

        }
        for (objectContainer of rotaTiles){

            for (rou in objectContainer){
                selectorObj = mapObjects[`${rou}tile`];
                for (let node of objectContainer[rou]){
                    console.log(node);
                    node.classList.remove(`${selectorObj.imgcls}`);
                    node.classList.add(`fa-chevron-${newDirection[rou]}`);
                    mapLayout[node.parentElement.dataset.tileNumber] = `${newDirection[rou]}tile`;
                    console.log(mapLayout);

                }
            }
        }
        // below lines are not necessary anymore as there are not only one "forwardtile"
        //selectorObj.imgcls = `fa-chevron-${newDirection[selectorObj.value]}`;
        //selectorObj.value = newDirection[selectorObj.value]
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
let playerText = `<i id="player" class="fab fa-accessible-icon fa-2x" ></i>`;

//finish tile
let finishTileText = '<i id="finish" class="fas fa-dungeon"></i>';

//set finish tile
function placeFinishTile(tile) {
    let exitPosition = document.querySelector(`[data-tile-number="${tile}"]`);
    exitPosition.insertAdjacentHTML("beforeend", finishTileText);
}

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

function getTileNumObject(object){
    return parseInt(document.querySelector(object).parentElement.dataset.tileNumber)
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
    if (tile > 11) {
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
        getTileNumObject("#finish");
        checkWinLevel();
    }
}


// function for player forwarding tiles
function placePlayerByTile(direction){
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
}
placePlayer(1);
placeFinishTile(10);

function checkWinLevel() {
    if (getTileNum() === getTileNumObject('#finish')){
        levelProgress();
    }
}

function levelProgress() {
    if (confirm("Ready to progress to the next level?")) {
        console.log("new map")// load new map
    } else {
        console.log("restart current level")
    }
}

getTileNumObject("#finish");
checkWinLevel();
