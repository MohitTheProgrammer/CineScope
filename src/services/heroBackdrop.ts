const TMDB_IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/original";

const HERO_MOVIE_IDS = [
    438631,
    693134,
    603692,
    872585,
    299534,
    569094,
    385687,
    346698,
    27205,
    155,
];

interface TMDBBackdrop {
    file_path: string;
    width: number;
    height: number;
    vote_average: number;
    vote_count: number;
}

interface TMDBImagesResponse {
    backdrops: TMDBBackdrop[];
}

export const getRandomHeroBackdrop = async (): Promise<
    string | null
> => {
    try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        if (!apiKey) {
            console.error("TMDB API key is missing");
            return null;
        }

        const responses = await Promise.all(
            HERO_MOVIE_IDS.map(async (movieId) => {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}&include_image_language=en,null`
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch images for movie ${movieId}: ${response.status}`
                    );
                }

                return response.json() as Promise<TMDBImagesResponse>;
            })
        );

        const backdrops = responses.flatMap(
            (response) => response.backdrops
        );

        if (!backdrops.length) {
            return null;
        }

        const cinematicBackdrops =
            backdrops.filter(
                (backdrop) =>
                    backdrop.width >= 1920 &&
                    backdrop.height >= 1080
            );

        const pool =
            cinematicBackdrops.length > 0
                ? cinematicBackdrops
                : backdrops;

        const sortedBackdrops = [...pool].sort(
            (a, b) =>
                b.vote_average - a.vote_average
        );

        const topBackdrops =
            sortedBackdrops.slice(0, 20);

        const randomIndex = Math.floor(
            Math.random() * topBackdrops.length
        );

        return (
            TMDB_IMAGE_BASE_URL +
            topBackdrops[randomIndex].file_path
        );
    } catch (error) {
        console.error(
            "Failed to load hero backdrop:",
            error
        );

        return null;
    }
};