import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieSearch = () => {
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const handleSearch = () => {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) return;

        navigate(
            `/search?query=${encodeURIComponent(trimmedQuery)}`
        );
        setQuery("")
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div
            className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-4
                py-2
                backdrop-blur-xl
                transition-all
                duration-300
                focus-within:border-(--accent-primary)
                focus-within:shadow-[0_0_20px_var(--accent-glow)]
            "
        >
            <SearchIcon />

            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search movies..."
                className="
                    w-28
                    bg-transparent
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/40
                    sm:w-40
                "
            />
        </div>
    );
};

const SearchIcon = () => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 shrink-0 text-white/50"
            aria-hidden="true"
        >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
        </svg>
    );
};

export default MovieSearch;