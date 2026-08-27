import { useMemo } from "react";
import type { ComponentType } from "react";

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
    StarIcon,
    PlayIcon,
} from "../assets/icons/Icons";

/* ==========================================================================
   Types
   ========================================================================== */

type IconComponent = ComponentType<{
    className?: string;
}>;

/* ==========================================================================
   Genre Data
   ========================================================================== */

const GENRES = [
    {
        id: 28,
        name: "Action",
        icon: FlameIcon,
        count: 18,
        percentage: 42,
        description: "Your #1 genre",
    },
    {
        id: 9648,
        name: "Mystery",
        icon: EyeIcon,
        count: 10,
        percentage: 23,
        description: "You love a good secret",
    },
    {
        id: 35,
        name: "Comedy",
        icon: SparklesIcon,
        count: 7,
        percentage: 16,
        description: "Keep it fun",
    },
    {
        id: 878,
        name: "Sci-Fi",
        icon: RocketIcon,
        count: 5,
        percentage: 12,
        description: "Beyond the ordinary",
    },
    {
        id: 53,
        name: "Thriller",
        icon: TargetIcon,
        count: 3,
        percentage: 7,
        description: "Keep me guessing",
    },
];

/* ==========================================================================
   Genre Combinations
   ========================================================================== */

const COMBINATIONS = [
    {
        first: "Action",
        firstIcon: FlameIcon,
        second: "Mystery",
        secondIcon: EyeIcon,
        percentage: 68,
        description: "Your ultimate combination",
    },
    {
        first: "Action",
        firstIcon: FlameIcon,
        second: "Comedy",
        secondIcon: SparklesIcon,
        percentage: 46,
        description: "Explosions with a sense of humor",
    },
    {
        first: "Mystery",
        firstIcon: EyeIcon,
        second: "Sci-Fi",
        secondIcon: RocketIcon,
        percentage: 31,
        description: "You like the weird stuff",
    },
];

/* ==========================================================================
   Movies
   ========================================================================== */

const MOVIES = [
    {
        id: 1,
        title: "Bullet Train",
        poster:
            "https://image.tmdb.org/t/p/w500/9r3j1uW8V6FQ6c1K8xYq7Jq9.jpg",
        rating: "7.8",
        genre: "Action",
    },
    {
        id: 2,
        title: "Inception",
        poster:
            "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        rating: "8.8",
        genre: "Sci-Fi",
    },
    {
        id: 3,
        title: "The Dark Knight",
        poster:
            "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        rating: "9.0",
        genre: "Action",
    },
    {
        id: 4,
        title: "Interstellar",
        poster:
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        rating: "8.7",
        genre: "Sci-Fi",
    },
];

/* ==========================================================================
   For You
   ========================================================================== */

