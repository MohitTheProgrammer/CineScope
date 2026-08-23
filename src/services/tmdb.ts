import axios from "axios";

import { type Movie } from "../types/movie";

const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",

    headers: {
        Authorization: `Bearer ${
            import.meta.env.VITE_TMDB_ACCESS_TOKEN
        }`,
        accept: "application/json",
    },
});

export const getTrendingMovies = async (page = 1) => {
    const response = await tmdb.get("/trending/movie/week", {
        params: {
            page,
        },
    });

    return response.data;
};

export const getPopularMovies = async (page = 1) => {
    const response = await tmdb.get("/movie/popular", {
        params: {
            page,
        },
    });

    return response.data;
};

export const getMovieById = async (movieId: number) => {
    const response = await tmdb.get(`/movie/${movieId}`, {
        params: {
            language: "en-US",
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

export const searchMovies = async (
    query: string
): Promise<Movie[]> => {
    const response = await tmdb.get("/search/movie", {
        params: {
            query,
            include_adult: true,
            language: "en-US",
            page: 1,
        },
    });

    return response.data.results;
};

export default tmdb;