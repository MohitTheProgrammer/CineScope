import type { ReactNode } from "react";

import type { Movie, Video } from "../../types/movie";

import {
    PlayIcon,
    ChevronDownIcon,
    LoadingIcon,
} from "../../assets/icons/Icons";

interface WatchOptionsProps {
    movie: Movie;

    trailer: Video | null;
    loadingTrailer: boolean;

    showCineScopePlayer: boolean;
    showTrailer: boolean;

    isLoggedIn: boolean

    onToggleCineScopePlayer: () => void;
    onToggleTrailer: () => void;

    player: ReactNode;
}

const WatchOptions = ({
    movie,
    trailer,
    loadingTrailer,
    showCineScopePlayer,
    showTrailer,
    onToggleCineScopePlayer,
    onToggleTrailer,
    player,
    isLoggedIn
}: WatchOptionsProps) => {
    return (
     isLoggedIn &&   <section className="mx-auto max-w-7xl px-6 pb-16 pt-11 lg:px-8">

            <div>
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
                        CineScope
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
                    Watch Now
                </h2>
            </div>


            <div className="mt-6 space-y-3">

                <div>
                    <WatchOptionButton
                        icon={<PlayIcon className="size-5" />}
                        title="Watch Movie on CineScope"
                        description={
                            showCineScopePlayer
                                ? "Click to stop and close the player"
                                : `Watch ${movie.title} directly on CineScope`
                        }
                        open={showCineScopePlayer}
                        onClick={
                            onToggleCineScopePlayer
                        }
                    />


                    <div
                        className={`
                            grid
                            transition-all
                            duration-500
                            ease-out
                            ${showCineScopePlayer
                                ? "mt-5 grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }
                        `}
                    >
                        <div className="overflow-hidden">
                            {showCineScopePlayer && (
                                <div
                                    className="
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-(--accent-primary)/15
                                        bg-black
                                        shadow-[0_20px_70px_rgba(0,0,0,0.45)]
                                    "
                                >
                                    {player}
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                <div>
                    <WatchOptionButton
                        icon={
                            <PlayIcon className="size-5" />
                        }
                        title="Watch Trailer"
                        description={
                            loadingTrailer
                                ? "Finding the official trailer..."
                                : !trailer
                                    ? "No trailer available for this movie"
                                    : showTrailer
                                        ? "Click to stop and close the trailer"
                                        : "Watch the official trailer"
                        }
                        open={showTrailer}
                        disabled={
                            loadingTrailer ||
                            !trailer
                        }
                        loading={loadingTrailer}
                        onClick={onToggleTrailer}
                    />


                    <div
                        className={`
                            grid
                            transition-all
                            duration-500
                            ease-out
                            ${showTrailer &&
                                trailer
                                ? "mt-5 grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }
                        `}
                    >
                        <div className="overflow-hidden">
                            {showTrailer &&
                                trailer && (
                                    <div
                                        className="
                                            overflow-hidden
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-black
                                            shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                                        "
                                    >
                                        <TrailerFrame
                                            trailer={trailer}
                                        />
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


interface WatchOptionButtonProps {
    icon: ReactNode;
    title: string;
    description: string;

    open: boolean;

    disabled?: boolean;
    loading?: boolean;

    onClick: () => void;
}

const WatchOptionButton = ({
    icon,
    title,
    description,
    open,
    disabled = false,
    loading = false,
    onClick,
}: WatchOptionButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-expanded={open}
            className="
                group
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                border-white/10
                bg-white/[0.035]
                px-5
                py-5
                text-left
                transition-all
                duration-300
                hover:border-(--accent-primary)/30
                hover:bg-white/6
                disabled:cursor-not-allowed
                disabled:opacity-40
            "
        >

            <div className="flex min-w-0 items-center gap-4">
                <div
                    className="
                        flex
                        size-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        text-white/70
                        transition-all
                        duration-300
                        group-hover:border-(--accent-primary)/30
                        group-hover:bg-(--accent-primary)/10
                        group-hover:text-(--accent-primary)
                    "
                >
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">
                        {title}
                    </p>

                    <p className="mt-1 truncate text-xs text-white/40">
                        {description}
                    </p>
                </div>
            </div>


            <div className="ml-4 flex shrink-0 items-center gap-3">
                {loading && <LoadingIcon className="size-4" />}

                <ChevronDownIcon
                    className={`
                        size-5
                        text-white/35
                        transition-transform
                        duration-300
                        ${open ? "rotate-180" : ""}
                    `}
                />
            </div>
        </button>
    );
};


const TrailerFrame = ({
    trailer,
}: {
    trailer: Video;
}) => {
    return (
        <div className="relative aspect-video w-full bg-black">
            <iframe
                key={trailer.key}
                src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
                title={trailer.name}
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                "
                allow="
                    accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture;
                    web-share
                "
                allowFullScreen
            />
        </div>
    );
};

export default WatchOptions;