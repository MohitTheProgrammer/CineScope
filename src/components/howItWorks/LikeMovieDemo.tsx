import {
    FilmIcon,
    HeartIcon,
} from "../../assets/icons/Icons";

interface LikeMovieDemoProps {
    liked: boolean;
    onToggle: () => void;
}

const LikeMovieDemo = ({
    liked,
    onToggle,
}: LikeMovieDemoProps) => {
    return (
        <div className="relative mx-auto max-w-sm">
            <div
                className={`
                    overflow-hidden
                    rounded-3xl
                    border
                    transition-all
                    duration-500
                    ${
                        liked
                            ? "border-(--accent-primary)/50 shadow-[0_20px_70px_var(--accent-glow)]"
                            : "border-white/10"
                    }
                `}
            >
                <div
                    className="
                        relative
                        aspect-2/3
                        bg-linear-to-br
                        from-orange-500/30
                        via-red-500/10
                        to-transparent
                    "
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <FilmIcon
                            className={`
                                size-20
                                transition-all
                                duration-500
                                ${
                                    liked
                                        ? "text-(--accent-primary) drop-shadow-[0_0_25px_var(--accent-glow)]"
                                        : "text-white/50"
                                }
                            `}
                        />

                        <h3 className="mt-5 text-2xl font-black">
                            A Movie
                        </h3>

                        <p className="mt-2 text-sm text-white/35">
                            Your choice matters.
                        </p>
                    </div>

                    <div
                        className="
                            absolute
                            inset-x-0
                            bottom-0
                            bg-linear-to-t
                            from-black
                            to-transparent
                            p-6
                            pt-20
                        "
                    >
                        <p className="text-xs uppercase tracking-widest text-white/30">
                            Your signal
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                            <HeartIcon
                                className={`
                                    size-4
                                    ${
                                        liked
                                            ? "fill-current text-(--accent-primary)"
                                            : "text-white/40"
                                    }
                                `}
                            />

                            <span className="text-sm font-bold">
                                {liked
                                    ? "Added to your taste profile"
                                    : "Waiting for your signal"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={onToggle}
                className="
                    mt-5
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-3
                    text-sm
                    font-bold
                    transition-all
                    hover:border-(--accent-primary)
                    hover:bg-(--accent-primary)
                "
            >
                <HeartIcon
                    className={`
                        size-4
                        ${liked ? "fill-current" : ""}
                    `}
                />

                {liked
                    ? "You liked it"
                    : "Like this movie"}
            </button>
        </div>
    );
};

export default LikeMovieDemo;