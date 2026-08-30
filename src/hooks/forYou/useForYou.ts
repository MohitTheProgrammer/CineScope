import {
    useEffect,
    useMemo,
    useState,
} from "react";

import { useUser } from "../../context/UserContext";

import {
    getUserMovies,
    filterUserMoviesByPriority,
    getGenreScores,
    getFinalGenreScores,
} from "../../services/recommendation";

import type { UserMovie } from "../../services/userService";

import {
    getGenreInfo,
    getGenreDescription,
} from "../../utils/genreUtils";

export interface RankedGenre {
    genreId: number;
    score: number;
    name: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    percentage: number;
    rank: number;
    description: string;
}

const useForYou = () => {
    const { user } = useUser();

    const [movies, setMovies] =
        useState<UserMovie[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        const loadMovies = async () => {
            if (!user?.uid) {
                setMovies([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const userMovies =
                    await getUserMovies(
                        user.uid
                    );

                setMovies(userMovies);
            } catch (loadError) {
                console.error(
                    "Failed to load movies for recommendation:",
                    loadError
                );

                setError(
                    "We couldn't analyze your movie taste right now."
                );
            } finally {
                setLoading(false);
            }
        };

        void loadMovies();
    }, [user?.uid]);

    const recommendationData = useMemo(() => {
        if (!movies.length) {
            return {
                filteredMovies: {
                    liked: [],
                    rated: [],
                    watchlisted: [],
                    watched: [],
                },
                finalGenreScores: [],
            };
        }

        const filteredMovies =
            filterUserMoviesByPriority(
                movies
            );

        const genreScores =
            getGenreScores(
                filteredMovies
            );

        const finalGenreScores =
            getFinalGenreScores(
                genreScores
            );

        return {
            filteredMovies,
            finalGenreScores,
        };
    }, [movies]);

    const rankedGenres = useMemo(() => {
        const scores =
            recommendationData.finalGenreScores;

        const totalScore = scores.reduce(
            (total, genre) =>
                total + genre.score,
            0
        );

        if (!totalScore) {
            return [];
        }

        return scores.map(
            (genre, index) => {
                const info =
                    getGenreInfo(
                        genre.genreId
                    );

                const percentage =
                    Math.round(
                        (genre.score /
                            totalScore) *
                            100
                    );

                return {
                    ...genre,
                    ...info,
                    rank: index + 1,
                    percentage,
                    description:
                        getGenreDescription(
                            index + 1,
                            genre.score,
                            totalScore
                        ),
                };
            }
        );
    }, [
        recommendationData.finalGenreScores,
    ]);

    const topGenre =
        rankedGenres[0] ?? null;

    const activity = useMemo(
        () => ({
            liked:
                recommendationData
                    .filteredMovies
                    .liked.length,

            rated:
                recommendationData
                    .filteredMovies
                    .rated.length,

            watchlisted:
                recommendationData
                    .filteredMovies
                    .watchlisted.length,

            watched:
                recommendationData
                    .filteredMovies
                    .watched.length,
        }),
        [recommendationData.filteredMovies]
    );

    const tasteMovies = useMemo(
        () => movies.slice(0, 8),
        [movies]
    );

    return {
        movies,
        loading,
        error,

        rankedGenres,
        topGenre,

        activity,

        tasteMovies,
    };
};

export default useForYou;