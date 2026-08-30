import MovieCard from "../MovieCard";

import type { UserMovie } from "../../services/userService";
import { userMovieToMovie } from "../../utils/movieMapper";

interface TasteMoviesProps {
    movies: UserMovie[];
}

const TasteMovies = ({
    movies,
}: TasteMoviesProps) => {
    if (!movies.length) {
        return null;
    }

    return (
        <section
            className="
                mx-auto
                max-w-7xl
                px-6
                pb-24
                lg:px-8
            "
        >
            <div>
                <p
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-(--accent-primary)
                    "
                >
                    Your collection
                </p>

                <h2
                    className="
                        mt-2
                        text-3xl
                        font-black
                        tracking-tight
                        text-white
                    "
                >
                    Movies That Shaped Your Taste
                </h2>
            </div>

            <div className="mt-3 flex items-center gap-2">
                <p className="text-sm text-white/35">
                    These movies helped build your
                    recommendation profile.
                </p>
            </div>

            <div
                className="
                    mt-7
                    grid
                    grid-cols-2
                    gap-4
                    sm:grid-cols-3
                    md:grid-cols-4
                "
            >
                {movies.map((userMovie) => {
                    const movie =
                        userMovieToMovie(userMovie);

                    return (
                        <MovieCard
                            key={movie.id}
                            {...movie}
                            orientation="vertical"
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default TasteMovies;