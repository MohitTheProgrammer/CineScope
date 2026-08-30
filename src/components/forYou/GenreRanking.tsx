import GenreRankingRow from "./GenreRankingRow";

import type { RankedGenre } from "../../hooks/forYou/useForYou";

interface GenreRankingProps {
    genres: RankedGenre[];
}

const GenreRanking = ({
    genres,
}: GenreRankingProps) => {
    return (
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
            <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-(--accent-primary)">
                    The interesting part
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
                    Your Complete Genre DNA
                </h2>
            </div>

            <div className="mt-7 space-y-3">
                {genres.map((genre) => (
                    <GenreRankingRow
                        key={genre.genreId}
                        genre={genre}
                    />
                ))}
            </div>
        </section>
    );
};

export default GenreRanking;