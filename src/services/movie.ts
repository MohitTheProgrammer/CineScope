import {
    deleteDoc,
    doc,
    serverTimestamp,
    setDoc,
    getDocs,
    collection,
    getDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

export const addWatchlistMovie = async (
    userId: string,
    movie: {
        id: number;
        title: string;
        posterPath: string | null;
        vote_average?: number;
        genre_ids?: number[];
    }
) => {
    const movieRef = doc(
        db,
        "users",
        userId,
        "watchlist",
        String(movie.id)
    );

    await setDoc(movieRef, {
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.posterPath,
        voteAverage: movie.vote_average ?? 0,
        genreIds: movie.genre_ids ?? [],
        addedAt: serverTimestamp(),
    });
};

export const addLikedMovie = async (
    uid: string,
    movie: {
        id: number;
        title: string;
        poster_path: string | null;
        vote_average?: number;
        genre_ids?: number[];
    }
) => {
    const movieRef = doc(
        db,
        "users",
        uid,
        "likedMovies",
        String(movie.id)
    );

    await setDoc(movieRef, {
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average ?? 0,
        genreIds: movie.genre_ids ?? [],
        addedAt: serverTimestamp(),
    });
};

export const removeLikedMovie = async (
    uid: string,
    movieId: number
) => {
    const movieRef = doc(
        db,
        "users",
        uid,
        "likedMovies",
        String(movieId)
    );

    await deleteDoc(movieRef);
};

export interface WatchlistMovie {
    id: number;
    title: string;
    posterPath: string | null;
    vote_average: number;
    addedAt: unknown;
}

export const getWatchlistMovies = async (
    userId: string
): Promise<WatchlistMovie[]> => {
    const watchlistRef = collection(
        db,
        "users",
        userId,
        "watchlist"
    );

    const snapshot = await getDocs(watchlistRef);

    return snapshot.docs.map((doc) => ({
        ...(doc.data() as Omit<
            WatchlistMovie,
            "id"
        >),
        id: Number(doc.id),
    }));
};

export interface LikedMovie {
    id: number;
    title: string;
    posterPath: string | null;
    voteAverage: number;
}

export const getLikedMovies = async (uid: string): Promise<LikedMovie[]> => {
    const snapshot = await getDocs(collection(db, "users", uid, "likedMovies"));
    return snapshot.docs
        .map((item) => item.data())
        .map((movie) => ({
            id: movie.movieId,
            title: movie.title,
            posterPath: movie.posterPath ?? null,
            voteAverage: movie.voteAverage ?? 0,
        }));
};


export const isMovieInWatchlist = async (
    userId: string,
    movieId: number
): Promise<boolean> => {
    const movieRef = doc(
        db,
        "users",
        userId,
        "watchlist",
        String(movieId)
    );

    const snapshot = await getDoc(movieRef);

    return snapshot.exists();
};
