import { useEffect, useState } from "react";
import TrendingSection from "../components/TrendingSection";
import { getTrendingMovies } from "../services/tmdb";
import type { Movie } from "../types/movie";
import { ArrowIcon } from "../assets/icons/Icons";
import Stat from "../components/Stat";

const Home = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getTrendingMovies();

                setMovies(data.results);
            } catch (error) {
                console.error("Failed to load movies:", error);
                setError("Unable to load movies right now.");
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    return (
        <div className="min-h-screen bg-(--bg-primary)">
            <Hero />

            <TrendingSection
                movies={movies}
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default Home;

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

const Hero = () => {
    return (
        <section className="relative min-h-180 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src="https://image.tmdb.org/t/p/original/7iwUUcKURMT7aKfCwMy6YnGtchD.jpg"
                    alt=""
                    aria-hidden="true"
                    className="
                        h-full
                        w-full
                        object-cover
                        object-center
                        opacity-40
                    "
                />

                {/* Left gradient */}
                <div
                    className="
                        absolute inset-0
                        bg-linear-to-r
                        from-(--bg-primary)
                        via-(--bg-primary)/85
                        to-transparent
                    "
                />

                {/* Bottom gradient */}
                <div
                    className="
                        absolute inset-0
                        bg-linear-to-t
                        from-(--bg-primary)
                        via-transparent
                        to-transparent
                    "
                />
            </div>

            {/* Accent glow */}
            <div
                className="
                    absolute
                    -left-40
                    top-1/3
                    size-96
                    rounded-full
                    bg-(--accent-primary)/15
                    blur-[120px]
                "
            />

            {/* Content */}
            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-180
                    max-w-7xl
                    items-center
                    px-6
                    pb-16
                    pt-28
                    lg:px-8
                "
            >
                <div className="max-w-2xl">
                    {/* Eyebrow */}
                    <div className="mb-5 flex items-center gap-3">
                        <span
                            className="
                                h-px
                                w-8
                                bg-(--accent-primary)
                                shadow-[0_0_10px_var(--accent-glow)]
                            "
                        />

                        <span
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.25em]
                                text-(--accent-primary)
                            "
                        >
                            Your next obsession
                        </span>
                    </div>

                    {/* Heading */}
                    <h1
                        className="
                            text-5xl
                            font-black
                            leading-[0.92]
                            tracking-tighter
                            text-white
                            sm:text-6xl
                            lg:text-8xl
                        "
                    >
                        Discover
                        <br />

                        <span className="text-(--accent-primary)">
                            something
                        </span>

                        <br />

                        unforgettable.
                    </h1>

                    {/* Description */}
                    <p
                        className="
                            mt-7
                            max-w-xl
                            text-sm
                            leading-6
                            text-white/60
                            sm:text-base
                        "
                    >
                        Stop scrolling endlessly. Discover movies worth
                        watching and find your next favorite based on
                        what you already love.
                    </p>

                    {/* Actions */}
                    <div className="mt-8 flex flex-wrap gap-3">
                        <button
                            type="button"
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                bg-(--accent-primary)
                                px-6
                                py-3
                                text-sm
                                font-bold
                                text-white
                                shadow-[0_0_25px_var(--accent-glow)]
                                transition-all
                                duration-300
                                hover:scale-105
                                hover:shadow-[0_0_40px_var(--accent-glow)]
                            "
                        >
                            Explore Movies

                            <ArrowIcon />
                        </button>

                        <button
                            type="button"
                            className="
                                rounded-full
                                border
                                border-white/15
                                bg-white/5
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                text-white/80
                                backdrop-blur-md
                                transition-all
                                duration-300
                                hover:border-white/30
                                hover:bg-white/10
                                hover:text-white
                            "
                        >
                            How it works
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-12 flex items-center gap-8">
                        <Stat value="10K+" label="Movies" />
                        <Stat value="500K+" label="Ratings" />
                        <Stat value="AI" label="Recommendations" />
                    </div>
                </div>
            </div>
        </section>
    );
};
