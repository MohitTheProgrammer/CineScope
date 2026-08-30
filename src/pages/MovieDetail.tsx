import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useUser } from "../context/UserContext";

import useMovie from "../hooks/movie/useMovie";
import useMovieWatchlist from "../hooks/movie/useMovieWatchlist";
import useMovieWatched from "../hooks/movie/useMovieWatched";
import useMovieRating from "../hooks/movie/useMovieRating";

import MovieHero from "../components/movie/MovieHero";
import MovieActions from "../components/movie/MovieActions";
import WatchProviders from "../components/movie/WatchProviders";
import WatchOptions from "../components/movie/WatchOptions";
import MovieInfo from "../components/movie/MovieInfo";
import CastSection from "../components/movie/CastSection";
import MovieDetailSkeleton from "../components/movie/MovieDetailSkeleton";

import VidRockPlayer from "../components/VidRockPlayer";

const MovieDetail = () => {
    const { movieId } = useParams();

    const { user } = useUser();

    const id = Number(movieId);

    /* ---------------------------------------------------------------------- */
    /* Movie data                                                              */
    /* ---------------------------------------------------------------------- */

    const {
        movie,
        cast,
        videos,
        watchProviders,
        loading,
        error,
    } = useMovie(id);

    /* ---------------------------------------------------------------------- */
    /* Movie actions                                                           */
    /* ---------------------------------------------------------------------- */

    const watchlist =
        useMovieWatchlist(movie);

    const watched =
        useMovieWatched(movie);

    const rating =
        useMovieRating(movie);

    /* ---------------------------------------------------------------------- */
    /* Watch provider state                                                    */
    /* ---------------------------------------------------------------------- */

    const [
        showWatchSources,
        setShowWatchSources,
    ] = useState(false);

    /* ---------------------------------------------------------------------- */
    /* Watch options state                                                     */
    /* ---------------------------------------------------------------------- */

    const [
        showCineScopePlayer,
        setShowCineScopePlayer,
    ] = useState(false);

    const [
        showTrailer,
        setShowTrailer,
    ] = useState(false);

    /* ---------------------------------------------------------------------- */
    /* Find trailer                                                            */
    /* ---------------------------------------------------------------------- */

    const trailer = useMemo(() => {
        if (!videos?.length) {
            return null;
        }

        /*
         * First preference:
         * Official YouTube trailer
         */

        const officialTrailer =
            videos.find(
                (video) =>
                    video.site === "YouTube" &&
                    video.type === "Trailer" &&
                    video.official === true
            );

        if (officialTrailer) {
            return officialTrailer;
        }

        /*
         * Second preference:
         * Any YouTube trailer
         */

        const youtubeTrailer =
            videos.find(
                (video) =>
                    video.site === "YouTube" &&
                    video.type === "Trailer"
            );

        if (youtubeTrailer) {
            return youtubeTrailer;
        }

        /*
         * Last fallback:
         * Any YouTube video
         */

        return (
            videos.find(
                (video) =>
                    video.site === "YouTube"
            ) ?? null
        );
    }, [videos]);

    /* ---------------------------------------------------------------------- */
    /* Loading                                                                 */
    /* ---------------------------------------------------------------------- */

    if (loading) {
        return <MovieDetailSkeleton />;
    }

    /* ---------------------------------------------------------------------- */
    /* Error                                                                   */
    /* ---------------------------------------------------------------------- */

    if (
        error ||
        !movie ||
        !Number.isInteger(id) ||
        id <= 0
    ) {
        return (
            <main
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-(--bg-primary)
                    px-6
                    text-white
                "
            >
                <div className="text-center">
                    <p
                        className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.3em]
                            text-(--accent-primary)
                        "
                    >
                        CineScope
                    </p>

                    <h1
                        className="
                            mt-3
                            text-3xl
                            font-black
                        "
                    >
                        Movie not found
                    </h1>

                    <p
                        className="
                            mt-2
                            text-sm
                            text-white/35
                        "
                    >
                        We couldn't load this movie.
                    </p>

                    <Link
                        to="/"
                        className="
                            mt-7
                            inline-flex
                            rounded-xl
                            bg-(--accent-primary)
                            px-6
                            py-3
                            text-sm
                            font-black
                            text-white
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:shadow-[0_10px_35px_var(--accent-glow)]
                        "
                    >
                        Back to CineScope
                    </Link>
                </div>
            </main>
        );
    }

    /* ---------------------------------------------------------------------- */
    /* Released                                                                */
    /* ---------------------------------------------------------------------- */

    const hasBeenReleased = Boolean(
        movie.release_date &&
            new Date(movie.release_date) <=
                new Date()
    );

    /* ---------------------------------------------------------------------- */
    /* Render                                                                  */
    /* ---------------------------------------------------------------------- */

    return (
        <main
            className="
                min-h-screen
                bg-(--bg-primary)
                text-white
            "
        >
            {/* ================================================================= */}
            {/* Movie Hero                                                         */}
            {/* ================================================================= */}

            <MovieHero
                movie={movie}
            />

            {/* ================================================================= */}
            {/* User Movie Actions                                                 */}
            {/* ================================================================= */}

            {user && (
                <MovieActions
                    hasBeenReleased={
                        hasBeenReleased
                    }

                    checkingWatchlist={
                        watchlist.checkingWatchlist
                    }

                    addingToWatchlist={
                        watchlist.addingToWatchlist
                    }

                    watchlistAdded={
                        watchlist.watchlistAdded
                    }

                    checkingWatched={
                        watched.checkingWatched
                    }

                    addingWatched={
                        watched.addingWatched
                    }

                    watched={
                        watched.watched
                    }

                    checkingRated={
                        rating.checkingRated
                    }

                    savingRating={
                        rating.savingRating
                    }

                    rated={
                        rating.rated
                    }

                    userRating={
                        rating.userRating
                    }

                    ratingOpen={
                        rating.ratingOpen
                    }

                    onAddToWatchlist={() =>
                        void watchlist.addToWatchlist()
                    }

                    onAddWatched={() =>
                        void watched.addWatched()
                    }

                    onToggleRating={
                        rating.toggleRating
                    }

                    onRateMovie={(value) =>
                        void rating.rate(value)
                    }
                />
            )}

            {/* ================================================================= */}
            {/* Watch Providers                                                    */}
            {/* ================================================================= */}

            {watchProviders && (
                <WatchProviders
                    providers={
                        watchProviders
                    }

                    open={
                        showWatchSources
                    }

                    onToggle={() =>
                        setShowWatchSources(
                            (open) => !open
                        )
                    }
                />
            )}

            {/* ================================================================= */}
            {/* Watch Options                                                      */}
            {/* ================================================================= */}

            <WatchOptions
                movie={movie}

                trailer={trailer}

                /*
                 * The movie is already loaded by the time
                 * WatchOptions is rendered.
                 *
                 * Trailer availability is determined
                 * through the trailer value itself.
                 */
                loadingTrailer={false}

                showCineScopePlayer={
                    showCineScopePlayer
                }

                showTrailer={
                    showTrailer
                }

                onToggleCineScopePlayer={() => {
                    /*
                     * CineScope movie playback requires
                     * authentication.
                     */
                    if (!user) {
                        return;
                    }

                    /*
                     * If opening CineScope,
                     * close the trailer.
                     *
                     * This prevents both players
                     * from being active at once.
                     */
                    setShowTrailer(false);

                    setShowCineScopePlayer(
                        (open) => !open
                    );
                }}

                onToggleTrailer={() => {
                    /*
                     * If opening trailer,
                     * close CineScope player.
                     *
                     * This also causes VidRockPlayer
                     * to unmount and stop playback.
                     */
                    setShowCineScopePlayer(false);

                    setShowTrailer(
                        (open) => !open
                    );
                }}

                /*
                 * Only create/pass the CineScope player
                 * when a user is logged in.
                 *
                 * WatchOptions itself will only render
                 * this option when isLoggedIn === true.
                 */
                player={
                    user ? (
                        <VidRockPlayer
                            tmdbId={movie.id}
                            title={movie.title}
                        />
                    ) : null
                }

                isLoggedIn={
                    Boolean(user)
                }
            />

            {/* ================================================================= */}
            {/* Movie Information                                                 */}
            {/* ================================================================= */}

            <MovieInfo
                movie={movie}
            />

            {/* ================================================================= */}
            {/* Cast                                                               */}
            {/* ================================================================= */}

            {cast.length > 0 && (
                <CastSection
                    cast={cast}
                />
            )}
        </main>
    );
};

export default MovieDetail;