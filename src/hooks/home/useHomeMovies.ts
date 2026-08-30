import { useEffect, useState } from "react";

import {
    getTrendingMovies,
    getPopularMovies,
} from "../../services/tmdb";

import type { Movie } from "../../types/movie";

interface UseHomeMoviesResult {
    trendingMovies: Movie[];
    popularMovies: Movie[];

    trendingLoading: boolean;
    popularLoading: boolean;

    trendingError: string | null;
    popularError: string | null;
}

const useHomeMovies = (): UseHomeMoviesResult => {
    const [trendingMovies, setTrendingMovies] =
        useState<Movie[]>([]);

    const [popularMovies, setPopularMovies] =
        useState<Movie[]>([]);

    const [trendingLoading, setTrendingLoading] =
        useState(true);

    const [popularLoading, setPopularLoading] =
        useState(true);

    const [trendingError, setTrendingError] =
        useState<string | null>(null);

    const [popularError, setPopularError] =
        useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const loadTrendingMovies = async () => {
            try {
                setTrendingLoading(true);
                setTrendingError(null);

                const data =
                    await getTrendingMovies();

                if (!mounted) return;

                setTrendingMovies(
                    data.results ?? []
                );
            } catch (error) {
                console.error(
                    "Failed to load trending movies:",
                    error
                );

                if (!mounted) return;

                setTrendingError(
                    "Unable to load movies right now."
                );
            } finally {
                if (mounted) {
                    setTrendingLoading(false);
                }
            }
        };

        const loadPopularMovies = async () => {
            try {
                setPopularLoading(true);
                setPopularError(null);

                const data =
                    await getPopularMovies();

                if (!mounted) return;

                setPopularMovies(
                    data.results ?? []
                );
            } catch (error) {
                console.error(
                    "Failed to load popular movies:",
                    error
                );

                if (!mounted) return;

                setPopularError(
                    "Unable to load movies right now."
                );
            } finally {
                if (mounted) {
                    setPopularLoading(false);
                }
            }
        };

        void loadTrendingMovies();
        void loadPopularMovies();

        return () => {
            mounted = false;
        };
    }, []);

    return {
        trendingMovies,
        popularMovies,

        trendingLoading,
        popularLoading,

        trendingError,
        popularError,
    };
};

export default useHomeMovies;