
export type Language = "es" | "en";

export interface Config{
    sound: number;
    music: number;
    language: Language;
    newKey: number;
}
export const defaultConfig: Config = {
    sound: .8,
    music: .8,
    language: "en",
    newKey: 1
}