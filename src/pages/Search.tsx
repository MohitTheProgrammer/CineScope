import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";
import { searchMovies } from "../services/tmdb";
import SearchSkeleton from "../components/SearchSkeleton";

const Search = () => {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("query")?.trim() ?? "";

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [retryKey, setRetryKey] = useState(0);

    useEffect(() => {
        if (!query) {
            return;
        }

        let active = true;
        const loadSearchResults = async () => {
            try {
                setLoading(true);
                setError(null);

                const results = await searchMovies(query);

                if (active) setMovies(results);
            } catch (error) {
                console.error("Failed to search movies:", error);

                if (active) setError(
                    "Something went wrong while searching for movies."
                );
            } finally {
                if (active) setLoading(false);
            }
        };

        loadSearchResults();
        return () => { active = false; };
    }, [query, retryKey]);

    return (
        <main
            className="
                min-h-screen
                bg-(--bg-primary)
                px-6
                pb-20
                pt-32
                lg:px-8
            "
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <SearchHeader query={query} />

                {/* Loading */}
                {loading && <SearchSkeleton />}

                {/* Error */}
                {!loading && error && (
                    <SearchError message={error} onRetry={() => setRetryKey((key) => key + 1)} />
                )}

                {/* Results */}
                {!loading && !error && movies.length > 0 && (
                    <MovieResults movies={movies} />
                )}

                {/* No results */}
                {!loading &&
                    !error &&
                    query &&
                    movies.length === 0 && (
                        <EmptySearch query={query} />
                    )}

            </div>
        </main>
    );
};

export default Search;

interface SearchHeaderProps {
    query: string;
}

const SearchHeader = ({ query }: SearchHeaderProps) => {
    return (
        <div className="mb-10">

            <div className="mb-3 flex items-center gap-2">
                <span
                    className="
                        size-1.5
                        rounded-full
                        bg-(--accent-primary)
                        shadow-[0_0_10px_var(--accent-primary)]
                    "
                />

                <span
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-(--accent-primary)
                    "
                >
                    Search
                </span>
            </div>

            <h1
                className="
                    text-3xl
                    font-black
                    tracking-tight
                    text-white
                    sm:text-4xl
                "
            >
                Results for{" "}
                <span className="text-(--accent-primary)">
                    "{query}"
                </span>
            </h1>

            <p className="mt-2 text-sm text-white/40">
                Discover movies matching your search.
            </p>
        </div>
    );
};

interface SearchErrorProps {
    message: string;
    onRetry: () => void;
}

const SearchError = ({ message, onRetry }: SearchErrorProps) => {
    return (
        <div
            className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-10
                text-center
            "
        >
            <p className="text-sm text-white/50">
                {message}
            </p>
            <button type="button" onClick={onRetry} className="mt-4 font-bold text-(--accent-primary) hover:underline">
                Try again
            </button>
        </div>
    );
};

interface MovieResultsProps {
    movies: Movie[];
}

const MovieResults = ({ movies }: MovieResultsProps) => {
    return (
        <div
            className="
                grid
                grid-cols-2
                gap-x-5
                gap-y-10
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
            "
        >
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    {...movie}
                    orientation="vertical"
                />
            ))}
        </div>
    );
};

interface EmptySearchProps {
    query: string;
}

const EmptySearch = ({ query }: EmptySearchProps) => {
    return (
        <div className="py-20 text-center">

            <div
                className="
                    mx-auto
                    mb-5
                    flex
                    size-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    text-white/30
                "
            >
                <SearchIcon />
            </div>

            <h2 className="text-lg font-bold text-white">
                No movies found
            </h2>

            <p className="mt-2 text-sm text-white/40">
                We couldn't find anything matching "{query}".
            </p>
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
            className="size-4.5"
            aria-hidden="true"
        >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
        </svg>
    );
};
