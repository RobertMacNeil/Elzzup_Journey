import AssetManager from "./AssetManager";
import { STAGE_WIDTH, STAGE_HEIGHT, SPAWNPOINT_X, SPAWNPOINT_Y } from "./Constants";

export default class Player {
    // class constants for readability 
    public static LEFT:number = 1;
    public static RIGHT:number = 2;
    public static UP:number = 3;

    // custom event
    private eventPassedLevel:createjs.Event;
    private eventGrounded:createjs.Event;
    private eventPlayerDeath:createjs.Event;

    // private property variables
    private _speed:number;
    private _direction:number;
    private _moving:boolean;
    private _grounded:boolean;
    private _frozen:boolean;
    private stage:createjs.StageGL;

    // the Player's sprite object
    private _sprite:createjs.Sprite;

    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        // initialization of properties
        this._speed = 4;
        this._direction = Player.RIGHT;
        this._moving = false;
        this.stage = stage;

        this._sprite = assetManager.getSprite("Assets", "PlayerPH", 50, 500);

        // construct custom events
        this.eventPassedLevel = new createjs.Event("levelPassed", true, false);
        this.eventGrounded = new createjs.Event("grounded", true, false);
        this.eventPlayerDeath = new createjs.Event("playerDeath", true, false);
    }

    // ------------------------------------------------ gets/sets
    get sprite() {
        return this._sprite;
    }

    set speed(value:number) {
        this._speed = value;
    }
    get speed() {
        return this._speed;
    }

    get moving() {
        return this._moving;   
    }

    get grounded(){
        return this._grounded;
    }

    get frozen(){
        return this._frozen;
    }

    set direction(value:number) {
        this._direction = value;

        // adjusting rotation and scaleX based on direction
        if (this._direction == Player.LEFT) {
            if(this._sprite.scaleX < 0) return;
            this._sprite.scaleX = this._sprite.scaleX * -1;
        } else if (this._direction == Player.RIGHT) {
            this._sprite.scaleX = Math.abs(this._sprite.scaleX * 1);
        }
    }
    get direction() {
        return this._direction;
    }

    // --------------------------------------------------- public methods
    public startMe():void {
        this._sprite.play();
        this._moving = true;
    }

    public stopMe():void {
        this._sprite.stop();
        this._moving = false;
    }

    public positionMe(x:number, y:number):void {
        this._sprite.x = x;
        this._sprite.y = y;
    }

    public showMe():void{
        this.stage.addChild(this._sprite);
        this._frozen = false;
    }

    public hideMe():void{
        this.stopMe();
        this._frozen = true;
        this.stage.removeChild(this._sprite);
    }

    public freezeMe():void{
        this._frozen = true;
    }

    public killMe():void {
        this.stopMe();
        this._sprite.on("animationend", () => {
            this._sprite.stop();
            this.stage.removeChild(this._sprite);

            //respawn
            this.positionMe(SPAWNPOINT_X, SPAWNPOINT_Y);
            this.stage.addChild(this._sprite);
        });
        this._sprite.gotoAndPlay("PlayerPH");
    }

    public update():void {
        if (this._moving) {

            // reference sprite object for cleaner code below
            let sprite:createjs.Sprite = this._sprite;

            // get current height of sprite on this frame
            let height:number = sprite.getBounds().height;

           if (this._direction == Player.LEFT) {
                // moving left
                this._sprite.x = this._sprite.x - this._speed;
                if (this._sprite.x < -(height / 2)) {
                    this._sprite.x = STAGE_WIDTH + (height / 2)
                    sprite.dispatchEvent(this.eventPassedLevel);;
                }
            } else if (this._direction == Player.RIGHT) {
                // moving right
                this._sprite.x = this._sprite.x + this._speed;
                if (this._sprite.x > (STAGE_WIDTH + (height / 2))) {
                    this._sprite.x = -(height / 2);
                    sprite.dispatchEvent(this.eventPassedLevel);
                }
            }
        }
    }
}