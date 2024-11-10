import { Component, signal } from '@angular/core';
import { GameComponent } from "./components/game/game.component";
import { UiComponent } from "./components/ui/ui.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [GameComponent, UiComponent],
    template: `
        <app-game></app-game>
        <app-ui></app-ui>
    `
})
export class AppComponent {
    public scene = signal<Phaser.Scene | undefined>(undefined);
}
