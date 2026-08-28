import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
    addWatchedMovie,
    addWatchlistMovie,
    getMovieRating,
    isMovieInWatchlist,
    isMovieWatched,
    rateMovie,
} from "../services/movie";

import type { Movie, WatchProvider, WatchProviders } from "../types/movie";
import {
    getMovieById,
    getMovieCredits,
    getMovieVideos,
} from "../services/tmdb";
import { getMovieWatchProviders } from "../services/watch_source/api_provider";

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
    const { user } = useUser();


    const [watchlistAdded, setWatchlistAdded] = useState(false);
    const [checkingWatchlist, setCheckingWatchlist] = useState(true);
    const [addingToWatchlist, setAddingToWatchlist] = useState(false);
    const [watched, setWatched] = useState(false);
    const [checkingWatched, setCheckingWatched] = useState(true);
    const [addingWatched, setAddingWatched] = useState(false);
    const [ratingOpen, setRatingOpen] = useState(false);
    const [savingRating, setSavingRating] = useState(false);
    const [userRating, setUserRating] = useState<number | null>(null);
    const [rated, setRated] = useState(false);
    const [checkingRated, setCheckingRated] = useState(true);

    const handleAddToWatchlist = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (!movie) return;

        try {
            setAddingToWatchlist(true);

            await addWatchlistMovie(user.uid, {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                genre_ids: movie.genre_ids ?? [],
            });
            setWatchlistAdded(true);

            console.log(
                "Movie added to watchlist"
            );
        } catch (error) {
            console.error(
                "Failed to add movie to watchlist:",
                error
            );
        } finally {
            setAddingToWatchlist(false);
        }
    };

    const handleAddWatched = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (!movie) return;

        try {
            setAddingWatched(true);
            await addWatchedMovie(user.uid, {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                genre_ids: movie.genre_ids ?? [],
            });
            setWatched(true);
        } catch (error) {
            console.error("Failed to mark movie as watched:", error);
        } finally {
            setAddingWatched(false);
        }
    };

    const handleRateMovie = async (rating: number) => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (!movie) return;

        try {
            setSavingRating(true);
            await rateMovie(user.uid, {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                genre_ids: movie.genre_ids ?? [],
            }, rating);
            setUserRating(rating);
            setRated(true);
            setRatingOpen(false);
        } catch (error) {
            console.error("Failed to rate movie:", error);
        } finally {
            setSavingRating(false);
        }
    };

    const id = Number(movieId);
    const isValidMovieId = Number.isInteger(id) && id > 0;
    const navigate = useNavigate();

    const [movie, setMovie] =
        useState<Movie | null>(null);

    const [videos, setVideos] = useState<Video[]>([]);
    const [cast, setCast] = useState<CastMember[]>([]);

    const [watchProviders, setWatchProviders] = useState<WatchProviders | null>(null);
    const [showWatchSources, setShowWatchSources] =
        useState(false);

    const [loading, setLoading] = useState(isValidMovieId);
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
        if (!isValidMovieId) return;
        const loadMovie = async () => {
            try {
                setLoading(true);
                setError(null);

                const data: TMDBMovieResponse =
                    await getMovieById(id);

                const providers = await getMovieWatchProviders(
                    id
                );

                setWatchProviders(providers);
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

        void loadMovie();
    }, [user, id, isValidMovieId]);

    useEffect(() => {
        let cancelled = false;

        const checkRated = async () => {
            if (!user || !isValidMovieId) {
                if (!cancelled) {
                    setRated(false);
                    setCheckingRated(false);
                }
                return;
            }

            try {
                setCheckingRated(true);
                const savedRating = await getMovieRating(user.uid, id);
                if (!cancelled) {
                    setUserRating(savedRating);
                    setRated(savedRating !== null);
                }
            } catch (error) {
                console.error("Failed to check rated status:", error);
                if (!cancelled) setRated(false);
            } finally {
                if (!cancelled) setCheckingRated(false);
            }
        };

        void checkRated();

        return () => {
            cancelled = true;
        };
    }, [user, id, isValidMovieId]);

    useEffect(() => {
        let cancelled = false;

        const checkWatched = async () => {
            if (!user || !isValidMovieId) {
                if (!cancelled) {
                    setWatched(false);
                    setCheckingWatched(false);
                }
                return;
            }

            try {
                setCheckingWatched(true);
                const exists = await isMovieWatched(user.uid, id);
                if (!cancelled) setWatched(exists);
            } catch (error) {
                console.error("Failed to check watched status:", error);
                if (!cancelled) setWatched(false);
            } finally {
                if (!cancelled) setCheckingWatched(false);
            }
        };

        void checkWatched();

        return () => {
            cancelled = true;
        };
    }, [user, id, isValidMovieId]);

    /*
     * A watchlist entry's Firestore document ID is the TMDB movie ID, so the
     * route ID is sufficient to determine membership. Keeping this separate
     * from loading movie details also ensures it runs when either the user or
     * the displayed movie changes.
     */
    useEffect(() => {
        let cancelled = false;

        const checkWatchlist = async () => {
            if (!user || !isValidMovieId) {
                if (!cancelled) {
                    setWatchlistAdded(false);
                    setCheckingWatchlist(false);
                }
                return;
            }

            try {
                setCheckingWatchlist(true);
                const exists = await isMovieInWatchlist(user.uid, id);

                if (!cancelled) setWatchlistAdded(exists);
            } catch (error) {
                console.error("Failed to check watchlist:", error);
                if (!cancelled) setWatchlistAdded(false);
            } finally {
                if (!cancelled) setCheckingWatchlist(false);
            }
        };

        void checkWatchlist();

        return () => {
            cancelled = true;
        };
    }, [user, id, isValidMovieId]);

    /*
     * ============================================================
     * Load trailer + cast
     * ============================================================
     */

    useEffect(() => {
        if (!isValidMovieId) return;

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

                const credits = await getMovieCredits(id);
                setCast(credits.cast?.slice(0, 10) ?? []);
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
    }, [id, isValidMovieId]);

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

    const releaseDate = movie?.release_date
        ? new Date(`${movie.release_date}T00:00:00`)
        : null;
    const hasBeenReleased =
        releaseDate !== null &&
        !Number.isNaN(releaseDate.getTime()) &&
        releaseDate <= new Date();

    /*
     * ============================================================
     * Loading
     * ============================================================
     */

    if (loading) {
        return <MovieDetailSkeleton />;
    }

    /*
     * ============================================================
     * Error / movie not found
     * ============================================================
     */

    if (!isValidMovieId || error || !movie) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-(--bg-primary)">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-white">
                        Movie not found
                    </h1>

                    <p className="mt-2 text-sm text-white/50">
                        {error ?? (isValidMovieId
                            ? "Unable to load this movie."
                            : "This movie link is invalid.")}
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
                            <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
                                <button
                                    type="button"
                                    onClick={handleAddToWatchlist}
                                    disabled={
                                        checkingWatchlist ||
                                        addingToWatchlist ||
                                        watchlistAdded
                                    }
                                    className="
            inline-flex
            items-center
            justify-center
            w-full
            gap-2
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-5
            py-3
            text-sm
            font-bold
            text-white
            transition-all
            duration-300
            hover:border-(--accent-primary)
            hover:bg-(--accent-primary)
            disabled:cursor-not-allowed
            disabled:opacity-60
            lg:w-auto
        "
                                >
                                    {checkingWatchlist ? (
                                        <>
                                            <LoadingIcon />
                                            Checking...
                                        </>
                                    ) : watchlistAdded ? (
                                        <>
                                            <CheckIcon />
                                            Added to Watchlist
                                        </>
                                    ) : addingToWatchlist ? (
                                        <>
                                            <LoadingIcon />
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <PlusIcon />
                                            Add to Watchlist
                                        </>
                                    )}
                                </button>

                                {hasBeenReleased && (
                                    <button
                                        type="button"
                                        onClick={handleAddWatched}
                                        disabled={
                                            checkingWatched ||
                                            addingWatched ||
                                            watched
                                        }
                                        className="
                                            inline-flex
                                            items-center
                                            justify-center
                                            w-full
                                            gap-2
                                            rounded-xl
                                            border
                                            border-white/10
                                            bg-white/5
                                            px-5
                                            py-3
                                            text-sm
                                            font-bold
                                            text-white
                                            transition-all
                                            duration-300
                                            hover:border-(--accent-primary)
                                            hover:bg-(--accent-primary)
                                            disabled:cursor-not-allowed
                                            disabled:opacity-60
                                            lg:w-auto
                                        "
                                    >
                                        {checkingWatched ? (
                                            <>
                                                <LoadingIcon />
                                                Checking...
                                            </>
                                        ) : watched ? (
                                            <>
                                                <CheckIcon />
                                                Marked as Watched
                                            </>
                                        ) : addingWatched ? (
                                            <>
                                                <LoadingIcon />
                                                Marking...
                                            </>
                                        ) : (
                                            <>
                                                <CheckIcon />
                                                Mark as Watched
                                            </>
                                        )}
                                    </button>
                                )}

                                {hasBeenReleased && (
                                    <div className="relative w-full sm:col-span-2 lg:w-auto">
                                        <button
                                            type="button"
                                            onClick={() => setRatingOpen((open) => !open)}
                                            disabled={
                                                checkingRated ||
                                                savingRating ||
                                                rated
                                            }
                                            aria-expanded={ratingOpen}
                                            className="
                                                inline-flex
                                                items-center
                                                justify-center
                                                w-full
                                                gap-2
                                                rounded-xl
                                                border
                                                border-white/10
                                                bg-white/5
                                                px-5
                                                py-3
                                                text-sm
                                                font-bold
                                                text-white
                                                transition-all
                                                duration-300
                                                hover:border-(--accent-primary)
                                                hover:bg-(--accent-primary)
                                                disabled:cursor-not-allowed
                                                disabled:opacity-60
                                                lg:w-auto
                                            "
                                        >
                                            {checkingRated ? (
                                                <>
                                                    <LoadingIcon />
                                                    Checking...
                                                </>
                                            ) : rated ? (
                                                <>
                                                    <CheckIcon />
                                                    {userRating
                                                        ? `Your rating: ${userRating}/5`
                                                        : "Rated"}
                                                </>
                                            ) : (
                                                <>
                                                    <StarIcon />
                                                    Rate Movie
                                                </>
                                            )}
                                        </button>

                                        {ratingOpen && !rated && (
                                            <div className="absolute inset-x-0 top-full z-20 mt-2 flex justify-center gap-1 rounded-xl border border-white/10 bg-(--bg-primary) p-2 shadow-xl lg:left-0 lg:right-auto lg:min-w-max">
                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                    <button
                                                        key={rating}
                                                        type="button"
                                                        onClick={() => void handleRateMovie(rating)}
                                                        disabled={savingRating}
                                                        aria-label={`Rate ${rating} out of 5`}
                                                        className="flex size-9 items-center justify-center rounded-lg text-sm font-bold text-white/70 transition-colors hover:bg-(--accent-primary) hover:text-white disabled:cursor-not-allowed"
                                                    >
                                                        {savingRating ? <LoadingIcon /> : rating}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ============================================================ */}
            {/* Watch Providers                                              */}
            {/* ============================================================ */}

            {watchProviders && (
                <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
                    <SectionHeading
                        eyebrow="Where to watch"
                        title="Watch Providers"
                    />

                    {/* View sources button */}

                    <button
                        type="button"
                        onClick={() =>
                            setShowWatchSources((prev) => !prev)
                        }
                        className="
                mt-6
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-5
                py-4
                text-left
                transition-all
                duration-300
                hover:border-white/20
                hover:bg-white/10
            "
                    >
                        <div>
                            <p className="text-sm font-bold text-white">
                                View Watch Sources
                            </p>

                            <p className="mt-1 text-xs text-white/40">
                                See where this movie is available
                            </p>
                        </div>

                        <ChevronIcon
                            open={showWatchSources}
                        />
                    </button>

                    {/* Sources */}

                    <div
                        className={`
                grid
                transition-all
                duration-300
                ${showWatchSources
                                ? "mt-6 grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }
            `}
                    >
                        <div className="overflow-hidden">
                            <div className="space-y-6">
                                {watchProviders.ads &&
                                    watchProviders.ads.length > 0 && (
                                        <ProviderGroup
                                            title="Free with Ads"
                                            providers={
                                                watchProviders.ads
                                            }
                                        />
                                    )}

                                {watchProviders.free &&
                                    watchProviders.free.length > 0 && (
                                        <ProviderGroup
                                            title="Free"
                                            providers={
                                                watchProviders.free
                                            }
                                        />
                                    )}

                                {watchProviders.flatrate &&
                                    watchProviders.flatrate.length > 0 && (
                                        <ProviderGroup
                                            title="Subscription"
                                            providers={
                                                watchProviders.flatrate
                                            }
                                        />
                                    )}

                                {watchProviders.rent &&
                                    watchProviders.rent.length > 0 && (
                                        <ProviderGroup
                                            title="Rent"
                                            providers={
                                                watchProviders.rent
                                            }
                                        />
                                    )}

                                {watchProviders.buy &&
                                    watchProviders.buy.length > 0 && (
                                        <ProviderGroup
                                            title="Buy"
                                            providers={
                                                watchProviders.buy
                                            }
                                        />
                                    )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

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


const StarIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4 text-(--accent-secondary)"
    >
        <path d="m12 3 2.78 5.63 6.22.9-4.5 4.38 1.06 6.2L12 17.18 6.44 20.1l1.06-6.2L3 9.53l6.22-.9L12 3Z" />
    </svg>
);

const MovieDetailSkeleton = () => (
    <main
        aria-busy="true"
        aria-label="Loading movie details"
        className="min-h-screen bg-(--bg-primary)"
    >
        <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-8">
            <div className="h-5 w-20 animate-pulse rounded bg-white/10" />
        </div>

        <section className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
                <div className="mx-auto w-full max-w-70 lg:mx-0">
                    <div className="aspect-2/3 animate-pulse rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.4)]" />
                </div>

                <div className="flex flex-col justify-center">
                    <div className="mb-4 flex gap-2">
                        {[72, 88, 64].map((width) => (
                            <div
                                key={width}
                                className="h-6 animate-pulse rounded-full bg-white/10"
                                style={{ width: `${width}px` }}
                            />
                        ))}
                    </div>

                    <div className="h-12 w-4/5 animate-pulse rounded-xl bg-white/10 sm:h-15" />
                    <div className="mt-5 h-5 w-52 animate-pulse rounded bg-white/10" />

                    <div className="mt-8">
                        <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
                        <div className="mt-4 space-y-3">
                            <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                            <div className="h-4 w-11/12 animate-pulse rounded bg-white/10" />
                            <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex">
                            {[0, 1, 2].map((index) => (
                                <div
                                    key={index}
                                    className="h-12 w-full animate-pulse rounded-xl border border-white/10 bg-white/5 lg:w-40"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
            <div className="h-6 w-44 animate-pulse rounded bg-white/10" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[0, 1, 2, 3].map((index) => (
                    <div
                        key={index}
                        className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/5"
                    />
                ))}
            </div>
        </section>
    </main>
);

const Dot = () => (
    <span className="size-1 rounded-full bg-white/20" />
);

const PlusIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="size-4"
    >
        <path d="M12 5v14" />
        <path d="M5 12h14" />
    </svg>
);

const CheckIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
    >
        <path d="m5 12 4 4L19 6" />
    </svg>
);

const LoadingIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="size-4 animate-spin"
    >
        <circle
            cx="12"
            cy="12"
            r="9"
            className="opacity-25"
        />

        <path
            d="M21 12a9 9 0 0 0-9-9"
        />
    </svg>
);

interface ProviderGroupProps {
    title: string;
    providers: WatchProvider[];
}

const ProviderGroup = ({
    title,
    providers,
}: ProviderGroupProps) => {
    return (
        <div>
            <h3
                className="
                    mb-3
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-white/40
                "
            >
                {title}
            </h3>

            <div className="flex flex-wrap gap-3">
                {providers.map((provider) => (
                    <div
                        key={provider.provider_id}
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            px-3
                            py-2
                            transition-all
                            duration-300
                            hover:border-white/20
                            hover:bg-white/10
                        "
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="
                                size-9
                                rounded-lg
                                object-cover
                            "
                            loading="lazy"
                        />

                        <span
                            className="
                                text-sm
                                font-medium
                                text-white
                            "
                        >
                            {provider.provider_name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ChevronIcon = ({
    open,
}: {
    open: boolean;
}) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
            size-5
            text-white/40
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
        `}
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export default MovieDetail;
