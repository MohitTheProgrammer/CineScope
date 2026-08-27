import { getUserMovieIds } from "./userService";

const TMDB_IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/original";

const FALLBACK_BACKDROPS = [
    "https://image.tmdb.org/t/p/original/7iwUUcKURMT7aKfCwMy6YnGtchD.jpg",

    // Add your other fallback backdrop URLs here.
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

/* -------------------------------------------------------------------------- */
/* Get Random Hero Backdrop                                                   */
/* -------------------------------------------------------------------------- */

export const getRandomHeroBackdrop = async (
    userId: string
): Promise<string | null> => {
    try {
        const apiKey =
            import.meta.env.VITE_TMDB_API_KEY;

        if (!apiKey) {
            console.error(
                "TMDB API key is missing"
            );

            return getFallbackBackdrop();
        }

        /*
         * Get up to 15 movie IDs from the user's
         * personal movie collection.
         */
        const movieIds =
            await getUserMovieIds(userId, 15);

        /*
         * No movies yet → fallback.
         */
        if (!movieIds.length) {
            return getFallbackBackdrop();
        }

        /*
         * Fetch backdrops only for those 15 movies.
         */
        const responses =
            await Promise.allSettled(
                movieIds.map(async (movieId) => {
                    const response =
                        await fetch(
                            `${"https://api.themoviedb.org/3"}/movie/${movieId}/images?api_key=${apiKey}&include_image_language=en,null`
                        );

                    if (!response.ok) {
                        throw new Error(
                            `Failed to fetch images for movie ${movieId}: ${response.status}`
                        );
                    }

                    return response.json() as Promise<TMDBImagesResponse>;
                })
            );

        /*
         * Keep only successful TMDB responses.
         */
        const backdrops = responses
            .filter(
                (
                    result
                ): result is PromiseFulfilledResult<TMDBImagesResponse> =>
                    result.status ===
                    "fulfilled"
            )
            .flatMap(
                (result) =>
                    result.value.backdrops
            );

        /*
         * Nothing usable → fallback.
         */
        if (!backdrops.length) {
            return getFallbackBackdrop();
        }

        /*
         * Prefer large cinematic backdrops.
         */
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

        /*
         * Sort the best TMDB images first.
         */
        const sortedBackdrops =
            [...pool].sort(
                (a, b) =>
                    b.vote_average -
                    a.vote_average
            );

        /*
         * Don't always use the #1 image.
         * Pick randomly from the best 20.
         */
        const topBackdrops =
            sortedBackdrops.slice(0, 20);

        const randomIndex =
            Math.floor(
                Math.random() *
                    topBackdrops.length
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

        return getFallbackBackdrop();
    }
};

/* -------------------------------------------------------------------------- */
/* Fallback                                                                    */
/* -------------------------------------------------------------------------- */

const getFallbackBackdrop = (): string | null => {
    if (!FALLBACK_BACKDROPS.length) {
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() *
            FALLBACK_BACKDROPS.length
    );

    return FALLBACK_BACKDROPS[randomIndex];
};