import { Injectable, signal } from '@angular/core';
import { Config, defaultConfig } from '../interfaces/config';
import { saveConfig } from '../shared/functions';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private config = signal(defaultConfig);
    private key = "config";

    constructor(){
        const local = localStorage.getItem(this.key);
        if(local){
            const config: Config = JSON.parse(local);
            
            this.set({
                sound: config.sound ?? defaultConfig.sound,
                music: config.music ?? defaultConfig.music,
                language: config.language ?? defaultConfig.language,
                newKey: config.newKey ?? defaultConfig.newKey
            });
        }
    }
    get(){
        return this.config.asReadonly();
    }

    set(config: Config) {
        this.config.set(config);
        saveConfig(config);
    }

}
