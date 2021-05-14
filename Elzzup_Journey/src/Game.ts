// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST } from "./Constants";
import AssetManager from "./AssetManager";
import Player from "./Player";
import Ground from "./Ground";

//current state of keys
let upKey:boolean = false;
let leftKey:boolean = false;
let rightKey:boolean = false;
let spacebar:boolean = false;

// game variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
// assetmanager object
let assetManager:AssetManager;

//Game objects
let background:createjs.Sprite;
let gameScreen:createjs.Sprite;
let startButton:createjs.Sprite;
let player:Player;
let ground:Ground;

// --------------------------------------------------- event handlers
function onReady(e:createjs.Event):void {
    console.log(">> adding sprites to game");

    // construct game objects/sprites
    
    background = assetManager.getSprite("Assets", "TitleScreen");
    stage.addChild(background);

    startButton = assetManager.getSprite("Assets", "PlayButtonPH", 300, 400);
    stage.addChild(startButton);

    startButton.on("click", monitorClicks);

    gameScreen = assetManager.getSprite("Assets", "GameScreenBackGround1PH");

    ground = new Ground(stage, assetManager);

    player = new Player(stage, assetManager);
    
    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);     
    console.log(">> game ready");
}

//---------------------------------private methods
function monitorClicks(e:createjs.Event):void {
    if (e.target = startButton){
        startGame();
    }
}

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
    else if (upKey)
    {
        player.direction = Player.UP;
        player.startMe();
    }
    else
    {
        player.stopMe();
    }
}

function startGame():void{
    stage.removeChild(background);
    stage.removeChild(startButton);
    stage.addChildAt(gameScreen, 0);
    ground.placeMe(0,536,19,2);
    player.showMe();
}

function onKeyDown(e:KeyboardEvent):void
{
    console.log("key pressed down: " + e.key);
    if (e.key == "ArrowLeft") leftKey = true;
    else if (e.key == "ArrowRight") rightKey = true;
    else if (e.key == "ArrowUp") upKey = true;

    if(e.key == " ")
    {
        spacebar = true;
    }
}

function onKeyUp(e:KeyboardEvent):void
{
    console.log("key released up: " + e.key);
    if (e.key == "ArrowLeft") leftKey = false;
    else if (e.key == "ArrowRight") rightKey = false;

    if(e.key == " ")
    {
        spacebar = false;
        console.log("JUMP!!!");
    }
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