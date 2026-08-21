import axios from "axios";

const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
    },
});

export const getPopularMovies = async () => {
    const response = await tmdb.get("/movie/popular");

    return response.data;
};


export default tmdb;