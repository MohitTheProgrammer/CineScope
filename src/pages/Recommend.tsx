import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowRightIcon,
    DnaIcon,
    FilmIcon,
    SparklesIcon,
    TargetIcon,
    BrainIcon
} from "../assets/icons/Icons";

import {
    filterUserMoviesByPriority,
    getFinalGenreScores,
    getGenreScores,
    getRecommendedMovies,
    getUserMovies,
} from "../services/recommendation";

import { auth } from "../services/firebase";

interface RecommendedMovie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path?: string | null;
    vote_average?: number;
}

const TMDB_IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/";

const Recommend = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState<RecommendedMovie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [generation, setGeneration] = useState(0);

    useEffect(() => {
        generateRecommendations();
    }, []);

    const generateRecommendations = async () => {
        try {
            setIsLoading(true);
            setError(null);
            setMovies([]);

            const user = auth.currentUser;

            if (!user) {
                throw new Error("You must be logged in.");
            }

            /*
             * --------------------------------------------------------------
             * STEP 1
             * Get every movie saved by the user.
             * --------------------------------------------------------------
             */

            const userMovies = await getUserMovies(user.uid);

            /*
             * --------------------------------------------------------------
             * STEP 2
             * Apply CineScope priority system.
             *
             * liked
             *    ↓
             * rated
             *    ↓
             * watchlisted
             *    ↓
             * watched
             * --------------------------------------------------------------
             */

            const filteredMovies =
                filterUserMoviesByPriority(userMovies);

            /*
             * --------------------------------------------------------------
             * STEP 3
             * Calculate genre scores.
             * --------------------------------------------------------------
             */

            const genreScores =
                getGenreScores(filteredMovies);

            /*
             * --------------------------------------------------------------
             * STEP 4
             * Combine all genre scores.
             * --------------------------------------------------------------
             */

            const finalGenreScores =
                getFinalGenreScores(genreScores);

            /*
             * --------------------------------------------------------------
             * STEP 5
             * Get personalized movies.
             * --------------------------------------------------------------
             */

            const recommended =
                await getRecommendedMovies(
                    finalGenreScores,
                    userMovies
                );

            /*
             * Give the scanning animation enough time
             * to feel intentional.
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 1800)
            );

            setMovies(recommended.slice(0, 3));

            setGeneration((value) => value + 1);

        } catch (err) {
            console.error(
                "Failed to generate recommendations:",
                err
            );

            setError(
                "We couldn't build your recommendations."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const openMovie = (movieId: number) => {
        navigate(`/movie/${movieId}`);
    };

    const firstMovie = movies[0];
    const otherMovies = movies.slice(1);

    return (
        <main className="min-h-screen overflow-hidden bg-(--bg-primary) text-white">

            {/* ==============================================================
                GLOBAL AMBIENT BACKGROUND
            ============================================================== */}

            <div className="pointer-events-none fixed inset-0 overflow-hidden">

                <div
                    className="
                        absolute
                        -right-60
                        -top-60
                        size-160
                        rounded-full
                        bg-(--accent-primary)/8
                        blur-[140px]
                    "
                />

                <div
                    className="
                        absolute
                        -bottom-60
                        -left-60
                        size-160
                        rounded-full
                        bg-purple-500/5
                        blur-[140px]
                    "
                />

            </div>

            {/* ==============================================================
                HEADER
            ============================================================== */}

            <section
                className="
                    relative
                    mx-auto
                    max-w-7xl
                    px-6
                    pb-14
                    pt-28
                    lg:px-8
                "
            >

                <div className="max-w-4xl">

                    <div className="flex items-center gap-3">

                        <span
                            className="
                                size-1.5
                                rounded-full
                                bg-(--accent-primary)
                                shadow-[0_0_15px_var(--accent-glow)]
                            "
                        />

                        <span
                            className="
                                text-[10px]
                                font-black
                                uppercase
                                tracking-[0.3em]
                                text-(--accent-primary)
                            "
                        >
                            CineScope intelligence
                        </span>

                    </div>

                    <h1
                        className="
                            mt-5
                            text-5xl
                            font-black
                            leading-[0.92]
                            tracking-tighter
                            sm:text-6xl
                            lg:text-8xl
                        "
                    >
                        Your next
                        <br />

                        <span className="text-(--accent-primary)">
                            obsession
                        </span>

                        <br />

                        is waiting.
                    </h1>

                    <p
                        className="
                            mt-6
                            max-w-2xl
                            text-base
                            leading-7
                            text-white/40
                            sm:text-lg
                        "
                    >
                        We studied your Movie DNA and
                        searched for three movies that
                        feel like they were made for you.
                    </p>

                </div>

            </section>

            {/* ==============================================================
                LOADING EXPERIENCE
            ============================================================== */}

            {isLoading && (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div
            className="
                relative
                min-h-105
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/2.5
            "
        >
            {/* Ambient background */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    size-125
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-(--accent-primary)/8
                    blur-[100px]
                    animate-pulse
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    size-80
                    rounded-full
                    bg-purple-500/5
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-40
                    -left-32
                    size-96
                    rounded-full
                    bg-(--accent-primary)/5
                    blur-3xl
                "
            />

            {/* Content */}
            <div
                className="
                    relative
                    flex
                    min-h-105
                    flex-col
                    items-center
                    justify-center
                    px-6
                    py-16
                    text-center
                "
            >
                {/* AI Orb */}
                <div className="relative flex size-28 items-center justify-center">

                    {/* Outer pulse */}
                    <div
                        className="
                            absolute
                            inset-0
                            rounded-full
                            border
                            border-(--accent-primary)/10
                            animate-ping
                        "
                    />

                    {/* Outer ring */}
                    <div
                        className="
                            absolute
                            inset-2
                            rounded-full
                            border
                            border-(--accent-primary)/20
                        "
                    />

                    {/* Rotating ring */}
                    <div
                        className="
                            absolute
                            inset-1
                            rounded-full
                            border-t
                            border-(--accent-primary)/70
                            animate-[spin_2.5s_linear_infinite]
                        "
                    />

                    {/* Core */}
                    <div
                        className="
                            relative
                            flex
                            size-20
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-(--accent-primary)/30
                            bg-(--accent-primary)/10
                            text-(--accent-primary)
                            shadow-[0_0_60px_var(--accent-glow)]
                        "
                    >
                        <DnaIcon className="size-9 animate-pulse" />
                    </div>
                </div>

                {/* Status */}
                <div className="mt-8 flex items-center gap-2">
                    <span
                        className="
                            size-1.5
                            rounded-full
                            bg-(--accent-primary)
                            shadow-[0_0_12px_var(--accent-glow)]
                            animate-pulse
                        "
                    />

                    <span
                        className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.3em]
                            text-(--accent-primary)
                        "
                    >
                        CineScope Intelligence
                    </span>
                </div>

                {/* Heading */}
                <h2
                    className="
                        mt-4
                        max-w-xl
                        text-3xl
                        font-black
                        tracking-[-0.03em]
                        text-white
                        sm:text-4xl
                    "
                >
                    Finding your{" "}
                    <span className="text-(--accent-primary)">
                        perfect watch
                    </span>
                </h2>

                {/* Description */}
                <p
                    className="
                        mt-3
                        max-w-md
                        text-sm
                        leading-6
                        text-white/35
                    "
                >
                    Analyzing your Movie DNA and searching
                    for something that matches your taste.
                </p>

                {/* Processing indicators */}
                <div className="mt-8 flex items-center gap-3">

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/8
                            bg-white/3
                            px-3
                            py-1.5
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-white/30
                        "
                    >
                        <SparklesIcon className="size-3 text-(--accent-primary)" />
                        Taste
                    </div>

                    <span className="text-white/15">→</span>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/8
                            bg-white/3
                            px-3
                            py-1.5
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-white/30
                        "
                    >
                        <BrainIcon className="size-3 text-(--accent-primary)" />
                        Analyze
                    </div>

                    <span className="text-white/15">→</span>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/8
                            bg-white/3
                            px-3
                            py-1.5
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-white/30
                        "
                    >
                        <FilmIcon className="size-3 text-(--accent-primary)" />
                        Discover
                    </div>

                </div>

                {/* Loading dots */}
                <div className="mt-7 flex items-center gap-1.5">
                    <span
                        className="
                            size-1.5
                            rounded-full
                            bg-(--accent-primary)
                            animate-bounce
                        "
                    />

                    <span
                        className="
                            size-1.5
                            rounded-full
                            bg-(--accent-primary)
                            animate-bounce
                            [animation-delay:150ms]
                        "
                    />

                    <span
                        className="
                            size-1.5
                            rounded-full
                            bg-(--accent-primary)
                            animate-bounce
                            [animation-delay:300ms]
                        "
                    />
                </div>
            </div>
        </div>
    </section>
)}

            {/* ==============================================================
                ERROR
            ============================================================== */}

            {!isLoading && error && (

                <section className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-8">

                    <div
                        className="
                            rounded-4xl
                            border
                            border-white/10
                            bg-white/[0.035]
                            px-6
                            py-20
                            text-center
                        "
                    >

                        <div
                            className="
                                mx-auto
                                flex
                                size-16
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-(--accent-primary)/20
                                bg-(--accent-primary)/10
                                text-(--accent-primary)
                            "
                        >
                            <FilmIcon className="size-7" />
                        </div>

                        <h2 className="mt-6 text-2xl font-black">
                            The movie universe glitched.
                        </h2>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/35">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={generateRecommendations}
                            className="
                                mt-8
                                inline-flex
                                items-center
                                gap-3
                                rounded-xl
                                bg-(--accent-primary)
                                px-7
                                py-3.5
                                text-sm
                                font-black
                                text-black
                                shadow-[0_15px_45px_var(--accent-glow)]
                                transition-all
                                hover:-translate-y-1
                            "
                        >
                            Try again
                            <ArrowRightIcon className="size-4" />
                        </button>

                    </div>

                </section>

            )}

            {/* ==============================================================
                RESULTS
            ============================================================== */}

            {!isLoading && !error && movies.length > 0 && (

                <section
                    key={generation}
                    className="
                        relative
                        mx-auto
                        max-w-7xl
                        px-6
                        pb-28
                        lg:px-8
                    "
                >

                    {/* Results heading */}

                    <div
                        className="
                            mb-8
                            flex
                            flex-col
                            gap-6
                            sm:flex-row
                            sm:items-end
                            sm:justify-between
                        "
                    >

                        <div>

                            <div className="flex items-center gap-2">

                                <SparklesIcon
                                    className="
                                        size-4
                                        text-(--accent-primary)
                                    "
                                />

                                <span
                                    className="
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-[0.3em]
                                        text-(--accent-primary)
                                    "
                                >
                                    The algorithm has spoken
                                </span>

                            </div>

                            <h2
                                className="
                                    mt-2
                                    text-3xl
                                    font-black
                                    tracking-tight
                                    sm:text-4xl
                                "
                            >
                                Three movies.
                                <br />

                                <span className="text-white/35">
                                    One very good night.
                                </span>
                            </h2>

                        </div>

                        <button
                            type="button"
                            onClick={generateRecommendations}
                            className="
                                group
                                inline-flex
                                w-fit
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-(--accent-primary)/25
                                bg-(--accent-primary)/10
                                px-5
                                py-3
                                text-xs
                                font-black
                                text-(--accent-primary)
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-(--accent-primary)/50
                                hover:bg-(--accent-primary)/15
                                hover:shadow-[0_15px_45px_var(--accent-glow)]
                            "
                        >
                            <SparklesIcon
                                className="
                                    size-4
                                    transition-transform
                                    duration-500
                                    group-hover:rotate-180
                                "
                            />

                            Find Another Trio
                        </button>

                    </div>

                    {/* ======================================================
                        FIRST PICK
                    ====================================================== */}

                    {firstMovie && (

                        <MovieRevealCard
                            movie={firstMovie}
                            rank={1}
                            label="FIRST PICK"
                            featured
                            onClick={() =>
                                openMovie(firstMovie.id)
                            }
                        />

                    )}

                    {/* ======================================================
                        OTHER PICKS
                    ====================================================== */}

                    {otherMovies.length > 0 && (

                        <div className="mt-6 grid gap-6 md:grid-cols-2">

                            {otherMovies.map((movie, index) => (
                                <MovieRevealCard
                                    key={movie.id}
                                    movie={movie}
                                    rank={index + 2}
                                    label={
                                        index === 0
                                            ? "SECOND PICK"
                                            : "THIRD PICK"
                                    }
                                    onClick={() =>
                                        openMovie(movie.id)
                                    }
                                />
                            ))}

                        </div>

                    )}

                    {/* Bottom message */}

                    <div
                        className="
                            mt-12
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                        "
                    >

                        <div
                            className="
                                flex
                                size-10
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-(--accent-primary)/15
                                bg-(--accent-primary)/5
                                text-(--accent-primary)
                            "
                        >
                            <DnaIcon className="size-4" />
                        </div>

                        <p className="mt-4 text-xs text-white/25">
                            Recommendations powered by your Movie DNA
                        </p>

                    </div>

                </section>

            )}

            {!isLoading && !error && movies.length === 0 && (

                <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">

                    <div
                        className="
                            rounded-4xl
                            border
                            border-white/10
                            bg-white/[0.035]
                            px-6
                            py-20
                            text-center
                        "
                    >

                        <DnaIcon
                            className="
                                mx-auto
                                size-12
                                text-(--accent-primary)
                            "
                        />

                        <h2 className="mt-5 text-2xl font-black">
                            Your Movie DNA needs a little more data.
                        </h2>

                        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/35">
                            Like, watch, rate or save a few movies
                            and CineScope will have enough information
                            to find your next obsession.
                        </p>

                    </div>

                </section>

            )}

        </main>
    );
};

