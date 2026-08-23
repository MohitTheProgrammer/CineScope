import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import type { Movie } from "../types/movie";
import {
    getMovieById,
    getMovieVideos,
} from "../services/tmdb";

const IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p";



interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
    official: boolean;
}

interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface MovieVideosResponse {
    results: Video[];
}

interface TMDBGenre {
    id: number;
    name: string;
}

interface TMDBMovieResponse extends Omit<Movie, "genres"> {
    genres?: TMDBGenre[];
}

const MovieDetail = () => {
    const { movieId } = useParams<{ movieId: string }>();

    const id = Number(movieId);
    console.log({ id, movieId })
    const navigate = useNavigate();

    const [movie, setMovie] =
        useState<Movie | null>(null);

    const [videos, setVideos] = useState<Video[]>([]);
    const [cast, setCast] = useState<CastMember[]>([]);

    const [loading, setLoading] = useState(true);
    const [loadingVideos, setLoadingVideos] =
        useState(true);

    const [error, setError] = useState<string | null>(
        null
    );

    /*
     * ============================================================
     * Load full movie details
     * ============================================================
     */

    useEffect(() => {
        const loadMovie = async () => {
            try {
                setLoading(true);
                setError(null);

                const data: TMDBMovieResponse =
                    await getMovieById(id);

                /*
                 * TMDB detail endpoint returns genres as:
                 *
                 * genres: [
                 *   { id: 28, name: "Action" },
                 *   { id: 12, name: "Adventure" }
                 * ]
                 *
                 * Your Movie type currently expects:
                 *
                 * genres: string[]
                 */

                const formattedMovie: Movie = {
                    ...data,
                    genres:
                        data.genres?.map(
                            (genre) => genre.name
                        ) ?? [],
                };

                setMovie(formattedMovie);
            } catch (error) {
                console.error(
                    "Failed to load movie:",
                    error
                );

                setError(
                    "Failed to load movie details."
                );
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [movieId]);

    /*
     * ============================================================
     * Load trailer + cast
     * ============================================================
     */

    useEffect(() => {
        const loadMovieExtras = async () => {
            try {
                setLoadingVideos(true);

                const data: MovieVideosResponse =
                    await getMovieVideos(id);

                setVideos(data.results);

                /*
                 * TMDB's videos endpoint doesn't return cast.
                 * We'll use the credits endpoint below.
                 */

                const creditsResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env
                                .VITE_TMDB_ACCESS_TOKEN
                                }`,
                            "Content-Type":
                                "application/json",
                        },
                    }
                );

                if (creditsResponse.ok) {
                    const credits =
                        await creditsResponse.json();

                    setCast(
                        credits.cast?.slice(0, 10) ?? []
                    );
                }
            } catch (error) {
                console.error(
                    "Failed to load movie extras:",
                    error
                );
            } finally {
                setLoadingVideos(false);
            }
        };

        loadMovieExtras();
    }, [movieId]);

    /*
     * ============================================================
     * Trailer selection
     * ============================================================
     */

    const trailer = useMemo(() => {
        return (
            videos.find(
                (video) =>
                    video.site === "YouTube" &&
                    video.type === "Trailer" &&
                    video.official
            ) ??
            videos.find(
                (video) =>
                    video.site === "YouTube" &&
                    video.type === "Trailer"
            ) ??
            videos.find(
                (video) =>
                    video.site === "YouTube"
            )
        );
    }, [videos]);

    /*
     * ============================================================
     * Loading
     * ============================================================
     */

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-(--bg-primary)">
                <div className="text-center">
                    <div
                        className="
                            mx-auto
                            size-8
                            animate-spin
                            rounded-full
                            border-2
                            border-white/10
                            border-t-(--accent-primary)
                        "
                    />

                    <p className="mt-4 text-sm text-white/40">
                        Loading movie...
                    </p>
                </div>
            </main>
        );
    }

    /*
     * ============================================================
     * Error / movie not found
     * ============================================================
     */

    if (error || !movie) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-(--bg-primary)">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-white">
                        Movie not found
                    </h1>

                    <p className="mt-2 text-sm text-white/50">
                        {error ??
                            "Unable to load this movie."}
                    </p>

                    <Link
                        to="/trending"
                        className="
                            mt-6
                            inline-flex
                            rounded-full
                            bg-(--accent-primary)
                            px-6
                            py-3
                            text-sm
                            font-bold
                            text-white
                        "
                    >
                        Browse Movies
                    </Link>
                </div>
            </main>
        );
    }

    /*
     * ============================================================
     * Movie metadata
     * ============================================================
     */

    const year = movie.release_date
        ? new Date(
            movie.release_date
        ).getFullYear()
        : null;

    return (
        <main className="min-h-screen bg-(--bg-primary)">
            {/* ============================================================ */}
            {/* Back button                                                   */}
            {/* ============================================================ */}

            <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-8">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="
                        group
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-white/50
                        transition-colors
                        hover:text-white
                    "
                >
                    <ArrowLeftIcon />

                    Back
                </button>
            </div>

            {/* ============================================================ */}
            {/* Hero / Movie information                                     */}
            {/* ============================================================ */}

            <section className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-8">
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
                            {movie.genres?.map(
                                (genre) => (
                                    <span
                                        key={genre}
                                        className="
                                            rounded-full
                                            border
                                            border-(--accent-primary)/30
                                            bg-(--accent-primary)/10
                                            px-3
                                            py-1
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-(--accent-primary)
                                        "
                                    >
                                        {genre}
                                    </span>
                                )
                            )}
                        </div>

                        {/* Title */}

                        <h1
                            className="
                                text-4xl
                                font-black
                                tracking-tight
                                text-white
                                sm:text-5xl
                                lg:text-6xl
                            "
                        >
                            {movie.title}
                        </h1>

                        {/* Meta */}

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
                                <span>{year}</span>
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

            {/* ============================================================ */}
            {/* Trailer                                                       */}
            {/* ============================================================ */}

            <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
                <SectionHeading
                    eyebrow="Watch"
                    title="Official Trailer"
                />

                <div
                    className="
                        mt-6
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-black
                        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                    "
                >
                    {loadingVideos ? (
                        <div
                            className="
                                flex
                                aspect-video
                                animate-pulse
                                items-center
                                justify-center
                                bg-white/5
                            "
                        >
                            <span className="text-sm text-white/30">
                                Loading trailer...
                            </span>
                        </div>
                    ) : trailer ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={trailer.name}
                            className="aspect-video w-full"
                            allow="
                                accelerometer;
                                autoplay;
                                clipboard-write;
                                encrypted-media;
                                gyroscope;
                                picture-in-picture;
                                web-share
                            "
                            allowFullScreen
                        />
                    ) : (
                        <div
                            className="
                                flex
                                aspect-video
                                items-center
                                justify-center
                                bg-white/5
                            "
                        >
                            <p className="text-sm text-white/40">
                                No trailer available.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ============================================================ */}
            {/* Movie Info                                                    */}
            {/* ============================================================ */}

            <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
                <SectionHeading
                    eyebrow="Details"
                    title="Movie Information"
                />

                <div
                    className="
                        mt-6
                        grid
                        gap-4
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >
                    <InfoCard
                        label="Release Date"
                        value={
                            movie.release_date ||
                            "Unknown"
                        }
                    />

                    <InfoCard
                        label="Rating"
                        value={`${movie.vote_average.toFixed(
                            1
                        )} / 10`}
                    />

                    <InfoCard
                        label="Original Language"
                        value={
                            movie.original_language?.toUpperCase() ??
                            "—"
                        }
                    />

                    <InfoCard
                        label="Popularity"
                        value={
                            movie.popularity?.toFixed(0) ??
                            "—"
                        }
                    />
                </div>
            </section>

            {/* ============================================================ */}
            {/* Cast                                                          */}
            {/* ============================================================ */}

            {cast.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
                    <SectionHeading
                        eyebrow="The cast"
                        title="Cast"
                    />

                    <div
                        className="
                            mt-6
                            grid
                            grid-cols-2
                            gap-4
                            sm:grid-cols-3
                            md:grid-cols-5
                            lg:grid-cols-6
                        "
                    >
                        {cast.map((person) => (
                            <CastCard
                                key={person.id}
                                person={person}
                            />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

/* ========================================================================== */
/* Section Heading                                                            */
/* ========================================================================== */

interface SectionHeadingProps {
    eyebrow: string;
    title: string;
}

const SectionHeading = ({
    eyebrow,
    title,
}: SectionHeadingProps) => {
    return (
        <div>
            <div className="flex items-center gap-2">
                <span
                    className="
                        size-1.5
                        rounded-full
                        bg-(--accent-primary)
                        shadow-[0_0_10px_var(--accent-glow)]
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
                    {eyebrow}
                </span>
            </div>

            <h2
                className="
                    mt-2
                    text-2xl
                    font-black
                    tracking-tight
                    text-white
                    sm:text-3xl
                "
            >
                {title}
            </h2>
        </div>
    );
};

/* ========================================================================== */
/* Info Card                                                                  */
/* ========================================================================== */

interface InfoCardProps {
    label: string;
    value: string;
}

const InfoCard = ({
    label,
    value,
}: InfoCardProps) => {
    return (
        <div
            className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
            "
        >
            <p
                className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-white/30
                "
            >
                {label}
            </p>

            <p
                className="
                    mt-2
                    text-sm
                    font-bold
                    text-white
                "
            >
                {value}
            </p>
        </div>
    );
};

/* ========================================================================== */
/* Cast Card                                                                  */
/* ========================================================================== */

interface CastCardProps {
    person: CastMember;
}

const CastCard = ({ person }: CastCardProps) => {
    return (
        <article className="min-w-0">
            <div
                className="
                    aspect-3/4
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                "
            >
                {person.profile_path ? (
                    <img
                        src={`${IMAGE_BASE_URL}/w342${person.profile_path}`}
                        alt={person.name}
                        loading="lazy"
                        className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            hover:scale-105
                        "
                    />
                ) : (
                    <div
                        className="
                            flex
                            h-full
                            items-center
                            justify-center
                            text-xs
                            text-white/20
                        "
                    >
                        No image
                    </div>
                )}
            </div>

            <h3
                className="
                    mt-3
                    truncate
                    text-sm
                    font-bold
                    text-white
                "
            >
                {person.name}
            </h3>

            <p
                className="
                    mt-1
                    truncate
                    text-xs
                    text-white/40
                "
            >
                {person.character}
            </p>
        </article>
    );
};

/* ========================================================================== */
/* Icons                                                                      */
/* ========================================================================== */

const ArrowLeftIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 transition-transform group-hover:-translate-x-1"
    >
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
    </svg>
);

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

export default MovieDetail;