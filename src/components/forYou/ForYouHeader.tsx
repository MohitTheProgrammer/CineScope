const ForYouHeader = () => {
    return (
        <section
            className="
                mx-auto
                max-w-7xl
                px-6
                pb-8
                pt-28
                lg:px-8
            "
        >
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
        </section>
    );
};

export default ForYouHeader;