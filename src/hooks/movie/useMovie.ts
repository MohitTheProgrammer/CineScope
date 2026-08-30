import { useEffect, useState } from "react";

import {
    getMovieById,
    getMovieVideos,
    getMovieCredits,
} from "../../services/tmdb";

import { getMovieWatchProviders } from "../../services/watch_source/api_provider";

import type {
    CastMember,
    Movie,
    Video,
    WatchProviders,
} from "../../types/movie";

interface UseMovieResult {
    movie: Movie | null;
    cast: CastMember[];
    videos: Video[];
    watchProviders: WatchProviders | null;
    loading: boolean;
    error: string | null;
}

export const useMovie = (
    movieId: number
): UseMovieResult => {
    const [movie, setMovie] =
        useState<Movie | null>(null);

    const [cast, setCast] =
        useState<CastMember[]>([]);

    const [videos, setVideos] =
        useState<Video[]>([]);

    const [watchProviders, setWatchProviders] =
        useState<WatchProviders | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadMovie = async () => {
            try {
                setLoading(true);
                setError(null);

                const [
                    movieData,
                    videoData,
                    creditsData,
                    providersData,
                ] = await Promise.all([
                    getMovieById(movieId),
                    getMovieVideos(movieId),
                    getMovieCredits(movieId),
                    getMovieWatchProviders(movieId),
                ]);

                if (cancelled) return;

                setMovie(movieData);

                setVideos(
                    videoData?.results ?? []
                );

                setCast(
                    creditsData?.cast ?? []
                );

                setWatchProviders(
                    providersData ?? null
                );
            } catch {

                if (!cancelled) {
                    setError(
                        "Failed to load movie details."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        if (
            Number.isInteger(movieId) &&
            movieId > 0
        ) {
            void loadMovie();
        } else {
            setLoading(false);
            setError("Invalid movie ID.");
        }

        return () => {
            cancelled = true;
        };
    }, [movieId]);

    return {
        movie,
        cast,
        videos,
        watchProviders,
        loading,
        error,
    };
};

export default useMovie;