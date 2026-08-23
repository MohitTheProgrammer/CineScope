import {
    deleteDoc,
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

export const addLikedMovie = async (
    uid: string,
    movie: {
        id: number;
        title: string;
        poster_path: string | null;
        vote_average: number;
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
        addedAt: serverTimestamp(),
        voteAverage: movie.vote_average
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