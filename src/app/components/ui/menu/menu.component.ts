import { ChangeDetectionStrategy, Component } from '@angular/core';
import { eventBus, EventList } from '../../../shared/eventBus';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
}
