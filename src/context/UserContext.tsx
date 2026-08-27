/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    onAuthStateChanged,
    signOut,
    type User,
} from "firebase/auth";

import { auth } from "../services/firebase";

interface UserContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(
    undefined
);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({
    children,
}: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error(
            "useUser must be used inside UserProvider"
        );
    }

    return context;
};
