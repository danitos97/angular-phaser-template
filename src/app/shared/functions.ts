import { SceneWithPad } from "../interfaces/phaser-extensions";
import { Events } from 'phaser';
import { EventList } from "./enums";

export const eventBus = new Events.EventEmitter();

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