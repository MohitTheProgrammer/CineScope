import { useEffect, useMemo, useState } from "react";

import { useUser } from "../../context/UserContext";

import {
    getUserMovieInteractions,
} from "../../services/userService";

import {
    getMoviesByIds,
    type GlobalMovie,
} from "../../services/movie";

import {
    filterUserMoviesByPriority,
    getGenreScores,
    getFinalGenreScores,
    type UserMovie,
} from "../../services/recommendation";

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

                /*
                 * New Firestore structure:
                 *
                 * users/{uid}
                 *
                 * liked:
                 * [550, 680]
                 *
                 * watched:
                 * [550, 120]
                 *
                 * watchlist:
                 * [999, 120]
                 *
                 * rated:
                 * {
                 *     "550": 4,
                 *     "680": 3.5
                 * }
                 */

                const interactions =
                    await getUserMovieInteractions(
                        user.uid
                    );

                /*
                 * Get movie IDs from every
                 * interaction category.
                 */

                const ratedMovieIds =
                    Object.keys(
                        interactions.rated
                    ).map(Number);

                const movieIds = [
                    ...new Set([
                        ...interactions.liked,
                        ...interactions.watched,
                        ...interactions.watchlist,
                        ...ratedMovieIds,
                    ]),
                ].filter(
                    (id) =>
                        Number.isFinite(id)
                );

                if (!movieIds.length) {
                    setMovies([]);
                    return;
                }

                /*
                 * Get global movie metadata from:
                 *
                 * movies/{movieId}
                 */

                const globalMovies =
                    await getMoviesByIds(
                        movieIds
                    );

                /*
                 * Combine:
                 *
                 * Global movie data
                 * +
                 * User interaction data
                 *
                 * into UserMovie objects used
                 * by the recommendation system.
                 */

                const userMovies: UserMovie[] =
                    globalMovies.map(
                        (movie: GlobalMovie) => {
                            const movieId =
                                movie.movieId;

                            const rating =
                                interactions.rated[
                                    String(movieId)
                                ];

                            return {
                                movieId,

                                title:
                                    movie.title,

                                posterPath:
                                    movie.posterPath,

                                genreIds:
                                    movie.genreIds,

                                voteAverage:
                                    movie.voteAverage,

                                liked:
                                    interactions.liked.includes(
                                        movieId
                                    ),

                                watchlisted:
                                    interactions.watchlist.includes(
                                        movieId
                                    ),

                                watched:
                                    interactions.watched.includes(
                                        movieId
                                    ),

                                rated:
                                    typeof rating ===
                                    "number",

                                rating:
                                    typeof rating ===
                                    "number"
                                        ? rating
                                        : null,

                                createdAt:
                                    movie.createdAt ??
                                    null,

                                updatedAt:
                                    movie.updatedAt ??
                                    null,
                            };
                        }
                    );

                setMovies(userMovies);
            } catch {
                setError(
                    "We couldn't analyze your movie taste right now."
                );
            } finally {
                setLoading(false);
            }
        };

        void loadMovies();
    }, [user?.uid]);

    const recommendationData =
        useMemo(() => {
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
            recommendationData
                .finalGenreScores;

        const totalScore =
            scores.reduce(
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
        [
            recommendationData.filteredMovies,
        ]
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
