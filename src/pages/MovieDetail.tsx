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


    const {
        movie,
        cast,
        videos,
        watchProviders,
        loading,
        error,
    } = useMovie(id);


    const watchlist =
        useMovieWatchlist(movie);

    const watched =
        useMovieWatched(movie);

    const rating =
        useMovieRating(movie);


    const [
        showWatchSources,
        setShowWatchSources,
    ] = useState(false);


    const [
        showCineScopePlayer,
        setShowCineScopePlayer,
    ] = useState(false);

    const [
        showTrailer,
        setShowTrailer,
    ] = useState(false);


    const trailer = useMemo(() => {
        if (!videos?.length) {
            return null;
        }


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


        const youtubeTrailer =
            videos.find(
                (video) =>
                    video.site === "YouTube" &&
                    video.type === "Trailer"
            );

        if (youtubeTrailer) {
            return youtubeTrailer;
        }


        return (
            videos.find(
                (video) =>
                    video.site === "YouTube"
            ) ?? null
        );
    }, [videos]);


    if (loading) {
        return <MovieDetailSkeleton />;
    }


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


    const hasBeenReleased = Boolean(
        movie.release_date &&
            new Date(movie.release_date) <=
                new Date()
    );


    return (
        <main
            className="
                min-h-screen
                bg-(--bg-primary)
                text-white
            "
        >

            <MovieHero
                movie={movie}
            />


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


            <WatchOptions
                movie={movie}

                trailer={trailer}

                loadingTrailer={false}

                showCineScopePlayer={
                    showCineScopePlayer
                }

                showTrailer={
                    showTrailer
                }

                onToggleCineScopePlayer={() => {
                    if (!user) {
                        return;
                    }

                    setShowTrailer(false);

                    setShowCineScopePlayer(
                        (open) => !open
                    );
                }}

                onToggleTrailer={() => {
                    setShowCineScopePlayer(false);

                    setShowTrailer(
                        (open) => !open
                    );
                }}

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


            <MovieInfo
                movie={movie}
            />


            {cast.length > 0 && (
                <CastSection
                    cast={cast}
                />
            )}
        </main>
    );
};

export default MovieDetail;