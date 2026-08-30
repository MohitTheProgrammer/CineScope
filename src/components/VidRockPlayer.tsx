import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

import {
    FilmIcon,
    DnaIcon,
    SparklesIcon,
    ArrowRightIcon,
} from "../assets/icons/Icons";

interface VidRockPlayerProps {
    tmdbId: number;
    title: string;
}

const VidRockPlayer = ({
    tmdbId,
    title,
}: VidRockPlayerProps) => {
    const { user, loading: authLoading } = useUser();

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIsLoading(false);
        }, 3500);

        return () => {
            window.clearTimeout(timer);
        };
    }, [tmdbId]);

    /*
     * ------------------------------------------------------------
     * VidRock source
     * ------------------------------------------------------------
     *
     * The source is only created for authenticated users.
     */
    const playerUrl =
        !authLoading && user
            ? `https://vidrock.net/movie/${tmdbId}?autoplay=true&download=true`
            : undefined;

    /*
     * ------------------------------------------------------------
     * Player loading state
     * ------------------------------------------------------------
     */

    useEffect(() => {
        if (!user || authLoading) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
    }, [user, authLoading, tmdbId]);

    /*
     * ------------------------------------------------------------
     * Authentication state
     * ------------------------------------------------------------
     */

    if (authLoading) {
        return (
            <PlayerSection>
                <PlayerLoading />
            </PlayerSection>
        );
    }

    if (!user) {
        return (
            <PlayerSection>
                <LoginRequired title={title} />
            </PlayerSection>
        );
    }

    /*
     * ------------------------------------------------------------
     * Player
     * ------------------------------------------------------------
     */

    return (
        <PlayerSection>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                {/* Top accent line */}

                <div
                    className="
                        absolute
                        inset-x-0
                        top-0
                        z-20
                        h-px
                        bg-linear-to-r
                        from-transparent
                        via-(--accent-primary)
                        to-transparent
                    "
                />

                {/* Player */}

                <div className="relative aspect-video w-full bg-black">
                    {isLoading && (
                        <div
                            className="
                                absolute
                                inset-0
                                z-10
                                flex
                                flex-col
                                items-center
                                justify-center
                                bg-black
                            "
                        >
                            <div
                                className="
                                    absolute
                                    size-48
                                    rounded-full
                                    bg-(--accent-primary)/8
                                    blur-3xl
                                    animate-pulse
                                "
                            />

                            <div
                                className="
                                    relative
                                    flex
                                    size-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-(--accent-primary)/20
                                    bg-(--accent-primary)/10
                                    text-(--accent-primary)
                                "
                            >
                                <FilmIcon className="size-6" />
                            </div>

                            <p
                                className="
                                    relative
                                    mt-4
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-(--accent-primary)
                                "
                            >
                                Loading movie
                            </p>

                            <div className="relative mt-3 flex gap-1.5">
                                <span className="size-1.5 animate-bounce rounded-full bg-(--accent-primary)" />

                                <span className="size-1.5 animate-bounce rounded-full bg-(--accent-primary) [animation-delay:150ms]" />

                                <span className="size-1.5 animate-bounce rounded-full bg-(--accent-primary) [animation-delay:300ms]" />
                            </div>
                        </div>
                    )}

                    <iframe
                        key={tmdbId}
                        src={playerUrl}
                        title={title}
                        allow="
                            autoplay;
                            fullscreen;
                            picture-in-picture;
                            encrypted-media
                        "
                        allowFullScreen
                        loading="eager"
                        referrerPolicy="strict-origin-when-cross-origin"
                        onLoad={() => setIsLoading(false)}
                        className="absolute inset-0 h-full w-full border-0 bg-black"
                    />
                </div>
            </div>

            {/* Small player information */}

            <div className="mt-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <span
                        className="
                            flex
                            size-5
                            items-center
                            justify-center
                            rounded-md
                            bg-(--accent-primary)/10
                            text-(--accent-primary)
                        "
                    >
                        <DnaIcon className="size-3" />
                    </span>

                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">
                        CineScope Player
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-green-400" />

                    <span className="text-[10px] font-medium text-white/25">
                        Ready to watch
                    </span>
                </div>
            </div>
        </PlayerSection>
    );
};