const ForYou = () => {
    const topGenre = GENRES[0];
    const TopGenreIcon = topGenre.icon;

    const totalMovies = useMemo(
        () =>
            GENRES.reduce(
                (total, genre) => total + genre.count,
                0
            ),
        []
    );

    const handleSuggestMovie = () => {
        console.log("Suggest me a movie");
    };

    return (
        <main className="min-h-screen overflow-hidden bg-(--bg-primary) text-white">

            {/* =================================================================
                HERO
            ================================================================= */}

            <section className="relative">

                {/* Background atmosphere */}

                <div className="pointer-events-none absolute inset-x-0 top-0 h-150 overflow-hidden">
                    <div
                        className="
                            absolute
                            left-1/2
                            top-0
                            size-150
                            -translate-x-1/2
                            rounded-full
                            bg-(--accent-primary)/10
                            blur-[120px]
                        "
                    />

                    <div
                        className="
                            absolute
                            -right-40
                            top-20
                            size-100
                            rounded-full
                            bg-purple-500/5
                            blur-[100px]
                        "
                    />

                    <div
                        className="
                            absolute
                            -left-40
                            top-60
                            size-100
                            rounded-full
                            bg-cyan-500/5
                            blur-[100px]
                        "
                    />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8">

                    {/* Eyebrow */}

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                size-9
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-(--accent-primary)/20
                                bg-(--accent-primary)/10
                                text-(--accent-primary)
                                shadow-[0_0_30px_var(--accent-glow)]
                            "
                        >
                            <DnaIcon className="size-4.5" />
                        </div>

                        <div>

                            <div className="flex items-center gap-2">

                                <span
                                    className="
                                        size-1.5
                                        rounded-full
                                        bg-(--accent-primary)
                                        shadow-[0_0_12px_var(--accent-glow)]
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
                                    Personalized for you
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Heading */}

                    <h1
                        className="
                            mt-6
                            max-w-4xl
                            text-5xl
                            font-black
                            leading-[0.92]
                            tracking-[-0.055em]
                            sm:text-6xl
                            lg:text-8xl
                        "
                    >
                        Your{" "}
                        <span className="text-(--accent-primary)">
                            Movie DNA
                        </span>
                    </h1>

                    <p
                        className="
                            mt-7
                            max-w-2xl
                            text-base
                            leading-7
                            text-white/45
                            sm:text-lg
                            sm:leading-8
                        "
                    >
                        We analyzed the movies you love and
                        discovered the patterns hiding inside
                        your taste.
                    </p>

                    {/* Quick stats */}

                    <div className="mt-8 flex flex-wrap gap-3">

                        <StatPill
                            icon={FilmIcon}
                            value={`${totalMovies}`}
                            label="movies analyzed"
                        />

                        <StatPill
                            icon={StarIcon}
                            value="4.8"
                            label="avg personal rating"
                        />

                        <StatPill
                            icon={BrainIcon}
                            value="94%"
                            label="taste confidence"
                        />

                    </div>

                    {/* =========================================================
                        RECOMMENDATION ENGINE
                    ========================================================= */}

                    <div
                        className="
                            group
                            relative
                            mt-14
                            overflow-hidden
                            rounded-4xl
                            border
                            border-(--accent-primary)/20
                            bg-white/[0.035]
                            shadow-[0_30px_100px_rgba(0,0,0,0.25)]
                        "
                    >

                        {/* Glow */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                -right-32
                                -top-32
                                size-100
                                rounded-full
                                bg-(--accent-primary)/15
                                blur-[100px]
                                transition-all
                                duration-700
                                group-hover:bg-(--accent-primary)/25
                            "
                        />

                        <div
                            className="
                                pointer-events-none
                                absolute
                                -bottom-40
                                left-1/4
                                size-100
                                rounded-full
                                bg-purple-500/5
                                blur-[100px]
                            "
                        />

                        {/* Decorative DNA icon */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                right-8
                                top-8
                                opacity-[0.035]
                                sm:right-12
                                sm:top-10
                            "
                        >
                            <DnaIcon className="size-48 sm:size-64" />
                        </div>

                        <div
                            className="
                                relative
                                flex
                                min-h-75
                                flex-col
                                items-center
                                justify-center
                                px-6
                                py-12
                                text-center
                                sm:min-h-80
                                sm:px-10
                            "
                        >

                            {/* Label */}

                            <div className="flex items-center gap-3">

                                <span className="size-1.5 rounded-full bg-(--accent-primary) shadow-[0_0_12px_var(--accent-glow)]" />

                                <span
                                    className="
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-[0.35em]
                                        text-(--accent-primary)
                                    "
                                >
                                    Your personal movie engine
                                </span>

                                <span className="size-1.5 rounded-full bg-(--accent-primary) shadow-[0_0_12px_var(--accent-glow)]" />

                            </div>

                            <h2
                                className="
                                    mt-5
                                    text-3xl
                                    font-black
                                    tracking-tight
                                    sm:text-5xl
                                "
                            >
                                Don't know what to watch?
                            </h2>

                            <p
                                className="
                                    mt-4
                                    max-w-xl
                                    text-sm
                                    leading-6
                                    text-white/40
                                    sm:text-base
                                "
                            >
                                Let your Movie DNA decide.
                                CineScope finds something that
                                matches what you actually love.
                            </p>

                            {/* CTA */}

                            <button
                                type="button"
                                onClick={handleSuggestMovie}
                                className="
                                    group/button
                                    relative
                                    mt-9
                                    inline-flex
                                    min-h-16
                                    items-center
                                    gap-4
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-(--accent-primary)/40
                                    bg-(--accent-primary)
                                    px-9
                                    py-4
                                    text-base
                                    font-black
                                    text-black
                                    shadow-[0_15px_60px_var(--accent-glow)]
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:scale-[1.025]
                                    hover:shadow-[0_25px_90px_var(--accent-glow)]
                                    active:translate-y-0
                                    active:scale-[0.99]
                                    sm:px-12
                                    sm:text-lg
                                "
                            >

                                {/* Shine */}

                                <span
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-y-0
                                        -left-full
                                        w-1/2
                                        -skew-x-12
                                        bg-white/25
                                        transition-all
                                        duration-700
                                        group-hover/button:left-[120%]
                                    "
                                />

                                <SparklesIcon
                                    className="
                                        relative
                                        size-6
                                        transition-transform
                                        duration-300
                                        group-hover/button:rotate-12
                                        group-hover/button:scale-110
                                    "
                                />

                                <span className="relative whitespace-nowrap">
                                    Suggest Me a Movie
                                </span>

                                <ArrowRightIcon
                                    className="
                                        relative
                                        size-5
                                        transition-transform
                                        duration-300
                                        group-hover/button:translate-x-1
                                    "
                                />

                            </button>

                            <div
                                className="
                                    mt-5
                                    flex
                                    items-center
                                    gap-2
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-white/20
                                "
                            >
                                <DnaIcon className="size-3" />
                                Powered by your Movie DNA
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =================================================================
                DNA SNAPSHOT
            ================================================================= */}

            <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">

                <div className="mb-7 flex items-end justify-between">

                    <SectionHeading
                        eyebrow="Your taste"
                        title="Your DNA at a glance"
                    />

                    <span
                        className="
                            hidden
                            text-xs
                            font-bold
                            text-white/20
                            sm:block
                        "
                    >
                        UPDATED JUST NOW
                    </span>

                </div>

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-4xl
                        border
                        border-white/10
                        bg-white/2.5
                        p-6
                        sm:p-8
                        lg:p-10
                    "
                >

                    {/* Glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-40
                            -top-40
                            size-100
                            rounded-full
                            bg-(--accent-primary)/10
                            blur-[100px]
                        "
                    />

                    <div
                        className="
                            relative
                            grid
                            gap-10
                            lg:grid-cols-[1fr_300px]
                            lg:items-center
                        "
                    >

                        {/* Genre */}

                        <div>

                            <div className="flex items-center gap-4">

                                <div
                                    className="
                                        flex
                                        size-16
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-(--accent-primary)/25
                                        bg-(--accent-primary)/10
                                        text-(--accent-primary)
                                        shadow-[0_0_40px_var(--accent-glow)]
                                    "
                                >
                                    <TopGenreIcon className="size-7" />
                                </div>

                                <div>

                                    <p
                                        className="
                                            text-[10px]
                                            font-black
                                            uppercase
                                            tracking-[0.25em]
                                            text-white/30
                                        "
                                    >
                                        Your #1 genre
                                    </p>

                                    <h2
                                        className="
                                            mt-1
                                            text-3xl
                                            font-black
                                            sm:text-4xl
                                        "
                                    >
                                        {topGenre.name}
                                    </h2>

                                </div>

                            </div>

                            <p
                                className="
                                    mt-7
                                    max-w-2xl
                                    text-lg
                                    leading-8
                                    text-white/55
                                    sm:text-xl
                                "
                            >
                                You don't watch movies quietly.
                                Explosions, impossible missions
                                and characters who refuse to stay
                                down — that's your territory.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">

                                <InfoPill
                                    icon={FilmIcon}
                                    text={`${topGenre.count} movies`}
                                    accent
                                />

                                <InfoPill
                                    icon={DnaIcon}
                                    text={`${totalMovies} analyzed`}
                                />

                                <InfoPill
                                    icon={FlameIcon}
                                    text="High energy"
                                />

                            </div>

                        </div>

                        {/* Percentage */}

                        <div className="flex justify-center">

                            <div
                                className="
                                    relative
                                    flex
                                    size-60
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-(--accent-primary)/20
                                    bg-(--accent-primary)/5
                                    shadow-[0_0_100px_var(--accent-glow)]
                                "
                            >

                                <div
                                    className="
                                        absolute
                                        inset-3
                                        rounded-full
                                        border
                                        border-(--accent-primary)/10
                                    "
                                />

                                <div
                                    className="
                                        absolute
                                        inset-7
                                        rounded-full
                                        border
                                        border-white/5
                                    "
                                />

                                <span
                                    className="
                                        relative
                                        text-6xl
                                        font-black
                                        tracking-tighter
                                        text-(--accent-primary)
                                    "
                                >
                                    {topGenre.percentage}%
                                </span>

                                <span
                                    className="
                                        relative
                                        mt-1
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-[0.25em]
                                        text-white/30
                                    "
                                >
                                    of your taste
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =================================================================
                TOP GENRES
            ================================================================= */}

            <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">

                <SectionHeading
                    eyebrow="The algorithm sees"
                    title="Your Top Genres"
                />

                <div
                    className="
                        mt-8
                        grid
                        gap-4
                        sm:grid-cols-2
                        lg:grid-cols-5
                    "
                >
                    {GENRES.map((genre, index) => (
                        <GenreCard
                            key={genre.id}
                            genre={genre}
                            rank={index + 1}
                        />
                    ))}
                </div>

            </section>

            {/* =================================================================
                PERSONALITY
            ================================================================= */}

            <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-4xl
                        border
                        border-white/10
                        bg-white/2.5
                        p-7
                        sm:p-10
                        lg:p-12
                    "
                >

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-20
                            -top-20
                            size-80
                            rounded-full
                            bg-(--accent-primary)/10
                            blur-[100px]
                        "
                    />

                    <div className="relative">

                        <SectionHeading
                            eyebrow="Your movie personality"
                            title="The Adrenaline Seeker"
                        />

                        <div
                            className="
                                mt-8
                                flex
                                flex-col
                                gap-6
                                lg:flex-row
                                lg:items-center
                                lg:justify-between
                            "
                        >

                            <div className="flex items-start gap-5">

                                <div
                                    className="
                                        flex
                                        size-14
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-(--accent-primary)/20
                                        bg-(--accent-primary)/10
                                        text-(--accent-primary)
                                        shadow-[0_0_30px_var(--accent-glow)]
                                    "
                                >
                                    <BrainIcon className="size-7" />
                                </div>

                                <p
                                    className="
                                        max-w-3xl
                                        text-xl
                                        font-medium
                                        leading-8
                                        text-white/60
                                        sm:text-2xl
                                        sm:leading-10
                                    "
                                >
                                    You like movies that move fast,
                                    hit hard and keep you guessing.
                                    Slow burns aren't really your thing.
                                </p>

                            </div>

                        </div>

                        <div className="mt-9 flex flex-wrap gap-2">

                            <PreferenceTag
                                icon={FlameIcon}
                                label="High energy"
                            />

                            <PreferenceTag
                                icon={TargetIcon}
                                label="Plot twists"
                            />

                            <PreferenceTag
                                icon={SparklesIcon}
                                label="Dark humor"
                            />

                            <PreferenceTag
                                icon={FilmIcon}
                                label="Big spectacle"
                            />

                        </div>

                    </div>

                </div>

            </section>

            {/* =================================================================
                COMBINATIONS
            ================================================================= */}

            <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">

                <SectionHeading
                    eyebrow="The interesting part"
                    title="Your Favorite Combos"
                />

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/30">
                    Your strongest genre combinations reveal what
                    makes a movie especially irresistible to you.
                </p>

                <div className="mt-8 grid gap-4 lg:grid-cols-3">

                    {COMBINATIONS.map((combo, index) => (
                        <ComboCard
                            key={`${combo.first}-${combo.second}`}
                            combo={combo}
                            rank={index + 1}
                        />
                    ))}

                </div>

            </section>

            {/* =================================================================
                MOVIES
            ================================================================= */}

            <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-8">

                <div className="flex items-end justify-between">

                    <SectionHeading
                        eyebrow="Your collection"
                        title="Movies That Shaped Your Taste"
                    />

                    <button
                        type="button"
                        className="
                            hidden
                            items-center
                            gap-2
                            text-xs
                            font-bold
                            text-white/30
                            transition-colors
                            hover:text-(--accent-primary)
                            sm:flex
                        "
                    >
                        View collection
                        <ArrowRightIcon className="size-4" />
                    </button>

                </div>

                <div className="mt-3 flex items-center gap-2">

                    <SparklesIcon
                        className="
                            size-4
                            text-(--accent-primary)
                        "
                    />

                    <p className="text-sm text-white/30">
                        These movies helped build your Movie DNA.
                    </p>

                </div>

                <div
                    className="
                        mt-8
                        grid
                        grid-cols-2
                        gap-4
                        sm:grid-cols-3
                        md:grid-cols-4
                    "
                >
                    {MOVIES.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>

            </section>

        </main>
    );
};

