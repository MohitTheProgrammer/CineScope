import type { Movie } from "../../types/movie";

interface MovieInfoProps {
    movie: Movie;
}

const MovieInfo = ({
    movie,
}: MovieInfoProps) => {
    return (
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">

            <SectionHeading
                eyebrow="Details"
                title="Movie Information"
            />

            <div
                className="
                    mt-6
                    grid
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-4
                "
            >
                <InfoCard
                    label="Release Date"
                    value={
                        movie.release_date ||
                        "Unknown"
                    }
                />

                <InfoCard
                    label="Rating"
                    value={`${movie.vote_average.toFixed(
                        1
                    )} / 10`}
                />

                <InfoCard
                    label="Original Language"
                    value={
                        movie.original_language?.toUpperCase() ??
                        "—"
                    }
                />

                <InfoCard
                    label="Popularity"
                    value={
                        movie.popularity?.toFixed(0) ??
                        "—"
                    }
                />
            </div>
        </section>
    );
};

const InfoCard = ({
    label,
    value,
}: {
    label: string;
    value: string;
}) => (
    <div
        className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-5
        "
    >
        <p
            className="
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-white/30
            "
        >
            {label}
        </p>

        <p className="mt-2 text-sm font-bold text-white">
            {value}
        </p>
    </div>
);

const SectionHeading = ({
    eyebrow,
    title,
}: {
    eyebrow: string;
    title: string;
}) => (
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
            {eyebrow}
        </p>

        <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            {title}
        </h2>
    </div>
);

export default MovieInfo;