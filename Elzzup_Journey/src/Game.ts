// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST } from "./Constants";
// importing Assestmanager // should only be one copy throughout game
import AssetManager from "./AssetManager";
import Player from "./Player";
import ScreenManager from "./ScreenManager";

//current state of keys
let upKey:boolean = false;
let leftKey:boolean = false;
let rightKey:boolean = false;
let spacebar:boolean = false;

// game variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;

let level:number;

// assetmanager object
let assetManager:AssetManager;

//Game objects
let screenManager:ScreenManager;
let player:Player;

// --------------------------------------------------- event handlers
function onReady(e:createjs.Event):void {
    console.log(">> adding sprites to game");

    //initializing key booleans
    upKey = false;
    leftKey = false;
    rightKey = false;
    spacebar = false;
    
    // construct game objects/sprites

    screenManager = new ScreenManager(stage, assetManager);
    screenManager.showTitle();

    player = new Player(stage, assetManager);
    
    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;

    // listen for game events
    stage.on("levelPassed", onGameEvent);
    stage.on("playerDeath", onGameEvent);
    stage.on("gameStart", onGameEvent);
    stage.on("gameReset", onGameEvent);

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);     
    console.log(">> game ready");
}

//eventhandler
function onGameEvent(e:createjs.Event) {
    switch (e.type) {
        case "gameStart":
            screenManager.showWorldOne();
            player.showMe();

            break;

        case "gameReset":
            screenManager.showTitle();

            player.resetMe();
            player.removeMe();
            
            break;

        case "playerDeath":
            player.killMe();
            
            break;
        case "levelPassed":
            level++;
            if(level == 4){
                screenManager.showWorldTwo();
            }
            else if(level >= 7)

            break;
    }
}

//---------------------------------private methods
function monitorKeys():void
{
    if (leftKey)
    {
        player.direction = Player.LEFT;
        player.startMe();
    }
    else if (rightKey)
    {
        player.direction = Player.RIGHT;
        player.startMe();
    }
    else
    {
        player.stopMe();
    }
}

function onKeyDown(e:KeyboardEvent):void
{
    console.log("key pressed down: " + e.key);
    if (e.key == "ArrowLeft") leftKey = true;
    else if (e.key == "ArrowRight") rightKey = true;
    else if (e.key == "ArrowUp") upKey = true;

    if (e.key == " ") spacebar = true;
}

function onKeyUp(e:KeyboardEvent):void
{
    console.log("key released up: " + e.key);
    if (e.key == "ArrowLeft") leftKey = false;
    else if (e.key == "ArrowRight") rightKey = false;
    else if (e.key == "ArrowUp") upKey = false;

    if (e.key == " ") spacebar = false;
}

function onTick(e:createjs.Event):void {
    // TESTING FPS
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());

    // This is your game loop :)
    monitorKeys();
    player.update();

    // update the stage!
    stage.update();
}

// --------------------------------------------------- main method
function main():void {
    console.log(">> initializing");

    // get reference to canvas
    canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    // set canvas width and height - this will be the stage size
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;

    // create stage object
    stage = new createjs.StageGL(canvas, { antialias: true });

    // AssetManager setup
    assetManager = new AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    // load the assets
    assetManager.loadAssets(ASSET_MANIFEST);
}

main();