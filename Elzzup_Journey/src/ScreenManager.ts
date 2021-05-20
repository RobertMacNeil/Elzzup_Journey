import AssetManager from "./AssetManager";

export default class ScreenManager{

    public static TITLE_SCREEN:number = 1;
    public static CREDIT_SCREEN:number = 2;
    public static VICTORY_SCREEN:number = 3;
    public static WORLD_ONE_SCREEN:number = 4;
    public static WORLD_TWO_SCREEN:number = 5;

    private stage:createjs.StageGL;

    private screen:createjs.Sprite;

    private titleScreen:createjs.Container;
    private startButton:createjs.Sprite;
    private creditScreen:createjs.Container;
    private victoryScreen:createjs.Container;
    private worldOneScreen:createjs.Sprite;
    private worldTwoScreen:createjs.Sprite;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        this.stage = stage;

        this.titleScreen = new createjs.Container;
        this.titleScreen.addChild(assetManager.getSprite("Assets", "TitleScreen", 0, 0));

        this.startButton = assetManager.getSprite("Assets", "PlayButtonPH", 300, 450);
        
        this.titleScreen.addChild(this.startButton);

        this.stage.addChild(this.titleScreen);

        this.creditScreen = new createjs.Container;
        this.victoryScreen = new createjs.Container;
    }

}