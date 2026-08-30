const RecommendationHeader = () => {
    return (
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
    );
};

export default RecommendationHeader;