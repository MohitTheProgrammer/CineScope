import {
    CheckIcon,
    LoadingIcon,
    PlusIcon,
    StarIcon,
} from "../../assets/icons/Icons";

interface MovieActionsProps {
    hasBeenReleased: boolean;

    checkingWatchlist: boolean;
    addingToWatchlist: boolean;
    watchlistAdded: boolean;

    checkingWatched: boolean;
    addingWatched: boolean;
    watched: boolean;

    checkingRated: boolean;
    savingRating: boolean;
    rated: boolean;
    userRating: number | null;
    ratingOpen: boolean;

    onAddToWatchlist: () => void;
    onAddWatched: () => void;
    onToggleRating: () => void;
    onRateMovie: (rating: number) => void;
}

const MovieActions = ({
    hasBeenReleased,

    checkingWatchlist,
    addingToWatchlist,
    watchlistAdded,

    checkingWatched,
    addingWatched,
    watched,

    checkingRated,
    savingRating,
    rated,
    userRating,
    ratingOpen,

    onAddToWatchlist,
    onAddWatched,
    onToggleRating,
    onRateMovie,
}: MovieActionsProps) => {
    return (
        <section
            className="
                mx-auto
                max-w-7xl
                px-4
                pb-10
                sm:px-6
                lg:px-8
            "
        >
            <div
                className="
                    flex
                    flex-wrap
                    items-center
                    gap-2.5
                "
            >

                <button
                    type="button"
                    onClick={onAddToWatchlist}
                    disabled={
                        checkingWatchlist ||
                        addingToWatchlist ||
                        watchlistAdded
                    }
                    className={`
                        ${buttonClass}
                        ${
                            watchlistAdded
                                ? `
                                    border-(--accent-primary)/25
                                    bg-(--accent-primary)/10
                                    text-(--accent-primary)
                                `
                                : ""
                        }
                    `}
                >
                    {checkingWatchlist ? (
                        <>
                            <LoadingIcon className="size-4" />
                            <span>Checking...</span>
                        </>
                    ) : watchlistAdded ? (
                        <>
                            <CheckIcon className="size-4" />
                            <span>
                                Added to Watchlist
                            </span>
                        </>
                    ) : addingToWatchlist ? (
                        <>
                            <LoadingIcon className="size-4" />
                            <span>Adding...</span>
                        </>
                    ) : (
                        <>
                            <PlusIcon className="size-4" />
                            <span>
                                Add to Watchlist
                            </span>
                        </>
                    )}
                </button>


                {hasBeenReleased && (
                    <button
                        type="button"
                        onClick={onAddWatched}
                        disabled={
                            checkingWatched ||
                            addingWatched ||
                            watched
                        }
                        className={`
                            ${buttonClass}
                            ${
                                watched
                                    ? `
                                        border-white/15
                                        bg-white/8
                                        text-white/50
                                    `
                                    : ""
                            }
                        `}
                    >
                        {checkingWatched ? (
                            <>
                                <LoadingIcon className="size-4" />
                                <span>
                                    Checking...
                                </span>
                            </>
                        ) : watched ? (
                            <>
                                <CheckIcon className="size-4" />
                                <span>
                                    Marked as Watched
                                </span>
                            </>
                        ) : addingWatched ? (
                            <>
                                <LoadingIcon className="size-4" />
                                <span>
                                    Marking...
                                </span>
                            </>
                        ) : (
                            <>
                                <CheckIcon className="size-4" />
                                <span>
                                    Mark as Watched
                                </span>
                            </>
                        )}
                    </button>
                )}


                {hasBeenReleased && (
                    <div
                        className="
                            relative
                            min-w-0
                        "
                    >
                        <button
                            type="button"
                            onClick={onToggleRating}
                            disabled={
                                checkingRated ||
                                savingRating ||
                                rated
                            }
                            aria-expanded={ratingOpen}
                            className={`
                                ${buttonClass}
                                ${
                                    rated
                                        ? `
                                            border-(--accent-secondary)/20
                                            bg-(--accent-secondary)/5
                                            text-white/60
                                        `
                                        : ""
                                }
                            `}
                        >
                            {checkingRated ? (
                                <>
                                    <LoadingIcon className="size-4" />

                                    <span>
                                        Checking...
                                    </span>
                                </>
                            ) : rated ? (
                                <>
                                    <StarIcon
                                        className="
                                            size-4
                                            text-(--accent-secondary)
                                        "
                                    />

                                    <span>
                                        {userRating
                                            ? `Your rating: ${userRating}/5`
                                            : "Rated"}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <StarIcon
                                        className="
                                            size-4
                                            text-(--accent-secondary)
                                        "
                                    />

                                    <span>
                                        Rate Movie
                                    </span>
                                </>
                            )}
                        </button>


                        {ratingOpen && !rated && (
                            <div
                                className="
                                    absolute
                                    top-full
                                    z-50
                                    mt-2

                                    left-1/2
                                    -translate-x-1/2

                                    w-max
                                    max-w-[calc(100vw-2rem)]

                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-[#0d0a0d]
                                    p-2

                                    shadow-[0_15px_50px_rgba(0,0,0,0.55)]
                                    backdrop-blur-xl

                                    sm:left-0
                                    sm:translate-x-0
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-1
                                    "
                                >
                                    {[1, 2, 3, 4, 5].map(
                                        (rating) => (
                                            <button
                                                key={rating}
                                                type="button"
                                                onClick={() =>
                                                    onRateMovie(
                                                        rating
                                                    )
                                                }
                                                disabled={
                                                    savingRating
                                                }
                                                aria-label={`Rate ${rating} out of 5`}
                                                className="
                                                    flex
                                                    size-9
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-lg

                                                    text-xs
                                                    font-black
                                                    text-white/45

                                                    transition-all
                                                    duration-200

                                                    hover:bg-(--accent-primary)
                                                    hover:text-white
                                                    hover:shadow-[0_0_15px_var(--accent-glow)]

                                                    active:scale-95

                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-50
                                                "
                                            >
                                                {savingRating ? (
                                                    <LoadingIcon className="size-4" />
                                                ) : (
                                                    rating
                                                )}
                                            </button>
                                        )
                                    )}
                                </div>

                                <p
                                    className="
                                        mt-1
                                        whitespace-nowrap
                                        px-1
                                        text-center
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-widest
                                        text-white/20
                                    "
                                >
                                    Choose your rating
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};


const buttonClass = `
    inline-flex
    h-11
    max-w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-white/10
    bg-white/[0.035]
    px-4
    text-xs
    font-bold
    text-white/70
    backdrop-blur-md
    transition-all
    duration-300
    ease-out

    hover:-translate-y-0.5
    hover:border-(--accent-primary)/50
    hover:bg-(--accent-primary)/10
    hover:text-white
    hover:shadow-[0_8px_30px_var(--accent-glow)]

    active:translate-y-0
    active:scale-[0.97]

    disabled:cursor-not-allowed
    disabled:opacity-60

    sm:px-5
`;

export default MovieActions;