/* ========================================================================== */
/* Player Section                                                              */
/* ========================================================================== */

interface PlayerSectionProps {
    children: React.ReactNode;
}

const PlayerSection = ({
    children,
}: PlayerSectionProps) => {
    return (
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
            {/* Section heading */}

            <div className="mb-6">
                <div className="flex items-center gap-2">
                    <span
                        className="
                            size-1.5
                            rounded-full
                            bg-(--accent-primary)
                            shadow-[0_0_10px_var(--accent-glow)]
                        "
                    />

                    <span
                        className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.25em]
                            text-(--accent-primary)
                        "
                    >
                        Watch
                    </span>
                </div>

                <h2
                    className="
                        mt-2
                        text-2xl
                        font-black
                        tracking-tight
                        text-white
                        sm:text-3xl
                    "
                >
                    Watch Movie
                </h2>
            </div>

            {children}
        </section>
    );
};

/* ========================================================================== */
/* Loading                                                                     */
/* ========================================================================== */

const PlayerLoading = () => {
    return (
        <div
            className="
                flex
                aspect-video
                flex-col
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/5
            "
        >
            <div
                className="
                    flex
                    size-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-(--accent-primary)/20
                    bg-(--accent-primary)/10
                    text-(--accent-primary)
                "
            >
                <DnaIcon className="size-6 animate-pulse" />
            </div>

            <p
                className="
                    mt-4
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-(--accent-primary)
                "
            >
                Checking account
            </p>

            <p className="mt-2 text-xs text-white/30">
                Preparing your watch session...
            </p>

            <div className="mt-4 flex gap-1.5">
                <span className="size-1.5 animate-bounce rounded-full bg-(--accent-primary)" />

                <span className="size-1.5 animate-bounce rounded-full bg-(--accent-primary) [animation-delay:150ms]" />

                <span className="size-1.5 animate-bounce rounded-full bg-(--accent-primary) [animation-delay:300ms]" />
            </div>
        </div>
    );
};

/* ========================================================================== */
/* Login Required                                                              */
/* ========================================================================== */

interface LoginRequiredProps {
    title: string;
}

const LoginRequired = ({
    title,
}: LoginRequiredProps) => {
    const navigate = useNavigate();

    return (
        <div
            className="
                relative
                flex
                aspect-video
                flex-col
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/[0.035]
                px-6
                text-center
            "
        >
            {/* Subtle accent glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    size-64
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-(--accent-primary)/6
                    blur-3xl
                "
            />

            {/* Icon */}

            <div
                className="
                    relative
                    flex
                    size-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-(--accent-primary)/20
                    bg-(--accent-primary)/10
                    text-(--accent-primary)
                "
            >
                <FilmIcon className="size-7" />
            </div>

            {/* Text */}

            <div className="relative">
                <p
                    className="
                        mt-5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-(--accent-primary)
                    "
                >
                    CineScope Watch
                </p>

                <h2
                    className="
                        mt-2
                        text-2xl
                        font-black
                        tracking-tight
                        text-white
                        sm:text-3xl
                    "
                >
                    Login to watch
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/35">
                    Sign in to CineScope to watch{" "}
                    <span className="font-semibold text-white/60">
                        {title}
                    </span>
                    .
                </p>
            </div>

            {/* Login button */}

            <button
                type="button"
                onClick={() => navigate("/login")}
                className="
                    group
                    relative
                    mt-6
                    inline-flex
                    h-11
                    items-center
                    gap-2
                    rounded-xl
                    bg-(--accent-primary)
                    px-6
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_10px_35px_var(--accent-glow)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_15px_45px_var(--accent-glow)]
                "
            >
                Login to Watch

                <ArrowRightIcon
                    className="
                        size-4
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                    "
                />
            </button>

            {/* Small hint */}

            <div
                className="
                    relative
                    mt-4
                    flex
                    items-center
                    gap-2
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-white/20
                "
            >
                <SparklesIcon className="size-3 text-(--accent-primary)" />

                Your account unlocks the player
            </div>
        </div>
    );
};

export default VidRockPlayer;