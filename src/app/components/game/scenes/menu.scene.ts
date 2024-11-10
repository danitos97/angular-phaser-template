import { lookForGamepad, updateFPS } from "../../../shared/functions";

export default class Menu extends Phaser.Scene{

    public fps = 0;

    public pad?: Phaser.Input.Gamepad.Gamepad;

    constructor(){
        super("menu");
    }

    create(){
        updateFPS(this);
        lookForGamepad(this);
    }
    override update(): void {
        ++this.fps;
    }

   
}