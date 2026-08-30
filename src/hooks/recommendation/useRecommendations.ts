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

            // 1. Get user's saved movies
            const userMovies = await getUserMovies(user.uid);

            // 2. Apply CineScope priority system
            const filteredMovies =
                filterUserMoviesByPriority(userMovies);

            // 3. Calculate genre scores
            const genreScores =
                getGenreScores(filteredMovies);

            // 4. Combine genre scores
            const finalGenreScores =
                getFinalGenreScores(genreScores);

            // 5. Generate recommendations
            const recommended =
                await getRecommendedMovies(
                    finalGenreScores,
                    userMovies
                );

            // Keep the intentional reveal delay
            await new Promise((resolve) =>
                setTimeout(resolve, 1800)
            );

            setMovies(recommended.slice(0, 3));
        } catch (err) {
            console.error(
                "Failed to generate recommendations:",
                err
            );

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