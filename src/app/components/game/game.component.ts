import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import Main from './scenes/main.scene';
import Menu from './scenes/menu.scene';
import { eventBus } from '../../shared/functions';
import { EventList, SCENE_KEYS } from '../../shared/enums';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: "phaser-container",
    scene: [Menu, Main],
    backgroundColor: "#333",
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //         gravity: {
    //             x: 0, y: 300
    //         }
    //     }
    // }
    input: {
        gamepad: true
    }
}

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [],
    template: '<div id="phaser-container"></div>',
    styles: ':host{position:fixed;width:100%;height:100%; background-color: black;}',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit{
    ngOnInit(){ 
        const game = new Phaser.Game(config); 
        eventBus.on(EventList.ChangeScene, (scene: SCENE_KEYS) => {
            game.scene.getScenes(true)[0].scene.stop();
            game.scene.start(scene);
        })
    }
}
