import {
    doc,
    serverTimestamp,
    setDoc
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