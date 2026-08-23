import type { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";
import { addLikedMovie } from "../services/movie";

const IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/w500";

const GENRE_MAP: Record<number, string> = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
};

interface MovieCardProps extends Movie {
    orientation: "vertical" | "horizontal";
}

const MovieCard = (movie: MovieCardProps) => {
    const navigate = useNavigate();
    const { user } = useUser();

    const {
        id,
        title,
        poster_path,
        release_date,
        vote_average,
        genre_ids = [],
        orientation,
    } = movie;

    const year = release_date
        ? new Date(release_date).getFullYear()
        : null;

    const posterUrl = poster_path
        ? `${IMAGE_BASE_URL}${poster_path}`
        : "/placeholder-movie.jpg";

    const genres = genre_ids
        .map((genreId) => GENRE_MAP[genreId])
        .filter(Boolean);

    const handleMovieClick = () => {
        if (!id) return;

        navigate(`/movie/${id}`);
    };

    const handleLike = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();

        if (!user) {
            navigate("/login");
            return;
        }

        if (!id) return;

        try {
            const likedMovie = {
                id,
                title,
                poster_path,
                vote_average,
            };

            console.log(likedMovie);

            await addLikedMovie(
                user.uid,
                likedMovie
            );
        } catch (error) {
            console.error(
                "Failed to add movie:",
                error
            );
        }
    };

    return (
        <article
            data-movie-id={id}
            onClick={handleMovieClick}
            className={
                orientation === "vertical"
                    ? "group relative w-full min-w-0 cursor-pointer"
                    : "group relative w-44 shrink-0 cursor-pointer sm:w-48 lg:w-52"
            }
        >
            {/* Poster */}

            <div
                className="
                    relative
                    aspect-2/3
                    overflow-hidden
                    rounded-2xl
                    border border-white/10
                    bg-white/5
                    shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                    transition-all
                    duration-500
                    ease-out
                    group-hover:-translate-y-2
                    group-hover:border-(--accent-primary)
                    group-hover:shadow-[0_15px_45px_var(--accent-glow)]
                "
            >
                {/* Image */}

                {poster_path ? (
                    <img
                        src={posterUrl}
                        alt={title || "Movie poster"}
                        loading="lazy"
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            ease-out
                            group-hover:scale-110
                        "
                    />
                ) : (
                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            bg-white/5
                            text-xs
                            text-white/30
                        "
                    >
                        No poster
                    </div>
                )}

                {/* Bottom gradient */}

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-2/3
                        bg-linear-to-t
                        from-black/95
                        via-black/30
                        to-transparent
                        opacity-90
                    "
                />

                {/* Hover overlay */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-black/20
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                    "
                />

                {/* Rating */}

                {vote_average > 0 && (
                    <Rating value={vote_average} />
                )}

                {/* Add button */}

                {id && (
                    <button
                        type="button"
                        aria-label={
                            title
                                ? `Add ${title} to my list`
                                : "Add movie to my list"
                        }
                        onClick={handleLike}
                        className="
                            absolute
                            right-3
                            top-3
                            z-20
                            flex
                            size-8
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/15
                            bg-black/50
                            text-white/80
                            opacity-0
                            backdrop-blur-md
                            transition-all
                            duration-300
                            hover:border-(--accent-primary)
                            hover:bg-(--accent-primary)
                            hover:text-white
                            group-hover:opacity-100
                        "
                    >
                        <PlusIcon />
                    </button>
                )}

                {/* Play button */}

                {id && (
                    <button
                        type="button"
                        aria-label={
                            title
                                ? `Open ${title}`
                                : "Open movie"
                        }
                        onClick={(event) => {
                            event.stopPropagation();
                            handleMovieClick();
                        }}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            z-20
                            flex
                            size-11
                            -translate-x-1/2
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            bg-(--accent-primary)
                            text-white
                            opacity-0
                            shadow-[0_0_25px_var(--accent-glow)]
                            transition-all
                            duration-300
                            hover:scale-110
                            group-hover:opacity-100
                        "
                    >
                        <PlayIcon />
                    </button>
                )}

                {/* Movie information */}

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        z-10
                        p-4
                    "
                >
                    {/* Title */}

                    {title && (
                        <h3
                            className="
                                line-clamp-2
                                text-sm
                                font-bold
                                leading-tight
                                text-white
                            "
                        >
                            {title}
                        </h3>
                    )}

                    {/* Meta */}

                    {(year || vote_average > 0) && (
                        <div
                            className="
                                mt-1.5
                                flex
                                items-center
                                gap-2
                                text-[11px]
                                font-medium
                                text-white/60
                            "
                        >
                            {year && (
                                <span>
                                    {year}
                                </span>
                            )}

                            {year &&
                                vote_average > 0 && (
                                    <span
                                        className="
                                            size-1
                                            rounded-full
                                            bg-white/30
                                        "
                                    />
                                )}

                            {vote_average > 0 && (
                                <span>
                                    {vote_average.toFixed(
                                        1
                                    )}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Genres */}

            {genres.length > 0 && (
                <div
                    className="
                        mt-2
                        flex
                        gap-1.5
                        overflow-hidden
                    "
                >
                    {genres
                        .slice(0, 2)
                        .map((genre) => (
                            <span
                                key={genre}
                                className="
                                    truncate
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-2
                                    py-0.5
                                    text-[9px]
                                    font-medium
                                    uppercase
                                    tracking-wide
                                    text-white/50
                                "
                            >
                                {genre}
                            </span>
                        ))}
                </div>
            )}
        </article>
    );
};

/* -------------------------------------------------------------------------- */
/* Rating                                                                     */
/* -------------------------------------------------------------------------- */

interface RatingProps {
    value: number;
}

const Rating = ({ value }: RatingProps) => {
    if (!value || value <= 0) {
        return null;
    }

    return (
        <div
            className="
                absolute
                left-3
                top-3
                z-10
                flex
                items-center
                gap-1
                rounded-full
                border
                border-white/10
                bg-black/60
                px-2
                py-1
                text-[10px]
                font-bold
                text-white
                backdrop-blur-md
            "
        >
            <StarIcon />

            <span>{value.toFixed(1)}</span>
        </div>
    );
};

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

const PlayIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
        aria-hidden="true"
    >
        <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.85l10.98-6.86a1 1 0 0 0 0-1.7L9.54 4.29A1 1 0 0 0 8 5.14Z" />
    </svg>
);

const PlusIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="size-4"
        aria-hidden="true"
    >
        <path d="M12 5v14" />
        <path d="M5 12h14" />
    </svg>
);

const StarIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-3 text-(--accent-secondary)"
        aria-hidden="true"
    >
        <path d="m12 3 2.78 5.63 6.22.9-4.5 4.38 1.06 6.2L12 17.18 6.44 20.1l1.06-6.2L3 9.53l6.22-.9L12 3Z" />
    </svg>
);

export default MovieCard;