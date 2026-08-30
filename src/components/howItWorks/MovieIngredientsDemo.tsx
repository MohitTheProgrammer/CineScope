import {
    FilmIcon,
    FlameIcon,
    SearchIcon,
    SparklesIcon,
} from "../../assets/icons/Icons";

const MovieIngredientsDemo = () => {
    const ingredients = [
        {
            icon: FlameIcon,
            genre: "Action",
        },
        {
            icon: SearchIcon,
            genre: "Mystery",
        },
        {
            icon: SparklesIcon,
            genre: "Comedy",
        },
    ];

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
                        <FilmIcon
                            className="
                                size-7
                                text-(--accent-primary)
                            "
                        />
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                            Movie ingredients
                        </p>

                        <h3 className="mt-1 text-lg font-black">
                            What makes a movie yours?
                        </h3>
                    </div>
                </div>

                <div className="mt-7 space-y-3">
                    {ingredients.map(
                        ({ icon: Icon, genre }, index) => (
                            <div
                                key={genre}
                                className="
                                    flex
                                    items-center
                                    gap-4
                                    rounded-2xl
                                    border
                                    border-white/5
                                    bg-white/2.5
                                    p-4
                                    transition-all
                                    hover:border-(--accent-primary)/30
                                    hover:bg-white/5
                                "
                            >
                                <span
                                    className="
                                        flex
                                        size-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-(--accent-primary)/10
                                    "
                                >
                                    <Icon
                                        className="
                                            size-5
                                            text-(--accent-primary)
                                        "
                                    />
                                </span>

                                <div className="flex-1">
                                    <p className="text-sm font-bold">
                                        {genre}
                                    </p>

                                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                                        <div
                                            className="
                                                h-full
                                                rounded-full
                                                bg-(--accent-primary)
                                            "
                                            style={{
                                                width: `${
                                                    85 -
                                                    index * 18
                                                }%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <span className="text-xs font-bold text-white/30">
                                    signal
                                </span>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieIngredientsDemo;