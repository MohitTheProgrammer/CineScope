import { useCallback, useEffect, useMemo, useState } from "react";

import { useUser } from "../../context/UserContext";

import { getUserMovieInteractions } from "../../services/userService";

import { getMoviesByIds } from "../../services/movie";

export interface UserMovie {
  movieId: number;

  title: string;

  posterPath: string | null;

  movieSynopsis: string;

  genreIds: number[];

  voteAverage: number;

  liked: boolean;

  watched: boolean;

  watchlisted: boolean;

  rated: boolean;

  rating: number | null;
}

export interface MyListMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  genre_ids: number[];
  vote_average: number;
}

export interface MovieGroup {
  title: string;
  movies: MyListMovie[];
}

interface UseMyListResult {
  user: ReturnType<typeof useUser>["user"];

  userLoading: boolean;

  movies: UserMovie[];

  loading: boolean;

  error: string;

  searchQuery: string;

  setSearchQuery: (query: string) => void;

  movieGroups: MovieGroup[];

  selectedGroup: MovieGroup | null;

  setSelectedGroup: (group: MovieGroup | null) => void;

  reload: () => Promise<void>;
}

const useMyList = (): UseMyListResult => {
  const { user, loading: userLoading } = useUser();

  const [movies, setMovies] = useState<UserMovie[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedGroup, setSelectedGroup] = useState<MovieGroup | null>(null);

  const loadMovies = useCallback(async () => {
    if (!user) {
      setMovies([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      /*
       * Get only the user's interaction data.
       *
       * Example:
       *
       * liked     -> [123, 456]
       * watched   -> [789]
       * watchlist -> [123, 999]
       * rated     -> { "456": 4.5 }
       */
      const interactions = await getUserMovieInteractions(user.uid);

      /*
       * Collect every movie ID the user
       * has interacted with.
       */
      const movieIds = Array.from(
        new Set([
          ...interactions.liked,
          ...interactions.watched,
          ...interactions.watchlist,
          ...Object.keys(interactions.rated).map(Number),
        ]),
      );

      if (movieIds.length === 0) {
        setMovies([]);
        return;
      }

      /*
       * Fetch the actual movie objects
       * from the global movies collection.
       */
      const globalMovies = await getMoviesByIds(movieIds);

      /*
       * Combine global movie data with
       * user-specific interaction data.
       */
      const userMovies: UserMovie[] = globalMovies.map((movie) => {
        const movieId = movie.movieId;

        const rating = interactions.rated[String(movieId)] ?? null;

        return {
          movieId,

          title: movie.title ?? "",

          posterPath: movie.posterPath ?? null,

          movieSynopsis: movie.movieSynopsis ?? "",

          genreIds: movie.genreIds ?? [],

          voteAverage: movie.voteAverage ?? 0,

          liked: interactions.liked.includes(movieId),

          watched: interactions.watched.includes(movieId),

          watchlisted: interactions.watchlist.includes(movieId),

          rated: rating !== null,

          rating,
        };
      });

      setMovies(userMovies);

      console.log("[useMyList] Movies loaded successfully:", userMovies);
    } catch (err) {
      console.error("[useMyList] Failed to load user movies:", err);

      setError("We couldn't load your saved movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (userLoading) {
      return;
    }

    void loadMovies();
  }, [user, userLoading, loadMovies]);

  const movieGroups = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch = (movie: UserMovie) =>
      !query || movie.title.toLowerCase().includes(query);

    const groups: MovieGroup[] = [
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
    ];

    return groups.filter((group) => group.movies.length > 0);
  }, [movies, searchQuery]);

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

const toMovie = (movie: UserMovie): MyListMovie => {
  return {
    id: movie.movieId,
    title: movie.title,
    overview: movie.movieSynopsis ?? "",
    poster_path: movie.posterPath ?? null,
    genre_ids: movie.genreIds ?? [],
    vote_average: movie.voteAverage ?? 0,
  };
};

export default useMyList;
