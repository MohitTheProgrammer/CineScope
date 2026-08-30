import {
    ArrowRightIcon,
    FilmIcon,
    SparklesIcon,
    TargetIcon,
} from "../../assets/icons/Icons";

import type { RecommendedMovie } from "../../hooks/recommendation/useRecommendations";

interface MovieRevealCardProps {
    movie: RecommendedMovie;
    rank: number;
    label: string;
    featured?: boolean;
    onClick: () => void;
}

const TMDB_IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/";

const MovieRevealCard = ({
    movie,
    rank,
    label,
    featured = false,
    onClick,
}: MovieRevealCardProps) => {
    const posterUrl = movie.poster_path
        ? TMDB_IMAGE_BASE_URL +
          (featured ? "original" : "w780") +
          movie.poster_path
        : null;

    const backdropUrl = movie.backdrop_path
        ? TMDB_IMAGE_BASE_URL +
          "original" +
          movie.backdrop_path
        : posterUrl;

    return (
        <article
            onClick={onClick}
            className={`
                group
                relative
                cursor-pointer
                overflow-hidden
                rounded-4xl
                border
                border-white/10
                bg-white/[0.035]
                transition-all
                duration-700
                hover:-translate-y-2
                hover:border-(--accent-primary)/35
                hover:shadow-[0_30px_100px_var(--accent-glow)]
                animate-[recommendationReveal_800ms_ease-out_both]
                ${featured ? "min-h-130" : "min-h-105"}
            `}
        >
            {backdropUrl && (
                <img
                    src={backdropUrl}
                    alt=""
                    aria-hidden="true"
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        scale-110
                        object-cover
                        opacity-10
                        blur-2xl
                        transition-all
                        duration-1000
                        group-hover:scale-105
                        group-hover:opacity-20
                    "
                />
            )}

            <div
                className="
                    absolute
                    inset-0
                    bg-linear-to-br
                    from-(--accent-primary)/8
                    via-transparent
                    to-black
                "
            />

            <div
                className="
                    relative
                    grid
                    h-full
                    gap-8
                    p-5
                    sm:p-7
                    lg:grid-cols-[minmax(0,0.9fr)_1.1fr]
                    lg:items-center
                    lg:p-8
                "
            >
                {/* Poster */}

                <div
                    className={`
                        relative
                        mx-auto
                        w-full
                        max-w-sm
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/30
                        shadow-2xl
                        ${featured ? "lg:max-w-md" : ""}
                    `}
                >
                    <div className="aspect-2/3">
                        {posterUrl ? (
                            <img
                                src={posterUrl}
                                alt={movie.title}
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-1000
                                    group-hover:scale-105
                                "
                            />
                        ) : (
                            <div
                                className="
                                    flex
                                    h-full
                                    items-center
                                    justify-center
                                    bg-white/5
                                "
                            >
                                <FilmIcon className="size-12 text-white/20" />
                            </div>
                        )}
                    </div>

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-10
                            left-1/2
                            size-32
                            -translate-x-1/2
                            rounded-full
                            bg-(--accent-primary)/20
                            opacity-0
                            blur-3xl
                            transition-opacity
                            duration-700
                            group-hover:opacity-100
                        "
                    />
                </div>

                {/* Information */}

                <div className="flex min-w-0 flex-col justify-center">
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                flex
                                size-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-(--accent-primary)/25
                                bg-(--accent-primary)/10
                                text-(--accent-primary)
                            "
                        >
                            {rank === 1 ? (
                                <SparklesIcon className="size-5" />
                            ) : (
                                <span className="text-sm font-black">
                                    {rank}
                                </span>
                            )}
                        </div>

                        <div>
                            <p
                                className="
                                    text-[10px]
                                    font-black
                                    uppercase
                                    tracking-[0.3em]
                                    text-(--accent-primary)
                                "
                            >
                                {label}
                            </p>

                            <p className="mt-0.5 text-[10px] text-white/25">
                                Handpicked by your Movie DNA
                            </p>
                        </div>
                    </div>

                    <h3
                        className={`
                            mt-7
                            font-black
                            leading-[0.95]
                            tracking-[-0.04em]
                            ${
                                featured
                                    ? "text-4xl sm:text-5xl lg:text-6xl"
                                    : "text-3xl sm:text-4xl"
                            }
                        `}
                    >
                        {movie.title}
                    </h3>

                    {movie.vote_average !== undefined && (
                        <div className="mt-5 flex items-center gap-3">
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-(--accent-primary)/20
                                    bg-(--accent-primary)/10
                                    px-3
                                    py-1.5
                                "
                            >
                                <span className="text-sm font-black text-(--accent-primary)">
                                    ★
                                </span>

                                <span className="text-xs font-black text-white">
                                    {movie.vote_average.toFixed(1)}
                                </span>
                            </div>

                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/25">
                                TMDB rating
                            </span>
                        </div>
                    )}

                    <div
                        className="
                            mt-7
                            flex
                            items-start
                            gap-3
                            rounded-2xl
                            border
                            border-white/10
                            bg-black/20
                            p-4
                        "
                    >
                        <TargetIcon
                            className="
                                mt-0.5
                                size-4
                                shrink-0
                                text-(--accent-primary)
                            "
                        />

                        <div>
                            <p className="text-xs font-bold text-white/70">
                                Why this one?
                            </p>

                            <p className="mt-1 text-xs leading-5 text-white/30">
                                Its genres align with the patterns
                                CineScope found in your taste.
                            </p>
                        </div>
                    </div>

                    <div
                        className="
                            mt-7
                            flex
                            items-center
                            gap-3
                            text-xs
                            font-black
                            uppercase
                            tracking-[0.15em]
                            text-(--accent-primary)
                        "
                    >
                        <span>Explore movie</span>

                        <ArrowRightIcon
                            className="
                                size-4
                                transition-transform
                                duration-300
                                group-hover:translate-x-2
                            "
                        />
                    </div>
                </div>
            </div>

            <div
                className="
                    pointer-events-none
                    absolute
                    right-5
                    top-5
                    size-16
                    rounded-full
                    border
                    border-(--accent-primary)/10
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                "
            />
        </article>
    );
};

export default MovieRevealCard;