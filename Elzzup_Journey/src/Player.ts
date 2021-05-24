import AssetManager from "./AssetManager";
import { SPAWNPOINT_X, SPAWNPOINT_Y, STAGE_WIDTH } from "./Constants";

export default class Player{

    //class constants for readability
    public static LEFT:number = 1;
    public static RIGHT:number = 2;

    public static STATE_IDLE:number = 3;
    public static STATE_MOVING:number = 4;
    public static STATE_DYING:number = 5;
    public static STATE_DEAD:number = 6;

    //custom events for dispatch

    //used along side level reset
    private eventDeath:createjs.Event;
    //used to indicate passing levels
    private eventLevelPassed:createjs.Event;

    //the players sprite object
    private _sprite:createjs.Sprite;
    //private properties
    private _speed:number;
    private _direction:number;
    private _state:number;

    private width:number;

    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        this.stage = stage;
        this._speed = 5;
        this._sprite = assetManager.getSprite("Assets", "PlayerPH");
        this.width = this._sprite.getBounds().width;
        this._direction = Player.RIGHT;
        this._state = Player.STATE_IDLE;

        this._sprite.x = SPAWNPOINT_X;
        this._sprite.y = SPAWNPOINT_Y;

        this.eventDeath = new createjs.Event("playerDeath", true, false);
        this.eventLevelPassed = new createjs.Event("levelPassed", true, false);
    }

    //gets/sets
    get direction(){
        return this._direction;
    }
    set direction(value:number){
        this._direction = value;

        if (this._direction == Player.LEFT) {
            if(this._sprite.scaleX < 0) return;
            this._sprite.scaleX = this._sprite.scaleX * -1;
        } else if (this._direction == Player.RIGHT) {
            this._sprite.scaleX = Math.abs(this._sprite.scaleX * 1);
        }
    }

    get state(){
        return this._state;
    }
    set state(value:number){
        this._state = value;
    }

    set speed(value:number) {
        this._speed = value;
    }
    get speed() {
        return this._speed;
    }

    //public methods

    public showMe():void{
        this.stage.addChild(this._sprite);
        this._state = Player.STATE_IDLE;
        this._sprite.play();
    }

    public removeMe():void{
        this.stage.removeChild(this._sprite);
        this._state = Player.STATE_IDLE;
        this._sprite.stop();
    }

    public startMe():void {
        this._sprite.play();
        this._state = Player.STATE_MOVING;
    }

    public stopMe():void {
        this._sprite.stop();
        this._state = Player.STATE_IDLE;
    }

    public positionMe(x:number, y:number):void{
        this._sprite.x = x;
        this._sprite.y = y;
    }

    public killMe():void{
        this.stopMe();
        this._sprite.on("animationend", (e:createjs.Event) => this.removeMe(), this, true);
        this._sprite.gotoAndPlay("playerPH");
        this._sprite.dispatchEvent(this.eventDeath);
    }

    public resetMe():void{
        this._sprite.x = SPAWNPOINT_X;
        this._sprite.y = SPAWNPOINT_Y;
        this.showMe();
    }

    public update():void {
        if (this._state == Player.STATE_MOVING) {

            // reference parts for cleaner code below
            let sprite:createjs.Sprite = this._sprite;
            let width:number = this.width

                if (this._direction == Player.LEFT) {
                // moving left
                this._sprite.x = this._sprite.x - this._speed;
                if (this._sprite.x < 0) {
                    this._sprite.x = (width / 2);
                }
                } else if (this._direction == Player.RIGHT) {
                // moving right
                this._sprite.x = this._sprite.x + this._speed;
                if (this._sprite.x > (STAGE_WIDTH + (width / 2))) {
                    this._sprite.x = -(width / 2);
                    sprite.dispatchEvent(this.eventLevelPassed);
                }
            }
        }
    }
}