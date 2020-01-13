
// player text
let playerText = `<i id="player" class="fab fa-accessible-icon fa-2x" ></i>`;


let mapLayoutLevelOne = {
    "player": [49],
    "exit": [13],
    "righttile": [16, 19],
    "lefttile": [28],
    "rotater": [54, 58],
    "trigger": [56],
    "road": [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 25, 26, 27, 28, 29, 30, 32, 33, 34, 37, 38, 39, 41, 42, 44, 45, 46, 49, 50, 51, 53, 54, 56, 57, 58, ]
};

let mapLayoutLevelTwo = {
    "player": [84],
    "fixRightTile": [85, 86, 87, 65, 66, 67, 45],
    "fixUpTile": [88, 68, 76, 56, 46, 34, 22],
    "fixLeftTile": [30, 31, 32, 40, 39],
    "fixDownTile": [28],
    "rotater": [26, 17],
    "uptile": [64, 44],
    "exit": [10],
    "road": [10, 17, 22, 26, 28, 29, 30, 31, 32, 34, 36, 37, 38, 39, 40, 44, 45, 46, 48, 52, 56, 60, 64, 65, 66, 67, 68, 72, 76, 84, 85, 86, 87, 88]
};


let keyCodes = {
    87: "up",
    38: "up",
    83: "down",
    40: "down",
    65: "left",
    37: "left",
    68: "right",
    39: "right"
};

let mapObjects = {
    "exit": {"value": false, "imgcls": "fa-door-closed"},
    "trigger": {"value": false, "imgcls": "fa-circle"},
    "uptile": {"value": "up", "imgcls": "fa-chevron-up"},
    "rotater": {"value": true, "imgcls": "fa-redo-alt"},
    "righttile": {"value": "right", "imgcls": "fa-chevron-right"},
    "lefttile": {"value": "left", "imgcls": "fa-chevron-left"},
    "downtile": {"value": "down", "imgcls": "fa-chevron-down"},
    "road": {"value": true, "background": "coral"},
    "fixUpTile": {"value": "up", "imgcls": "fa-long-arrow-alt-up"},
    "fixRightTile": {"value": "right", "imgcls": "fa-long-arrow-alt-right"},
    "fixDownTile": {"value": "down", "imgcls": "fa-long-arrow-alt-down"},
    "fixLeftTile": {"value": "left", "imgcls": "fa-long-arrow-alt-left"},
};


let objBehavior = {
    "exit": function (value){
        if (value){levelProgress()}
        },
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
    },
    "righttile": function(direction){placePlayerByTile(direction)},
    "lefttile": function(direction){placePlayerByTile(direction)},
    "downtile": function(direction){placePlayerByTile(direction)},
    "uptile": function(direction){placePlayerByTile(direction)},
    "fixUpTile": function(direction){placePlayerByTile(direction)},
    "fixRightTile": function(direction){placePlayerByTile(direction)},
    "fixDownTile": function(direction){placePlayerByTile(direction)},
    "fixLeftTile": function(direction){placePlayerByTile(direction)},
    "rotater": function(value){
        console.log("rotater activated");
        let newDirection = {"right": "down", "down": "left", "left": "up", "up": "right"};
        let rotaTiles = [];
        for(route in newDirection){
            // select the mapObject right/left/up/downtile properties.
            let selectorObj = mapObjects[`${route}tile`];
            // create a nodelist from the mapObjects properties.
            let selectedObj = document.querySelectorAll(`.${selectorObj.imgcls}`);
            // create an empty object (tempDic)
            let tempDic = {};
            // set the actual direction as property, and the nodelist as its value.
            tempDic[route] = selectedObj;
            // if nodelist is not empty them push it into the rotaTiles array.
            if (selectedObj.length > 0){
                rotaTiles.push(tempDic)
            }
        }
        // iterate through every {direction: object} pair.
        for (objectContainer of rotaTiles){

            for (rou in objectContainer){
                // select the DOM elements and set new data to them.
                selectorObj = mapObjects[`${rou}tile`];
                for (let node of objectContainer[rou]){
                    //console.log(node);
                    node.classList.remove(`${selectorObj.imgcls}`);
                    node.classList.add(`fa-chevron-${newDirection[rou]}`);
                    // new dataset value must be set, because objectBehavior checks it
                    //mapLayout[node.parentElement.dataset.tileNumber] = `${newDirection[rou]}tile`;
                    node.dataset.objType = `${newDirection[rou]}tile`;
                }
            }
        }
    }
};


function placeObjects(objClass, objData, tileNum){
    let placement = document.querySelector(`[data-tile-number="${tileNum}"]`);
    let tagtxt = `<i class="fas ${objClass}" data-obj-type="${objData}"></i>`;
    placement.insertAdjacentHTML("beforeend", tagtxt);
}

function placeRoad(array){
    for (let num of array){
        let placement = document.querySelector(`[data-tile-number="${num}"]`);
        placement.setAttribute("style", `background:${mapObjects.road.background}`)
    }
}
let paintMap = function(){
    let myMap;
    switch(sessionStorage.getItem("level")){
        case "2":
            myMap = mapLayoutLevelTwo;
            break;
        default:
            myMap = mapLayoutLevelOne;
    }

    for (let item in myMap) {
        if (item === "road"){
            placeRoad(myMap[item])
        } else if (item === "player") {
            placePlayer([myMap[item][0]])
        }
        else {
            for (tileNum of myMap[item]){
                placeObjects(mapObjects[item].imgcls, item, tileNum)
            }
        }
    }
};


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

// get the actual position of player
function getTileNum(){
    return parseInt(document.querySelector("#player").parentElement.dataset.tileNumber)
}

// movement event listener
function onkeyup(event) {
    let toTile = moveDirection(keyCodes[event.keyCode]);
    if (toTile){
        if (allowedToStep(toTile)){
           replacePlayer(toTile);
           checkObjectBehavior()
        }
    }
}

function checkObjectBehavior(){
    let tileNum = getTileNum();
    try{
        let objName = document.querySelector(`[data-tile-number="${tileNum}"] > i`).dataset.objType;
        let value = mapObjects[objName].value;
        objBehavior[objName](value);
    } catch {}

}

// movement functions
function moveDirection(direction){
    let tile = getTileNum();
    switch(direction){
        case "right":
            tile = moveRight(tile);
            break;
        case "left":
            tile = moveLeft(tile);
            break;
        case "down":
            tile = moveDown(tile);
            break;
        case "up":
            tile = moveUp(tile);
    }
    return tile
}

function moveUp(tile) {
    if (tile > 11) {
        tile -= 12;
        return tile;
    }
}

function moveDown(tile) {
    if (tile < 84) {
        tile += 12;
        return tile;
    }
}

function moveLeft(tile) {
    if (tile % 12 !== 0) {
        tile -= 1;
         return tile
    }
}

function moveRight(tile) {
    if (tile % 12 !== 11) {
        tile += 1;
        return tile
    }
}

// function for player forwarding tiles
function placePlayerByTile(direction){
    let tile = moveDirection(direction);
    setTimeout(function(){
        replacePlayer(tile);
        checkObjectBehavior()
    }, 200)
}

function levelProgress() {
    if (confirm("Ready to progress to the next level?")) {
        sessionStorage.setItem("level", "2");
        location.reload();
        console.log("new map")// load new map
    } else {
        console.log("restart current level")
    }
}

function allowedToStep(tile){
    let placement = document.querySelector(`[data-tile-number="${tile}"]`);
    return (placement.style.backgroundColor === mapObjects.road.background)
}

// These are the running functions ON LOAD ==============================
document.addEventListener("keyup", onkeyup);
paintMap();