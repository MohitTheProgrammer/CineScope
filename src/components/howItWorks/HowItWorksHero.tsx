import {
    ArrowRightIcon,
    DnaIcon,
    FlameIcon,
    RocketIcon,
    SearchIcon,
    SparklesIcon,
} from "../../assets/icons/Icons";

import FloatingCard from "./FloatingCard";

interface HowItWorksHeroProps {
    isLoggedIn: boolean;
    onStartDiscovering: () => void;
}

const HowItWorksHero = ({
    isLoggedIn,
    onStartDiscovering,
}: HowItWorksHeroProps) => {
    return (
        <section
            className="
                relative
                mx-auto
                max-w-7xl
                px-6
                pb-24
                pt-32
                lg:px-8
            "
        >
            {/* Ambient glow */}

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
                {/* Eyebrow */}

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
                        {isLoggedIn
                            ? "Your movie taste"
                            : "Behind the scenes"}
                    </span>
                </div>

                {/* Heading */}

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
                    {isLoggedIn ? (
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

                {/* Description */}

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
                    {isLoggedIn
                        ? "Your likes and ratings become signals that help CineScope understand what kind of movies you really love."
                        : "Every movie you like tells us something. CineScope turns those little signals into a picture of your unique movie taste."}
                </p>

                {/* CTA */}

                {!isLoggedIn && (
                    <button
                        type="button"
                        onClick={onStartDiscovering}
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

                <div
                    className="
                        relative
                        mx-auto
                        mt-20
                        hidden
                        h-48
                        max-w-4xl
                        md:block
                    "
                >
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
                        <DnaIcon
                            className="
                                size-12
                                text-(--accent-primary)
                            "
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksHero;