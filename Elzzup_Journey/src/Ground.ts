import AssetManager from "./AssetManager";

export default class Ground{

    private _sprite:createjs.Sprite;
    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        this.stage = stage;
        this._sprite = assetManager.getSprite("Assets", "GroundPH");
    }

    public placeMe(x:number = 300, y:number = 300, xScale:number = 1, yScale:number = 1):void{
        this._sprite.x = x;
        this._sprite.y = y;
        this._sprite.scaleX = xScale;
        this._sprite.scaleY = yScale;
        this.stage.addChild(this._sprite);
    }

}