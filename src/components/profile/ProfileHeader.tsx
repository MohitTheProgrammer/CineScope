import type { UserData } from "../../types/user";

interface Avatar {
    id: string;
    src: string;
}

interface ProfileHeaderProps {
    user: UserData;
    avatar: Avatar;
    loggingOut: boolean;
    onLogout: () => void;
}

const ProfileHeader = ({
    user,
    avatar,
    loggingOut,
    onLogout,
}: ProfileHeaderProps) => {
    return (
        <section
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.035]
                p-6
                shadow-[0_20px_80px_rgba(0,0,0,0.35)]
                sm:p-8
                lg:p-10
            "
        >
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    size-72
                    rounded-full
                    bg-(--accent-primary)/10
                    blur-3xl
                "
            />

            <div
                className="
                    relative
                    flex
                    flex-col
                    gap-8
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >
                <div className="flex min-w-0 items-center gap-5 sm:gap-7">
                    <div className="relative shrink-0">
                        <div
                            className="
                                size-24
                                overflow-hidden
                                rounded-full
                                border-2
                                border-(--accent-primary)/60
                                bg-white/5
                                shadow-[0_0_35px_var(--accent-glow)]
                                sm:size-28
                            "
                        >
                            <img
                                src={avatar.src}
                                alt={user.displayName}
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
                        </div>

                        <span
                            className="
                                absolute
                                bottom-1
                                right-1
                                size-4
                                rounded-full
                                border-2
                                border-(--bg-primary)
                                bg-emerald-400
                            "
                        />
                    </div>

                    <div className="min-w-0">
                        <p
                            className="
                                mb-1
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.25em]
                                text-(--accent-primary)
                            "
                        >
                            CineScope Member
                        </p>

                        <h1
                            className="
                                truncate
                                text-2xl
                                font-black
                                tracking-tight
                                text-white
                                sm:text-3xl
                            "
                        >
                            {user.displayName}
                        </h1>

                        <p
                            className="
                                mt-1
                                truncate
                                text-sm
                                text-white/45
                            "
                        >
                            {user.email}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onLogout}
                    disabled={loggingOut}
                    className="
                        shrink-0
                        rounded-xl
                        border
                        border-red-500/20
                        bg-red-500/5
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-red-400
                        transition-all
                        duration-300
                        hover:border-red-500/40
                        hover:bg-red-500/10
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {loggingOut
                        ? "Logging out..."
                        : "Log out"}
                </button>
            </div>
        </section>
    );
};

export default ProfileHeader;