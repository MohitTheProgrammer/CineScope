import {
    BrainIcon,
    DnaIcon,
    FilmIcon,
    SparklesIcon,
} from "../../assets/icons/Icons";

const RecommendationLoading = () => {
    return (
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
                        animate-pulse
                        rounded-full
                        bg-(--accent-primary)/8
                        blur-[100px]
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
                    {/* DNA Orb */}

                    <div className="relative flex size-28 items-center justify-center">
                        <div
                            className="
                                absolute
                                inset-0
                                animate-ping
                                rounded-full
                                border
                                border-(--accent-primary)/10
                            "
                        />

                        <div
                            className="
                                absolute
                                inset-2
                                rounded-full
                                border
                                border-(--accent-primary)/20
                            "
                        />

                        <div
                            className="
                                absolute
                                inset-1
                                animate-[spin_2.5s_linear_infinite]
                                rounded-full
                                border-t
                                border-(--accent-primary)/70
                            "
                        />

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
                                animate-pulse
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
                            CineScope Intelligence
                        </span>
                    </div>

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

                    <p
                        className="
                            mt-3
                            max-w-md
                            text-sm
                            leading-6
                            text-white/35
                        "
                    >
                        Analyzing your Movie DNA and
                        searching for something that
                        matches your taste.
                    </p>

                    {/* Processing */}

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <ProcessItem
                            icon={<SparklesIcon className="size-3" />}
                            label="Taste"
                        />

                        <span className="text-white/15">
                            →
                        </span>

                        <ProcessItem
                            icon={<BrainIcon className="size-3" />}
                            label="Analyze"
                        />

                        <span className="text-white/15">
                            →
                        </span>

                        <ProcessItem
                            icon={<FilmIcon className="size-3" />}
                            label="Discover"
                        />
                    </div>

                    {/* Loading dots */}

                    <div className="mt-7 flex items-center gap-1.5">
                        <LoadingDot />
                        <LoadingDot delay="150ms" />
                        <LoadingDot delay="300ms" />
                    </div>
                </div>
            </div>
        </section>
    );
};

interface ProcessItemProps {
    icon: React.ReactNode;
    label: string;
}

const ProcessItem = ({
    icon,
    label,
}: ProcessItemProps) => {
    return (
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
            <span className="text-(--accent-primary)">
                {icon}
            </span>

            {label}
        </div>
    );
};

interface LoadingDotProps {
    delay?: string;
}

const LoadingDot = ({
    delay = "0ms",
}: LoadingDotProps) => {
    return (
        <span
            className="
                size-1.5
                animate-bounce
                rounded-full
                bg-(--accent-primary)
            "
            style={{
                animationDelay: delay,
            }}
        />
    );
};

export default RecommendationLoading;