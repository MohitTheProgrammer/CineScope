import { useNavigate } from "react-router-dom";

import {
    FilmIcon,
    StarIcon,
    ArrowRightIcon,
} from "../assets/icons/Icons";


interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path?: string | null;
    vote_average?: number;
    genre_ids?: number[];
}

interface ShowAllMoviesProps {
    movielist: Movie[];
    title: string;
}


const ShowAllMovies = ({
    movielist,
    title,
}: ShowAllMoviesProps) => {
    const navigate = useNavigate();

    const handleMovieClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <section className="mx-auto max-w-7xl px-1 pb-24 lg:px-8">


            <div className="flex items-end justify-between gap-4">

                <div>
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
                                font-black
                                uppercase
                                tracking-[0.3em]
                                text-(--accent-primary)
                            "
                        >
                            CineScope
                        </span>

                    </div>

                    <h2
                        className="
                            mt-2
                            text-3xl
                            font-black
                            tracking-tight
                            text-white
                            sm:text-4xl
                        "
                    >
                        {title}
                    </h2>

                </div>

                <span
                    className="
                        shrink-0
                        rounded-full
                        border
                        border-white/10
                        bg-white/5
                        px-3
                        py-1.5
                        text-[10px]
                        font-bold
                        text-white/35
                    "
                >
                    {movielist.length} movies
                </span>

            </div>


            {movielist.length === 0 ? (
                <div
                    className="
                        mt-7
                        flex
                        min-h-60
                        flex-col
                        items-center
                        justify-center
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/2.5
                        text-center
                    "
                >
                    <div
                        className="
                            flex
                            size-14
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-(--accent-primary)/20
                            bg-(--accent-primary)/10
                            text-(--accent-primary)
                        "
                    >
                        <FilmIcon className="size-6" />
                    </div>

                    <p className="mt-4 text-sm font-bold text-white/50">
                        No movies found
                    </p>

                    <p className="mt-1 text-xs text-white/25">
                        There aren't any movies to show here yet.
                    </p>
                </div>
            ) : (


                <div
                    className="
                        mt-7
                        grid
                        grid-cols-2
                        gap-4
                        sm:grid-cols-3
                        md:grid-cols-4
                        lg:grid-cols-5
                        xl:grid-cols-6
                    "
                >
                    {movielist.map((movie) => (

                        <article
                            key={movie.id}
                            onClick={() =>
                                handleMovieClick(movie.id)
                            }
                            className="
                                group
                                cursor-pointer
                            "
                        >

                            <div
                                className="
                                    relative
                                    aspect-2/3
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    transition-all
                                    duration-500
                                    group-hover:-translate-y-1
                                    group-hover:border-(--accent-primary)/30
                                    group-hover:shadow-[0_20px_50px_var(--accent-glow)]
                                "
                            >

                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        loading="lazy"
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                            transition-transform
                                            duration-700
                                            group-hover:scale-105
                                        "
                                    />
                                ) : (
                                    <div
                                        className="
                                            flex
                                            h-full
                                            w-full
                                            items-center
                                            justify-center
                                            bg-white/5
                                            text-white/20
                                        "
                                    >
                                        <FilmIcon className="size-10" />
                                    </div>
                                )}

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-0
                                        bg-linear-to-t
                                        from-black
                                        via-black/10
                                        to-transparent
                                        opacity-80
                                    "
                                />

                                {typeof movie.vote_average === "number" &&
                                    movie.vote_average > 0 && (
                                        <div
                                            className="
                                                absolute
                                                right-2.5
                                                top-2.5
                                                flex
                                                items-center
                                                gap-1
                                                rounded-full
                                                border
                                                border-white/10
                                                bg-black/60
                                                px-2
                                                py-1
                                                backdrop-blur-md
                                            "
                                        >
                                            <StarIcon
                                                className="
                                                    size-3
                                                    fill-(--accent-primary)
                                                    text-(--accent-primary)
                                                "
                                            />

                                            <span
                                                className="
                                                    text-[10px]
                                                    font-black
                                                    text-white
                                                "
                                            >
                                                {movie.vote_average.toFixed(1)}
                                            </span>
                                        </div>
                                    )}

                                <div
                                    className="
                                        absolute
                                        inset-x-3
                                        bottom-3
                                        flex
                                        translate-y-2
                                        items-center
                                        justify-between
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-black/60
                                        px-3
                                        py-2
                                        opacity-0
                                        backdrop-blur-md
                                        transition-all
                                        duration-300
                                        group-hover:translate-y-0
                                        group-hover:opacity-100
                                    "
                                >
                                    <span
                                        className="
                                            text-[10px]
                                            font-bold
                                            text-white/70
                                        "
                                    >
                                        View movie
                                    </span>

                                    <ArrowRightIcon
                                        className="
                                            size-3.5
                                            text-(--accent-primary)
                                            transition-transform
                                            group-hover:translate-x-1
                                        "
                                    />
                                </div>

                            </div>

                            <div className="mt-3 px-1">

                                <h3
                                    className="
                                        truncate
                                        text-sm
                                        font-bold
                                        text-white
                                        transition-colors
                                        group-hover:text-(--accent-primary)
                                    "
                                >
                                    {movie.title}
                                </h3>

                                <div className="mt-1 flex items-center gap-1.5">

                                    <FilmIcon
                                        className="
                                            size-3
                                            text-(--accent-primary)/60
                                        "
                                    />

                                    <span
                                        className="
                                            text-[10px]
                                            text-white/25
                                        "
                                    >
                                        Movie
                                    </span>

                                </div>

                            </div>

                        </article>

                    ))}
                </div>
            )}

        </section>
    );
};

export default ShowAllMovies;