import { useEffect, useMemo, useState } from "react";

import {
    FlameIcon,
    EyeIcon,
    RocketIcon,
    FilmIcon,
    SparklesIcon,
    BrainIcon,
    TargetIcon,
    DnaIcon,
    ArrowRightIcon,
} from "../assets/icons/Icons";

import {
    getUserMovies,
    filterUserMoviesByPriority,
    getGenreScores,
    getFinalGenreScores,
} from "../services/recommendation";

import type { UserMovie } from "../services/userService";

import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";


/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type IconComponent = React.ComponentType<{
    className?: string;
}>;

interface GenreInfo {
    id: number;
    name: string;
    icon: IconComponent;
}

/* -------------------------------------------------------------------------- */
/* TMDB Genre Data                                                            */
/* -------------------------------------------------------------------------- */

const GENRE_INFO: GenreInfo[] = [
    {
        id: 28,
        name: "Action",
        icon: FlameIcon,
    },
    {
        id: 12,
        name: "Adventure",
        icon: RocketIcon,
    },
    {
        id: 16,
        name: "Animation",
        icon: SparklesIcon,
    },
    {
        id: 35,
        name: "Comedy",
        icon: SparklesIcon,
    },
    {
        id: 80,
        name: "Crime",
        icon: TargetIcon,
    },
    {
        id: 99,
        name: "Documentary",
        icon: FilmIcon,
    },
    {
        id: 18,
        name: "Drama",
        icon: BrainIcon,
    },
    {
        id: 10751,
        name: "Family",
        icon: SparklesIcon,
    },
    {
        id: 14,
        name: "Fantasy",
        icon: SparklesIcon,
    },
    {
        id: 36,
        name: "History",
        icon: FilmIcon,
    },
    {
        id: 27,
        name: "Horror",
        icon: TargetIcon,
    },
    {
        id: 10402,
        name: "Music",
        icon: SparklesIcon,
    },
    {
        id: 9648,
        name: "Mystery",
        icon: EyeIcon,
    },
    {
        id: 10749,
        name: "Romance",
        icon: SparklesIcon,
    },
    {
        id: 878,
        name: "Sci-Fi",
        icon: RocketIcon,
    },
    {
        id: 53,
        name: "Thriller",
        icon: TargetIcon,
    },
    {
        id: 10752,
        name: "War",
        icon: TargetIcon,
    },
    {
        id: 37,
        name: "Western",
        icon: FilmIcon,
    },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const getGenreInfo = (genreId: number): GenreInfo => {
    return (
        GENRE_INFO.find((genre) => genre.id === genreId) ?? {
            id: genreId,
            name: `Genre ${genreId}`,
            icon: FilmIcon,
        }
    );
};

const getGenreDescription = (
    rank: number,
    score: number,
    totalScore: number
): string => {
    if (rank === 1) {
        return "Your strongest genre";
    }

    if (score >= totalScore * 0.2) {
        return "A major part of your taste";
    }

    if (score >= totalScore * 0.1) {
        return "You come back to this";
    }

    return "Part of your movie DNA";
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

const ForYou = () => {
    const { user } = useUser();

    const [movies, setMovies] = useState<UserMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /* ---------------------------------------------------------------------- */
    /* Load user movies                                                       */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {
        const loadMovies = async () => {
            if (!user?.uid) {
                setMovies([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const userMovies = await getUserMovies(user.uid);

                setMovies(userMovies);
            } catch (error) {
                console.error(
                    "Failed to load movies for recommendation:",
                    error
                );

                setError(
                    "We couldn't analyze your movie taste right now."
                );
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [user?.uid]);

    /* ---------------------------------------------------------------------- */
    /* Recommendation pipeline                                               */
    /* ---------------------------------------------------------------------- */

    const recommendationData = useMemo(() => {
        if (!movies.length) {
            return {
                filteredMovies: {
                    liked: [],
                    rated: [],
                    watchlisted: [],
                    watched: [],
                },
                genreScores: {
                    liked: {},
                    rated: {},
                    watchlisted: {},
                    watched: {},
                },
                finalGenreScores: [],
            };
        }

        const filteredMovies =
            filterUserMoviesByPriority(movies);

        const genreScores =
            getGenreScores(filteredMovies);

        const finalGenreScores =
            getFinalGenreScores(genreScores);

        return {
            filteredMovies,
            genreScores,
            finalGenreScores,
        };
    }, [movies]);

    /* ---------------------------------------------------------------------- */
    /* Genre ranking                                                          */
    /* ---------------------------------------------------------------------- */

    const rankedGenres = useMemo(() => {
        const scores =
            recommendationData.finalGenreScores;

        const totalScore = scores.reduce(
            (total, genre) => total + genre.score,
            0
        );

        if (!totalScore) {
            return [];
        }

        return scores.map((genre, index) => {
            const info = getGenreInfo(genre.genreId);

            const percentage = Math.round(
                (genre.score / totalScore) * 100
            );

            return {
                ...genre,
                ...info,
                rank: index + 1,
                percentage,
                description: getGenreDescription(
                    index + 1,
                    genre.score,
                    totalScore
                ),
            };
        });
    }, [recommendationData.finalGenreScores]);

    /* ---------------------------------------------------------------------- */
    /* Top genre                                                              */
    /* ---------------------------------------------------------------------- */

    const topGenre = rankedGenres[0];

    const TopGenreIcon =
        topGenre?.icon ?? DnaIcon;

    /* ---------------------------------------------------------------------- */
    /* Total movies                                                           */
    /* ---------------------------------------------------------------------- */

    const totalMovies = movies.length;

    const likedCount =
        recommendationData.filteredMovies.liked.length;

    const ratedCount =
        recommendationData.filteredMovies.rated.length;

    const watchlistedCount =
        recommendationData.filteredMovies.watchlisted.length;

    const watchedCount =
        recommendationData.filteredMovies.watched.length;

    /* ---------------------------------------------------------------------- */
    /* Movies that shaped taste                                               */
    /* ---------------------------------------------------------------------- */

    const tasteMovies = useMemo(() => {
        return movies.slice(0, 8);
    }, [movies]);

    /* ---------------------------------------------------------------------- */
    /* Recommendation CTA                                                     */
    /* ---------------------------------------------------------------------- */

    /* ---------------------------------------------------------------------- */
    /* Loading                                                                */
    /* ---------------------------------------------------------------------- */

    if (loading) {
        return (
            <main className="min-h-screen bg-(--bg-primary) text-white">
                <section className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-3 w-32 rounded bg-white/10" />

                        <div className="mt-5 h-16 max-w-xl rounded bg-white/10" />

                        <div className="mt-5 h-5 max-w-2xl rounded bg-white/5" />
                    </div>

                    <div className="mt-14 h-72 rounded-3xl border border-white/10 bg-white/[0.035] animate-pulse" />
                </section>
            </main>
        );
    }

    /* ---------------------------------------------------------------------- */
    /* Error                                                                  */
    /* ---------------------------------------------------------------------- */

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-(--bg-primary) px-6 text-white">
                <div className="text-center">
                    <DnaIcon className="mx-auto size-10 text-(--accent-primary)" />

                    <h1 className="mt-5 text-2xl font-black">
                        Something went wrong
                    </h1>

                    <p className="mt-2 text-sm text-white/40">
                        {error}
                    </p>
                </div>
            </main>
        );
    }

    /* ---------------------------------------------------------------------- */
    /* Empty state                                                             */
    /* ---------------------------------------------------------------------- */

    if (!movies.length) {
        return (
            <main className="min-h-screen bg-(--bg-primary) text-white">
                <section className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-(--accent-primary) shadow-[0_0_12px_var(--accent-glow)]" />

                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-(--accent-primary)">
                                Personalized for you
                            </span>
                        </div>

                        <h1 className="mt-4 text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                            Your{" "}
                            <span className="text-(--accent-primary)">
                                Movie DNA
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
                            Start liking, rating, watching or
                            saving movies and CineScope will
                            start learning your taste.
                        </p>
                    </div>

                    <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.035] p-10 text-center">
                        <DnaIcon className="mx-auto size-12 text-(--accent-primary)" />

                        <h2 className="mt-5 text-2xl font-black">
                            Your Movie DNA is waiting
                        </h2>

                        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/40">
                            Interact with some movies first.
                            We'll use those choices to understand
                            your preferences.
                        </p>
                    </div>
                </section>
            </main>
        );
    }

    /* ---------------------------------------------------------------------- */
    /* Main                                                                    */
    /* ---------------------------------------------------------------------- */

    return (
        <main className="min-h-screen bg-(--bg-primary) text-white">

            {/* ================================================================== */}
            {/* Header                                                             */}
            {/* ================================================================== */}

            <section className="mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8">

                <div className="max-w-3xl">

                    <div className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-(--accent-primary) shadow-[0_0_12px_var(--accent-glow)]" />

                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-(--accent-primary)">
                            Personalized for you
                        </span>
                    </div>

                    <h1 className="mt-4 text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                        Your{" "}
                        <span className="text-(--accent-primary)">
                            Movie DNA
                        </span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
                        We looked at the movies you love and
                        found something interesting about your
                        taste.
                    </p>

                </div>

                {/* ============================================================= */}
                {/* Recommendation Engine                                         */}
                {/* ============================================================= */}

                <section className="mx-auto max-w-7xl pt-14">

                    <div className="group relative w-full overflow-hidden rounded-3xl border border-(--accent-primary)/20 bg-white/[0.035] p-8 sm:p-10">

                        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-(--accent-primary)/10 blur-3xl transition-all duration-700 group-hover:bg-(--accent-primary)/15" />

                        <div className="pointer-events-none absolute -bottom-32 -left-20 size-72 rounded-full bg-purple-500/5 blur-3xl" />

                        <div className="relative flex min-h-44 flex-col items-center justify-center text-center sm:min-h-52">

                            <div className="flex items-center gap-2">

                                <span className="size-1.5 rounded-full bg-(--accent-primary) shadow-[0_0_12px_var(--accent-glow)]" />

                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-(--accent-primary)">
                                    Your personal movie engine
                                </span>

                                <span className="size-1.5 rounded-full bg-(--accent-primary) shadow-[0_0_12px_var(--accent-glow)]" />

                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                Don't know what to watch?
                            </h2>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
                                Let your Movie DNA decide.
                                CineScope finds a movie that
                                matches what you actually love.
                            </p>

                            <Link
                                to={"recommend-movie"}
                                type="button"
                                className="group/button relative mt-8 inline-flex min-h-16 items-center gap-4 overflow-hidden rounded-2xl border border-(--accent-primary)/40 bg-(--accent-primary) px-9 py-4 text-base font-black text-black shadow-[0_15px_50px_var(--accent-glow)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_70px_var(--accent-glow)] active:translate-y-0 active:scale-[0.99] sm:px-10 sm:text-lg"
                            >
                                <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/20 transition-all duration-700 group-hover/button:left-[120%]" />

                                <SparklesIcon className="relative size-6 transition-transform duration-300 group-hover/button:rotate-12 group-hover/button:scale-110" />

                                <span className="relative">
                                    Suggest Me a Movie
                                </span>

                                <ArrowRightIcon className="relative size-5 transition-transform duration-300 group-hover/button:translate-x-1" />
                            </Link>

                            <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">
                                <DnaIcon className="size-3.5" />
                                Powered by your Movie DNA
                            </div>

                        </div>
                    </div>

                </section>

                {/* ============================================================= */}
                {/* DNA Hero                                                       */}
                {/* ============================================================= */}

                {topGenre && (
                    <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8 lg:p-10">

                        <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-(--accent-primary)/10 blur-3xl" />

                        <div className="pointer-events-none absolute -bottom-40 left-1/3 size-80 rounded-full bg-(--accent-primary)/5 blur-3xl" />

                        <div className="relative grid gap-10 lg:grid-cols-[1fr_280px] lg:items-center">

                            <div>

                                <div className="flex items-center gap-4">

                                    <div className="flex size-14 items-center justify-center rounded-2xl border border-(--accent-primary)/20 bg-(--accent-primary)/10 text-(--accent-primary) shadow-[0_0_35px_var(--accent-glow)]">

                                        <TopGenreIcon className="size-7" />

                                    </div>

                                    <div>

                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                                            Your #1 genre
                                        </p>

                                        <h2 className="text-3xl font-black">
                                            {topGenre.name}
                                        </h2>

                                    </div>

                                </div>

                                <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
                                    {topGenre.name} is currently
                                    the strongest signal in your
                                    movie taste. CineScope will use
                                    this preference when finding
                                    your next movie.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">

                                    <div className="flex items-center gap-2 rounded-full border border-(--accent-primary)/20 bg-(--accent-primary)/10 px-4 py-2 text-xs font-bold text-(--accent-primary)">
                                        <FilmIcon className="size-3.5" />
                                        {topGenre.score} genre points
                                    </div>

                                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/60">
                                        <DnaIcon className="size-3.5" />
                                        {totalMovies} movies analyzed
                                    </div>

                                </div>

                            </div>

                            <div className="relative flex justify-center">

                                <div className="relative flex size-56 flex-col items-center justify-center rounded-full border border-(--accent-primary)/20 bg-(--accent-primary)/5 shadow-[0_0_80px_var(--accent-glow)]">

                                    <div className="pointer-events-none absolute inset-3 rounded-full border border-(--accent-primary)/10" />

                                    <span className="relative text-6xl font-black">
                                        {topGenre.percentage}%
                                    </span>

                                    <span className="relative mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                                        of your taste
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>
                )}

            </section>

            {/* ================================================================== */}
            {/* Top Genres                                                         */}
            {/* ================================================================== */}

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">

                <SectionHeading
                    eyebrow="Your taste"
                    title="Top Genres"
                />

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

                    {rankedGenres.slice(0, 5).map(
                        (genre) => (
                            <GenreCard
                                key={genre.genreId}
                                genre={genre}
                            />
                        )
                    )}

                </div>

            </section>

            {/* ================================================================== */}
            {/* Taste Breakdown                                                    */}
            {/* ================================================================== */}

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">

                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 sm:p-10">

                    <div className="pointer-events-none absolute right-0 top-0 size-64 rounded-full bg-(--accent-primary)/5 blur-3xl" />

                    <div className="relative">

                        <SectionHeading
                            eyebrow="Your activity"
                            title="How CineScope Knows You"
                        />

                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            <ActivityCard
                                icon={FlameIcon}
                                label="Liked"
                                value={likedCount}
                            />

                            <ActivityCard
                                icon={BrainIcon}
                                label="Rated"
                                value={ratedCount}
                            />

                            <ActivityCard
                                icon={EyeIcon}
                                label="Watchlisted"
                                value={watchlistedCount}
                            />

                            <ActivityCard
                                icon={FilmIcon}
                                label="Watched"
                                value={watchedCount}
                            />

                        </div>

                    </div>

                </div>

            </section>

            {/* ================================================================== */}
            {/* Personality                                                        */}
            {/* ================================================================== */}

            {topGenre && (
                <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">

                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 sm:p-10">

                        <div className="pointer-events-none absolute right-0 top-0 size-64 rounded-full bg-(--accent-primary)/5 blur-3xl" />

                        <div className="relative">

                            <SectionHeading
                                eyebrow="Your personality"
                                title={`The ${topGenre.name} Seeker`}
                            />

                            <div className="mt-6 flex items-start gap-4">

                                <div className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-xl border border-(--accent-primary)/20 bg-(--accent-primary)/10 text-(--accent-primary)">
                                    <BrainIcon className="size-5" />
                                </div>

                                <p className="max-w-3xl text-xl font-medium leading-9 text-white/65 sm:text-2xl">
                                    Your movie history has a
                                    strong connection with{" "}
                                    <span className="text-(--accent-primary)">
                                        {topGenre.name}
                                    </span>
                                    . That's currently the
                                    biggest part of your Movie DNA.
                                </p>

                            </div>

                            <div className="mt-8 flex flex-wrap gap-2">

                                {rankedGenres
                                    .slice(0, 4)
                                    .map((genre) => (
                                        <PreferenceTag
                                            key={genre.genreId}
                                            icon={genre.icon}
                                            label={genre.name}
                                        />
                                    ))}

                            </div>

                        </div>

                    </div>

                </section>
            )}

            {/* ================================================================== */}
            {/* Genre Ranking                                                      */}
            {/* ================================================================== */}

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">

                <SectionHeading
                    eyebrow="The interesting part"
                    title="Your Complete Genre DNA"
                />

                <div className="mt-7 space-y-3">

                    {rankedGenres.map((genre) => (
                        <GenreRankingRow
                            key={genre.genreId}
                            genre={genre}
                        />
                    ))}

                </div>

            </section>

            {/* ================================================================== */}
            {/* Movies                                                              */}
            {/* ================================================================== */}

            {tasteMovies.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">

                    <SectionHeading
                        eyebrow="Your collection"
                        title="Movies That Shaped Your Taste"
                    />

                    <div className="mt-3 flex items-center gap-2">

                        <SparklesIcon className="size-4 text-(--accent-primary)" />

                        <p className="text-sm text-white/35">
                            These movies helped build your
                            recommendation profile.
                        </p>

                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

                        {tasteMovies.map((movie) => (
                            <MovieCard
                                key={movie.movieId}
                                movie={movie}
                            />
                        ))}

                    </div>

                </section>
            )}

        </main>
    );
};

/* ========================================================================== */
/* Section Heading                                                            */
/* ========================================================================== */

interface SectionHeadingProps {
    eyebrow: string;
    title: string;
}

const SectionHeading = ({
    eyebrow,
    title,
}: SectionHeadingProps) => {
    return (
        <div>

            <div className="flex items-center gap-2">

                <span className="size-1.5 rounded-full bg-(--accent-primary) shadow-[0_0_10px_var(--accent-glow)]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-(--accent-primary)">
                    {eyebrow}
                </span>

            </div>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
                {title}
            </h2>

        </div>
    );
};

/* ========================================================================== */
/* Activity Card                                                              */
/* ========================================================================== */

interface ActivityCardProps {
    icon: IconComponent;
    label: string;
    value: number;
}

const ActivityCard = ({
    icon: Icon,
    label,
    value,
}: ActivityCardProps) => {
    return (
        <div className="group rounded-2xl border border-white/10 bg-white/2.5 p-5 transition-all duration-300 hover:border-(--accent-primary)/30 hover:bg-(--accent-primary)/5">

            <div className="flex items-center justify-between">

                <div className="flex size-10 items-center justify-center rounded-xl border border-(--accent-primary)/20 bg-(--accent-primary)/10 text-(--accent-primary)">
                    <Icon className="size-4.5" />
                </div>

                <span className="text-2xl font-black text-white">
                    {value}
                </span>

            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-white/35">
                {label}
            </p>

        </div>
    );
};

/* ========================================================================== */
/* Preference Tag                                                             */
/* ========================================================================== */

interface PreferenceTagProps {
    icon: IconComponent;
    label: string;
}

const PreferenceTag = ({
    icon: Icon,
    label,
}: PreferenceTagProps) => {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/60 transition-all duration-300 hover:border-(--accent-primary)/30 hover:bg-(--accent-primary)/10 hover:text-(--accent-primary)">

            <Icon className="size-3.5" />

            {label}

        </span>
    );
};

/* ========================================================================== */
/* Genre Card                                                                 */
/* ========================================================================== */

interface RankedGenre {
    genreId: number;
    score: number;
    name: string;
    icon: IconComponent;
    percentage: number;
    rank: number;
    description: string;
}

interface GenreCardProps {
    genre: RankedGenre;
}

const GenreCard = ({
    genre,
}: GenreCardProps) => {

    const GenreIcon = genre.icon;

    return (
        <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-(--accent-primary)/5 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-(--accent-primary)/30 hover:bg-(--accent-primary)/10 hover:shadow-[0_20px_60px_var(--accent-glow)]">

            <div className="pointer-events-none absolute -right-12 -top-12 size-28 rounded-full bg-(--accent-primary)/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">

                <div className="flex items-start justify-between">

                    <div className="flex size-11 items-center justify-center rounded-xl border border-(--accent-primary)/20 bg-(--accent-primary)/10 text-(--accent-primary) transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_var(--accent-glow)]">

                        <GenreIcon className="size-5" />

                    </div>

                    <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[9px] font-black text-white/40">
                        #{genre.rank}
                    </span>

                </div>

                <h3 className="mt-8 text-lg font-black">
                    {genre.name}
                </h3>

                <p className="mt-1 text-[10px] text-white/35">
                    {genre.description}
                </p>

                <div className="mt-6 flex items-end justify-between">

                    <span className="text-2xl font-black text-(--accent-primary)">
                        {genre.percentage}%
                    </span>

                    <span className="text-[10px] font-medium text-white/30">
                        {genre.score} points
                    </span>

                </div>

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">

                    <div
                        className="h-full rounded-full bg-(--accent-primary) shadow-[0_0_10px_var(--accent-glow)] transition-all duration-1000"
                        style={{
                            width: `${genre.percentage}%`,
                        }}
                    />

                </div>

            </div>

        </article>
    );
};

/* ========================================================================== */
/* Genre Ranking Row                                                          */
/* ========================================================================== */

const GenreRankingRow = ({
    genre,
}: {
    genre: RankedGenre;
}) => {

    const GenreIcon = genre.icon;

    return (
        <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/2.5 p-4 transition-all duration-300 hover:border-(--accent-primary)/30 hover:bg-(--accent-primary)/5">

            <span className="w-7 text-center text-xs font-black text-white/20">
                #{genre.rank}
            </span>

            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-(--accent-primary)/20 bg-(--accent-primary)/10 text-(--accent-primary)">
                <GenreIcon className="size-4.5" />
            </div>

            <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between gap-4">

                    <span className="text-sm font-black">
                        {genre.name}
                    </span>

                    <span className="text-xs font-black text-(--accent-primary)">
                        {genre.score}
                    </span>

                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">

                    <div
                        className="h-full rounded-full bg-(--accent-primary) shadow-[0_0_10px_var(--accent-glow)] transition-all duration-700"
                        style={{
                            width: `${genre.percentage}%`,
                        }}
                    />

                </div>

            </div>

            <span className="hidden w-12 text-right text-xs font-bold text-white/30 sm:block">
                {genre.percentage}%
            </span>

        </div>
    );
};

/* ========================================================================== */
/* Movie Card                                                                 */
/* ========================================================================== */

const MovieCard = ({
    movie,
}: {
    movie: UserMovie;
}) => {

    return (
        <article className="group cursor-pointer">

            <div className="relative aspect-2/3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-(--accent-primary)/30 group-hover:shadow-[0_20px_50px_var(--accent-glow)]">

                {movie.posterPath ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                        alt={movie.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <FilmIcon className="size-10 text-white/10" />
                    </div>
                )}

                <div className="absolute inset-0 bg-linear-to from-black via-transparent to-transparent opacity-70" />

                <div className="absolute inset-x-0 bottom-0 p-4">

                    <div className="flex items-center gap-2">

                        <FilmIcon className="size-3.5 shrink-0 text-(--accent-primary)" />

                        <h3 className="truncate text-sm font-bold text-white">
                            {movie.title}
                        </h3>

                    </div>

                </div>

            </div>

        </article>
    );
};

export default ForYou;