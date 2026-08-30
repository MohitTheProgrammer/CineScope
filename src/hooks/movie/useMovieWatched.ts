import { useEffect, useState } from "react";

import {
    addWatchedMovie,
    isMovieWatched,
} from "../../services/movie";

import { useUser } from "../../context/UserContext";

import type { Movie } from "../../types/movie";

interface UseMovieWatchedResult {
    watched: boolean;
    checkingWatched: boolean;
    addingWatched: boolean;
    addWatched: () => Promise<void>;
}

export const useMovieWatched = (
    movie: Movie | null
): UseMovieWatchedResult => {
    const { user } = useUser();

    const [watched, setWatched] =
        useState(false);

    const [checkingWatched, setCheckingWatched] =
        useState(true);

    const [addingWatched, setAddingWatched] =
        useState(false);

    useEffect(() => {
        let cancelled = false;

        const checkWatched = async () => {
            if (!user || !movie) {
                setWatched(false);
                setCheckingWatched(false);
                return;
            }

            try {
                setCheckingWatched(true);

                const exists =
                    await isMovieWatched(
                        user.uid,
                        movie.id
                    );

                if (!cancelled) {
                    setWatched(exists);
                }
            } catch {
                return;
            } finally {
                if (!cancelled) {
                    setCheckingWatched(false);
                }
            }
        };

        void checkWatched();

        return () => {
            cancelled = true;
        };
    }, [user, movie]);

    const addWatched = async () => {
        if (!user || !movie) return;

        try {
            setAddingWatched(true);

            await addWatchedMovie(
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

            setWatched(true);
        } catch {
            return;
        } finally {
            setAddingWatched(false);
        }
    };

    return {
        watched,
        checkingWatched,
        addingWatched,
        addWatched,
    };
};

export default useMovieWatched;
