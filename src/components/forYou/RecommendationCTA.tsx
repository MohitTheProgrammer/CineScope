import { Link } from "react-router-dom";

import {
    SparklesIcon,
    ArrowRightIcon,
    DnaIcon,
} from "../../assets/icons/Icons";

const RecommendationCTA = () => {
    return (
        <section
            className="
                mx-auto
                max-w-7xl
                px-6
                pt-6
                lg:px-8
            "
        >
            <div
                className="
                    group
                    relative
                    w-full
                    overflow-hidden
                    rounded-3xl
                    border
                    border-(--accent-primary)/20
                    bg-white/[0.035]
                    p-8
                    sm:p-10
                "
            >

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        size-80
                        rounded-full
                        bg-(--accent-primary)/10
                        blur-3xl
                        transition-all
                        duration-700
                        group-hover:bg-(--accent-primary)/15
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-32
                        -left-20
                        size-72
                        rounded-full
                        bg-purple-500/5
                        blur-3xl
                    "
                />

                <div
                    className="
                        relative
                        flex
                        min-h-44
                        flex-col
                        items-center
                        justify-center
                        text-center
                        sm:min-h-52
                    "
                >

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
                            Your personal movie engine
                        </span>

                        <span
                            className="
                                size-1.5
                                rounded-full
                                bg-(--accent-primary)
                                shadow-[0_0_12px_var(--accent-glow)]
                            "
                        />
                    </div>

                    <h2
                        className="
                            mt-4
                            text-3xl
                            font-black
                            tracking-tight
                            sm:text-4xl
                        "
                    >
                        Don't know what to watch?
                    </h2>

                    <p
                        className="
                            mt-3
                            max-w-xl
                            text-sm
                            leading-6
                            text-white/40
                            sm:text-base
                        "
                    >
                        Let your Movie DNA decide.
                        CineScope finds a movie that
                        matches what you actually love.
                    </p>


                    <Link
                        to="/for-you/recommend-movie"
                        className="
                            group/button
                            relative
                            mt-8
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
                            shadow-[0_15px_50px_var(--accent-glow)]
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:scale-[1.02]
                            hover:shadow-[0_20px_70px_var(--accent-glow)]
                            active:translate-y-0
                            active:scale-[0.99]
                            sm:px-10
                            sm:text-lg
                        "
                    >
                        <span
                            className="
                                pointer-events-none
                                absolute
                                inset-y-0
                                -left-full
                                w-1/2
                                -skew-x-12
                                bg-white/20
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

                        <span className="relative">
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
                    </Link>


                    <div
                        className="
                            mt-4
                            flex
                            items-center
                            gap-2
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            text-white/25
                        "
                    >
                        <DnaIcon className="size-3.5" />

                        Powered by your Movie DNA
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecommendationCTA;