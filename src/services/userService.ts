import {
    collection,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
    updateDoc
} from "firebase/firestore";

import { db } from "../services/firebase";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";

export interface CineScopeUser {
    uid: string;
    displayName: string;
    email: string;
    avatarId: string;
    createdAt?: unknown;
    updatedAt?: unknown;
}

export const createUserDocument = async (
    uid: string,
    data: {
        displayName: string;
        email: string;
        avatarId: string;
    }
) => {
    const userRef = doc(db, "users", uid);

    await setDoc(userRef, {
        uid,
        displayName: data.displayName,
        email: data.email,
        avatarId: data.avatarId,

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
};

export const sendPasswordReset = async (
    email: string
): Promise<void> => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
        throw new Error("Email address is required.");
    }

    await sendPasswordResetEmail(
        auth,
        trimmedEmail
    );
};

export const updateUserProfile = async (
    uid: string,
    displayName: string,
    avatarId: string
) => {
    const userRef = doc(db, "users", uid);

    const snapshot = await getDoc(userRef);

    const data = {
        displayName: displayName.trim(),
        avatarId,
    };

    if (snapshot.exists()) {
        // User document exists → update it
        await updateDoc(userRef, data);
    } else {
        // User document doesn't exist → create it
        await setDoc(userRef, data);
    }
};


/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface UserMovie {
    movieId: number;
    title: string;
    posterPath: string | null;
    genreIds: number[];
    voteAverage: number;

    liked: boolean;
    watchlisted: boolean;
    watched: boolean;
    rated: boolean;

    rating: number | null;

    createdAt: unknown;
    updatedAt: unknown;
}

/* -------------------------------------------------------------------------- */
/* Get User Movies                                                            */
/* -------------------------------------------------------------------------- */

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
                title: data.title ?? "",
                posterPath:
                    data.posterPath ?? null,
                genreIds:
                    data.genreIds ?? [],
                voteAverage:
                    data.voteAverage ?? 0,

                liked:
                    data.liked ?? false,
                watchlisted:
                    data.watchlisted ?? false,
                watched:
                    data.watched ?? false,
                rated:
                    data.rated ?? false,

                rating:
                    data.rating ?? null,

                createdAt:
                    data.createdAt ?? null,
                updatedAt:
                    data.updatedAt ?? null,
            };
        });
    } catch (error) {
        console.error(
            "Failed to get user movies:",
            error
        );

        return [];
    }
};

/* -------------------------------------------------------------------------- */
/* Get Random User Movie IDs                                                  */
/* -------------------------------------------------------------------------- */

export const getUserMovieIds = async (
    userId: string,
    limit = 15
): Promise<number[]> => {
    try {
        const movies = await getUserMovies(userId);

        const movieIds = movies
            .map((movie) => movie.movieId)
            .filter(
                (id): id is number =>
                    typeof id === "number"
            );

        /*
         * Shuffle the complete list first.
         * This means every visit can produce a different
         * selection of personalized movies.
         */
        const shuffled = [...movieIds].sort(
            () => Math.random() - 0.5
        );

        return shuffled.slice(0, limit);
    } catch (error) {
        console.error(
            "Failed to get user movie IDs:",
            error
        );

        return [];
    }
};

