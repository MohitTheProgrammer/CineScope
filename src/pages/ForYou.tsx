import { useMemo } from "react";

import {
    FlameIcon,
    EyeIcon,
    RocketIcon,
    FilmIcon,
    SparklesIcon,
    BrainIcon,
    TargetIcon,
    DnaIcon,
} from "../assets/icons/Icons";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type IconComponent = React.ComponentType<{
    className?: string;
}>;

/* -------------------------------------------------------------------------- */
/* Genre Data                                                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Genre Combinations                                                         */
/* -------------------------------------------------------------------------- */

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
        description:
            "Explosions with a sense of humor",
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

/* -------------------------------------------------------------------------- */
/* Movies                                                                     */
/* -------------------------------------------------------------------------- */

const MOVIES = [
    {
        id: 1,
        title: "Bullet Train",
        poster:
            "https://image.tmdb.org/t/p/w500/9r3j1uW8V6FQ6c1K8xYq7Jq9.jpg",
    },
    {
        id: 2,
        title: "Inception",
        poster:
            "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    },
    {
        id: 3,
        title: "The Dark Knight",
        poster:
            "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
        id: 4,
        title: "Interstellar",
        poster:
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
];

/* -------------------------------------------------------------------------- */
/* For You                                                                     */
/* -------------------------------------------------------------------------- */

const ForYou = () => {
    const topGenre = GENRES[0];

    const TopGenreIcon = topGenre.icon;

    const totalMovies = useMemo(
        () =>
            GENRES.reduce(
                (total, genre) =>
                    total + genre.count,
                0
            ),
        []
    );

    return (
        <main className="min-h-screen bg-(--bg-primary) text-white">

            {/* ================================================================== */}
            {/* Header                                                             */}
            {/* ================================================================== */}

            <section className="mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8">

                <div className="max-w-3xl">

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
                                font-bold
                                uppercase
                                tracking-[0.3em]
                                text-(--accent-primary)
                            "
                        >
                            Personalized for you
                        </span>

                    </div>

                    <h1
                        className="
                            mt-4
                            text-5xl
                            font-black
                            tracking-[-0.04em]
                            sm:text-6xl
                            lg:text-7xl
                        "
                    >
                        Your{" "}
                        <span className="text-(--accent-primary)">
                            Movie DNA
                        </span>
                    </h1>

                    <p
                        className="
                            mt-5
                            max-w-2xl
                            text-base
                            leading-7
                            text-white/45
                            sm:text-lg
                        "
                    >
                        We looked at the movies you love
                        and found something interesting
                        about your taste.
                    </p>

                </div>

                {/* ============================================================= */}
                {/* DNA Hero                                                       */}
                {/* ============================================================= */}

                <div
                    className="
                        relative
                        mt-12
                        overflow-hidden
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-6
                        sm:p-8
                        lg:p-10
                    "
                >

                    {/* Accent glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-32
                            -top-32
                            size-96
                            rounded-full
                            bg-(--accent-primary)/10
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-40
                            left-1/3
                            size-80
                            rounded-full
                            bg-(--accent-primary)/5
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            relative
                            grid
                            gap-10
                            lg:grid-cols-[1fr_280px]
                            lg:items-center
                        "
                    >

                        {/* Main genre */}

                        <div>

                            <div className="flex items-center gap-4">

                                <div
                                    className="
                                        flex
                                        size-14
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-(--accent-primary)/20
                                        bg-(--accent-primary)/10
                                        text-(--accent-primary)
                                        shadow-[0_0_35px_var(--accent-glow)]
                                    "
                                >
                                    <TopGenreIcon className="size-7" />
                                </div>

                                <div>

                                    <p
                                        className="
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-[0.2em]
                                            text-white/35
                                        "
                                    >
                                        Your #1 genre
                                    </p>

                                    <h2 className="text-3xl font-black">
                                        {topGenre.name}
                                    </h2>

                                </div>

                            </div>

                            <p
                                className="
                                    mt-6
                                    max-w-xl
                                    text-lg
                                    leading-8
                                    text-white/60
                                "
                            >
                                You don't watch movies
                                quietly. Explosions,
                                impossible missions and
                                characters who refuse to stay
                                down — that's your territory.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">

                                {/* Movies analyzed */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        border
                                        border-(--accent-primary)/20
                                        bg-(--accent-primary)/10
                                        px-4
                                        py-2
                                        text-xs
                                        font-bold
                                        text-(--accent-primary)
                                    "
                                >
                                    <FilmIcon className="size-3.5" />

                                    {topGenre.count} movies
                                </div>

                                {/* Total */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        border
                                        border-white/10
                                        bg-white/5
                                        px-4
                                        py-2
                                        text-xs
                                        font-bold
                                        text-white/60
                                    "
                                >
                                    <DnaIcon className="size-3.5" />

                                    {totalMovies} movies analyzed
                                </div>

                            </div>

                        </div>

                        {/* Percentage */}

                        <div className="relative flex justify-center">

                            <div
                                className="
                                    relative
                                    flex
                                    size-56
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-(--accent-primary)/20
                                    bg-(--accent-primary)/5
                                    shadow-[0_0_80px_var(--accent-glow)]
                                "
                            >

                                {/* Inner ring */}

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-3
                                        rounded-full
                                        border
                                        border-(--accent-primary)/10
                                    "
                                />

                                <span className="relative text-6xl font-black">
                                    {topGenre.percentage}%
                                </span>

                                <span
                                    className="
                                        relative
                                        mt-1
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-white/35
                                    "
                                >
                                    of your taste
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ================================================================== */}
            {/* Top Genres                                                         */}
            {/* ================================================================== */}

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">

                <SectionHeading
                    eyebrow="Your taste"
                    title="Top Genres"
                />

                <div
                    className="
                        mt-7
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

            {/* ================================================================== */}
            {/* Personality                                                        */}
            {/* ================================================================== */}

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-7
                        sm:p-10
                    "
                >

                    <div
                        className="
                            pointer-events-none
                            absolute
                            right-0
                            top-0
                            size-64
                            rounded-full
                            bg-(--accent-primary)/5
                            blur-3xl
                        "
                    />

                    <div className="relative">

                        <SectionHeading
                            eyebrow="Your personality"
                            title="The Adrenaline Seeker"
                        />

                        <div className="mt-6 flex items-start gap-4">

                            <div
                                className="
                                    mt-1
                                    flex
                                    size-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-(--accent-primary)/20
                                    bg-(--accent-primary)/10
                                    text-(--accent-primary)
                                "
                            >
                                <BrainIcon className="size-5" />
                            </div>

                            <p
                                className="
                                    max-w-3xl
                                    text-xl
                                    font-medium
                                    leading-9
                                    text-white/65
                                    sm:text-2xl
                                "
                            >
                                You like movies that move
                                fast, hit hard and keep you
                                guessing. Slow burns aren't
                                really your thing.
                            </p>

                        </div>

                        <div className="mt-8 flex flex-wrap gap-2">

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

            {/* ================================================================== */}
            {/* Genre Combinations                                                 */}
            {/* ================================================================== */}

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">

                <SectionHeading
                    eyebrow="The interesting part"
                    title="Your Favorite Combos"
                />

                <div className="mt-7 grid gap-4 lg:grid-cols-3">

                    {COMBINATIONS.map((combo, index) => (
                        <ComboCard
                            key={`${combo.first}-${combo.second}`}
                            combo={combo}
                            rank={index + 1}
                        />
                    ))}

                </div>

            </section>

            {/* ================================================================== */}
            {/* Movies                                                              */}
            {/* ================================================================== */}

            <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">

                <SectionHeading
                    eyebrow="Your collection"
                    title="Movies That Shaped Your Taste"
                />

                <div className="mt-3 flex items-center gap-2">

                    <SparklesIcon
                        className="
                            size-4
                            text-(--accent-primary)
                        "
                    />

                    <p className="text-sm text-white/35">
                        These movies made the algorithm
                        suspicious.
                    </p>

                </div>

                <div
                    className="
                        mt-7
                        grid
                        grid-cols-2
                        gap-4
                        sm:grid-cols-3
                        md:grid-cols-4
                    "
                >
                    {MOVIES.map((movie) => (
                        <MoviePlaceholder
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>

            </section>

        </main>
    );
};

/* ========================================================================== */
/* Section Heading                                                             */
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

                <span
                    className="
                        size-1.5
                        rounded-full
                        bg-(--accent-primary)
                        shadow-[0_0_10px_var(--accent-glow)]
                    "
                />

                <span
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
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
                "
            >
                {title}
            </h2>

        </div>
    );
};

/* ========================================================================== */
/* Preference Tag                                                              */
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
                text-white/60
                transition-all
                duration-300
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

/* ========================================================================== */
/* Genre Card                                                                  */
/* ========================================================================== */

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
                bg-(--accent-primary)/5
                p-5
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-(--accent-primary)/30
                hover:bg-(--accent-primary)/10
                hover:shadow-[0_20px_60px_var(--accent-glow)]
            "
        >

            {/* Decorative glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-12
                    -top-12
                    size-28
                    rounded-full
                    bg-(--accent-primary)/10
                    blur-2xl
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
                            group-hover:shadow-[0_0_25px_var(--accent-glow)]
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
                            text-white/40
                        "
                    >
                        #{rank}
                    </span>

                </div>

                <h3 className="mt-8 text-lg font-black">
                    {genre.name}
                </h3>

                <p className="mt-1 text-[10px] text-white/35">
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

                    <span className="text-[10px] font-medium text-white/30">
                        {genre.count} movies
                    </span>

                </div>

                {/* Progress */}

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">

                    <div
                        className="
                            h-full
                            rounded-full
                            bg-(--accent-primary)
                            shadow-[0_0_10px_var(--accent-glow)]
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

/* ========================================================================== */
/* Combination Card                                                           */
/* ========================================================================== */

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
                bg-white/[0.035]
                p-6
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-(--accent-primary)/30
                hover:bg-(--accent-primary)/5
                hover:shadow-[0_20px_60px_var(--accent-glow)]
            "
        >

            <div className="flex items-center justify-between">

                <span
                    className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-white/25
                    "
                >
                    #{rank} combination
                </span>

                <span
                    className="
                        text-xs
                        font-black
                        text-(--accent-primary)
                    "
                >
                    {combo.percentage}%
                </span>

            </div>

            <div className="mt-7">

                {/* First genre */}

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
                            transition-transform
                            duration-300
                            group-hover:scale-105
                        "
                    >
                        <FirstIcon className="size-4.5" />
                    </div>

                    <h3 className="text-lg font-black">
                        {combo.first}
                    </h3>

                </div>

                {/* Connection */}

                <div className="my-3 ml-5 flex h-5 items-center">

                    <span
                        className="
                            h-full
                            border-l
                            border-dashed
                            border-(--accent-primary)/20
                        "
                    />

                </div>

                {/* Second genre */}

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
                            transition-transform
                            duration-300
                            group-hover:scale-105
                        "
                    >
                        <SecondIcon className="size-4.5" />
                    </div>

                    <h3 className="text-lg font-black">
                        {combo.second}
                    </h3>

                </div>

            </div>

            <p className="mt-6 text-xs leading-5 text-white/35">
                {combo.description}
            </p>

        </article>
    );
};

/* ========================================================================== */
/* Movie Placeholder                                                          */
/* ========================================================================== */

interface MoviePlaceholderProps {
    movie: (typeof MOVIES)[number];
}

const MoviePlaceholder = ({
    movie,
}: MoviePlaceholderProps) => {
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
                    group-hover:border-(--accent-primary)/30
                    group-hover:shadow-[0_20px_50px_var(--accent-glow)]
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

                <div
                    className="
                        absolute
                        inset-0
                        bg-linear-to
                        from-black
                        via-transparent
                        to-transparent
                        opacity-70
                    "
                />

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