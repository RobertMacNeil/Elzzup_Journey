import AssetManager from "./AssetManager";

export default class ScreenManager{

    private stage:createjs.StageGL;

    //screens
    private titleScreen:createjs.Sprite;
    private worldOneScreen:createjs.Sprite;
    private worldTwoScreen:createjs.Sprite;
    private victoryScreen:createjs.Sprite;
    private creditScreen:createjs.Sprite;

    //events
    private eventStartGame:createjs.Event;
    private eventResetGame:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        this.stage = stage;

        //init game screens
        this.titleScreen = assetManager.getSprite("Assets", "TitleScreen", 0, 0);
        this.worldOneScreen = assetManager.getSprite("Assets", "GameScreenBackGround1PH", 0, 0);

        // construct custom events
        this.eventStartGame = new createjs.Event("gameStart", true, false);
        this.eventResetGame = new createjs.Event("gameReset", true, false);
    }

    public showTitle():void {         
        // show the title screen
        this.hideAll();
        this.stage.addChildAt(this.titleScreen, 0);

        // detect click on the stage to remove title screen and start the game
        this.stage.on("click", (e) => {
            this.stage.dispatchEvent(this.eventStartGame);
        }, this, true);        
    }

    public showWorldOne():void {         
        // show the title screen
        this.hideAll();
        this.stage.addChildAt(this.worldOneScreen, 0);   
    }

    public showWorldTwo():void {         
        // show the title screen
        this.hideAll();
        this.stage.addChildAt(this.worldTwoScreen, 0);      
    }

    public showVictory():void {         
        // show the title screen
        this.hideAll();
        this.stage.addChildAt(this.victoryScreen, 0);

        // detect click on the stage to remove victory screen and move to credits
        this.stage.on("click", (e) => {
            this.showCredit();
        }, this, true);        
    }

    public showCredit():void {         
        // show the title screen
        this.hideAll();
        this.stage.addChildAt(this.creditScreen, 0);

        // detect click on the stage to remove credit screen and reset the game
        this.stage.on("click", (e) => {
            this.stage.dispatchEvent(this.eventResetGame);
        }, this, true);        
    }

    // --------------------------------------------------- private method
    private hideAll():void {
        this.stage.removeChild(this.titleScreen);
        this.stage.removeChild(this.worldOneScreen);
        this.stage.removeChild(this.worldTwoScreen);
        this.stage.removeChild(this.creditScreen);
        this.stage.removeChild(this.victoryScreen);
    }

}