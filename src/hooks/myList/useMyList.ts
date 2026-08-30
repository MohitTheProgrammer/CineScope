import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { useUser } from "../../context/UserContext";

import { getUserMovies } from "../../services/recommendation";

import type { UserMovie } from "../../services/userService";
import type { Movie } from "../../types/movie";

import { userMovieToMovie } from "../../utils/movieMapper";

export interface MovieGroup {
    title: string;
    movies: Movie[];
}

interface UseMyListResult {
    user: ReturnType<typeof useUser>["user"];
    userLoading: boolean;

    movies: UserMovie[];

    loading: boolean;
    error: string;

    searchQuery: string;
    setSearchQuery: (
        query: string
    ) => void;

    movieGroups: MovieGroup[];

    selectedGroup: MovieGroup | null;

    setSelectedGroup: (
        group: MovieGroup | null
    ) => void;

    reload: () => Promise<void>;
}

const useMyList = (): UseMyListResult => {
    const {
        user,
        loading: userLoading,
    } = useUser();

    const [movies, setMovies] =
        useState<UserMovie[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [searchQuery, setSearchQuery] =
        useState("");

    const [selectedGroup, setSelectedGroup] =
        useState<MovieGroup | null>(null);


    const loadMovies = useCallback(
        async () => {
            if (!user) {
                setMovies([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const savedMovies =
                    await getUserMovies(
                        user.uid
                    );

                const saved =
                    savedMovies.filter(
                        (movie) =>
                            movie.watched ||
                            movie.watchlisted ||
                            movie.liked ||
                            movie.rated
                    );

                setMovies(saved);
            } catch {

                setError(
                    "We couldn't load your saved movies. Please try again."
                );
            } finally {
                setLoading(false);
            }
        },
        [user]
    );


    useEffect(() => {
        if (userLoading) {
            return;
        }

        void loadMovies();
    }, [
        user,
        userLoading,
        loadMovies,
    ]);


    const movieGroups = useMemo(() => {
        const query =
            searchQuery
                .trim()
                .toLowerCase();

        const matchesSearch = (
            movie: UserMovie
        ) =>
            !query ||
            movie.title
                .toLowerCase()
                .includes(query);

        const groups: MovieGroup[] = [
            {
                title: "Want to Watch",
                movies: movies
                    .filter(
                        (movie) =>
                            movie.watchlisted &&
                            matchesSearch(movie)
                    )
                    .map(userMovieToMovie),
            },

            {
                title: "Watched",
                movies: movies
                    .filter(
                        (movie) =>
                            movie.watched &&
                            matchesSearch(movie)
                    )
                    .map(userMovieToMovie),
            },

            {
                title: "Liked",
                movies: movies
                    .filter(
                        (movie) =>
                            movie.liked &&
                            matchesSearch(movie)
                    )
                    .map(userMovieToMovie),
            },

            {
                title: "Rated",
                movies: movies
                    .filter(
                        (movie) =>
                            movie.rated &&
                            matchesSearch(movie)
                    )
                    .map(userMovieToMovie),
            },
        ];

        return groups.filter(
            (group) =>
                group.movies.length > 0
        );
    }, [
        movies,
        searchQuery,
    ]);


    return {
        user,
        userLoading,

        movies,

        loading,
        error,

        searchQuery,
        setSearchQuery,

        movieGroups,

        selectedGroup,
        setSelectedGroup,

        reload: loadMovies,
    };
};

export default useMyList;