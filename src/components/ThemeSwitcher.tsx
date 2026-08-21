import { useTheme } from "../context/ThemeContext";
import {
    themes,
    type ThemeName,
} from "../themes/themes";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center gap-2">
            {themes.map((item) => (
                <button
                    key={item.name}
                    type="button"
                    aria-label={`Switch to ${item.label}`}
                    title={item.label}
                    onClick={() =>
                        setTheme(item.name as ThemeName)
                    }
                    className={`
            size-6
            rounded-full
            border-2
            transition-all
            duration-300

            ${theme === item.name
                            ? "scale-125 border-white"
                            : "border-white/20 opacity-60 hover:scale-110 hover:opacity-100"
                        }
          `}
                    style={{
                        backgroundColor:
                            item.name === "neon"
                                ? "#ff2da6"
                                : item.name === "purple"
                                    ? "#a855f7"
                                    : item.name === "cyan"
                                        ? "#00e5ff"
                                        : "#ff3b3b",
                    }}
                />
            ))}
        </div>
    );
};

export default ThemeSwitcher;