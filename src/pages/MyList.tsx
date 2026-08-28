import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useUser } from "../context/UserContext";
import MovieCard from "../components/MovieCard";
import ShowAllMovies from "./ShowAllMovies";
import { getUserMovies } from "../services/recommendation";
import type { UserMovie } from "../services/userService";
import type { Movie } from "../types/movie";
import { ArrowIcon } from "../assets/icons/Icons";

interface MovieGroup {
    title: string;
    movies: Movie[];
}

const toMovie = (movie: UserMovie): Movie => ({
    id: movie.movieId,
    title: movie.title,
    poster_path: movie.posterPath,
    genre_ids: movie.genreIds,
    vote_average: movie.voteAverage,
    adult: false,
    backdrop_path: null,
    original_language: "",
    original_title: movie.title,
    overview: "",
    popularity: 0,
    release_date: "",
    video: false,
    vote_count: 0,
});

const MyList = () => {
    const { user, loading: userLoading } = useUser();
    const [movies, setMovies] = useState<UserMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGroup, setSelectedGroup] = useState<MovieGroup | null>(null);

    const loadMovies = useCallback(async () => {
        if (!user) return;
        try {
            setLoading(true);
            setError("");
            const savedMovies = await getUserMovies(user.uid);

            setMovies(
                savedMovies.filter(
                    (movie) =>
                        movie.watched ||
                        movie.watchlisted ||
                        movie.liked ||
                        movie.rated
                )
            );
        } catch (loadError) {
            console.error("Failed to load saved movies:", loadError);
            setError("We couldn't load your saved movies. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        // The request begins when Firebase resolves the signed-in user.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (user) void loadMovies();
    }, [user, loadMovies]);

    const movieGroups = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch = (movie: UserMovie) =>
            !query || movie.title.toLowerCase().includes(query);

        return [
            {
                title: "Want to Watch",
                movies: movies
                    .filter((movie) => movie.watchlisted && matchesSearch(movie))
                    .map(toMovie),
            },
            {
                title: "Watched",
                movies: movies
                    .filter((movie) => movie.watched && matchesSearch(movie))
                    .map(toMovie),
            },
            {
                title: "Liked",
                movies: movies
                    .filter((movie) => movie.liked && matchesSearch(movie))
                    .map(toMovie),
            },
            {
                title: "Rated",
                movies: movies
                    .filter((movie) => movie.rated && matchesSearch(movie))
                    .map(toMovie),
            },
        ].filter((group) => group.movies.length > 0);
    }, [movies, searchQuery]);

    if (userLoading) return <main className="min-h-screen bg-(--bg-primary)" />;

    if (!user) {
        return <main className="flex min-h-screen items-center justify-center bg-(--bg-primary) px-6 pt-20 text-center">
            <div><h1 className="text-3xl font-black text-white">Your list is waiting.</h1><p className="mt-3 text-white/60">Sign in to save movies and pick up where you left off.</p><Link to="/login" className="mt-6 inline-flex rounded-full bg-(--accent-primary) px-6 py-3 text-sm font-bold text-white">Sign in</Link></div>
        </main>;
    }

    if (selectedGroup) {
        return (
            <main className="min-h-screen bg-(--bg-primary) px-6 pb-20 pt-32 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <button
                        type="button"
                        onClick={() => setSelectedGroup(null)}
                        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-(--accent-primary)"
                    >
                        <span aria-hidden="true">←</span>
                        Back to My List
                    </button>
                </div>
                <ShowAllMovies
                    movielist={selectedGroup.movies}
                    title={selectedGroup.title}
                />
            </main>
        );
    }

    return <main className="min-h-screen bg-(--bg-primary) px-6 pb-20 pt-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-(--accent-primary)">Personal collection</p>
            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">My List</h1>
            <p className="mt-3 text-white/60">Your movies, organised by how you saved them.</p>
            <div className="relative mt-8 max-w-md">
                <label className="sr-only" htmlFor="my-list-search">Search your list</label>
                <input
                    id="my-list-search"
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search your movies..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-(--accent-primary)"
                />
            </div>
            {loading && <MyListSkeleton />}
            {!loading && error && <div className="mt-10 rounded-2xl border border-red-400/30 bg-red-400/10 p-5 text-red-200"><p>{error}</p><button onClick={() => void loadMovies()} className="mt-3 font-bold underline">Try again</button></div>}
            {!loading && !error && movies.length === 0 && <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-10 text-center"><p className="text-white/70">No movies in your list yet.</p><Link to="/trending" className="mt-4 inline-flex font-bold text-(--accent-primary)">Explore trending movies</Link></div>}
            {!loading && !error && movies.length > 0 && movieGroups.length === 0 && <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-10 text-center"><p className="text-white/70">No movies match “{searchQuery}”.</p></div>}
            {!loading && !error && movieGroups.length > 0 && (
                <div className="mt-12 space-y-16">
                    {movieGroups.map((group) => (
                        <section key={group.title}>
                            <div className="mb-6 flex items-end justify-between gap-4">
                                <div className="flex items-baseline gap-3">
                                    <h2 className="text-2xl font-black text-white">{group.title}</h2>
                                    <span className="text-sm text-white/40">{group.movies.length}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedGroup(group)}
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 transition-colors hover:text-(--accent-primary)"
                                >
                                    View all
                                    <ArrowIcon />
                                </button>
                            </div>
                            <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-none [&::-webkit-scrollbar]:hidden">
                                {group.movies.slice(0, 10).map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        {...movie}
                                        orientation="horizontal"
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    </main>;
};

const MyListSkeleton = () => (
    <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="animate-pulse">
                <div className="aspect-2/3 rounded-2xl bg-white/5" />
                <div className="mt-3 h-4 w-3/4 rounded bg-white/5" />
            </div>
        ))}
    </div>
);

export default MyList;
