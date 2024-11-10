import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { eventBus, EventList } from '../../shared/eventBus';
import { MenuComponent } from "./menu/menu.component";

@Component({
    selector: 'app-ui',
    standalone: true,
    imports: [NgStyle, MenuComponent],
    templateUrl: './ui.component.html',
    styleUrl: './ui.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiComponent {

    isLandscape = signal(true);
    fps   = signal(0);
    pad   = signal<Phaser.Input.Gamepad.Gamepad | null>(null);
    scene = signal<"menu"|"main">("menu");

    constructor(){
        this.resize();
        window.addEventListener("resize", () => this.resize())
        eventBus.on(EventList.UpdateFPS,    this.fps.set);
        eventBus.on(EventList.PadConnected, this.pad.set);
        eventBus.on(EventList.ChangeScene,  this.scene.set);
    }

    resize(){
        const ratio = window.innerWidth / window.innerHeight;
        if(ratio > (16 / 9) !== this.isLandscape()){
            this.isLandscape.update(value => !value);
        }
    }
}
