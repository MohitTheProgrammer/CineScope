import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    filterUserMoviesByPriority,
    getFinalGenreScores,
    getGenreScores,
    getRecommendedMovies,
    type UserMovie,
} from "../../services/recommendation";

import {
    getUserMovieInteractions,
} from "../../services/userService";

import {
    getMoviesByIds,
    type GlobalMovie,
} from "../../services/movie";

import { auth } from "../../services/firebase";

export interface RecommendedMovie {
    id: number;

    title: string;

    poster_path: string | null;

    backdrop_path?: string | null;

    vote_average?: number;
}

const useRecommendations = () => {
    const [movies, setMovies] =
        useState<RecommendedMovie[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const generateRecommendations =
        useCallback(async () => {
            try {
                setLoading(true);

                setError(null);

                setMovies([]);

                const user =
                    auth.currentUser;

                if (!user) {
                    throw new Error(
                        "You must be logged in."
                    );
                }

                /*
                 * Get the user's interaction data.
                 *
                 * users/{uid}
                 *
                 * liked: [550, 680]
                 * watched: [550, 120]
                 * watchlist: [999, 120]
                 *
                 * rated: {
                 *     "550": 4,
                 *     "680": 3.5
                 * }
                 */

                const interactions =
                    await getUserMovieInteractions(
                        user.uid
                    );

                /*
                 * Collect every movie ID the
                 * user has interacted with.
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

                /*
                 * No interaction history means
                 * there is nothing to analyze.
                 */

                if (!movieIds.length) {
                    setMovies([]);
                    return;
                }

                /*
                 * Fetch movie metadata from:
                 *
                 * movies/{movieId}
                 */

                const globalMovies =
                    await getMoviesByIds(
                        movieIds
                    );

                /*
                 * Combine global movie data
                 * with user interactions.
                 */

                const userMovies: UserMovie[] =
                    globalMovies.map(
                        (
                            movie: GlobalMovie
                        ) => {
                            const movieId =
                                movie.movieId;

                            const rating =
                                interactions
                                    .rated[
                                    String(
                                        movieId
                                    )
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
                                    interactions
                                        .liked
                                        .includes(
                                            movieId
                                        ),

                                watchlisted:
                                    interactions
                                        .watchlist
                                        .includes(
                                            movieId
                                        ),

                                watched:
                                    interactions
                                        .watched
                                        .includes(
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

                /*
                 * Analyze the user's taste.
                 */

                const filteredMovies =
                    filterUserMoviesByPriority(
                        userMovies
                    );

                const genreScores =
                    getGenreScores(
                        filteredMovies
                    );

                const finalGenreScores =
                    getFinalGenreScores(
                        genreScores
                    );

                /*
                 * Generate recommendations
                 * based on the user's top genres.
                 */

                const recommended =
                    await getRecommendedMovies(
                        finalGenreScores,
                        userMovies
                    );

                /*
                 * Keep your existing
                 * recommendation loading effect.
                 */

                await new Promise(
                    (resolve) =>
                        setTimeout(
                            resolve,
                            1800
                        )
                );

                setMovies(
                    recommended.slice(
                        0,
                        3
                    )
                );
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
