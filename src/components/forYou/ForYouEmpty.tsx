import { DnaIcon } from "../../assets/icons/Icons";

const ForYouEmpty = () => {
    return (
        <main
            className="
                min-h-screen
                bg-(--bg-primary)
                text-white
            "
        >
            <section
                className="
                    mx-auto
                    max-w-7xl
                    px-6
                    pb-20
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
                        Start liking, rating, watching
                        or saving movies and CineScope
                        will start learning your taste.
                    </p>
                </div>

                <div
                    className="
                        mt-12
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-10
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

                    <h2
                        className="
                            mt-5
                            text-2xl
                            font-black
                        "
                    >
                        Your Movie DNA is waiting
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-3
                            max-w-lg
                            text-sm
                            leading-6
                            text-white/40
                        "
                    >
                        Interact with some movies first.
                        We'll use those choices to
                        understand your preferences.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default ForYouEmpty;