import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MenuComponent } from "./menu/menu.component";
import { EventList, SCENE_KEYS } from '../../shared/enums';
import { eventBus } from '../../shared/functions';
import { MainComponent } from "./main/main.component";

@Component({
    selector: 'app-ui',
    standalone: true,
    imports: [NgStyle, MenuComponent, MainComponent],
    templateUrl: './ui.component.html',
    styleUrl: './ui.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiComponent {

    sceneKeys = SCENE_KEYS

    isLandscape = signal(true);
    fps   = signal(0);
    scene = signal(SCENE_KEYS.menu);

    constructor(){
        this.resize();
        window.addEventListener("resize", () => this.resize());

        //prevent zoom
        window.addEventListener('wheel', e => this.handleWheel(e), {passive: false});
        window.addEventListener('keydown', e => this.handleKeyDown(e));

        eventBus.on(EventList.UpdateFPS,    this.fps.set);
        eventBus.on(EventList.ChangeScene,  this.scene.set);
    }

    resize(){
        const ratio = window.innerWidth / window.innerHeight;
        if(ratio > (16 / 9) !== this.isLandscape()){
            this.isLandscape.update(value => !value);
        }
    }
    handleWheel(e: WheelEvent) {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
        }
    };
  
    handleKeyDown (e: KeyboardEvent)  {
        if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-'|| e.key==='=')) {
            e.preventDefault();
        }
    };
  
}
