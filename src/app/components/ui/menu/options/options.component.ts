import { ChangeDetectionStrategy, Component, computed, effect, inject, model } from '@angular/core';
import { ConfigService } from '../../../../services/config.service';
import { strings } from '../../strings';
import { signalCopy } from '../../../../shared/functions';
import { Language } from '../../../../interfaces/config';

@Component({
    selector: 'app-options',
    standalone: true,
    imports: [],
    templateUrl: './options.component.html',
    styleUrl: './options.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsComponent {
    
    private configService = inject(ConfigService);
    public config  = this.configService.get();
    public sound   = computed(() => this.config().sound * 100);
    public music   = computed(() => this.config().music * 100);
    public lang    = computed(() => this.config().language);
    public strings = computed(() => strings[this.config().language])
    public visible = model.required<boolean>();
    
    constructor()
{
    effect(()=>{
        console.log(this.visible());
    })
}
    changeSound(sound: string){
        const config = signalCopy(this.config);
        config.sound = parseInt(sound) / 100;
        this.configService.set(config);
    }

    changeMusic(music: string){
        const config = signalCopy(this.config);
        config.music = parseInt(music) / 100;
        this.configService.set(config);
    }

    changeLang(lang: string){
        const config = signalCopy(this.config);
        config.language = lang as Language;
        this.configService.set(config);
    }
}


