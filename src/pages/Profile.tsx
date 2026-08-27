import { useEffect, useState } from "react";
import { signOut, updateProfile } from "firebase/auth";
import {
    doc,
    getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../services/firebase";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";
import { updateUserProfile } from "../services/userService";
import { getLikedMovies } from "../services/movie";

const AVATARS = [
    {
        id: "avatar-1",
        src: "/avatars/avatar-1.png",
    },
    {
        id: "avatar-2",
        src: "/avatars/avatar-2.png",
    },
    {
        id: "avatar-3",
        src: "/avatars/avatar-3.png",
    },
    {
        id: "avatar-4",
        src: "/avatars/avatar-4.png",
    },
    {
        id: "avatar-5",
        src: "/avatars/avatar-5.png",
    },
    {
        id: "avatar-6",
        src: "/avatars/avatar-6.png",
    },
];

interface UserData {
    uid: string;
    displayName: string;
    email: string;
    avatarId: string;
}

const ProfilePage = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState<UserData | null>(null);
    const [likedMovies, setLikedMovies] = useState<Movie[]>([]);

    const [loading, setLoading] = useState(true);
    const [moviesLoading, setMoviesLoading] = useState(true);

    const [editing, setEditing] = useState(false);
    const [displayName, setDisplayName] = useState("");

    const [selectedAvatar, setSelectedAvatar] =
        useState("avatar-1");

    const [saving, setSaving] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    // -------------------------------------------------------------------------
    // Load user profile
    // -------------------------------------------------------------------------

    useEffect(() => {
        const loadProfile = async () => {
            const user = auth.currentUser;

            if (!user) {
                navigate("/login");
                return;
            }

            try {
                const userRef = doc(db, "users", user.uid);
                const snapshot = await getDoc(userRef);

                if (snapshot.exists()) {
                    const data = snapshot.data();

                    const profile: UserData = {
                        uid: user.uid,
                        displayName:
                            data.displayName ||
                            user.displayName ||
                            "CineScope User",
                        email:
                            data.email ||
                            user.email ||
                            "",
                        avatarId:
                            data.avatarId ||
                            "avatar-1",
                    };

                    setUserData(profile);
                    setDisplayName(profile.displayName);
                    setSelectedAvatar(profile.avatarId);
                } else {
                    // Fallback if Firestore document doesn't exist.
                    const profile: UserData = {
                        uid: user.uid,
                        displayName:
                            user.displayName ||
                            "CineScope User",
                        email: user.email || "",
                        avatarId: "avatar-1",
                    };

                    setUserData(profile);
                    setDisplayName(profile.displayName);
                    setSelectedAvatar(profile.avatarId);
                }
            } catch (error) {
                console.error(
                    "Failed to load profile:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [navigate]);

    // -------------------------------------------------------------------------
    // Load liked movies
    // -------------------------------------------------------------------------

    useEffect(() => {
        const loadLikedMovies = async () => {
            const user = auth.currentUser;

            if (!user) {
                return;
            }

            try {
                setMoviesLoading(true);

                const savedLikedMovies = await getLikedMovies(user.uid);

                const movies: Movie[] = savedLikedMovies.map(
                    (movie) => {

                        return {
                            id: movie.id,
                            title: movie.title,
                            poster_path:
                                movie.posterPath,
                            release_date: "",
                            vote_average: movie.voteAverage,
                            genre_ids: movie.genreIds,
                            backdrop_path: null,
                            adult: false,
                            original_language: "",
                            original_title: movie.title,
                            overview: "",
                            popularity: 0,
                            video: false,
                            vote_count: 0,
                        };
                    }
                );

                setLikedMovies(movies);
            } catch (error) {
                console.error(
                    "Failed to load liked movies:",
                    error
                );
            } finally {
                setMoviesLoading(false);
            }
        };

        loadLikedMovies();
    }, []);

    // -------------------------------------------------------------------------
    // Save profile
    // -------------------------------------------------------------------------


    const handleSaveProfile = async () => {
        const user = auth.currentUser;

        if (!user || !userData) {
            return;
        }

        const trimmedName = displayName.trim();

        if (!trimmedName) {
            return;
        }

        try {
            setSaving(true);

            await updateUserProfile(
                user.uid,
                trimmedName,
                selectedAvatar
            );

            await updateProfile(user, {
                displayName: trimmedName,
            });

            setUserData((previous) =>
                previous
                    ? {
                        ...previous,
                        displayName: trimmedName,
                        avatarId: selectedAvatar,
                    }
                    : previous
            );

            setEditing(false);
        } catch (error) {
            console.error(
                "Failed to update profile:",
                error
            );
        } finally {
            setSaving(false);
        }
    };

    // -------------------------------------------------------------------------
    // Logout
    // -------------------------------------------------------------------------

    const handleLogout = async () => {
        try {
            setLoggingOut(true);

            await signOut(auth);

            navigate("/login", {
                replace: true,
            });
        } catch (error) {
            console.error(
                "Failed to logout:",
                error
            );
        } finally {
            setLoggingOut(false);
        }
    };

    // -------------------------------------------------------------------------
    // Loading
    // -------------------------------------------------------------------------

    if (loading) {
        return (
            <main className="min-h-screen bg-black px-6 pb-20 pt-32">
                <div className="mx-auto max-w-7xl">
                    <div className="h-10 w-48 animate-pulse rounded-lg bg-white/10" />

                    <div className="mt-8 h-64 animate-pulse rounded-3xl border border-white/10 bg-white/5" />

                    <div className="mt-12 h-8 w-52 animate-pulse rounded-lg bg-white/10" />
                </div>
            </main>
        );
    }

    if (!userData) {
        return null;
    }

    const currentAvatar =
        AVATARS.find(
            (avatar) =>
                avatar.id === userData.avatarId
        ) || AVATARS[0];

    return (
        <main className="min-h-screen bg-black px-5 pb-20 pt-28 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* ---------------------------------------------------------------- */}
                {/* Profile Header */}
                {/* ---------------------------------------------------------------- */}

                <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">

                    {/* Background glow */}

                    <div className="pointer-events-none absolute -right-32 -top-32 size-72 rounded-full bg-(--accent-primary)/10 blur-3xl" />

                    <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

                        {/* User */}

                        <div className="flex items-center gap-5 sm:gap-7">

                            {/* Avatar */}

                            <div className="relative shrink-0">

                                <div className="size-24 overflow-hidden rounded-full border-2 border-(--accent-primary)/60 bg-white/5 shadow-[0_0_35px_var(--accent-glow)] sm:size-28">

                                    <img
                                        src={currentAvatar.src}
                                        alt={userData.displayName}
                                        className="h-full w-full object-cover"
                                    />

                                </div>

                                <span className="absolute bottom-1 right-1 size-4 rounded-full border-2 border-black bg-emerald-400" />

                            </div>

                            {/* Details */}

                            <div className="min-w-0">

                                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-(--accent-primary)">
                                    CineScope Member
                                </p>

                                <h1 className="truncate text-2xl font-black tracking-tight text-white sm:text-3xl">
                                    {userData.displayName}
                                </h1>

                                <p className="mt-1 truncate text-sm text-white/45">
                                    {userData.email}
                                </p>

                            </div>

                        </div>

                        {/* Actions */}

                        <div className="flex flex-wrap gap-3">

                            <button
                                type="button"
                                onClick={() =>
                                    setEditing(
                                        (value) =>
                                            !value
                                    )
                                }
                                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-(--accent-primary)/50 hover:bg-(--accent-primary)/10 hover:text-white"
                            >
                                {editing
                                    ? "Cancel"
                                    : "Edit Profile"}
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="rounded-full border border-red-500/20 bg-red-500/5 px-5 py-2.5 text-sm font-semibold text-red-400 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loggingOut
                                    ? "Logging out..."
                                    : "Log out"}
                            </button>

                        </div>

                    </div>

                    {/* ---------------------------------------------------------------- */}
                    {/* Stats */}
                    {/* ---------------------------------------------------------------- */}

                    <div className="relative mt-8 grid grid-cols-2 gap-3 border-t border-white/5 pt-6 sm:grid-cols-3">

                        <Stat
                            value={likedMovies.length}
                            label="Liked Movies"
                        />

                        <Stat
                            value="0"
                            label="Ratings"
                        />

                        <Stat
                            value="0"
                            label="Watched"
                            className="col-span-2 sm:col-span-1"
                        />

                    </div>

                </section>

                {/* ---------------------------------------------------------------- */}
                {/* Edit Profile */}
                {/* ---------------------------------------------------------------- */}

                {editing && (
                    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">

                        <div className="mb-6">

                            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-(--accent-primary)">
                                Profile Settings
                            </p>

                            <h2 className="mt-2 text-2xl font-black text-white">
                                Customize your profile
                            </h2>

                        </div>

                        {/* Display name */}

                        <div className="max-w-xl">

                            <label
                                htmlFor="displayName"
                                className="mb-2 block text-xs font-semibold text-white/60"
                            >
                                Display name
                            </label>

                            <input
                                id="displayName"
                                type="text"
                                value={displayName}
                                onChange={(event) =>
                                    setDisplayName(
                                        event.target
                                            .value
                                    )
                                }
                                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-(--accent-primary)/60 focus:ring-1 focus:ring-(--accent-primary)/30"
                            />

                        </div>

                        {/* Avatar selection */}

                        <div className="mt-7">

                            <p className="mb-4 text-xs font-semibold text-white/60">
                                Choose your avatar
                            </p>

                            <div className="flex flex-wrap gap-4">

                                {AVATARS.map(
                                    (avatar) => {
                                        const active =
                                            selectedAvatar ===
                                            avatar.id;

                                        return (
                                            <button
                                                key={
                                                    avatar.id
                                                }
                                                type="button"
                                                onClick={() =>
                                                    setSelectedAvatar(
                                                        avatar.id
                                                    )
                                                }
                                                className={`relative size-16 overflow-hidden rounded-full border-2 transition-all duration-300 sm:size-20 ${active
                                                    ? "scale-105 border-(--accent-primary) shadow-[0_0_25px_var(--accent-glow)]"
                                                    : "border-white/10 opacity-60 hover:scale-105 hover:border-white/30 hover:opacity-100"
                                                    }`}
                                            >
                                                <img
                                                    src={
                                                        avatar.src
                                                    }
                                                    alt="Avatar"
                                                    className="h-full w-full object-cover"
                                                />

                                                {active && (
                                                    <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                        <CheckIcon />
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    }
                                )}

                            </div>

                        </div>

                        {/* Save */}

                        <button
                            type="button"
                            onClick={
                                handleSaveProfile
                            }
                            disabled={saving}
                            className="mt-8 rounded-xl bg-(--accent-primary) px-6 py-3 text-sm font-bold text-white shadow-[0_0_25px_var(--accent-glow)] transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </section>
                )}

                {/* ---------------------------------------------------------------- */}
                {/* Liked Movies */}
                {/* ---------------------------------------------------------------- */}

                <section className="mt-12">

                    <div className="mb-7 flex items-end justify-between">

                        <div>

                            <div className="mb-2 flex items-center gap-2">

                                <span className="size-1.5 rounded-full bg-(--accent-primary) shadow-[0_0_10px_var(--accent-primary)]" />

                                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-(--accent-primary)">
                                    Your Collection
                                </span>

                            </div>

                            <h2 className="text-3xl font-black capitalize tracking-tight text-white sm:text-4xl">
                                Liked Movies
                            </h2>

                        </div>

                        {likedMovies.length > 0 && (
                            <span className="text-xs font-medium text-white/35">
                                {likedMovies.length}{" "}
                                {likedMovies.length ===
                                    1
                                    ? "movie"
                                    : "movies"}
                            </span>
                        )}

                    </div>

                    {/* Loading */}

                    {moviesLoading && (
                        <div className="flex gap-5 overflow-hidden">

                            {Array.from({
                                length: 5,
                            }).map(
                                (_, index) => (
                                    <div
                                        key={index}
                                        className="w-44 shrink-0 sm:w-48 lg:w-52"
                                    >
                                        <div className="aspect-2/3 animate-pulse rounded-2xl bg-white/5" />

                                        <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-white/5" />
                                    </div>
                                )
                            )}

                        </div>
                    )}

                    {/* Empty */}

                    {!moviesLoading &&
                        likedMovies.length ===
                        0 && (
                            <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/2 px-6 text-center">

                                <div className="mb-5 flex size-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/30">
                                    <HeartIcon />
                                </div>

                                <h3 className="text-lg font-bold text-white">
                                    Your collection is
                                    empty
                                </h3>

                                <p className="mt-2 max-w-md text-sm leading-6 text-white/40">
                                    Movies you like will
                                    appear here. Start
                                    exploring and build
                                    your personal
                                    collection.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/trending"
                                        )
                                    }
                                    className="mt-5 rounded-full bg-(--accent-primary) px-5 py-2.5 text-xs font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_25px_var(--accent-glow)]"
                                >
                                    Explore Movies
                                </button>

                            </div>
                        )}

                    {/* Movies */}

                    {!moviesLoading &&
                        likedMovies.length >
                        0 && (
                            <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

                                {likedMovies.map(
                                    (movie) => (
                                        <MovieCard
                                            key={
                                                movie.id
                                            }
                                            {...movie}
                                            orientation="vertical"
                                        />
                                    )
                                )}

                            </div>
                        )}

                </section>

            </div>
        </main>
    );
};

// -----------------------------------------------------------------------------
// Stat
// -----------------------------------------------------------------------------

interface StatProps {
    value: number | string;
    label: string;
    className?: string;
}

const Stat = ({
    value,
    label,
    className = "",
}: StatProps) => {
    return (
        <div
            className={`rounded-2xl border border-white/5 bg-black/20 px-4 py-4 ${className}`}
        >
            <p className="text-xl font-black text-white">
                {value}
            </p>

            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/35">
                {label}
            </p>
        </div>
    );
};

// -----------------------------------------------------------------------------
// Icons
// -----------------------------------------------------------------------------

const CheckIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 text-white"
        aria-hidden="true"
    >
        <path d="m5 12 4 4L19 6" />
    </svg>
);

const HeartIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
        aria-hidden="true"
    >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
);

export default ProfilePage;
