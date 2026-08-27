import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

import {
    ArrowRightIcon,
    BrainIcon,
    ChartIcon,
    DnaIcon,
    FilmIcon,
    FlameIcon,
    HeartIcon,
    RocketIcon,
    SearchIcon,
    SparklesIcon,
    StarIcon,
    TargetIcon,
} from "../assets/icons/Icons";

const HowItWorks = () => {
    const navigate = useNavigate();
    const { user, loading } = useUser();

    const [rating, setRating] = useState(8.5);
    const [liked, setLiked] = useState(false);
    const [activeGenre, setActiveGenre] = useState(0);

    const genres = [
        {
            name: "Action",
            icon: FlameIcon,
            percentage: 42,
            color: "bg-orange-400",
        },
        {
            name: "Mystery",
            icon: SearchIcon,
            percentage: 23,
            color: "bg-violet-400",
        },
        {
            name: "Comedy",
            icon: SparklesIcon,
            percentage: 16,
            color: "bg-yellow-400",
        },
        {
            name: "Sci-Fi",
            icon: RocketIcon,
            percentage: 12,
            color: "bg-cyan-400",
        },
        {
            name: "Thriller",
            icon: TargetIcon,
            percentage: 7,
            color: "bg-rose-400",
        },
    ];

    /*
     * Wait for Firebase to determine whether
     * the user is authenticated.
     */
    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-(--bg-primary)">
                <div className="size-7 animate-spin rounded-full border-2 border-white/10 border-t-(--accent-primary)" />
            </main>
        );
    }

    return (
        <main className="min-h-screen overflow-hidden bg-(--bg-primary) text-white">
            {/* ================================================================== */}
            {/* HERO                                                               */}
            {/* ================================================================== */}

            <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-8">
                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-40
                        top-10
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
                        -right-40
                        top-32
                        size-96
                        rounded-full
                        bg-purple-500/10
                        blur-3xl
                    "
                />

                <div className="relative text-center">
                    <div className="flex items-center justify-center gap-2">
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
                            {user
                                ? "Your movie taste"
                                : "Behind the scenes"}
                        </span>
                    </div>

                    <h1
                        className="
                            mx-auto
                            mt-5
                            max-w-4xl
                            text-5xl
                            font-black
                            tracking-tighter
                            sm:text-6xl
                            lg:text-8xl
                        "
                    >
                        {user ? (
                            <>
                                Let's discover
                                <br />
                                <span className="text-(--accent-primary)">
                                    your movie DNA.
                                </span>
                            </>
                        ) : (
                            <>
                                How CineScope
                                <br />
                                <span className="text-(--accent-primary)">
                                    gets you.
                                </span>
                            </>
                        )}
                    </h1>

                    <p
                        className="
                            mx-auto
                            mt-7
                            max-w-2xl
                            text-base
                            leading-7
                            text-white/45
                            sm:text-lg
                        "
                    >
                        {user
                            ? "Your likes and ratings become signals that help CineScope understand what kind of movies you really love."
                            : "Every movie you like tells us something. CineScope turns those little signals into a picture of your unique movie taste."}
                    </p>

                    {!user && (
                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                            className="
                                mt-8
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-(--accent-primary)
                                px-6
                                py-3
                                text-sm
                                font-bold
                                text-white
                                shadow-[0_0_30px_var(--accent-glow)]
                                transition-all
                                hover:scale-105
                            "
                        >
                            Start discovering
                            <ArrowRightIcon className="size-4" />
                        </button>
                    )}

                    {/* Floating genre cards */}

                    <div className="relative mx-auto mt-20 hidden h-48 max-w-4xl md:block">
                        <FloatingCard
                            className="left-[5%] top-8 rotate-[-8deg]"
                            icon={
                                <FlameIcon className="size-5 text-orange-400" />
                            }
                            label="Action"
                        />

                        <FloatingCard
                            className="left-[27%] top-28 rotate-[5deg]"
                            icon={
                                <SearchIcon className="size-5 text-violet-400" />
                            }
                            label="Mystery"
                        />

                        <FloatingCard
                            className="right-[27%] top-8 rotate-[-5deg]"
                            icon={
                                <SparklesIcon className="size-5 text-yellow-400" />
                            }
                            label="Comedy"
                        />

                        <FloatingCard
                            className="right-[5%] top-28 rotate-[8deg]"
                            icon={
                                <RocketIcon className="size-5 text-cyan-400" />
                            }
                            label="Sci-Fi"
                        />

                        <div
                            className="
                                absolute
                                left-1/2
                                top-1/2
                                flex
                                size-24
                                -translate-x-1/2
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-(--accent-primary)/20
                                bg-(--accent-primary)/5
                                shadow-[0_0_80px_var(--accent-glow)]
                            "
                        >
                            <DnaIcon className="size-12 text-(--accent-primary)" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================== */}
            {/* LOGGED IN STATUS                                                   */}
            {/* ================================================================== */}

            {user && (
                <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
                    <div
                        className="
                            flex
                            flex-col
                            gap-6
                            rounded-3xl
                            border
                            border-(--accent-primary)/20
                            bg-(--accent-primary)/5
                            p-6
                            sm:flex-row
                            sm:items-center
                            sm:p-8
                        "
                    >
                        <div
                            className="
                                flex
                                size-14
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                bg-(--accent-primary)/10
                            "
                        >
                            <SparklesIcon className="size-7 text-(--accent-primary)" />
                        </div>

                        <div className="flex-1">
                            <p
                                className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-(--accent-primary)
                                "
                            >
                                You're already part of it
                            </p>

                            <h2 className="mt-2 text-2xl font-black">
                                CineScope is learning your taste.
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-white/40">
                                Every movie you like and rate gives your
                                Movie DNA another piece of information.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/for-you")}
                            className="
                                inline-flex
                                shrink-0
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-white/10
                                bg-white/5
                                px-5
                                py-3
                                text-xs
                                font-bold
                                transition-all
                                hover:border-(--accent-primary)
                                hover:bg-(--accent-primary)
                            "
                        >
                            See My DNA
                            <ArrowRightIcon className="size-4" />
                        </button>
                    </div>
                </section>
            )}

            {/* ================================================================== */}
            {/* STEP 1                                                             */}
            {/* ================================================================== */}

            <StepSection
                number="01"
                eyebrow="It starts with you"
                title="You like a movie."
                description={
                    user
                        ? "When you add a movie to your liked list, CineScope saves it as a signal. That movie becomes another clue about the kind of stories you enjoy."
                        : "When you add a movie to your liked list, CineScope doesn't just remember the title. It looks at what makes that movie tick."
                }
            >
                <div className="relative mx-auto max-w-sm">
                    <div
                        className={`
                            overflow-hidden
                            rounded-3xl
                            border
                            transition-all
                            duration-500
                            ${liked
                                ? "border-(--accent-primary)/50 shadow-[0_20px_70px_var(--accent-glow)]"
                                : "border-white/10"
                            }
                        `}
                    >
                        <div
                            className="
                                relative
                                aspect-2/3
                                bg-linear-to-br
                                from-orange-500/30
                                via-red-500/10
                                to-transparent
                            "
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <FilmIcon
                                    className={`
                                        size-20
                                        transition-all
                                        duration-500
                                        ${liked
                                            ? "text-(--accent-primary) drop-shadow-[0_0_25px_var(--accent-glow)]"
                                            : "text-white/50"
                                        }
                                    `}
                                />

                                <h3 className="mt-5 text-2xl font-black">
                                    A Movie
                                </h3>

                                <p className="mt-2 text-sm text-white/35">
                                    Your choice matters.
                                </p>
                            </div>

                            <div
                                className="
                                    absolute
                                    inset-x-0
                                    bottom-0
                                    bg-linear-to-t
                                    from-black
                                    to-transparent
                                    p-6
                                    pt-20
                                "
                            >
                                <p className="text-xs uppercase tracking-widest text-white/30">
                                    Your signal
                                </p>

                                <div className="mt-2 flex items-center gap-2">
                                    <HeartIcon
                                        className={`
                                            size-4
                                            ${liked
                                                ? "fill-current text-(--accent-primary)"
                                                : "text-white/40"
                                            }
                                        `}
                                    />

                                    <span className="text-sm font-bold">
                                        {liked
                                            ? "Added to your taste profile"
                                            : "Waiting for your signal"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setLiked((value) => !value)}
                        className="
                            mt-5
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            px-5
                            py-3
                            text-sm
                            font-bold
                            transition-all
                            hover:border-(--accent-primary)
                            hover:bg-(--accent-primary)
                        "
                    >
                        <HeartIcon
                            className={`
                                size-4
                                ${liked
                                    ? "fill-current"
                                    : ""
                                }
                            `}
                        />

                        {liked
                            ? "You liked it"
                            : "Like this movie"}
                    </button>
                </div>
            </StepSection>

            {/* ================================================================== */}
            {/* STEP 2                                                             */}
            {/* ================================================================== */}

            <StepSection
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
                <div className="w-full max-w-lg">
                    <div
                        className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/[0.035]
                            p-7
                        "
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="
                                    flex
                                    size-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-(--accent-primary)/10
                                "
                            >
                                <FilmIcon className="size-7 text-(--accent-primary)" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                                    Movie ingredients
                                </p>

                                <h3 className="mt-1 text-lg font-black">
                                    What makes a movie yours?
                                </h3>
                            </div>
                        </div>

                        <div className="mt-7 space-y-3">
                            {[
                                {
                                    icon: FlameIcon,
                                    genre: "Action",
                                },
                                {
                                    icon: SearchIcon,
                                    genre: "Mystery",
                                },
                                {
                                    icon: SparklesIcon,
                                    genre: "Comedy",
                                },
                            ].map(
                                (
                                    {
                                        icon: Icon,
                                        genre,
                                    },
                                    index
                                ) => (
                                    <div
                                        key={genre}
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                            rounded-2xl
                                            border
                                            border-white/5
                                            bg-white/2.5
                                            p-4
                                            transition-all
                                            hover:border-(--accent-primary)/30
                                            hover:bg-white/5
                                        "
                                    >
                                        <span
                                            className="
                                                flex
                                                size-10
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-(--accent-primary)/10
                                            "
                                        >
                                            <Icon className="size-5 text-(--accent-primary)" />
                                        </span>

                                        <div className="flex-1">
                                            <p className="text-sm font-bold">
                                                {genre}
                                            </p>

                                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                                                <div
                                                    className="h-full rounded-full bg-(--accent-primary)"
                                                    style={{
                                                        width: `${85 -
                                                            index *
                                                            18
                                                            }%`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <span className="text-xs font-bold text-white/30">
                                            signal
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </StepSection>

            {/* ================================================================== */}
            {/* STEP 3                                                             */}
            {/* ================================================================== */}

            <StepSection
                number="03"
                eyebrow="Patterns emerge"
                title="Your favorite genres rise to the top."
                description={
                    user
                        ? "As your liked movies grow, CineScope combines their genre signals and gives more weight to the patterns that appear most often."
                        : "One movie tells us a little. Several movies reveal patterns. Repeated genre signals gradually become more important."
                }
            >
                <div className="w-full max-w-lg">
                    <div
                        className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/[0.035]
                            p-7
                        "
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="
                                    flex
                                    size-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-(--accent-primary)/10
                                "
                            >
                                <ChartIcon className="size-7 text-(--accent-primary)" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                                    Your genre signals
                                </p>

                                <h3 className="mt-1 text-lg font-black">
                                    A taste starts taking shape.
                                </h3>
                            </div>
                        </div>

                        <div className="mt-8 space-y-5">
                            {genres.map((genre, index) => {
                                const Icon = genre.icon;
                                const active =
                                    activeGenre === index;

                                return (
                                    <button
                                        type="button"
                                        key={genre.name}
                                        onClick={() =>
                                            setActiveGenre(
                                                index
                                            )
                                        }
                                        className="
                                            block
                                            w-full
                                            text-left
                                        "
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="flex items-center gap-2 text-sm font-bold">
                                                <Icon
                                                    className={`
                                                        size-4
                                                        ${active
                                                            ? "text-(--accent-primary)"
                                                            : "text-white/40"
                                                        }
                                                    `}
                                                />

                                                {genre.name}
                                            </span>

                                            <span className="text-xs font-black text-white/40">
                                                {genre.percentage}%
                                            </span>
                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                                            <div
                                                className={`
                                                    h-full
                                                    rounded-full
                                                    ${genre.color}
                                                    transition-all
                                                    duration-500
                                                `}
                                                style={{
                                                    width: `${genre.percentage}%`,
                                                    opacity: active
                                                        ? 1
                                                        : 0.65,
                                                }}
                                            />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div
                            className="
                                mt-7
                                rounded-2xl
                                border
                                border-(--accent-primary)/10
                                bg-(--accent-primary)/5
                                p-4
                            "
                        >
                            <p className="text-xs leading-5 text-white/45">
                                Your strongest signal right now is{" "}
                                <strong className="text-white">
                                    {genres[activeGenre].name}
                                </strong>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </StepSection>

            {/* ================================================================== */}
            {/* STEP 4                                                             */}
            {/* ================================================================== */}

            <StepSection
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
                <div className="w-full max-w-lg">
                    <div
                        className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/[0.035]
                            p-7
                        "
                    >
                        <div className="text-center">
                            <div
                                className={`
                                    mx-auto
                                    flex
                                    size-16
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    transition-all
                                    duration-300
                                    ${rating >= 8
                                        ? "border-(--accent-primary)/30 bg-(--accent-primary)/10"
                                        : rating >= 6
                                            ? "border-yellow-400/20 bg-yellow-400/10"
                                            : "border-white/10 bg-white/5"
                                    }
                                `}
                            >
                                {rating >= 8 ? (
                                    <StarIcon className="size-8 text-(--accent-secondary)" />
                                ) : rating >= 6 ? (
                                    <SparklesIcon className="size-8 text-yellow-400" />
                                ) : (
                                    <TargetIcon className="size-8 text-white/40" />
                                )}
                            </div>

                            <div className="mt-4 text-6xl font-black">
                                {rating.toFixed(1)}
                            </div>

                            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/30">
                                Your rating
                            </p>
                        </div>

                        <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.5"
                            value={rating}
                            onChange={(event) =>
                                setRating(
                                    Number(
                                        event.target.value
                                    )
                                )
                            }
                            className="
                                mt-10
                                w-full
                                accent-(--accent-primary)
                            "
                        />

                        <div className="mt-3 flex justify-between text-[10px] font-bold text-white/20">
                            <span>1 — Didn't love it</span>
                            <span>10 — Absolutely loved it</span>
                        </div>
                    </div>
                </div>
            </StepSection>

            {/* ================================================================== */}
            {/* STEP 5                                                             */}
            {/* ================================================================== */}

            <StepSection
                number="05"
                eyebrow="The algorithm connects the dots"
                title="Small signals become a bigger picture."
                description={
                    user
                        ? "CineScope combines your liked movies, their genres and your ratings to understand the patterns behind your choices."
                        : "The algorithm connects your movie signals together. The result isn't a simple list of genres — it's a picture of how your taste is distributed."
                }
            >
                <div className="w-full max-w-lg">
                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/[0.035]
                            p-8
                        "
                    >
                        <div
                            className="
                                pointer-events-none
                                absolute
                                left-1/2
                                top-1/2
                                size-72
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                bg-(--accent-primary)/10
                                blur-3xl
                            "
                        />

                        <div className="relative">
                            <div className="flex items-center justify-center">
                                <div
                                    className="
                                        flex
                                        size-24
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-(--accent-primary)/30
                                        bg-(--accent-primary)/10
                                        shadow-[0_0_50px_var(--accent-glow)]
                                    "
                                >
                                    <BrainIcon className="size-11 text-(--accent-primary)" />
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-3 gap-3">
                                {[
                                    {
                                        icon: HeartIcon,
                                        label: "Likes",
                                    },
                                    {
                                        icon: ChartIcon,
                                        label: "Patterns",
                                    },
                                    {
                                        icon: StarIcon,
                                        label: "Ratings",
                                    },
                                ].map(
                                    ({
                                        icon: Icon,
                                        label,
                                    }) => (
                                        <div
                                            key={label}
                                            className="
                                                flex
                                                flex-col
                                                items-center
                                                gap-2
                                                rounded-2xl
                                                border
                                                border-white/5
                                                bg-white/2.5
                                                p-4
                                            "
                                        >
                                            <Icon className="size-5 text-(--accent-primary)" />

                                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                                                {label}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="my-5 flex justify-center">
                                <div className="h-8 w-px bg-linear-to-b from-(--accent-primary)/60 to-transparent" />
                            </div>

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-(--accent-primary)/20
                                    bg-(--accent-primary)/5
                                    p-5
                                    text-center
                                "
                            >
                                <DnaIcon className="mx-auto size-7 text-(--accent-primary)" />

                                <p className="mt-3 text-sm font-black">
                                    Your Movie DNA
                                </p>

                                <p className="mt-1 text-xs leading-5 text-white/35">
                                    A weighted picture of your movie taste.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </StepSection>

            {/* ================================================================== */}
            {/* FINAL DNA                                                           */}
            {/* ================================================================== */}

            <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-4xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        px-6
                        py-16
                        sm:px-10
                        lg:px-16
                    "
                >
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
                            bg-(--accent-primary)/10
                            blur-3xl
                        "
                    />

                    <div className="relative mx-auto max-w-3xl text-center">
                        <div
                            className="
                                mx-auto
                                flex
                                size-20
                                items-center
                                justify-center
                                rounded-3xl
                                border
                                border-(--accent-primary)/20
                                bg-(--accent-primary)/10
                                shadow-[0_0_50px_var(--accent-glow)]
                            "
                        >
                            <DnaIcon className="size-11 text-(--accent-primary)" />
                        </div>

                        <p
                            className="
                                mt-8
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.3em]
                                text-(--accent-primary)
                            "
                        >
                            The final result
                        </p>

                        <h2
                            className="
                                mt-3
                                text-4xl
                                font-black
                                tracking-tight
                                sm:text-5xl
                            "
                        >
                            Your Movie DNA.
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-5
                                max-w-2xl
                                text-sm
                                leading-7
                                text-white/40
                                sm:text-base
                            "
                        >
                            The more movies you interact with, the clearer
                            your taste becomes. CineScope uses those signals
                            to build a preference profile that is uniquely
                            yours.
                        </p>

                        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
                            {genres.map((genre) => {
                                const Icon = genre.icon;

                                return (
                                    <div
                                        key={genre.name}
                                        className="
                                            flex
                                            flex-col
                                            items-center
                                            gap-2
                                            rounded-2xl
                                            border
                                            border-white/5
                                            bg-white/2.5
                                            p-4
                                        "
                                    >
                                        <Icon className="size-5 text-(--accent-primary)" />

                                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                                            {genre.name}
                                        </span>

                                        <span className="text-sm font-black text-white">
                                            {genre.percentage}%
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-10">
                            {user ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/for-you")
                                    }
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-(--accent-primary)
                                        px-7
                                        py-3.5
                                        text-sm
                                        font-bold
                                        shadow-[0_0_30px_var(--accent-glow)]
                                        transition-all
                                        hover:scale-105
                                    "
                                >
                                    <DnaIcon className="size-4" />
                                    See My Movie DNA
                                    <ArrowRightIcon className="size-4" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/register")
                                    }
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-(--accent-primary)
                                        px-7
                                        py-3.5
                                        text-sm
                                        font-bold
                                        shadow-[0_0_30px_var(--accent-glow)]
                                        transition-all
                                        hover:scale-105
                                    "
                                >
                                    <FilmIcon className="size-4" />
                                    Start Building My DNA
                                    <ArrowRightIcon className="size-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

/* ========================================================================== */
/* Step Section                                                              */
/* ========================================================================== */

interface StepSectionProps {
    number: string;
    eyebrow: string;
    title: string;
    description: string;
    reverse?: boolean;
    children: ReactNode;
}

const StepSection = ({
    number,
    eyebrow,
    title,
    description,
    reverse = false,
    children,
}: StepSectionProps) => {
    return (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div
                className={`
                    grid
                    items-center
                    gap-14
                    lg:grid-cols-2
                    lg:gap-24
                    ${reverse
                        ? "lg:[&>*:first-child]:order-2"
                        : ""
                    }
                `}
            >
                <div>
                    <div className="flex items-center gap-3">
                        <span
                            className="
                                text-5xl
                                font-black
                                tracking-tighter
                                text-white/10
                            "
                        >
                            {number}
                        </span>

                        <span className="h-px w-10 bg-(--accent-primary)/40" />

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
                            mt-5
                            max-w-xl
                            text-4xl
                            font-black
                            tracking-tight
                            sm:text-5xl
                        "
                    >
                        {title}
                    </h2>

                    <p
                        className="
                            mt-5
                            max-w-xl
                            text-sm
                            leading-7
                            text-white/40
                            sm:text-base
                        "
                    >
                        {description}
                    </p>
                </div>

                <div>{children}</div>
            </div>
        </section>
    );
};

/* ========================================================================== */
/* Floating Card                                                             */
/* ========================================================================== */

interface FloatingCardProps {
    icon: ReactNode;
    label: string;
    className?: string;
}

const FloatingCard = ({
    icon,
    label,
    className = "",
}: FloatingCardProps) => {
    return (
        <div
            className={`
                absolute
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-black/40
                px-4
                py-3
                shadow-[0_15px_40px_rgba(0,0,0,0.3)]
                backdrop-blur-xl
                ${className}
            `}
        >
            <span
                className="
                    flex
                    size-8
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/5
                "
            >
                {icon}
            </span>

            <span className="text-xs font-bold text-white/70">
                {label}
            </span>
        </div>
    );
};

export default HowItWorks;