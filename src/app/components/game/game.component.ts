import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import Main from './scenes/main.scene';
import Menu from './scenes/menu.scene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: "phaser-container",
    scene: [Menu, Main],
    backgroundColor: "#666",
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
    styles: ':host{position:fixed;width:100%;height:100%;background-color: black;}',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit{
    ngOnInit(){ new Phaser.Game(config); }
}
