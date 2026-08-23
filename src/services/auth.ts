import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

import { auth } from "./firebase";
import { createUserDocument } from "../services/userService";

export const registerUser = async (
    name: string,
    email: string,
    password: string,
    avatarId: string
) => {
    const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

    const user = userCredential.user;

    await updateProfile(user, {
        displayName: name,
    });

    await createUserDocument(user.uid, {
        displayName: name,
        email: user.email ?? email,
        avatarId,
    });

    return user;
};

export const loginUser = async (
    email: string,
    password: string
) => {
    const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    return userCredential.user;
};