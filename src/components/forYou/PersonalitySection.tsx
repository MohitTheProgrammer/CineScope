import {
    BrainIcon,
} from "../../assets/icons/Icons";

import type { RankedGenre } from "../../hooks/forYou/useForYou";

import PreferenceTag from "./PreferenceTag";

interface PersonalitySectionProps {
    topGenre: RankedGenre;
    genres: RankedGenre[];
}

const PersonalitySection = ({
    topGenre,
    genres,
}: PersonalitySectionProps) => {
    return (
        <section
            className="
                mx-auto
                max-w-7xl
                px-6
                pb-20
                lg:px-8
            "
        >
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
                            Your personality
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
                        The {topGenre.name} Seeker
                    </h2>

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
                            Your movie history has a
                            strong connection with{" "}
                            <span className="text-(--accent-primary)">
                                {topGenre.name}
                            </span>
                            . That's currently the
                            biggest part of your Movie DNA.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2">
                        {genres
                            .slice(0, 4)
                            .map((genre) => (
                                <PreferenceTag
                                    key={genre.genreId}
                                    icon={genre.icon}
                                    label={genre.name}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonalitySection;