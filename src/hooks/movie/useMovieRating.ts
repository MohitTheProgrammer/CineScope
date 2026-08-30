import { useEffect, useState } from "react";

import {
    getMovieRating,
    rateMovie,
} from "../../services/movie";

import { useUser } from "../../context/UserContext";

import type { Movie } from "../../types/movie";

interface UseMovieRatingResult {
    rated: boolean;
    userRating: number | null;

    checkingRated: boolean;
    savingRating: boolean;

    ratingOpen: boolean;

    toggleRating: () => void;

    rate: (rating: number) => Promise<void>;
}

export const useMovieRating = (
    movie: Movie | null
): UseMovieRatingResult => {
    const { user } = useUser();

    const [rated, setRated] =
        useState(false);

    const [userRating, setUserRating] =
        useState<number | null>(null);

    const [checkingRated, setCheckingRated] =
        useState(true);

    const [savingRating, setSavingRating] =
        useState(false);

    const [ratingOpen, setRatingOpen] =
        useState(false);

    useEffect(() => {
        let cancelled = false;

        const checkRating = async () => {
            if (!user || !movie) {
                setRated(false);
                setUserRating(null);
                setCheckingRated(false);
                return;
            }

            try {
                setCheckingRated(true);

                const rating =
                    await getMovieRating(
                        user.uid,
                        movie.id
                    );

                if (!cancelled) {
                    setUserRating(rating);
                    setRated(rating !== null);
                }
            } catch (error) {
                console.error(
                    "Failed to check movie rating:",
                    error
                );
            } finally {
                if (!cancelled) {
                    setCheckingRated(false);
                }
            }
        };

        void checkRating();

        return () => {
            cancelled = true;
        };
    }, [user, movie]);

    const toggleRating = () => {
        if (rated) return;

        setRatingOpen(
            (current) => !current
        );
    };

    const rate = async (
        rating: number
    ) => {
        if (!user || !movie) return;

        try {
            setSavingRating(true);

            await rateMovie(
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
                },
                rating
            );

            setUserRating(rating);
            setRated(true);
            setRatingOpen(false);
        } catch (error) {
            console.error(
                "Failed to rate movie:",
                error
            );

            throw error;
        } finally {
            setSavingRating(false);
        }
    };

    return {
        rated,
        userRating,

        checkingRated,
        savingRating,

        ratingOpen,

        toggleRating,
        rate,
    };
};

export default useMovieRating;