import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useUser } from "../context/UserContext";
import MovieCard from "../components/MovieCard";
import { getWatchlistMovies, type WatchlistMovie } from "../services/movie";

const MyList = () => {
    const { user, loading: userLoading } = useUser();
    const [movies, setMovies] = useState<WatchlistMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadMovies = useCallback(async () => {
        if (!user) return;
        try {
            setLoading(true);
            setError("");
            setMovies(await getWatchlistMovies(user.uid));
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

    if (userLoading) return <main className="min-h-screen bg-(--bg-primary)" />;

    if (!user) {
        return <main className="flex min-h-screen items-center justify-center bg-(--bg-primary) px-6 pt-20 text-center">
            <div><h1 className="text-3xl font-black text-white">Your list is waiting.</h1><p className="mt-3 text-white/60">Sign in to save movies and pick up where you left off.</p><Link to="/login" className="mt-6 inline-flex rounded-full bg-(--accent-primary) px-6 py-3 text-sm font-bold text-white">Sign in</Link></div>
        </main>;
    }

    return <main className="min-h-screen bg-(--bg-primary) px-6 pb-20 pt-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-(--accent-primary)">Personal collection</p>
            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Watch List</h1>
            <p className="mt-3 text-white/60">Movies you want to watch next.</p>
            {loading && <WatchlistSkeleton />}
            {!loading && error && <div className="mt-10 rounded-2xl border border-red-400/30 bg-red-400/10 p-5 text-red-200"><p>{error}</p><button onClick={() => void loadMovies()} className="mt-3 font-bold underline">Try again</button></div>}
            {!loading && !error && movies.length === 0 && <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-10 text-center"><p className="text-white/70">No saved movies yet.</p><Link to="/trending" className="mt-4 inline-flex font-bold text-(--accent-primary)">Explore trending movies</Link></div>}
            {!loading && !error && movies.length > 0 && <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        poster_path={movie.posterPath}
                        genre_ids={movie.genreIds}
                        vote_average={movie.voteAverage}
                        adult={false}
                        backdrop_path={null}
                        original_language=""
                        original_title={movie.title}
                        overview=""
                        popularity={0}
                        release_date=""
                        video={false}
                        vote_count={0}
                        orientation="vertical"
                    />
                ))}
            </div>}
        </div>
    </main>;
};

const WatchlistSkeleton = () => (
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
