export const getStream = async (tmdbId: string) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/stream/movie/${tmdbId}`
        );

        const data = await response.json();

        console.log(data);

        return data;
    } catch (error) {
        console.error("Failed to get stream:", error);
    }
};