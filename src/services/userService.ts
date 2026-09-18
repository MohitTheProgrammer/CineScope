import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";

import {
    sendPasswordResetEmail,
} from "firebase/auth";

import { db } from "../services/firebase";
import { auth } from "./firebase";


/* =========================================================
   USER
========================================================= */

export interface CineScopeUser {
    uid: string;
    displayName: string;
    email: string;
    avatarId: string;

    liked: number[];
    watched: number[];
    watchlist: number[];
    rated: Record<string, number>;

    createdAt?: unknown;
    updatedAt?: unknown;
}


/* =========================================================
   CREATE USER
========================================================= */

export const createUserDocument = async (
    uid: string,
    data: {
        displayName: string;
        email: string;
        avatarId: string;
    }
) => {
    const userRef = doc(
        db,
        "users",
        uid
    );

    await setDoc(userRef, {
        uid,

        displayName:
            data.displayName.trim(),

        email:
            data.email.trim(),

        avatarId:
            data.avatarId,

        // Movie interaction data
        liked: [],
        watched: [],
        watchlist: [],
        rated: {},

        createdAt:
            serverTimestamp(),

        updatedAt:
            serverTimestamp(),
    });
};


/* =========================================================
   GET USER
========================================================= */

export const getUserDocument = async (
    uid: string
): Promise<CineScopeUser | null> => {
    const userRef = doc(
        db,
        "users",
        uid
    );

    const snapshot =
        await getDoc(userRef);

    if (!snapshot.exists()) {
        return null;
    }

    const data = snapshot.data();

    return {
        uid:
            data.uid ?? uid,

        displayName:
            data.displayName ?? "",

        email:
            data.email ?? "",

        avatarId:
            data.avatarId ?? "01",

        liked:
            data.liked ?? [],

        watched:
            data.watched ?? [],

        watchlist:
            data.watchlist ?? [],

        rated:
            data.rated ?? {},

        createdAt:
            data.createdAt ?? null,

        updatedAt:
            data.updatedAt ?? null,
    };
};


/* =========================================================
   PASSWORD RESET
========================================================= */

export const sendPasswordReset = async (
    email: string
): Promise<void> => {
    const trimmedEmail =
        email.trim();

    if (!trimmedEmail) {
        throw new Error(
            "Email address is required."
        );
    }

    await sendPasswordResetEmail(
        auth,
        trimmedEmail
    );
};


/* =========================================================
   UPDATE PROFILE
========================================================= */

export const updateUserProfile = async (
    uid: string,
    displayName: string,
    avatarId: string
) => {
    const userRef = doc(
        db,
        "users",
        uid
    );

    const snapshot =
        await getDoc(userRef);

    const data = {
        displayName:
            displayName.trim(),

        avatarId,

        updatedAt:
            serverTimestamp(),
    };

    if (snapshot.exists()) {
        await updateDoc(
            userRef,
            data
        );
    } else {
        await setDoc(
            userRef,
            {
                uid,
                ...data,

                liked: [],
                watched: [],
                watchlist: [],
                rated: {},

                createdAt:
                    serverTimestamp(),
            }
        );
    }
};


/* =========================================================
   USER MOVIE IDS
========================================================= */

/**
 * Returns all movie IDs the user has interacted with.
 *
 * A movie is considered interacted with if it is:
 *
 * - liked
 * - watched
 * - in watchlist
 * - rated
 */
export const getUserMovieIds = async (
    uid: string,
    limit = 15
): Promise<number[]> => {
    try {
        const user =
            await getUserDocument(uid);

        if (!user) {
            return [];
        }

        const ids = new Set<number>();

        // Liked
        user.liked.forEach((id) => {
            if (typeof id === "number") {
                ids.add(id);
            }
        });

        // Watched
        user.watched.forEach((id) => {
            if (typeof id === "number") {
                ids.add(id);
            }
        });

        // Watchlist
        user.watchlist.forEach((id) => {
            if (typeof id === "number") {
                ids.add(id);
            }
        });

        // Rated
        Object.keys(user.rated).forEach(
            (id) => {
                const movieId =
                    Number(id);

                if (
                    Number.isInteger(
                        movieId
                    )
                ) {
                    ids.add(movieId);
                }
            }
        );

        const movieIds =
            Array.from(ids);

        // Randomize
        for (
            let i = movieIds.length - 1;
            i > 0;
            i--
        ) {
            const j =
                Math.floor(
                    Math.random() *
                    (i + 1)
                );

            [
                movieIds[i],
                movieIds[j],
            ] = [
                movieIds[j],
                movieIds[i],
            ];
        }

        return movieIds.slice(
            0,
            limit
        );

    } catch {
        return [];
    }
};


/* =========================================================
   GET USER LIKED IDS
========================================================= */

export const getUserLikedMovieIds =
    async (
        uid: string
    ): Promise<number[]> => {

        const user =
            await getUserDocument(uid);

        return user?.liked ?? [];
    };


/* =========================================================
   GET USER WATCHED IDS
========================================================= */

export const getUserWatchedMovieIds =
    async (
        uid: string
    ): Promise<number[]> => {

        const user =
            await getUserDocument(uid);

        return user?.watched ?? [];
    };


/* =========================================================
   GET USER WATCHLIST IDS
========================================================= */

export const getUserWatchlistMovieIds =
    async (
        uid: string
    ): Promise<number[]> => {

        const user =
            await getUserDocument(uid);

        return user?.watchlist ?? [];
    };


/* =========================================================
   GET USER RATINGS
========================================================= */

export const getUserRatings = async (
    uid: string
): Promise<Record<string, number>> => {

    const user =
        await getUserDocument(uid);

    return user?.rated ?? {};
};


/* =========================================================
   GET EVERYTHING NEEDED FOR LLM
========================================================= */

export const getUserMovieInteractions =
    async (uid: string) => {

        const user =
            await getUserDocument(uid);

        if (!user) {
            return {
                liked: [],
                watched: [],
                watchlist: [],
                rated: {},
            };
        }

        return {
            liked: user.liked,
            watched: user.watched,
            watchlist: user.watchlist,
            rated: user.rated,
        };
    };