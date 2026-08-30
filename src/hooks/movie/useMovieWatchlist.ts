import { useEffect, useState } from "react";

import {
    addWatchlistMovie,
    isMovieInWatchlist,
} from "../../services/movie";

import { useUser } from "../../context/UserContext";

import type { Movie } from "../../types/movie";

interface UseMovieWatchlistResult {
    watchlistAdded: boolean;
    checkingWatchlist: boolean;
    addingToWatchlist: boolean;
    addToWatchlist: () => Promise<void>;
}

export const useMovieWatchlist = (
    movie: Movie | null
): UseMovieWatchlistResult => {
    const { user } = useUser();

    const [watchlistAdded, setWatchlistAdded] =
        useState(false);

    const [checkingWatchlist, setCheckingWatchlist] =
        useState(true);

    const [addingToWatchlist, setAddingToWatchlist] =
        useState(false);

    useEffect(() => {
        let cancelled = false;

        const checkWatchlist = async () => {
            if (!user || !movie) {
                setWatchlistAdded(false);
                setCheckingWatchlist(false);
                return;
            }

            try {
                setCheckingWatchlist(true);

                const exists =
                    await isMovieInWatchlist(
                        user.uid,
                        movie.id
                    );

                if (!cancelled) {
                    setWatchlistAdded(exists);
                }
            } catch {
                return;
            } finally {
                if (!cancelled) {
                    setCheckingWatchlist(false);
                }
            }
        };

        void checkWatchlist();

        return () => {
            cancelled = true;
        };
    }, [user, movie]);

    const addToWatchlist = async () => {
        if (!user || !movie) return;

        try {
            setAddingToWatchlist(true);

            await addWatchlistMovie(
                user.uid,
                {
                    id: movie.id,
                    title: movie.title,
                    poster_path:
                        movie.poster_path,
                    genre_ids:
                        movie.genre_ids ?? [],
                    vote_average:
                        movie.vote_average,
                }
            );

            setWatchlistAdded(true);
        } catch {
            return;
        } finally {
            setAddingToWatchlist(false);
        }
    };

    return {
        watchlistAdded,
        checkingWatchlist,
        addingToWatchlist,
        addToWatchlist,
    };
};

export default useMovieWatchlist;
