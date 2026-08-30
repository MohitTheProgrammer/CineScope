import { signOut, updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../services/firebase";
import { updateUserProfile } from "../services/userService";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileEditor from "../components/profile/ProfileEditor";
import ProfileSkeleton from "../components/profile/ProfileSkeleton";
import type { UserData } from "../types/user";
import { AVATARS } from "../constent/file";

const DEFAULT_AVATAR = "avatar-1";

const ProfilePage = () => {
    const navigate = useNavigate();

    const [userData, setUserData] =
        useState<UserData | null>(null);

    const [displayName, setDisplayName] =
        useState("");

    const [selectedAvatar, setSelectedAvatar] =
        useState(DEFAULT_AVATAR);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [loggingOut, setLoggingOut] =
        useState(false);

    useEffect(() => {
        let cancelled = false;

        const loadProfile = async () => {
            const user = auth.currentUser;

            if (!user) {
                navigate("/login", {
                    replace: true,
                });

                return;
            }

            try {
                const userRef = doc(
                    db,
                    "users",
                    user.uid
                );

                const snapshot =
                    await getDoc(userRef);

                if (cancelled) return;

                const data = snapshot.exists()
                    ? snapshot.data()
                    : {};

                const profile: UserData = {
                    uid: user.uid,

                    displayName:
                        data.displayName ??
                        user.displayName ??
                        "CineScope User",

                    email:
                        data.email ??
                        user.email ??
                        "",

                    avatarId:
                        data.avatarId ??
                        DEFAULT_AVATAR,
                };

                setUserData(profile);
                setDisplayName(profile.displayName);
                setSelectedAvatar(profile.avatarId);
            } catch {
                return;
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void loadProfile();

        return () => {
            cancelled = true;
        };
    }, [navigate]);

    const handleSaveProfile = async () => {
        const user = auth.currentUser;

        if (!user || !userData || saving) {
            return;
        }

        const name = displayName.trim();

        if (!name) {
            return;
        }

        try {
            setSaving(true);

            await updateUserProfile(
                user.uid,
                name,
                selectedAvatar
            );

            await updateProfile(user, {
                displayName: name,
            });

            setUserData((previous) =>
                previous
                    ? {
                        ...previous,
                        displayName: name,
                        avatarId: selectedAvatar,
                    }
                    : previous
            );
        } catch {
            return;
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        if (loggingOut) return;

        try {
            setLoggingOut(true);

            await signOut(auth);

            navigate("/login", {
                replace: true,
            });
        } catch {

            setLoggingOut(false);
        }
    };

    if (loading) {
        return <ProfileSkeleton />;
    }

    if (!userData) {
        return null;
    }

    const currentAvatar =
        AVATARS.find(
            (avatar) =>
                avatar.id === userData.avatarId
        ) ?? AVATARS[0];

    return (
        <main
            className="
                min-h-screen
                bg-(--bg-primary)
                px-5
                pb-20
                pt-28
                sm:px-6
                lg:px-8
            "
        >
            <div className="mx-auto max-w-7xl">
                <ProfileHeader
                    user={userData}
                    avatar={currentAvatar}
                    loggingOut={loggingOut}
                    onLogout={handleLogout}
                />

                <ProfileEditor
                    displayName={displayName}
                    selectedAvatar={selectedAvatar}
                    saving={saving}
                    onDisplayNameChange={
                        setDisplayName
                    }
                    onAvatarChange={
                        setSelectedAvatar
                    }
                    onSave={handleSaveProfile}
                />
            </div>
        </main>
    );
};

export default ProfilePage;
