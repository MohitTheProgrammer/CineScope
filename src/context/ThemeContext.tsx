/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { ThemeName } from "../themes/themes";

interface ThemeContextValue {
    theme: ThemeName;
    setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<
    ThemeContextValue | undefined
>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({
    children,
}: ThemeProviderProps) => {
    const [theme, setThemeState] = useState<ThemeName>(() => {
        const savedTheme = localStorage.getItem("cinescope-theme");
        return savedTheme === "purple" || savedTheme === "cyan" || savedTheme === "red"
            ? savedTheme
            : "neon";
    });

    const setTheme = (newTheme: ThemeName) => {
        setThemeState(newTheme);
        localStorage.setItem("cinescope-theme", newTheme);
    };

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useTheme must be used inside ThemeProvider"
        );
    }

    return context;
};
