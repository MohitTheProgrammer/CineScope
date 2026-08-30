import {
    DnaIcon,
    SparklesIcon,
} from "../../assets/icons/Icons";

import MovieRevealCard from "./MovieRevealCard";

import type { RecommendedMovie } from "../../hooks/recommendation/useRecommendations";

interface RecommendationResultsProps {
    movies: RecommendedMovie[];
    onRegenerate: () => void;
    onMovieClick: (movieId: number) => void;
}

const RecommendationResults = ({
    movies,
    onRegenerate,
    onMovieClick,
}: RecommendationResultsProps) => {
    const firstMovie = movies[0];
    const otherMovies = movies.slice(1);

    return (
        <section
            className="
                relative
                mx-auto
                max-w-7xl
                px-6
                pb-28
                lg:px-8
            "
        >
            <div
                className="
                    mb-8
                    flex
                    flex-col
                    gap-6
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                "
            >
                <div>
                    <div className="flex items-center gap-2">
                        <SparklesIcon className="size-4 text-(--accent-primary)" />

                        <span
                            className="
                                text-[10px]
                                font-black
                                uppercase
                                tracking-[0.3em]
                                text-(--accent-primary)
                            "
                        >
                            The algorithm has spoken
                        </span>
                    </div>

                    <h2
                        className="
                            mt-2
                            text-3xl
                            font-black
                            tracking-tight
                            sm:text-4xl
                        "
                    >
                        Three movies.
                        <br />

                        <span className="text-white/35">
                            One very good night.
                        </span>
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={onRegenerate}
                    className="
                        group
                        inline-flex
                        w-fit
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-(--accent-primary)/25
                        bg-(--accent-primary)/10
                        px-5
                        py-3
                        text-xs
                        font-black
                        text-(--accent-primary)
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-(--accent-primary)/50
                        hover:bg-(--accent-primary)/15
                        hover:shadow-[0_15px_45px_var(--accent-glow)]
                    "
                >
                    <SparklesIcon
                        className="
                            size-4
                            transition-transform
                            duration-500
                            group-hover:rotate-180
                        "
                    />

                    Find Another Trio
                </button>
            </div>

            {firstMovie && (
                <MovieRevealCard
                    movie={firstMovie}
                    rank={1}
                    label="FIRST PICK"
                    featured
                    onClick={() =>
                        onMovieClick(firstMovie.id)
                    }
                />
            )}

            {otherMovies.length > 0 && (
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {otherMovies.map(
                        (movie, index) => (
                            <MovieRevealCard
                                key={movie.id}
                                movie={movie}
                                rank={index + 2}
                                label={
                                    index === 0
                                        ? "SECOND PICK"
                                        : "THIRD PICK"
                                }
                                onClick={() =>
                                    onMovieClick(
                                        movie.id
                                    )
                                }
                            />
                        )
                    )}
                </div>
            )}

            <div
                className="
                    mt-12
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                "
            >
                <div
                    className="
                        flex
                        size-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-(--accent-primary)/15
                        bg-(--accent-primary)/5
                        text-(--accent-primary)
                    "
                >
                    <DnaIcon className="size-4" />
                </div>

                <p className="mt-4 text-xs text-white/25">
                    Recommendations powered by your Movie DNA
                </p>
            </div>
        </section>
    );
};

export default RecommendationResults;