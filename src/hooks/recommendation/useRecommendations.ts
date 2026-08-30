import { useCallback, useEffect, useState } from "react";

import {
    filterUserMoviesByPriority,
    getFinalGenreScores,
    getGenreScores,
    getRecommendedMovies,
    getUserMovies,
} from "../../services/recommendation";

import { auth } from "../../services/firebase";

export interface RecommendedMovie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path?: string | null;
    vote_average?: number;
}

const useRecommendations = () => {
    const [movies, setMovies] = useState<RecommendedMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const generateRecommendations = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            setMovies([]);

            const user = auth.currentUser;

            if (!user) {
                throw new Error("You must be logged in.");
            }

            const userMovies = await getUserMovies(user.uid);

            const filteredMovies =
                filterUserMoviesByPriority(userMovies);

            const genreScores =
                getGenreScores(filteredMovies);

            const finalGenreScores =
                getFinalGenreScores(genreScores);

            const recommended =
                await getRecommendedMovies(
                    finalGenreScores,
                    userMovies
                );

            await new Promise((resolve) =>
                setTimeout(resolve, 1800)
            );

            setMovies(recommended.slice(0, 3));
        } catch {

            setError(
                "We couldn't build your recommendations."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void generateRecommendations();
    }, [generateRecommendations]);

    return {
        movies,
        loading,
        error,
        generateRecommendations,
    };
};

export default useRecommendations;