/* ==========================================================================
   Section Heading
   ========================================================================== */

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

                <span
                    className="
                        size-1.5
                        rounded-full
                        bg-(--accent-primary)
                        shadow-[0_0_12px_var(--accent-glow)]
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
                    {eyebrow}
                </span>

            </div>

            <h2
                className="
                    mt-2
                    text-3xl
                    font-black
                    tracking-tight
                    text-white
                    sm:text-4xl
                "
            >
                {title}
            </h2>

        </div>
    );
};

/* ==========================================================================
   Stat Pill
   ========================================================================== */

interface StatPillProps {
    icon: IconComponent;
    value: string;
    label: string;
}

const StatPill = ({
    icon: Icon,
    value,
    label,
}: StatPillProps) => {
    return (
        <div
            className="
                inline-flex
                items-center
                gap-3
                rounded-xl
                border
                border-white/10
                bg-white/[0.035]
                px-4
                py-3
            "
        >

            <Icon className="size-4 text-(--accent-primary)" />

            <div className="flex items-baseline gap-1.5">

                <span className="text-sm font-black text-white">
                    {value}
                </span>

                <span className="text-[10px] font-medium text-white/30">
                    {label}
                </span>

            </div>

        </div>
    );
};

/* ==========================================================================
   Info Pill
   ========================================================================== */

