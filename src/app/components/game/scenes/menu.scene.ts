import { SFX, SoundManager } from "../../../interfaces/phaser-extensions";
import { EventList, SCENE_KEYS, SFX_KEYS } from "../../../shared/enums";
import { eventBus, setGamePad, setVolume } from "../../../shared/functions";


export default class Menu extends Phaser.Scene{


    public pad?: Phaser.Input.Gamepad.Gamepad;
    public soundVolume = 1;
    public musicVolume = 1;

    private music!: SoundManager;

    private inputDelay = 200;
    private downTime = 0;
    private upTime = 0;
    private enterTime = 0;

    private sfx: SFX = {};
    private keys!: Phaser.Types.Input.Keyboard.CursorKeys & {
        enter: Phaser.Input.Keyboard.Key
    };

    public song!: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

    constructor(){
        super(SCENE_KEYS.menu);
    }

    preload(){
        this.load.audio(SFX_KEYS.ui_move, "sounds/rollover2.ogg");
        this.load.audio(SFX_KEYS.song, "sounds/song.mp3");
    }

    create(){
        // @ts-ignore
        this.music =  Phaser.Sound.SoundManagerCreator.create(this.game);

        setGamePad(this);    
        setVolume(this);

        this.song = this.music.add(SFX_KEYS.song, {volume: 1});
        
        this.music.on('unlocked', () => {
            this.song.play({seek: 4});
        });
        this.keys = {
            ...this.input.keyboard!.createCursorKeys(),
            enter: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        }
            
        this.sfx[SFX_KEYS.ui_move] = this.sound.add(SFX_KEYS.ui_move, {volume: .6}); 
    }
   
    override update(time: number): void {
        let downPress = this.keys.down.isDown;
        const canDown = time - this.downTime > this.inputDelay;
        let yAxis = 0;
        if(this.pad){
            yAxis = this.pad.axes[1].getValue();
            downPress = downPress || yAxis > 0.5 || this.pad.down;
        }
        
        if(downPress && canDown){
            this.downTime = time;
            this.move(EventList.MenuIndexIncrease);
        }

        const canUp =  time - this.upTime > this.inputDelay
        let upPress = this.keys.up.isDown;
        if(this.pad){
            upPress = upPress || yAxis  < -0.5 || this.pad.up;
        }
        if(upPress && canUp){
            this.upTime = time;
            this.move(EventList.MenuIndexReduce);
        }

        const canEnter = time - this.enterTime > this.inputDelay;
        let enterPress = this.keys.space.isDown || this.keys.enter.isDown;
        if(this.pad){
            enterPress = enterPress || this.pad.buttons[0].pressed;
        }
        if(enterPress && canEnter){
            this.enterTime = time;
            this.select();
        }
    }

    move(event: EventList){
        eventBus.emit(event);
        this.sfx[SFX_KEYS.ui_move].play();
    }

    select(){
        eventBus.emit(EventList.MenuSelect);
        this.sfx[SFX_KEYS.ui_move].play();
    }

}