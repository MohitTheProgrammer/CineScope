import MovieCard from "../MovieCard";

import { ArrowIcon } from "../../assets/icons/Icons";

import type { MovieGroup } from "../../hooks/myList/useMyList";

interface MyListGroupProps {
    group: MovieGroup;
    onViewAll: () => void;
}

const MyListGroup = ({
    group,
    onViewAll,
}: MyListGroupProps) => {
    return (
        <section>
            <div
                className="
                    mb-6
                    flex
                    items-end
                    justify-between
                    gap-4
                "
            >
                <div
                    className="
                        flex
                        items-baseline
                        gap-3
                    "
                >
                    <h2
                        className="
                            text-2xl
                            font-black
                            text-white
                        "
                    >
                        {group.title}
                    </h2>

                    <span
                        className="
                            text-sm
                            text-white/40
                        "
                    >
                        {group.movies.length}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={onViewAll}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        text-xs
                        font-semibold
                        text-white/50
                        transition-colors
                        hover:text-(--accent-primary)
                    "
                >
                    View all

                    <ArrowIcon />
                </button>
            </div>

            <div
                className="
                    flex
                    gap-5
                    overflow-x-auto
                    pb-6
                    scrollbar-none
                    [&::-webkit-scrollbar]:hidden
                "
            >
                {group.movies
                    .slice(0, 10)
                    .map((movie) => (
                        <MovieCard
                            key={movie.id}
                            {...movie}
                            orientation="horizontal"
                        />
                    ))}
            </div>
        </section>
    );
};

export default MyListGroup;