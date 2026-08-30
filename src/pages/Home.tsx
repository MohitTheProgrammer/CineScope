import MoviesSection from "../components/MoviesSection";
import Hero from "../components/home/Hero";

import { useUser } from "../context/UserContext";

import useHomeMovies from "../hooks/home/useHomeMovies";

const Home = () => {
    const { user } = useUser();

    const {
        trendingMovies,
        popularMovies,

        trendingLoading,
        popularLoading,

        trendingError,
        popularError,
    } = useHomeMovies();

    return (
        <main className="min-h-screen bg-(--bg-primary)">
            <Hero uid={user?.uid} />

            <MoviesSection
                movies={trendingMovies}
                loading={trendingLoading}
                error={trendingError}
                title="trending movies"
                redirectLink="/trending"
                subtitle="right now"
                id="trending"
            />

            <MoviesSection
                movies={popularMovies}
                loading={popularLoading}
                error={popularError}
                title="popular movies"
                redirectLink="/popular"
                subtitle="among people"
                id="popular"
            />
        </main>
    );
};

export default Home;