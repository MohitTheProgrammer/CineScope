import { useEffect, useState } from "react";

import { addWatchlistMovie, isMovieInWatchlist } from "../../services/movie";

import { useUser } from "../../context/UserContext";

import type { Movie } from "../../types/movie";

interface UseMovieWatchlistResult {
  watchlistAdded: boolean;
  checkingWatchlist: boolean;
  addingToWatchlist: boolean;
  addToWatchlist: () => Promise<void>;
}

export const useMovieWatchlist = (
  movie: Movie | null,
): UseMovieWatchlistResult => {
  const { user } = useUser();

  const [watchlistAdded, setWatchlistAdded] = useState(false);

  const [checkingWatchlist, setCheckingWatchlist] = useState(true);

  const [addingToWatchlist, setAddingToWatchlist] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkWatchlist = async () => {
      if (!user || !movie) {
        setWatchlistAdded(false);
        setCheckingWatchlist(false);
        return;
      }

      try {
        setCheckingWatchlist(true);

        const exists = await isMovieInWatchlist(user.uid, movie.id);

        if (!cancelled) {
          setWatchlistAdded(exists);

          console.log(
            `[useMovieWatchlist] Watchlist state loaded: ${movie.id} -> ${exists}`,
          );
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            `[useMovieWatchlist] Failed to check watchlist: ${movie.id}`,
            error,
          );

          setWatchlistAdded(false);
        }
      } finally {
        if (!cancelled) {
          setCheckingWatchlist(false);
        }
      }
    };

    void checkWatchlist();

    return () => {
      cancelled = true;
    };
  }, [user, movie]);

const addToWatchlist = async () => {
    if (!user || !movie || watchlistAdded) {
        return;
    }

    try {
        setAddingToWatchlist(true);

        const genreIds =
            movie.genre_ids?.length
                ? movie.genre_ids
                : movie.genres?.map(
                      (genre) => genre.id
                  ) ?? [];

        console.log(
            "[useMovieWatchlist] Movie before saving:",
            {
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                genre_ids: genreIds,
                vote_average: movie.vote_average,
            }
        );

        await addWatchlistMovie(
            user.uid,
            {
                id: movie.id,
                title: movie.title,
                overview: movie.overview ?? "",
                poster_path:
                    movie.poster_path ?? null,
                genre_ids: genreIds,
                vote_average:
                    movie.vote_average ?? 0,
            }
        );

        setWatchlistAdded(true);

        console.log(
            `[useMovieWatchlist] Movie added to watchlist successfully: ${movie.id}`
        );
    } catch (error) {
        console.error(
            `[useMovieWatchlist] Failed to add movie to watchlist: ${movie.id}`,
            error
        );
    } finally {
        setAddingToWatchlist(false);
    }
};
  return {
    watchlistAdded,
    checkingWatchlist,
    addingToWatchlist,
    addToWatchlist,
  };
};

export default useMovieWatchlist;
