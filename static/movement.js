// create list of Nodes
let tiles = document.querySelectorAll('[data-tile-number]');

// create array which holds the number of all tiles. This is the "map".
let tileArray = [];
for (tile of tiles){
    tileArray.push(tile.dataset.tileNumber)
}

// create object holder array

let mapLayout = {
    "16": "righttile",
    "28": "lefttile",
    "19": "righttile",
    "13": "exit",
    "54": "rotater",
    "58": "rotater",
    "56": "trigger"
};

let levelOneLayout = {
    "16": "lefttile",
    "28": "lefttile",
    "19": "righttile",
    "13": "exit",
    "54": "rotater",
    "58": "rotater",
    "56": "trigger"

};
let levelOneRoadLayout = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 25, 26, 27, 28, 29, 30, 32, 33, 34, 37, 38, 39, 41, 42, 44, 45, 46, 49, 50, 51, 53, 54, 56, 57, 58, ];

let roadLayout = [0, 1, 2, 3, 4, 5, 14, 15, 25, 26, 27, 28];

let mapObjects = {
    "exit": {"value": false, "imgcls": "fa-door-closed"},
    "trigger": {"value": false, "imgcls": "fa-circle"},
    "uptile": {"value": "up", "imgcls": "fa-chevron-up"},
    "rotater": {"value": true, "imgcls": "fa-redo-alt"},
    "righttile": {"value": "right", "imgcls": "fa-chevron-right"},
    "lefttile": {"value": "left", "imgcls": "fa-chevron-left"},
    "downtile": {"value": "down", "imgcls": "fa-chevron-down"},
    "road": {"value": true, "imgcls": {"background" : "coral"}},
    "fixUpTile": {"value": "fixUp", "imgcls": "fa-long-arrow-alt-up"},
    "fixRightTile": {"value": "fixRight", "imgcls": "fa-long-arrow-alt-right"},
    "fixDownTile": {"value": "fixDown", "imgcls": "fa-long-arrow-alt-down"},
    "fixLeftTile": {"value": "fixLeft", "imgcls": "falet tile;-long-arrow-alt-left"},
};


let objBehavior = {
    "exit": function (value){
        if (value){
            levelProgress()
            }
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
        console.log("door is open now");
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
                    //levelOneLayout[node.parentElement.dataset.tileNumber] = `${newDirection[rou]}tile`;
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
    let placement = document.querySelector(`[data-tile-number="${tileNum}"]`);
    if (typeof(objClass) == "object"){ // not used, placeRoad is the road placing funtion
        if (objClass.background) {
          placement.setAttribute("style", `background:${objClass.background}`)
        }
    } else {
    let tagtxt = `<i class="fas ${objClass}"></i>`;
    placement.insertAdjacentHTML("beforeend", tagtxt);
    }
}

function placeRoad(array){
    for (let num of array){
        let placement = document.querySelector(`[data-tile-number="${num}"]`);
        placement.setAttribute("style", `background:${mapObjects.road.imgcls.background}`)
    }
}
for (tile in mapLayout){
    placeObjects(mapObjects[mapLayout[tile]].imgcls, tile)
}
//for (tile in levelOneLayout){
//    placeObjects(mapObjects[levelOneLayout[tile]].imgcls, tile)
//}


//placeRoad(roadLayout);
placeRoad(levelOneRoadLayout);

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
    let tile;
    switch (event.keyCode) {
        case 87:        // W button, Up player movement
        case 38:
            tile = moveUp(getTileNum());

            break;
        case 83:        // S button, Down
        case 40:
            tile = moveDown(getTileNum());

            break;
        case 65:        // A button, Left
        case 37:
            tile = moveLeft(getTileNum());

            break;
        case 68:        // D button, Right
        case 39:
            tile = moveRight(getTileNum());
            break;
    }
    if (tile){
        if (allowedToStep(tile)){
           replacePlayer(tile);
           checkObjectBehavior()
        }
    }
}

function checkObjectBehavior(){
    try{
        let objName = mapLayout[getTileNum()];
        //let objName = levelOneRoadLayout[getTileNum()];
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
    let tile = getTileNum();
        switch(direction){
            case "right":
            case "fixRight":
                tile += 1;
                break;
            case "left":
            case "fixLeft":
                tile -= 1;
                break;
            case "down":
            case "fixDown":
                tile += 12;
                break;
            case "up":
            case "fixUp":
                tile -= 12;
        }
        setTimeout(function(){
            replacePlayer(tile);
            checkObjectBehavior()
        }, 200)
}
placePlayer(49);
//placeFinishTile(10);

function checkWinLevel() {
    if (mapObjects.exit.value) {
        if (getTileNum() === getTileNumObject()){
        levelProgress();
        }
    }
}

function levelProgress() {
    if (confirm("Ready to progress to the next level?")) {
        sessionStorage.setItem("level", "2");

        if (sessionStorage.getItem("level") === "2"){
            levelOneRoadLayout = [];
            placeRoad(levelOneRoadLayout);
            let mapLayout = {
                "85": "fixRightTile",
                "86": "fixRightTile",
                "87": "fixRightTile",
                "88": "fixRightTile",
                "65": "fixRightTile",
                "66": "fixRightTile",
                "67": "fixRightTile",
                "68": "fixUpTile",
                "45": "fixRightTile",
                "76": "fixUpTile",
                "52": "fixUpTile",
                "56": "fixUpTile",
                "46": "fixUpTile",
                "34": "fixUpTile",
                "22": "fixUpTile",
                "30": "fixLeftTile",
                "31": "fixLeftTile",
                "32": "fixLeftTile",
                "40": "fixLeftTile",
                "39": "fixLeftTile",
                "37": "fixLeftTile",
                "36": "fixLeftTile",
                "48": "fixLeftTile",
                "60": "fixLeftTile",
                "72": "fixLeftTile",
                "28": "fixDownTile",
                "26": "rotater",
                "17": "rotater",
                "64": "uptile",
                "44": "uptile",
                "10": "exit",
            };
            let levelOneRoadLayout = [10, 17, 22, 26, 28, 29, 30, 31, 32, 34, 36, 37, 38, 39, 40, 44, 45, 46, 48, 52, 56, 60, 64, 65, 66, 67, 68, 72, 76, 84, 85, 86, 87, 88];
            placeRoad(levelOneRoadLayout);
            placePlayer(84);
            for (tile in mapLayout) {
                placeObjects(mapObjects[mapLayout[tile]].imgcls, tile)
            }
        }

        console.log("new map")// load new map
    } else {
        console.log("restart current level")
    }
}


function allowedToStep(tile){
    let placement = document.querySelector(`[data-tile-number="${tile}"]`);
    return (placement.style.backgroundColor === mapObjects.road.imgcls.background)
}

getTileNumObject("#exit");
checkWinLevel();

