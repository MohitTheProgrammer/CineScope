import {
    doc,
    serverTimestamp,
    setDoc,
    getDocs,
    collection,
    getDoc,
    query,
    where,
} from "firebase/firestore";

import { db } from "../services/firebase";

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    genre_ids: number[];
    vote_average: number;
}

export const addWatchlistMovie = async (
    uid: string,
    movie: Movie
) => {
    const movieRef = doc(
        db,
        "users",
        uid,
        "movies",
        String(movie.id)
    );

    await setDoc(
        movieRef,
        {
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            genreIds: movie.genre_ids,
            voteAverage: movie.vote_average,

            watchlisted: true,

            updatedAt: serverTimestamp(),
        },
        {
            merge: true,
        }
    );
};

export const addWatchedMovie = async (
    uid: string,
    movie: Movie
) => {
    const movieRef = doc(
        db,
        "users",
        uid,
        "movies",
        String(movie.id)
    );

    await setDoc(
        movieRef,
        {
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            genreIds: movie.genre_ids,
            voteAverage: movie.vote_average,

            watched: true,

            updatedAt: serverTimestamp(),
        },
        {
            merge: true,
        }
    );
};

export const rateMovie = async (
    uid: string,
    movie: Movie,
    rating: number
) => {
    const movieRef = doc(
        db,
        "users",
        uid,
        "movies",
        String(movie.id)
    );

    await setDoc(
        movieRef,
        {
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            genreIds: movie.genre_ids,
            voteAverage: movie.vote_average,

            rated: true,
            rating,

            updatedAt: serverTimestamp(),
        },
        {
            merge: true,
        }
    );
};

export const addLikedMovie = async (
    uid: string,
    movie: Movie
) => {
    const movieRef = doc(
        db,
        "users",
        uid,
        "movies",
        String(movie.id)
    );

    await setDoc(
        movieRef,
        {
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            genreIds: movie.genre_ids,
            voteAverage: movie.vote_average,

            liked: true,

            updatedAt: serverTimestamp(),
        },
        {
            merge: true,
        }
    );
};

export const removeLikedMovie = async (
    uid: string,
    movieId: number
) => {
    const movieRef = doc(
        db,
        "users",
        uid,
        "movies",
        String(movieId)
    );

    await setDoc(movieRef, {
        liked: false,
        updatedAt: serverTimestamp(),
    }, { merge: true });
};

export const removeWatchlistMovie = async (
    uid: string,
    movieId: number
) => {
    const movieRef = doc(db, "users", uid, "movies", String(movieId));

    await setDoc(movieRef, {
        watchlisted: false,
        updatedAt: serverTimestamp(),
    }, { merge: true });
};

export interface WatchlistMovie {
    id: number;
    title: string;
    posterPath: string | null;
    voteAverage: number;
    genreIds: number[];
    updatedAt: unknown;
}

export const getWatchlistMovies = async (
    userId: string
): Promise<WatchlistMovie[]> => {
    const moviesRef = collection(
        db,
        "users",
        userId,
        "movies"
    );

    const snapshot = await getDocs(
        query(moviesRef, where("watchlisted", "==", true))
    );

    return snapshot.docs
        .filter((movieDoc) => movieDoc.data().watched !== true)
        .map((movieDoc) => ({
            ...(movieDoc.data() as Omit<WatchlistMovie, "id">),
            id: Number(movieDoc.id),
        }));
};

export interface LikedMovie {
    id: number;
    title: string;
    posterPath: string | null;
    voteAverage: number;
    genreIds: number[];
}

export const getLikedMovies = async (uid: string): Promise<LikedMovie[]> => {
    const moviesRef = collection(db, "users", uid, "movies");
    const snapshot = await getDocs(
        query(moviesRef, where("liked", "==", true))
    );
    return snapshot.docs
        .map((item) => item.data())
        .map((movie) => ({
            id: movie.movieId,
            title: movie.title,
            posterPath: movie.posterPath ?? null,
            voteAverage: movie.voteAverage ?? 0,
            genreIds: movie.genreIds ?? [],
        }));
};


export const isMovieInWatchlist = async (
    userId: string,
    movieId: number
): Promise<boolean> => {
    const movieRef = doc(db, "users", userId, "movies", String(movieId));

    const snapshot = await getDoc(movieRef);

    return snapshot.exists() && snapshot.data().watchlisted === true;
};

export const isMovieWatched = async (
    userId: string,
    movieId: number
): Promise<boolean> => {
    const movieRef = doc(db, "users", userId, "movies", String(movieId));
    const snapshot = await getDoc(movieRef);

    return snapshot.exists() && snapshot.data().watched === true;
};

export const isMovieRated = async (
    userId: string,
    movieId: number
): Promise<boolean> => {
    const movieRef = doc(db, "users", userId, "movies", String(movieId));
    const snapshot = await getDoc(movieRef);

    return snapshot.exists() && snapshot.data().rated === true;
};

export const getMovieRating = async (
    userId: string,
    movieId: number
): Promise<number | null> => {
    const movieRef = doc(db, "users", userId, "movies", String(movieId));
    const snapshot = await getDoc(movieRef);

    if (!snapshot.exists()) return null;

    const movie = snapshot.data();
    return movie.rated === true && typeof movie.rating === "number"
        ? movie.rating
        : null;
};
