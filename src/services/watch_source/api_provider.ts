import  tmdb  from "../tmdb";

export const getMovieWatchProviders = async (
    movieId: number,
    region = "IN"
) => {
    const response = await tmdb.get(
        `/movie/${movieId}/watch/providers`
    );

    return response.data.results?.[region] ?? null;
};