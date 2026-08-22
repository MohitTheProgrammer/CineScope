import axios from "axios";

const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
    },
});

export const getPopularMovies = async (page = 1) => {
    const response = await tmdb.get("/movie/popular", {
        params: {
            page,
        },
    });

    return response.data;
};

export const getMovieVideos = async (movieId: number) => {
    const response = await tmdb.get(
        `/movie/${movieId}/videos`
    );

    return response.data;
};


export default tmdb;