// game constants
export const STAGE_WIDTH:number = 600;
export const STAGE_HEIGHT:number = 600;
export const FRAME_RATE:number = 30;

export const SPAWNPOINT_X:number = 30;
export const SPAWNPOINT_Y:number = 468;

export const ASSET_MANIFEST:Object[] = [
    {
        type:"json",
        src:"./lib/spritesheets/Assets.json",
        id:"Assets",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/Assets.png",
        id:"Assets",
        data:0
    },
    {
        type:"json",
        src:"./lib/spritesheets/Glyphs.json",
        id:"Glyphs",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/Glyphs.png",
        id:"Glyphs",
        data:0
    }/*,
    {
        type:"sound",
        src:"./lib/sounds/beep.ogg",
        id:"beep",
        data:4
    }     */
];
