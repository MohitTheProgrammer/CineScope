import {
    useEffect,
    useState,
} from "react";

import { searchMovies } from "../../services/tmdb";

import type { Movie } from "../../types/movie";

interface UseMovieSearchResult {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    retry: () => void;
}

const useMovieSearch = (
    query: string
): UseMovieSearchResult => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] =
        useState<string | null>(null);

    const [retryKey, setRetryKey] = useState(0);

    useEffect(() => {
        if (!query) {
            setMovies([]);
            setLoading(false);
            setError(null);

            return;
        }

        let active = true;

        const loadSearchResults = async () => {
            try {
                setLoading(true);
                setError(null);

                const results =
                    await searchMovies(query);

                if (!active) return;

                setMovies(results);
            } catch {

                if (!active) return;

                setMovies([]);

                setError(
                    "Something went wrong while searching for movies."
                );
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        void loadSearchResults();

        return () => {
            active = false;
        };
    }, [query, retryKey]);

    const retry = () => {
        setRetryKey((key) => key + 1);
    };

    return {
        movies,
        loading,
        error,
        retry,
    };
};

export default useMovieSearch;