import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc
} from "firebase/firestore";

import { db } from "../services/firebase";

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