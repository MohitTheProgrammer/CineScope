export const getStream = async (tmdbId: string) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/stream/movie/${tmdbId}`
        );

        const data = await response.json();


        return data;
    } catch {
        return undefined;
    }
};
