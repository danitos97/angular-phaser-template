export interface SceneWithPad extends Phaser.Scene {
    pad?: Phaser.Input.Gamepad.Gamepad
};

export type SoundManager = Phaser.Sound.HTML5AudioSoundManager | Phaser.Sound.WebAudioSoundManager | Phaser.Sound.NoAudioSoundManager;

export interface SceneWithMusic extends Phaser.Scene {
    music: SoundManager
}
export interface SFX  {
    [key: string]: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
}
