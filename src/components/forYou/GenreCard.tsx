import type { RankedGenre } from "../../hooks/forYou/useForYou";

interface GenreCardProps {
    genre: RankedGenre;
}

const GenreCard = ({
    genre,
}: GenreCardProps) => {
    const GenreIcon = genre.icon;

    return (
        <div
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/[0.035]
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-(--accent-primary)/30
                hover:bg-(--accent-primary)/5
            "
        >
            {/* Glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    size-24
                    rounded-full
                    bg-(--accent-primary)/10
                    blur-2xl
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                "
            />

            {/* Top */}

            <div
                className="
                    relative
                    flex
                    items-center
                    justify-between
                "
            >
                <div
                    className="
                        flex
                        size-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-(--accent-primary)/20
                        bg-(--accent-primary)/10
                        text-(--accent-primary)
                    "
                >
                    <GenreIcon className="size-5" />
                </div>

                <span
                    className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-widest
                        text-white/20
                    "
                >
                    #{genre.rank}
                </span>
            </div>

            {/* Genre name */}

            <h3
                className="
                    relative
                    mt-5
                    text-base
                    font-black
                    text-white
                "
            >
                {genre.name}
            </h3>

            {/* Description */}

            <p
                className="
                    relative
                    mt-1
                    text-xs
                    leading-5
                    text-white/30
                "
            >
                {genre.description}
            </p>

            {/* Score */}

            <div
                className="
                    relative
                    mt-5
                    flex
                    items-end
                    justify-between
                "
            >
                <span
                    className="
                        text-2xl
                        font-black
                        text-(--accent-primary)
                    "
                >
                    {genre.percentage}%
                </span>

                <span
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-white/20
                    "
                >
                    taste
                </span>
            </div>

            {/* Progress */}

            <div
                className="
                    relative
                    mt-3
                    h-1
                    overflow-hidden
                    rounded-full
                    bg-white/10
                "
            >
                <div
                    className="
                        h-full
                        rounded-full
                        bg-(--accent-primary)
                        shadow-[0_0_12px_var(--accent-glow)]
                        transition-all
                        duration-700
                    "
                    style={{
                        width: `${genre.percentage}%`,
                    }}
                />
            </div>
        </div>
    );
};

export default GenreCard;