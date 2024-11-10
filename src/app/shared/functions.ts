import { SceneWithPad } from "../interfaces/phaser-extensions";
import { eventBus, EventList } from "./eventBus";

export function updateFPS(scene: Phaser.Scene & {fps: number} ){
    scene.time.addEvent({
        delay: 500,
        repeat: -1,
        callback: () => {
            eventBus.emit(EventList.UpdateFPS, scene.fps * 2);
            scene.fps = 0;
        }
    });
}

export function lookForGamepad(scene: SceneWithPad){
    scene.input.gamepad?.once("connected", (pad: Phaser.Input.Gamepad.Gamepad) => {
        eventBus.emit(EventList.PadConnected, pad);
        scene.pad = pad;
    })
}