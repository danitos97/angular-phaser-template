import { SCENE_KEYS } from "../../../shared/enums";
import { setGamePad, updateFPS } from "../../../shared/functions";

export default class Main extends Phaser.Scene{

    fps = 0;

    constructor(){
        super(SCENE_KEYS.main);
    }

    create(){
        updateFPS(this);
        setGamePad(this);
    }

    override update(){
       ++this.fps;
    }
   
}