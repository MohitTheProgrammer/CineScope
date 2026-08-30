import GenreCard from "./GenreCard";

import type { RankedGenre } from "../../hooks/forYou/useForYou";

interface TopGenresProps {
    genres: RankedGenre[];
}

const TopGenres = ({
    genres,
}: TopGenresProps) => {
    return (
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
            <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-(--accent-primary)">
                    Your taste
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
                    Top Genres
                </h2>
            </div>

            <div
                className="
                    mt-7
                    grid
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-5
                "
            >
                {genres
                    .slice(0, 5)
                    .map((genre) => (
                        <GenreCard
                            key={genre.genreId}
                            genre={genre}
                        />
                    ))}
            </div>
        </section>
    );
};

export default TopGenres;