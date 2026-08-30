import { useNavigate } from "react-router-dom";

import useRecommendations from "../hooks/recommendation/useRecommendations";
import RecommendationHeader from "../components/recommend/RecommendationHeader";
import RecommendationLoading from "../components/recommend/RecommendationLoading";
import RecommendationError from "../components/recommend/RecommendationError";
import RecommendationEmpty from "../components/recommend/RecommendationEmpty";
import RecommendationResults from "../components/recommend/RecommendationResults";

const Recommend = () => {
    const navigate = useNavigate();

    const {
        movies,
        loading,
        error,
        generateRecommendations,
    } = useRecommendations();

    return (
        <main
            className="
                min-h-screen
                overflow-hidden
                bg-(--bg-primary)
                text-white
            "
        >
            <RecommendationHeader />

            {loading && (
                <RecommendationLoading />
            )}

            {!loading && error && (
                <RecommendationError
                    message={error}
                    onRetry={generateRecommendations}
                />
            )}

            {!loading &&
                !error &&
                movies.length === 0 && (
                    <RecommendationEmpty />
                )}

            {!loading &&
                !error &&
                movies.length > 0 && (
                    <RecommendationResults
                        movies={movies}
                        onRegenerate={
                            generateRecommendations
                        }
                        onMovieClick={(movieId) =>
                            navigate(
                                `/movie/${movieId}`
                            )
                        }
                    />
                )}
        </main>
    );
};

export default Recommend;