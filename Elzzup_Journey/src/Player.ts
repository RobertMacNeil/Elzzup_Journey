import AssetManager from "./AssetManager";

export default class Player{

    //class constants for readability
    public static LEFT:number = 1;
    public static RIGHT:number = 2;

    public static STATE_IDLE:number = 3;
    public static STATE_MOVING:number = 4;
    public static STATE_DYING:number = 5;
    public static STATE_DEAD:number = 6;

    //custom events for dispatch
    private EventDeath:createjs.Event;
    private EventLevelPassed:createjs.Event;

    //the players sprite object
    private _sprite:createjs.Sprite;
    //private properties
    private _Speed:number;
    private _direction:number;
    private _state:number;

    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        this.stage = stage;
        this._sprite = assetManager.getSprite("Assets", "PlayerPH", 0, 0);
        this._direction = Player.RIGHT;
        this._state = Player.STATE_IDLE;


    }
}