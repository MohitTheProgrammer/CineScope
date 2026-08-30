import {
    FilmIcon,
    DnaIcon,
} from "../../assets/icons/Icons";

import type { RankedGenre } from "../../hooks/forYou/useForYou";

interface MovieDNAHeroProps {
    topGenre: RankedGenre;
    totalMovies: number;
}

const MovieDNAHero = ({
    topGenre,
    totalMovies,
}: MovieDNAHeroProps) => {
    const GenreIcon = topGenre.icon;

    return (
        <section
            className="
                mx-auto
                max-w-7xl
                px-6
                pt-12
                lg:px-8
            "
        >
            <div
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    p-6
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
                        size-96
                        rounded-full
                        bg-(--accent-primary)/10
                        blur-3xl
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-40
                        left-1/3
                        size-80
                        rounded-full
                        bg-(--accent-primary)/5
                        blur-3xl
                    "
                />

                <div
                    className="
                        relative
                        grid
                        gap-10
                        lg:grid-cols-[1fr_280px]
                        lg:items-center
                    "
                >
                    <div>

                        <div className="flex items-center gap-4">
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
                                    shadow-[0_0_35px_var(--accent-glow)]
                                "
                            >
                                <GenreIcon className="size-7" />
                            </div>

                            <div>
                                <p
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-white/35
                                    "
                                >
                                    Your #1 genre
                                </p>

                                <h2 className="text-3xl font-black">
                                    {topGenre.name}
                                </h2>
                            </div>
                        </div>


                        <p
                            className="
                                mt-6
                                max-w-xl
                                text-lg
                                leading-8
                                text-white/60
                            "
                        >
                            {topGenre.name} is currently
                            the strongest signal in your
                            movie taste. CineScope will use
                            this preference when finding
                            your next movie.
                        </p>


                        <div className="mt-8 flex flex-wrap gap-3">
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-(--accent-primary)/20
                                    bg-(--accent-primary)/10
                                    px-4
                                    py-2
                                    text-xs
                                    font-bold
                                    text-(--accent-primary)
                                "
                            >
                                <FilmIcon className="size-3.5" />

                                {topGenre.score} genre points
                            </div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-4
                                    py-2
                                    text-xs
                                    font-bold
                                    text-white/60
                                "
                            >
                                <DnaIcon className="size-3.5" />

                                {totalMovies} movies analyzed
                            </div>
                        </div>
                    </div>


                    <div className="relative flex justify-center">
                        <div
                            className="
                                relative
                                flex
                                size-56
                                flex-col
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-(--accent-primary)/20
                                bg-(--accent-primary)/5
                                shadow-[0_0_80px_var(--accent-glow)]
                            "
                        >
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-3
                                    rounded-full
                                    border
                                    border-(--accent-primary)/10
                                "
                            />

                            <span
                                className="
                                    relative
                                    text-6xl
                                    font-black
                                "
                            >
                                {topGenre.percentage}%
                            </span>

                            <span
                                className="
                                    relative
                                    mt-1
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-white/35
                                "
                            >
                                of your taste
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MovieDNAHero;