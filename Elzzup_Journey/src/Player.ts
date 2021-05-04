import AssetManager from "./AssetManager";

export default class Player{

//Custom events for dispatching

//Private variables
private _sprite:createjs.Sprite;

constructor(stage:createjs.StageGL, assetManager:AssetManager) {

this._sprite = assetManager.getSprite("Assets", "PlayerPH", 300, 300);
stage.addChild(this._sprite);

}

}