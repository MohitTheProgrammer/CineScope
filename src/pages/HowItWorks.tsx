import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";

import HowItWorksHero from "../components/howItWorks/HowItWorksHero";
import LoggedInStatus from "../components/howItWorks/LoggedInStatus";
import HowItWorksStep from "../components/howItWorks/HowItWorksStep";

import LikeMovieDemo from "../components/howItWorks/LikeMovieDemo";
import MovieIngredientsDemo from "../components/howItWorks/MovieIngredientsDemo";
import GenreSignalsDemo from "../components/howItWorks/GenreSignalsDemo";
import RatingDemo from "../components/howItWorks/RatingDemo";
import MovieDNAProcessDemo from "../components/howItWorks/MovieDNAProcessDemo";
import MovieDNAResult from "../components/howItWorks/MovieDNAResult";

import { HOW_IT_WORKS_GENRES } from "../data/howItWorks";

const HowItWorks = () => {
    const navigate = useNavigate();

    const { user, loading } = useUser();

    const [rating, setRating] = useState(4.5);
    const [liked, setLiked] = useState(false);
    const [activeGenre, setActiveGenre] = useState(0);

    if (loading) {
        return (
            <main
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-(--bg-primary)
                "
            >
                <div
                    className="
                        size-7
                        animate-spin
                        rounded-full
                        border-2
                        border-white/10
                        border-t-(--accent-primary)
                    "
                />
            </main>
        );
    }

    return (
        <main
            className="
                min-h-screen
                overflow-hidden
                bg-(--bg-primary)
                text-white
            "
        >
            {/* ---------------------------------------------------------- */}
            {/* Hero                                                       */}
            {/* ---------------------------------------------------------- */}

            <HowItWorksHero
                isLoggedIn={Boolean(user)}
                onStartDiscovering={() =>
                    navigate("/register")
                }
            />

            {/* ---------------------------------------------------------- */}
            {/* Logged in status                                           */}
            {/* ---------------------------------------------------------- */}

            {user && (
                <LoggedInStatus
                    onSeeDNA={() =>
                        navigate("/for-you")
                    }
                />
            )}

            {/* ---------------------------------------------------------- */}
            {/* Step 01                                                    */}
            {/* ---------------------------------------------------------- */}

            <HowItWorksStep
                number="01"
                eyebrow="It starts with you"
                title="You like a movie."
                description={
                    user
                        ? "When you add a movie to your liked list, CineScope saves it as a signal. That movie becomes another clue about the kind of stories you enjoy."
                        : "When you add a movie to your liked list, CineScope doesn't just remember the title. It looks at what makes that movie tick."
                }
            >
                <LikeMovieDemo
                    liked={liked}
                    onToggle={() =>
                        setLiked(
                            (value) => !value
                        )
                    }
                />
            </HowItWorksStep>

            {/* ---------------------------------------------------------- */}
            {/* Step 02                                                    */}
            {/* ---------------------------------------------------------- */}

            <HowItWorksStep
                number="02"
                eyebrow="We look deeper"
                title="Every movie has ingredients."
                description={
                    user
                        ? "CineScope looks at the genres connected to the movies you like. Those genres become building blocks for your personal taste profile."
                        : "A movie isn't just a title. It contains genres, themes and patterns. Those details become the ingredients of your Movie DNA."
                }
                reverse
            >
                <MovieIngredientsDemo />
            </HowItWorksStep>

            {/* ---------------------------------------------------------- */}
            {/* Step 03                                                    */}
            {/* ---------------------------------------------------------- */}

            <HowItWorksStep
                number="03"
                eyebrow="Patterns emerge"
                title="Your favorite genres rise to the top."
                description={
                    user
                        ? "As your liked movies grow, CineScope combines their genre signals and gives more weight to the patterns that appear most often."
                        : "One movie tells us a little. Several movies reveal patterns. Repeated genre signals gradually become more important."
                }
            >
                <GenreSignalsDemo
                    genres={HOW_IT_WORKS_GENRES}
                    activeGenre={activeGenre}
                    onGenreChange={
                        setActiveGenre
                    }
                />
            </HowItWorksStep>

            {/* ---------------------------------------------------------- */}
            {/* Step 04                                                    */}
            {/* ---------------------------------------------------------- */}

            <HowItWorksStep
                number="04"
                eyebrow="Your opinion matters"
                title="Ratings make the signal stronger."
                description={
                    user
                        ? "When you rate a movie, CineScope gets a better idea of how strongly you feel about the genres inside it."
                        : "Liking a movie tells us that you enjoyed it. Your rating tells us how much. The stronger the feeling, the stronger the signal."
                }
                reverse
            >
                <RatingDemo
                    rating={rating}
                    onRatingChange={setRating}
                />
            </HowItWorksStep>

            {/* ---------------------------------------------------------- */}
            {/* Step 05                                                    */}
            {/* ---------------------------------------------------------- */}

            <HowItWorksStep
                number="05"
                eyebrow="The algorithm connects the dots"
                title="Small signals become a bigger picture."
                description={
                    user
                        ? "CineScope combines your liked movies, their genres and your ratings to understand the patterns behind your choices."
                        : "The algorithm connects your movie signals together. The result isn't a simple list of genres — it's a picture of how your taste is distributed."
                }
            >
                <MovieDNAProcessDemo />
            </HowItWorksStep>

            {/* ---------------------------------------------------------- */}
            {/* Result                                                     */}
            {/* ---------------------------------------------------------- */}

            <MovieDNAResult
                user={Boolean(user)}
                genres={HOW_IT_WORKS_GENRES}
                onAction={() =>
                    navigate(
                        user
                            ? "/for-you"
                            : "/register"
                    )
                }
            />
        </main>
    );
};

export default HowItWorks;