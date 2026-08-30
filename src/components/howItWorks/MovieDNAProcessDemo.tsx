import {
    BrainIcon,
    ChartIcon,
    DnaIcon,
    HeartIcon,
    StarIcon,
} from "../../assets/icons/Icons";

const MovieDNAProcessDemo = () => {
    const signals = [
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
    ];

    return (
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
                            <BrainIcon
                                className="
                                    size-11
                                    text-(--accent-primary)
                                "
                            />
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-3">
                        {signals.map(
                            ({ icon: Icon, label }) => (
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
                                    <Icon
                                        className="
                                            size-5
                                            text-(--accent-primary)
                                        "
                                    />

                                    <span
                                        className="
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-white/40
                                        "
                                    >
                                        {label}
                                    </span>
                                </div>
                            )
                        )}
                    </div>

                    <div className="my-5 flex justify-center">
                        <div
                            className="
                                h-8
                                w-px
                                bg-linear-to-b
                                from-(--accent-primary)/60
                                to-transparent
                            "
                        />
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
                        <DnaIcon
                            className="
                                mx-auto
                                size-7
                                text-(--accent-primary)
                            "
                        />

                        <p className="mt-3 text-sm font-black">
                            Your Movie DNA
                        </p>

                        <p className="mt-1 text-xs leading-5 text-white/35">
                            A weighted picture of your movie
                            taste.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDNAProcessDemo;