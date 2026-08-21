export type ThemeName =
    | "neon"
    | "purple"
    | "cyan"
    | "red";

export interface Theme {
    name: ThemeName;
    label: string;
}

export const themes: Theme[] = [
    {
        name: "neon",
        label: "Neon Pink",
    },
    {
        name: "purple",
        label: "Electric Purple",
    },
    {
        name: "cyan",
        label: "Cyber Cyan",
    },
    {
        name: "red",
        label: "Crimson",
    },
];