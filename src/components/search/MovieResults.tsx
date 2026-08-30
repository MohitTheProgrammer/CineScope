import MovieCard from "../MovieCard";

import type { Movie } from "../../types/movie";

interface MovieResultsProps {
    movies: Movie[];
}

const MovieResults = ({
    movies,
}: MovieResultsProps) => {
    return (
        <div
            className="
                grid
                grid-cols-2
                gap-x-5
                gap-y-10
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
            "
        >
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    {...movie}
                    orientation="vertical"
                />
            ))}
        </div>
    );
};

export default MovieResults;