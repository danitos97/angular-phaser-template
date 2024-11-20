import { SceneWithMusic, SceneWithPad } from "../interfaces/phaser-extensions";
import { Events } from 'phaser';
import { EventList } from "./enums";
import { Signal } from "@angular/core";
import { Config } from "../interfaces/config";

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

export function setGamePad(scene: SceneWithPad){
    scene.input.gamepad?.once("connected", (pad: Phaser.Input.Gamepad.Gamepad) => {
        eventBus.emit(EventList.PadConnected, pad);
        scene.pad = pad;
    })
}

export function setVolume(scene: Phaser.Scene | SceneWithMusic){
    const config = getConfig();
    function set(config: Config){
        scene.sound.setVolume(config.sound);
        if("music" in scene){
            scene.music.setVolume(config.music);
        }
    }
    if(config) set(config);
    
    eventBus.on(EventList.ConfigChange, set);
}


export function signalCopy<T>(signal: Signal<T>): T {
    return JSON.parse(JSON.stringify(signal()));
}

const localKey = "config";

export function getConfig(){
    const local = localStorage.getItem(localKey);
    if(local){
        const config: Config = JSON.parse(local);
        return config;
    }
    return null;

}
export function saveConfig(config: Config){
    localStorage.setItem(localKey, JSON.stringify(config));
    eventBus.emit(EventList.ConfigChange, config);
}