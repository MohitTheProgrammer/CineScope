import {
    collection,
    getDocs,
} from "firebase/firestore";

import { db } from "./firebase";

import type { UserMovie } from "./userService";


/**
 * Get every movie saved by a user.
 *
 * A movie can be:
 * - liked
 * - watchlisted
 * - watched
 * - rated
 * - or any combination of these
 */
export const getUserMovies = async (
    userId: string
): Promise<UserMovie[]> => {
    try {
        const moviesRef = collection(
            db,
            "users",
            userId,
            "movies"
        );

        const snapshot = await getDocs(moviesRef);

        return snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                movieId: data.movieId,
                title: data.title,
                posterPath: data.posterPath ?? null,
                genreIds: data.genreIds ?? [],
                voteAverage: data.voteAverage ?? 0,

                liked: data.liked ?? false,
                watchlisted: data.watchlisted ?? false,
                watched: data.watched ?? false,

                rated: data.rated ?? false,
                rating: data.rating ?? null,

                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            };
        });
    } catch (error) {
        console.error(
            "Failed to get user movies:",
            error
        );

        throw error;
    }
};


export interface FilteredUserMovies {
    liked: UserMovie[];
    rated: UserMovie[];
    watchlisted: UserMovie[];
    watched: UserMovie[];
}

export const filterUserMoviesByPriority = (
    movies: UserMovie[]
): FilteredUserMovies => {
    const liked: UserMovie[] = [];
    const rated: UserMovie[] = [];
    const watchlisted: UserMovie[] = [];
    const watched: UserMovie[] = [];

    for (const movie of movies) {
        // Priority 1 — Liked
        if (movie.liked === true) {
            liked.push(movie);
            continue;
        }

        // Priority 2 — Rated
        if (movie.rated === true) {
            rated.push(movie);
            continue;
        }

        // Priority 3 — Watchlisted
        if (movie.watchlisted === true) {
            watchlisted.push(movie);
            continue;
        }

        // Priority 4 — Watched
        if (movie.watched === true) {
            watched.push(movie);
        }
    }

    return {
        liked,
        rated,
        watchlisted,
        watched,
    };
};

interface GenreScore {
    [genreId: number]: number;
}

interface FilteredGenreScores {
    liked: GenreScore;
    rated: GenreScore;
    watchlisted: GenreScore;
    watched: GenreScore;
}

export const getGenreScores = (
    filteredMovies: FilteredUserMovies
): FilteredGenreScores => {

    const calculateScores = (
        movies: UserMovie[]
    ): GenreScore => {

        const scores: GenreScore = {};

        for (const movie of movies) {

            // Make sure a genre is counted only once
            // for each movie.
            const uniqueGenreIds = new Set(
                movie.genreIds ?? []
            );

            for (const genreId of uniqueGenreIds) {

                scores[genreId] =
                    (scores[genreId] ?? 0) + 1;
            }
        }

        return scores;
    };

    return {
        liked: calculateScores(filteredMovies.liked),

        rated: calculateScores(filteredMovies.rated),

        watchlisted: calculateScores(
            filteredMovies.watchlisted
        ),

        watched: calculateScores(
            filteredMovies.watched
        ),
    };
};

interface FinalGenreScore {
    genreId: number;
    score: number;
}

export const getFinalGenreScores = (
    genreScores: FilteredGenreScores
): FinalGenreScore[] => {

    const combinedScores: Record<number, number> = {};

    const addScores = (scores: GenreScore) => {
        for (const [genreId, score] of Object.entries(scores)) {

            const id = Number(genreId);

            combinedScores[id] =
                (combinedScores[id] ?? 0) + score;
        }
    };

    addScores(genreScores.liked);
    addScores(genreScores.rated);
    addScores(genreScores.watchlisted);
    addScores(genreScores.watched);

    return Object.entries(combinedScores)
        .map(([genreId, score]) => ({
            genreId: Number(genreId),
            score,
        }))
        .sort((a, b) => b.score - a.score);
};
interface RecommendedMovie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    genre_ids: number[];
}

const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [
            shuffled[j],
            shuffled[i],
        ];
    }

    return shuffled;
};

export const getRecommendedMovies = async (
    genreScores: {
        genreId: number;
        score: number;
    }[],
    userMovies: UserMovie[]
): Promise<RecommendedMovie[]> => {

    const apiKey =
        import.meta.env.VITE_TMDB_API_KEY;

    if (!apiKey) {
        throw new Error("TMDB API key is missing.");
    }

    /*
     * Take the user's highest-scoring genres.
     *
     * Example:
     *
     * Action  → 46
     * Mystery → 19
     * Comedy  → 12
     */

    const topGenres = genreScores
        .slice(0, 3)
        .map((genre) => genre.genreId);

    if (!topGenres.length) {
        return [];
    }

    /*
     * "|" means OR in TMDB genre filtering.
     *
     * Example:
     *
     * 28|9648|35
     *
     * = Action OR Mystery OR Comedy
     */

    const genreQuery = topGenres.join("|");

    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie` +
        `?api_key=${apiKey}` +
        `&with_genres=${genreQuery}` +
        `&sort_by=popularity.desc` +
        `&vote_count.gte=100` +
        `&page=1`
    );

    if (!response.ok) {
        throw new Error(
            `TMDB request failed: ${response.status}`
        );
    }

    const data: {
        results: RecommendedMovie[];
    } = await response.json();

    /*
     * Get IDs of every movie already saved
     * by the user.
     */

    const userMovieIds = new Set(
        userMovies.map((movie) => movie.movieId)
    );

    /*
     * Remove movies that the user already has.
     */

    const unseenMovies = (data.results ?? []).filter(
        (movie: RecommendedMovie) =>
            !userMovieIds.has(movie.id)
    );

    /*
     * Randomize the remaining movies so that
     * every page reload can produce a different
     * recommendation set.
     */

    const shuffledMovies =
        shuffleArray(unseenMovies);

    /*
     * Return exactly 3 movies.
     */

    return shuffledMovies.slice(0, 3);
};