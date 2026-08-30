import type { Movie } from "../../types/movie";

interface MovieHeroProps {
    movie: Movie;
}

const IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p";

const MovieHero = ({
    movie,
}: MovieHeroProps) => {
    const year = movie.release_date
        ? new Date(
            movie.release_date
        ).getFullYear()
        : null;

    return (
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8">
            <div
                className="
                    grid
                    gap-8
                    lg:grid-cols-[280px_1fr]
                    lg:gap-12
                "
            >
                {/* Poster */}

                <div
                    className="
                        mx-auto
                        w-full
                        max-w-70
                        lg:mx-0
                    "
                >
                    <div
                        className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                        "
                    >
                        {movie.poster_path ? (
                            <img
                                src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="
                                    aspect-2/3
                                    w-full
                                    object-cover
                                "
                            />
                        ) : (
                            <div
                                className="
                                    flex
                                    aspect-2/3
                                    items-center
                                    justify-center
                                    text-sm
                                    text-white/30
                                "
                            >
                                No poster
                            </div>
                        )}
                    </div>
                </div>

                {/* Information */}

                <div className="flex flex-col justify-center">

                    {/* Genres */}

                    <div className="mb-4 flex flex-wrap gap-2">
                        {movie.genres?.map((genre) => (
                            <span
                                key={genre.id}
                                className="
            rounded-full
            border
            border-white/10
            bg-white/5
            px-3
            py-1
            text-xs
            font-semibold
            text-white/60
        "
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    {/* Title */}

                    <h1
                        className="
                            text-4xl
                            font-black
                            tracking-tight
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >
                        {movie.title}
                    </h1>

                    {/* Metadata */}

                    <div
                        className="
                            mt-5
                            flex
                            flex-wrap
                            items-center
                            gap-4
                            text-sm
                            text-white/50
                        "
                    >
                        {year && (
                            <span>
                                {year}
                            </span>
                        )}

                        <Dot />

                        <span className="flex items-center gap-1.5">
                            <StarIcon />

                            <strong className="text-white">
                                {movie.vote_average.toFixed(
                                    1
                                )}
                            </strong>

                            <span>/ 10</span>
                        </span>

                        {movie.vote_count && (
                            <>
                                <Dot />

                                <span>
                                    {movie.vote_count.toLocaleString()}{" "}
                                    votes
                                </span>

                                {movie.adult && (
                                    <>
                                        <Dot />

                                        <span
                                            className="
                                                rounded-md
                                                border
                                                border-red-500/30
                                                bg-red-500/10
                                                px-2
                                                py-1
                                                text-xs
                                                font-bold
                                                text-red-400
                                            "
                                        >
                                            18+
                                        </span>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {/* Synopsis */}

                    <div className="mt-8">

                        <h2
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-(--accent-primary)
                            "
                        >
                            Synopsis
                        </h2>

                        <p
                            className="
                                mt-3
                                max-w-3xl
                                text-sm
                                leading-7
                                text-white/60
                                sm:text-base
                            "
                        >
                            {movie.overview ||
                                "No synopsis available."}
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
};

const StarIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4 text-(--accent-secondary)"
    >
        <path d="m12 3 2.78 5.63 6.22.9-4.5 4.38 1.06 6.2L12 17.18 6.44 20.1l1.06-6.2L3 9.53l6.22-.9L12 3Z" />
    </svg>
);

const Dot = () => (
    <span className="size-1 rounded-full bg-white/20" />
);

export default MovieHero;