import useForYou from "../hooks/forYou/useForYou";

import ForYouHeader from "../components/forYou/ForYouHeader";
import RecommendationCTA from "../components/forYou/RecommendationCTA";
import MovieDNAHero from "../components/forYou/MovieDNAHero";
import TopGenres from "../components/forYou/TopGenres";
import TasteBreakdown from "../components/forYou/TasteBreakdown";
import PersonalitySection from "../components/forYou/PersonalitySection";
import GenreRanking from "../components/forYou/GenreRanking";
import TasteMovies from "../components/forYou/TasteMovies";
import ForYouSkeleton from "../components/forYou/ForYouSkeleton";
import ForYouEmpty from "../components/forYou/ForYouEmpty";
import ForYouError from "../components/forYou/ForYouError";

const ForYou = () => {
    const {
        movies,
        loading,
        error,
        rankedGenres,
        topGenre,
        activity,
        tasteMovies,
    } = useForYou();

    // Loading state

    if (loading) {
        return <ForYouSkeleton />;
    }

    // Error state

    if (error) {
        return (
            <ForYouError
                message={error}
            />
        );
    }

    // Empty state

    if (!movies.length) {
        return <ForYouEmpty />;
    }

    return (
        <main
            className="
                min-h-screen
                bg-(--bg-primary)
                text-white
            "
        >
            {/* Page header */}

            <ForYouHeader />

            {/* Movie recommendation CTA */}

            <RecommendationCTA />

            {/* Movie DNA */}

            {topGenre && (
                <MovieDNAHero
                    topGenre={topGenre}
                    totalMovies={movies.length}
                />
            )}

            {/* Top genres */}

            <TopGenres
                genres={rankedGenres}
            />

            {/* User activity */}

            <TasteBreakdown
                activity={activity}
            />

            {/* Personality */}

            {topGenre && (
                <PersonalitySection
                    topGenre={topGenre}
                    genres={rankedGenres}
                />
            )}

            {/* Complete genre DNA */}

            <GenreRanking
                genres={rankedGenres}
            />

            {/* Movies that shaped the user's taste */}

            <TasteMovies
                movies={tasteMovies}
            />
        </main>
    );
};

export default ForYou;