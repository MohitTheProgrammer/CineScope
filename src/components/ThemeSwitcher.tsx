import { useTheme } from "../context/ThemeContext";
import {
    themes,
    type ThemeName,
} from "../themes/themes";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {themes.map((item) => {
                const isActive = theme === item.name;

                const themeColor =
                    item.name === "neon"
                        ? "#ff2da6"
                        : item.name === "purple"
                            ? "#a855f7"
                            : item.name === "cyan"
                                ? "#00e5ff"
                                : "#ff3b3b";

                return (
                    <button
                        key={item.name}
                        type="button"
                        aria-label={`Switch to ${item.label}`}
                        title={item.label}
                        onClick={() =>
                            setTheme(item.name as ThemeName)
                        }
                        className={`
                            group relative flex min-h-24
                            flex-col items-center justify-center
                            rounded-xl border
                            transition-all duration-300
                            ${
                                isActive
                                    ? "border-white/25 bg-white/10"
                                    : "border-white/8 bg-white/2 hover:border-white/15 hover:bg-white/6"
                            }
                        `}
                    >
                        <span
                            className={`
                                size-8 rounded-full
                                transition-all duration-300
                                ${isActive
                                    ? "scale-110"
                                    : "group-hover:scale-110"
                                }
                            `}
                            style={{
                                backgroundColor: themeColor,
                                boxShadow: isActive
                                    ? `0 0 24px ${themeColor}70`
                                    : `0 0 12px ${themeColor}20`,
                            }}
                        />

                        <span
                            className={`
                                mt-3 text-[9px] font-bold uppercase
                                tracking-[0.15em]
                                ${
                                    isActive
                                        ? "text-white"
                                        : "text-white/35 group-hover:text-white/70"
                                }
                            `}
                        >
                            {item.label}
                        </span>

                        {isActive && (
                            <span
                                className="absolute right-2 top-2 size-1.5 rounded-full"
                                style={{
                                    backgroundColor: themeColor,
                                    boxShadow: `0 0 8px ${themeColor}`,
                                }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default ThemeSwitcher;