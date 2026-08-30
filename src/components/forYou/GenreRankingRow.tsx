import type { RankedGenre } from "../../hooks/forYou/useForYou";

interface GenreRankingRowProps {
    genre: RankedGenre;
}

const GenreRankingRow = ({
    genre,
}: GenreRankingRowProps) => {
    const GenreIcon = genre.icon;

    return (
        <div
            className="
                group
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-white/10
                bg-white/2.5
                p-4
                transition-all
                duration-300
                hover:border-(--accent-primary)/30
                hover:bg-(--accent-primary)/5
            "
        >

            <span
                className="
                    w-7
                    text-center
                    text-xs
                    font-black
                    text-white/20
                "
            >
                #{genre.rank}
            </span>


            <div
                className="
                    flex
                    size-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-(--accent-primary)/20
                    bg-(--accent-primary)/10
                    text-(--accent-primary)
                "
            >
                <GenreIcon className="size-4.5" />
            </div>


            <div className="min-w-0 flex-1">
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    "
                >
                    <span className="text-sm font-black">
                        {genre.name}
                    </span>

                    <span
                        className="
                            text-xs
                            font-black
                            text-(--accent-primary)
                        "
                    >
                        {genre.score}
                    </span>
                </div>


                <div
                    className="
                        mt-2
                        h-1.5
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
                            shadow-[0_0_10px_var(--accent-glow)]
                            transition-all
                            duration-700
                        "
                        style={{
                            width: `${genre.percentage}%`,
                        }}
                    />
                </div>
            </div>


            <span
                className="
                    hidden
                    w-12
                    text-right
                    text-xs
                    font-bold
                    text-white/30
                    sm:block
                "
            >
                {genre.percentage}%
            </span>
        </div>
    );
};

export default GenreRankingRow;