/* ==========================================================================
   MOVIE REVEAL CARD
============================================================================= */

interface MovieRevealCardProps {
    movie: RecommendedMovie;
    rank: number;
    label: string;
    featured?: boolean;
    onClick: () => void;
}

const MovieRevealCard = ({
    movie,
    rank,
    label,
    featured = false,
    onClick,
}: MovieRevealCardProps) => {

    const posterUrl = movie.poster_path
        ? TMDB_IMAGE_BASE_URL +
        (featured ? "original" : "w780") +
        movie.poster_path
        : null;

    const backdropUrl = movie.backdrop_path
        ? TMDB_IMAGE_BASE_URL +
        "original" +
        movie.backdrop_path
        : posterUrl;

    return (
        <article
            onClick={onClick}
            className={`
                group
                relative
                cursor-pointer
                overflow-hidden
                rounded-4xl
                border
                border-white/10
                bg-white/[0.035]
                transition-all
                duration-700
                hover:-translate-y-2
                hover:border-(--accent-primary)/35
                hover:shadow-[0_30px_100px_var(--accent-glow)]
                animate-[recommendationReveal_800ms_ease-out_both]
                ${featured ? "min-h-130" : "min-h-105"}
            `}
        >

            {/* Backdrop atmosphere */}

            {backdropUrl && (
                <img
                    src={backdropUrl}
                    alt=""
                    aria-hidden="true"
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        opacity-10
                        blur-2xl
                        scale-110
                        transition-all
                        duration-1000
                        group-hover:opacity-20
                        group-hover:scale-105
                    "
                />
            )}

            {/* Gradient */}

            <div
                className="
                    absolute
                    inset-0
                    bg-linear-to-br
                    from-(--accent-primary)/8
                    via-transparent
                    to-black
                "
            />

            <div
                className="
                    relative
                    grid
                    h-full
                    gap-8
                    p-5
                    sm:p-7
                    lg:grid-cols-[minmax(0,0.9fr)_1.1fr]
                    lg:items-center
                    lg:p-8
                "
            >

                {/* Poster */}

                <div
                    className={`
                        relative
                        mx-auto
                        w-full
                        max-w-sm
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/30
                        shadow-2xl
                        ${featured ? "lg:max-w-md" : ""}
                    `}
                >

                    <div className="aspect-2/3">

                        {posterUrl ? (
                            <img
                                src={posterUrl}
                                alt={movie.title}
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-1000
                                    group-hover:scale-105
                                "
                            />
                        ) : (
                            <div
                                className="
                                    flex
                                    h-full
                                    items-center
                                    justify-center
                                    bg-white/5
                                "
                            >
                                <FilmIcon className="size-12 text-white/20" />
                            </div>
                        )}

                    </div>

                    {/* Poster glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-10
                            left-1/2
                            size-32
                            -translate-x-1/2
                            rounded-full
                            bg-(--accent-primary)/20
                            blur-3xl
                            opacity-0
                            transition-opacity
                            duration-700
                            group-hover:opacity-100
                        "
                    />

                </div>

                {/* Information */}

                <div className="flex min-w-0 flex-col justify-center">

                    {/* Rank */}

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                size-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-(--accent-primary)/25
                                bg-(--accent-primary)/10
                                text-(--accent-primary)
                            "
                        >

                            {rank === 1 ? (
                                <SparklesIcon className="size-5" />
                            ) : (
                                <span className="text-sm font-black">
                                    {rank}
                                </span>
                            )}

                        </div>

                        <div>

                            <p
                                className="
                                    text-[10px]
                                    font-black
                                    uppercase
                                    tracking-[0.3em]
                                    text-(--accent-primary)
                                "
                            >
                                {label}
                            </p>

                            <p className="mt-0.5 text-[10px] text-white/25">
                                Handpicked by your Movie DNA
                            </p>

                        </div>

                    </div>

                    {/* Title */}

                    <h3
                        className={`
                            mt-7
                            font-black
                            leading-[0.95]
                            tracking-[-0.04em]
                            ${featured
                                ? "text-4xl sm:text-5xl lg:text-6xl"
                                : "text-3xl sm:text-4xl"
                            }
                        `}
                    >
                        {movie.title}
                    </h3>

                    {/* Rating */}

                    {movie.vote_average !== undefined && (
                        <div className="mt-5 flex items-center gap-3">

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-(--accent-primary)/20
                                    bg-(--accent-primary)/10
                                    px-3
                                    py-1.5
                                "
                            >
                                <span
                                    className="
                                        text-sm
                                        font-black
                                        text-(--accent-primary)
                                    "
                                >
                                    ★
                                </span>

                                <span
                                    className="
                                        text-xs
                                        font-black
                                        text-white
                                    "
                                >
                                    {movie.vote_average.toFixed(1)}
                                </span>

                            </div>

                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/25">
                                TMDB rating
                            </span>

                        </div>
                    )}

                    {/* Taste signal */}

                    <div
                        className="
                            mt-7
                            flex
                            items-start
                            gap-3
                            rounded-2xl
                            border
                            border-white/10
                            bg-black/20
                            p-4
                        "
                    >

                        <TargetIcon
                            className="
                                mt-0.5
                                size-4
                                shrink-0
                                text-(--accent-primary)
                            "
                        />

                        <div>

                            <p className="text-xs font-bold text-white/70">
                                Why this one?
                            </p>

                            <p className="mt-1 text-xs leading-5 text-white/30">
                                Its genres align with the patterns
                                CineScope found in your taste.
                            </p>

                        </div>

                    </div>

                    {/* CTA */}

                    <div
                        className="
                            mt-7
                            flex
                            items-center
                            gap-3
                            text-xs
                            font-black
                            uppercase
                            tracking-[0.15em]
                            text-(--accent-primary)
                        "
                    >

                        <span>
                            Explore movie
                        </span>

                        <ArrowRightIcon
                            className="
                                size-4
                                transition-transform
                                duration-300
                                group-hover:translate-x-2
                            "
                        />

                    </div>

                </div>

            </div>

            {/* Corner decoration */}

            <div
                className="
                    pointer-events-none
                    absolute
                    right-5
                    top-5
                    size-16
                    rounded-full
                    border
                    border-(--accent-primary)/10
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                "
            />

        </article>
    );
};

export default Recommend;
