import type { Movie } from "../types/movie";
import type { UserMovie } from "../services/userService";

export const userMovieToMovie = (
    movie: UserMovie
): Movie => ({
    id: movie.movieId,
    title: movie.title,
    poster_path: movie.posterPath,
    genre_ids: movie.genreIds,
    vote_average: movie.voteAverage,

    adult: false,
    backdrop_path: null,
    original_language: "",
    original_title: movie.title,
    overview: "",
    popularity: 0,
    release_date: "",
    video: false,
    vote_count: 0,
});