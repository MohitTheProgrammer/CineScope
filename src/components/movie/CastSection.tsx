import type { CastMember } from "../../types/movie";

interface CastSectionProps {
    cast: CastMember[];
}

const IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p";

const CastSection = ({
    cast,
}: CastSectionProps) => {
    if (!cast.length) {
        return null;
    }

    return (
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">

            <div>
                <p
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-(--accent-primary)
                    "
                >
                    The cast
                </p>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                    Cast
                </h2>
            </div>

            <div
                className="
                    mt-6
                    grid
                    grid-cols-2
                    gap-4
                    sm:grid-cols-3
                    md:grid-cols-5
                    lg:grid-cols-6
                "
            >
                {cast.map((person) => (
                    <article
                        key={person.id}
                        className="min-w-0"
                    >
                        <div
                            className="
                                aspect-3/4
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                            "
                        >
                            {person.profile_path ? (
                                <img
                                    src={`${IMAGE_BASE_URL}/w342${person.profile_path}`}
                                    alt={person.name}
                                    loading="lazy"
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                        transition-transform
                                        duration-500
                                        hover:scale-105
                                    "
                                />
                            ) : (
                                <div
                                    className="
                                        flex
                                        h-full
                                        items-center
                                        justify-center
                                        text-xs
                                        text-white/20
                                    "
                                >
                                    No image
                                </div>
                            )}
                        </div>

                        <h3
                            className="
                                mt-3
                                truncate
                                text-sm
                                font-bold
                            "
                        >
                            {person.name}
                        </h3>

                        <p
                            className="
                                mt-1
                                truncate
                                text-xs
                                text-white/40
                            "
                        >
                            {person.character}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default CastSection;