interface InfoPillProps {
    icon: IconComponent;
    text: string;
    accent?: boolean;
}

const InfoPill = ({
    icon: Icon,
    text,
    accent = false,
}: InfoPillProps) => {
    return (
        <div
            className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-4
                py-2
                text-xs
                font-bold
                ${accent
                    ? `
                            border-(--accent-primary)/20
                            bg-(--accent-primary)/10
                            text-(--accent-primary)
                        `
                    : `
                            border-white/10
                            bg-white/5
                            text-white/45
                        `
                }
            `}
        >
            <Icon className="size-3.5" />
            {text}
        </div>
    );
};

/* ==========================================================================
   Preference Tag
   ========================================================================== */

interface PreferenceTagProps {
    icon: IconComponent;
    label: string;
}

const PreferenceTag = ({
    icon: Icon,
    label,
}: PreferenceTagProps) => {
    return (
        <span
            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-4
                py-2
                text-xs
                font-semibold
                text-white/50
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-(--accent-primary)/30
                hover:bg-(--accent-primary)/10
                hover:text-(--accent-primary)
            "
        >
            <Icon className="size-3.5" />
            {label}
        </span>
    );
};

/* ==========================================================================
   Genre Card
   ========================================================================== */

interface GenreCardProps {
    genre: (typeof GENRES)[number];
    rank: number;
}

const GenreCard = ({
    genre,
    rank,
}: GenreCardProps) => {

    const GenreIcon = genre.icon;

    return (
        <article
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/2.5
                p-5
                transition-all
                duration-500
                hover:-translate-y-1.5
                hover:border-(--accent-primary)/30
                hover:bg-(--accent-primary)/5
                hover:shadow-[0_20px_70px_var(--accent-glow)]
            "
        >

            {/* Glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    size-32
                    rounded-full
                    bg-(--accent-primary)/10
                    blur-3xl
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                "
            />

            <div className="relative">

                <div className="flex items-start justify-between">

                    <div
                        className="
                            flex
                            size-11
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-(--accent-primary)/20
                            bg-(--accent-primary)/10
                            text-(--accent-primary)
                            transition-all
                            duration-500
                            group-hover:scale-110
                            group-hover:shadow-[0_0_30px_var(--accent-glow)]
                        "
                    >
                        <GenreIcon className="size-5" />
                    </div>

                    <span
                        className="
                            rounded-full
                            border
                            border-white/10
                            bg-black/20
                            px-2
                            py-1
                            text-[9px]
                            font-black
                            text-white/30
                        "
                    >
                        #{rank}
                    </span>

                </div>

                <h3 className="mt-8 text-lg font-black">
                    {genre.name}
                </h3>

                <p className="mt-1 text-[10px] text-white/30">
                    {genre.description}
                </p>

                <div className="mt-6 flex items-end justify-between">

                    <span
                        className="
                            text-2xl
                            font-black
                            text-(--accent-primary)
                        "
                    >
                        {genre.percentage}%
                    </span>

                    <span className="text-[10px] font-bold text-white/25">
                        {genre.count} movies
                    </span>

                </div>

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">

                    <div
                        className="
                            h-full
                            rounded-full
                            bg-(--accent-primary)
                            shadow-[0_0_12px_var(--accent-glow)]
                            transition-all
                            duration-1000
                        "
                        style={{
                            width: `${genre.percentage}%`,
                        }}
                    />

                </div>

            </div>

        </article>
    );
};

/* ==========================================================================
   Combination Card
   ========================================================================== */

interface ComboCardProps {
    combo: (typeof COMBINATIONS)[number];
    rank: number;
}

const ComboCard = ({
    combo,
    rank,
}: ComboCardProps) => {

    const FirstIcon = combo.firstIcon;
    const SecondIcon = combo.secondIcon;

    return (
        <article
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/2.5
                p-6
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-(--accent-primary)/30
                hover:bg-(--accent-primary)/5
                hover:shadow-[0_20px_70px_var(--accent-glow)]
            "
        >

            <div className="flex items-center justify-between">

                <span
                    className="
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-white/20
                    "
                >
                    #{rank} combination
                </span>

                <span
                    className="
                        text-sm
                        font-black
                        text-(--accent-primary)
                    "
                >
                    {combo.percentage}%
                </span>

            </div>

            <div className="mt-7">

                <ComboGenre
                    icon={FirstIcon}
                    name={combo.first}
                />

                <div className="my-3 ml-5 h-5 border-l border-dashed border-(--accent-primary)/20" />

                <ComboGenre
                    icon={SecondIcon}
                    name={combo.second}
                />

            </div>

            <p className="mt-6 text-xs leading-5 text-white/30">
                {combo.description}
            </p>

        </article>
    );
};

/* ==========================================================================
   Combo Genre
   ========================================================================== */

interface ComboGenreProps {
    icon: IconComponent;
    name: string;
}

const ComboGenre = ({
    icon: Icon,
    name,
}: ComboGenreProps) => {
    return (
        <div className="flex items-center gap-3">

            <div
                className="
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-(--accent-primary)/20
                    bg-(--accent-primary)/10
                    text-(--accent-primary)
                    transition-all
                    duration-300
                    group-hover:scale-105
                "
            >
                <Icon className="size-4.5" />
            </div>

            <h3 className="text-lg font-black">
                {name}
            </h3>

        </div>
    );
};

/* ==========================================================================
   Movie Card
   ========================================================================== */

interface MovieCardProps {
    movie: (typeof MOVIES)[number];
}

const MovieCard = ({
    movie,
}: MovieCardProps) => {
    return (
        <article className="group cursor-pointer">

            <div
                className="
                    relative
                    aspect-2/3
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    transition-all
                    duration-500
                    group-hover:-translate-y-1
                    group-hover:border-(--accent-primary)/30
                    group-hover:shadow-[0_25px_60px_var(--accent-glow)]
                "
            >

                <img
                    src={movie.poster}
                    alt={movie.title}
                    loading="lazy"
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                    "
                />

                {/* Gradient */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-linear-to-t
                        from-black
                        via-black/20
                        to-transparent
                        opacity-90
                    "
                />

                {/* Rating */}

                <div
                    className="
                        absolute
                        right-3
                        top-3
                        flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-white/10
                        bg-black/60
                        px-2.5
                        py-1.5
                        backdrop-blur-md
                    "
                >
                    <StarIcon className="size-3 text-(--accent-primary)" />

                    <span className="text-[10px] font-black text-white">
                        {movie.rating}
                    </span>
                </div>

                {/* Play */}

                <div
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        flex
                        size-12
                        -translate-x-1/2
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-(--accent-primary)
                        text-black
                        opacity-0
                        shadow-[0_0_35px_var(--accent-glow)]
                        transition-all
                        duration-300
                        group-hover:scale-110
                        group-hover:opacity-100
                    "
                >
                    <PlayIcon className="ml-0.5 size-5" />
                </div>

                {/* Info */}

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        p-4
                    "
                >

                    <div className="flex items-center gap-2">

                        <FilmIcon
                            className="
                                size-3.5
                                shrink-0
                                text-(--accent-primary)
                            "
                        />

                        <h3 className="truncate text-sm font-black text-white">
                            {movie.title}
                        </h3>

                    </div>

                    <p className="mt-1 text-[10px] font-medium text-white/35">
                        {movie.genre}
                    </p>

                </div>

            </div>

        </article>
    );
};

export default ForYou;