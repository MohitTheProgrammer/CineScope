import type { HowItWorksGenre } from "../../data/howItWorks";

interface GenreSignalsDemoProps {
    genres: HowItWorksGenre[];
    activeGenre: number;
    onGenreChange: (index: number) => void;
}

const GenreSignalsDemo = ({
    genres,
    activeGenre,
    onGenreChange,
}: GenreSignalsDemoProps) => {
    return (
        <div className="w-full max-w-lg">
            <div
                className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    p-7
                "
            >
                <div className="flex items-center gap-4">
                    <div
                        className="
                            flex
                            size-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-(--accent-primary)/10
                        "
                    >
                        <span className="text-2xl font-black text-(--accent-primary)">
                            #
                        </span>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                            Your genre signals
                        </p>

                        <h3 className="mt-1 text-lg font-black">
                            A taste starts taking shape.
                        </h3>
                    </div>
                </div>

                <div className="mt-8 space-y-5">
                    {genres.map((genre, index) => {
                        const Icon = genre.icon;
                        const active = activeGenre === index;

                        return (
                            <button
                                type="button"
                                key={genre.name}
                                onClick={() =>
                                    onGenreChange(index)
                                }
                                className="
                                    block
                                    w-full
                                    text-left
                                "
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-sm font-bold">
                                        <Icon
                                            className={`
                                                size-4
                                                ${
                                                    active
                                                        ? "text-(--accent-primary)"
                                                        : "text-white/40"
                                                }
                                            `}
                                        />

                                        {genre.name}
                                    </span>

                                    <span className="text-xs font-black text-white/40">
                                        {genre.percentage}%
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                                    <div
                                        className={`
                                            h-full
                                            rounded-full
                                            ${genre.color}
                                            transition-all
                                            duration-500
                                        `}
                                        style={{
                                            width: `${genre.percentage}%`,
                                            opacity: active
                                                ? 1
                                                : 0.65,
                                        }}
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div
                    className="
                        mt-7
                        rounded-2xl
                        border
                        border-(--accent-primary)/10
                        bg-(--accent-primary)/5
                        p-4
                    "
                >
                    <p className="text-xs leading-5 text-white/45">
                        Your strongest signal right now is{" "}
                        <strong className="text-white">
                            {genres[activeGenre]?.name}
                        </strong>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GenreSignalsDemo;