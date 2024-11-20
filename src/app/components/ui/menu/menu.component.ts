import { 
    ChangeDetectionStrategy, Component, computed, ElementRef, inject, model, signal, viewChildren 
} from '@angular/core';
import { eventBus } from '../../../shared/functions';
import { EventList, SCENE_KEYS } from '../../../shared/enums';
import { NgClass } from '@angular/common';
import { strings } from '../strings';
import { ConfigService } from '../../../services/config.service';
import { OptionsComponent } from "./options/options.component";

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [NgClass, OptionsComponent],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

    public index = signal(-1);
    private configService = inject(ConfigService);
    private config  = this.configService.get();
    public strings  = computed(() => strings[this.config().language]);
    private buttons = viewChildren<ElementRef>("button");
    private options = computed(() => this.buttons().length);
    public optionsVisible = signal(false);

    constructor(){
        eventBus.on(EventList.MenuIndexIncrease, () => this.index.update(i => (i + 1) % this.options()));
        eventBus.on(EventList.MenuIndexReduce,   () => this.index.update(i => i>0? i - 1 : this.options() - 1));
        eventBus.on(EventList.MenuSelect,        () => this.buttons()[this.index()].nativeElement.click());
    }
    changeScene(){
        eventBus.emit(EventList.ChangeScene, SCENE_KEYS.main);
    }
    openOptions(){
        this.optionsVisible.set(true);
    }

}
