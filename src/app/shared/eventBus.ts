import { Events } from 'phaser';
export const eventBus = new Events.EventEmitter();

export enum EventList {
    UpdateFPS = "UpdateFPS",
    PadConnected = "PadConnected",
    ChangeScene = "ChangeScene"
}