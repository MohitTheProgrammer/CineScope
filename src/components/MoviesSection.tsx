import { useNavigate } from "react-router-dom";
import { ArrowIcon } from "../assets/icons/Icons";
import { type Movie } from "../types/movie";
import MovieCard from "./MovieCard";
import MovieSkeletons from "./MovieSkeletons";


interface MoviesSectionProps {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    title: string,
    subtitle:string,
    redirectLink: string
}

const MoviesSection = ({
    movies,
    loading,
    error,
    title,
    redirectLink,
    subtitle
}: MoviesSectionProps) => {
    const navigate = useNavigate();
    const handleClickViewAll = () => {
        navigate(redirectLink)
    }
    return (
        <section
            id="trending"
            className="
                mx-auto
                max-w-7xl
                px-6
                py-4
                lg:px-8
            "
        >
            {/* Heading */}
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2">
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
                            {subtitle}
                        </span>
                    </div>

                    <h2
                        className="
                            text-3xl
                            font-black
                            tracking-tight
                            text-white
                            sm:text-4xl
                            capitalize
                        "
                    >
                        {title}
                    </h2>
                </div>

                <button
                    type="button"
                    className="
                        hidden
                        items-center
                        gap-2
                        text-xs
                        font-semibold
                        text-white/50
                        transition-colors
                        hover:text-(--accent-primary)
                        sm:flex
                    "
                    onClick={handleClickViewAll}
                >
                    View all
                    <ArrowIcon />
                </button>
            </div>

            {/* Loading */}
            {loading && <MovieSkeletons />}

            {/* Error */}
            {!loading && error && (
                <div
                    className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/5
                        p-8
                        text-center
                    "
                >
                    <p className="text-sm text-white/60">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="
                            mt-4
                            text-sm
                            font-semibold
                            text-(--accent-primary)
                            hover:underline
                        "
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Movies */}
            {!loading && !error && movies.length > 0 && (
                <div
                    className="
        flex
        gap-5
        overflow-x-auto
        pb-6
        scrollbar-none
        [&::-webkit-scrollbar]:hidden
    "
                >
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            {...movie}
                            orientation="horizontal"
                        />
                    ))}
                </div>
            )}

            {/* Empty */}
            {!loading && !error && movies.length === 0 && (
                <p className="py-10 text-center text-white/50">
                    No movies found.
                </p>
            )}
        </section>
    );
};

export default MoviesSection