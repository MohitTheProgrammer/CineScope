export interface Theme {
    name: string;

    label: string;

    color: string;
}


export const themes: Theme[] = [
    {
        name: "neon",
        label: "Neon",
        color: "#ff2da6",
    },

    {
        name: "purple",
        label: "Purple",
        color: "#a855f7",
    },

    {
        name: "cyan",
        label: "Cyan",
        color: "#00e5ff",
    },

    {
        name: "red",
        label: "Red",
        color: "#ff3b3b",
    },

    {
        name: "green",
        label: "Green",
        color: "#10b981",
    },

    {
        name: "orange",
        label: "Orange",
        color: "#f59e0b",
    },

    {
        name: "rose",
        label: "Rose",
        color: "#f43f5e",
    },

    {
        name: "blue",
        label: "Blue",
        color: "#3b82f6",
    },
];


export type ThemeName =
    (typeof themes)[number]["name"];