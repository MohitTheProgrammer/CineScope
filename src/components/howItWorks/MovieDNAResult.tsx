import {
    ArrowRightIcon,
    DnaIcon,
    FilmIcon,
} from "../../assets/icons/Icons";

import type { HowItWorksGenre } from "../../data/howItWorks";

interface MovieDNAResultProps {
    user: boolean;
    genres: HowItWorksGenre[];
    onAction: () => void;
}

const MovieDNAResult = ({
    user,
    genres,
    onAction,
}: MovieDNAResultProps) => {
    return (
        <section
            className="
                mx-auto
                max-w-7xl
                px-6
                py-24
                lg:px-8
            "
        >
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
                        <DnaIcon
                            className="
                                size-11
                                text-(--accent-primary)
                            "
                        />
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
                        The more movies you interact with,
                        the clearer your taste becomes.
                        CineScope uses those signals to
                        build a preference profile that is
                        uniquely yours.
                    </p>

                    <div
                        className="
                            mt-10
                            grid
                            grid-cols-2
                            gap-3
                            sm:grid-cols-5
                        "
                    >
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
                        <button
                            type="button"
                            onClick={onAction}
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
                                text-white
                                shadow-[0_0_30px_var(--accent-glow)]
                                transition-all
                                hover:scale-105
                            "
                        >
                            {user ? (
                                <>
                                    <DnaIcon className="size-4" />
                                    See My Movie DNA
                                </>
                            ) : (
                                <>
                                    <FilmIcon className="size-4" />
                                    Start Building My DNA
                                </>
                            )}

                            <ArrowRightIcon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MovieDNAResult;